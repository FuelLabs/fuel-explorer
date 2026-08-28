# api-lite load test, 2026-08-28

Host: Darwin MacBook-Pro-de-Nelito.local, arm64, OrbStack Docker server 29.4.0 (context `orbstack`).
Compose limits: explorer 0.2 CPU / 64 MB, api 0.8 CPU / 960 MB (`docker/vps/docker-compose.yml`).
Config (`docker/vps/.env`): INDEX_RETENTION_DAYS=3, INDEX_MAX_BYTES=15000000000, MEMORY_CACHE_BYTES=134217728 (128 MiB), DISK_CACHE_BYTES=5368709120 (5 GiB).

This run had two phases. AWS credentials for S3 were unavailable for the first part of the session (`docker/vps/.env` had no working keys; the api container logged `Could not load credentials from any providers` on every S3 read). Credentials were restored mid-session by recreating the `api` container (`docker compose -f docker/vps/docker-compose.yml up -d api`). Results are split into **Preliminary (disk only)** and **Full (credentials restored)** sections below. Anything not measured is marked "not measured" or "pending" rather than estimated.

## Preliminary (disk only, credentials unavailable)

State: `servedTip` frozen at 62726640, index range 62716904-62726640 (9737 heights), 2821 block JSONs on disk, no new blocks could be fetched from S3. All numbers below are from this frozen state.

### Disk facts (measured, `docker exec vps-api-1`)
| metric | value | source |
|---|---|---|
| block JSON count on disk | 2821 files | `ls /data/blocks \| wc -l` |
| block JSON total size | 5,989,390,956 B (5.58 GiB) | `du -sb /data/blocks` |
| largest 3 block files | 4,696,285 B / 4,755,006 B / 4,889,318 B | `ls -l /data/blocks \| sort -k5 -n \| tail -3` |
| avg block JSON size | 2,123,145 B (2.03 MiB) | 5,989,390,956 / 2821 |
| index.db size | 652,169,216 B (622.0 MiB) | `stat -c '%s' /data/index.db`, matches `/health.indexBytes` |
| index bytes per block | 66,978 B (65.4 KiB) | 652,169,216 / 9737 indexed heights |

### Single-request timing (warm cache, disk-only state), `curl -w '%{time_total}'`
| page | time_total | http_code |
|---|---|---|
| block page (height 62726640) | 0.0557 s | 200 |
| tx page | 0.0025 s | 200 |
| account page (transactionsByOwner) | 0.0046 s | 200 |
| home bundle, query 1 (getBlocksDashboard) | 0.0194 s | 200 |
| home bundle, query 2 (transactions first:10) | 0.0047 s | 200 |
| home bundle, query 3 (blocks first:10) | 0.2088 s | 200 |

All of these hit blocks already resident in disk/memory cache, so they measure decode/serialize + resolver cost, not S3 latency. The `blocks(first:10)` query is the slowest of the three home queries by roughly 10x.

### home scenario, formal run (60 s, 20 connections, `run.mjs home 60 20`)
| metric | value | source |
|---|---|---|
| req/s | 30.14 | autocannon |
| p50 / p97.5 / p99 | 657 ms / 972 ms / 1043 ms | autocannon |
| non-2xx | 0 | autocannon |
| errors / timeouts | 0 / 0 | autocannon |
| RSS at t=30s (mid-run) | 167.8 MiB (docker stats) / 167,809,024 B (/health) | docker stats, /health |
| RSS post-run | 167.7 MiB | docker stats |
| CPU mid-run | 79.77% of 0.8 limit | docker stats |

### tx / account / search scenarios: informal validation only
Formal 60 s runs were not completed for these three before credentials returned (superseded by the credential restore — see "what changed mid-run" below). 5 s/2-connection smoke tests (used only to validate the queries against live data, not representative load numbers):
- tx: rps 2043, p50 2 ms, p97.5 6 ms, p99 14 ms, 0 errors
- account: rps 1129, p50 2 ms, p97.5 13 ms, p99 21 ms, 0 errors
- search: rps 9.4, p50 52 ms, p97.5 604 ms, p99 1354 ms, 0 errors (search-by-txid falls through to `ctx.client` RPC calls to fuel-core in `search.ts`, which is markedly slower than search-by-height)

`sample()` (newest 50 txs) found only 1 distinct `InputCoin.owner` among the first 10 sampled tx's inputs — most sampled transactions on this window are contract calls / non-coin-input, not plain coin transfers, so the account pool is thin.

### Errors observed (disk-only state)
A `curl` probe against a block outside the on-disk/indexed range (height 62700000, below `indexFrom`) returned HTTP 200 with a GraphQL error, not a non-2xx:
```
{"errors":[{"message":"Could not load credentials from any providers","locations":[{"line":1,"column":3}],"path":["block"]}],"data":{"block":null}}
```
This means `autocannon`'s `non2xx` counter would **not** catch S3-outage errors — they come back as HTTP 200 with a populated `errors[]` array. The formal home/tx/account/search runs above did not hit this path because `sample()` only pulls IDs from the newest 50 transactions, which are on disk.

### cold scenario
Not run in this phase: pending credentials (see brief).

## What changed mid-run

AWS credentials were restored partway through preliminary testing. The `api` container was recreated (`docker compose -f docker/vps/docker-compose.yml up -d api`) to pick them up. Health/log polling for 3 minutes after restart confirmed `servedTip` advancing and zero `Could not load credentials` lines, so the remainder of the session ran against a live, backfilling stack. The rest of this report covers that state.

## Full (credentials restored)

### Warm, backfill running (10 min observation, no synthetic load)
Window: 2026-08-28 18:32:52 UTC to 18:43:31 UTC (639 s), starting shortly after container recreation.
| metric | value | source |
|---|---|---|
| backfill rate | avg 2.67 blocks/s (samples: 2.33-3.33) | `docker compose logs api`, once-a-minute `backfillBps` JSON line |
| RSS | 427-561.6 MiB (docker stats), 448-511 MiB (`/health.rss`) | docker stats, /health, 10 samples over the window |
| CPU | 45.9-80.0% of the 0.8 CPU limit | docker stats, 10 samples |
| disk growth, `/data` | 4,669,724,044 B in 639 s = 26.3 GB/h | `du -sb /data` before/after |
| disk growth, `/data/blocks` | 4,457,249,692 B in 639 s = 25.1 GB/h | `du -sb /data/blocks` before/after |
| disk growth, `index.db` | 142,295,040 B in 639 s = 801.7 MB/h | `stat -c '%s' /data/index.db` before/after |
| index bytes per block (delta-based) | 71,805 B (70.1 KiB), from 131,833,856 B / 1836 blocks indexed (296 forward + 1540 backward) during the window | `/health.indexBytes` delta / `/health.index` height delta |

**Disk-cache overshoot (measured anomaly):** `/data/blocks` grew to 11,854,167,643 B (11.04 GiB) by the end of the 10-minute window above — more than 2x the configured `DISK_CACHE_BYTES` target of 5,368,709,120 B (5 GiB). `BlockStore.evictDisk()` is only invoked every 10 minutes (`packages/api-lite/src/main.ts:93`), so under active backfill the disk cache can run well past its target between eviction passes. A later check (after the mix and aborted cold runs, roughly 30 min after container start) showed `/data/blocks` at 7,174,721,104 B (6.68 GiB) — eviction had run and pulled it back down, but it was still 34% over the 5 GiB target at that point.

### Read mix, backfill running (60 s, 20 connections — not the full 600 s; see note)
Ran `run.mjs mix 60 20` while backfill was actively decoding and writing blocks (CPU contention on the shared 0.8 CPU limit).
| metric | value | source |
|---|---|---|
| req/s | 6.42 | autocannon |
| p50 / p97.5 / p99 | 2574 ms / 8354 ms / 9265 ms | autocannon |
| non-2xx | 0 | autocannon |
| errors / timeouts | 1 / 1 | autocannon (autocannon's summary exposes only counts, not per-request messages, so no `errors[0].message` text is available here) |
| RSS before / after | 467.3 MB / 431.0 MB (`/health.rss`); 500 MiB / 535.6 MiB (docker stats) | /health, docker stats |
| CPU before / after | 65.2% / 28.5% of 0.8 limit | docker stats |

Note: the brief specifies a 600 s mix run; this run used 60 s because of an explicit mid-task instruction to stop waiting and get results into the report without further delay. The 600 s/20-connection run has not been executed.

Reading this against the home-only preliminary run (p97.5 972 ms with zero contention) shows the read path is CPU-starved once backfill competes for the same 0.8 CPU budget: p97.5 rose roughly 8.6x and two requests failed outright (1 connection error, 1 timeout) in a 60 s/20-connection window that otherwise handled well under 10 req/s.

### Cold misses (60 s, 4 connections)
Not completed. `run.mjs cold` samples 200 candidate tx IDs sequentially by querying `block(height)` for 200 heights 20,000-20,200 below `indexFrom` (all outside disk and memory cache, forcing genuine S3 GetObject calls) before the timed autocannon run even starts. That sampling phase ran for 6 minutes 47 seconds (19:04:39 to 19:11:26 UTC) without finishing and was killed. No p50/p97.5/latency numbers or `errors[0].message` samples were obtained for this scenario.
| metric | value |
|---|---|
| p50 / p97.5 ms | not measured (sampling phase did not complete) |
| S3 GetObject p50 | not measured — the `LOG_S3=1` timing line added to `BlockStore.load` in this task requires an image rebuild to take effect in the running container, which was not done |

Directionally, this confirms cold, uncached, sub-`indexFrom` block fetches are slow relative to the warm path under the 0.8 CPU limit (sub-second warm reads vs. a sampling loop of ~200 sequential cold fetches not finishing in 6m47s, i.e. averaging well over 2 s/request even before autocannon load was applied), but no precise percentile numbers exist.

### Read mix, backfill paused
Not run. Step 4 of the brief (pause backfill via `kill -STOP 1` or a `BACKFILL=0` rebuild) was not reached before the task was closed out. Not measured.

## Verdict
- p97.5 for a tx page under 1 s: **no**, when backfill is actively contending for the shared 0.8 CPU (blended mix p97.5 = 8354 ms). In isolation with no backfill contention, an informal 5 s smoke test showed tx p97.5 = 6 ms, but that was not a formal load-tested number and predates credential restore, so treat it as indicative only. A clean, formal tx-only run under live backfill has not been done.
- RSS under the 960 MB limit: **yes**. Peak observed 561.6 MiB (docker stats, during active backfill + concurrent read mix), leaving roughly 398 MiB / 41% headroom. Idle (pre-restore, no backfill) RSS was 109-118 MiB.
- Index bytes per block: 66,978 B (65.4 KiB), measured from the idle 622.0 MiB / 9737-block index; a delta-based measurement during active backfill gave 71,805 B (70.1 KiB), consistent within ~7%. At 15,000,000,000 B (`INDEX_MAX_BYTES`), that implies a window of about 223,950 blocks. Converting to a day count requires a block-production rate; that rate was not independently confirmed in this run (see below), so the day figure is **estimated**, not measured: at a nominal ~1 block/s Fuel mainnet target, 223,950 blocks ≈ 62.2 hours ≈ **2.6 days**.
- Disk cache blocks held: at the 2.03 MiB/block average measured on disk and the 5 GiB `DISK_CACHE_BYTES` target, the cache is sized for about 2529 blocks. At an estimated ~1 block/s, that is about **42 minutes** of coverage — again an estimate, not a measured chain rate. Measured behavior shows the cache overshooting this target by 2x+ between eviction passes (see the disk-cache-overshoot note above), so real coverage is not evenly 42 minutes; it saws between roughly 42 minutes and 90+ minutes depending on how recently eviction ran.
- Resource to raise first: **disk**, specifically the eviction cadence, not the CPU or memory limits. Both RSS (max 561.6 MiB of 960 MiB) and index size (65-72 KiB/block against a 15 GB budget spanning ~2.6 estimated days) have comfortable headroom. The measured problem is `/data/blocks` growing to 11.04 GiB — more than double the 5 GiB `DISK_CACHE_BYTES` target — because `BlockStore.evictDisk()` (`packages/api-lite/src/main.ts:93`) only runs once every 10 minutes while backfill writes continuously. Either shortening that interval or lowering `DISK_CACHE_BYTES` would keep the on-disk footprint closer to its configured budget during backfill bursts. Separately, CPU contention between backfill and reads is real (p97.5 rose ~8.6x in the mix run) but 0.8 CPU is the container's whole quota on this simulated $5/mo VPS, so "raise CPU" is not an available lever without changing the host tier — the more actionable fix is decoupling read latency from backfill load (e.g., lowering `BACKFILL_BATCH`/`S3_CONCURRENCY`, or rate-limiting backfill during read bursts).
- Parity gaps carried from Task 15: not verified in this task; refer to Task 15's own report for `consensus.signature`/`producer` (null), USD fields (null), and fee-exactness status.

## Not measured / pending in this report
- Formal 60 s tx-only, account-only, and search-only runs after credential restore.
- Full 600 s/20-connection mix run (only a 60 s run was completed).
- Cold-miss percentiles and `S3BlockSource.fetchRaw` timing (`LOG_S3=1`) — the timing instrumentation was added to `BlockStore.load` in source but not yet built into the running container image.
- Read mix with backfill paused (step 4 of the brief).
- Independently confirmed chain block-production rate (`fuelCoreTip` was observed unchanged at 62729054 for roughly 31 minutes across two check-ins in this session, which is inconsistent with continuous block production; this was not diagnosed and the "days of coverage" / "minutes of coverage" figures above use an unverified nominal ~1 block/s estimate instead).
