# Database Storage Optimization — Eliminate Dead-Weight Tables

**Date:** 2026-03-09
**Status:** Approved
**Context:** Indexer DB costs ~$15k/month. Local DB grew to 115GB filling SSD. Three tables store data the API never reads.

## Problem

Three tables account for ~53GB locally (likely 500GB+ in prod) but are either never read or store 99.99% unused data:

| Table | Local Size | Rows | API Reads | Waste |
|-------|-----------|------|-----------|-------|
| `outputs` | 6.4 GB | — | Never read | 100% |
| `receipts` | 37 GB | 86M | Only 42 MESSAGE_OUT rows | 99.99% |
| `inputs` | 9.6 GB | — | Only `nonce` field (bridge) | ~95% |

## Changes

### 1. Outputs table — stop writing, truncate

The `outputs` table is inserted during block indexing but never queried by any DAO or resolver. Output data is already available in `transactions.data` JSONB. The NFT ownership update reads from in-memory `transactionData.outputs`, not from the DB table.

- **Code**: Remove INSERT into `indexer.outputs` from `NewAddBlockRange.ts`
- **Migration**: `TRUNCATE indexer.outputs`
- **Savings**: 6.4GB local, est. 100GB+ prod

### 2. Receipts table — keep only MESSAGE_OUT, filter writes

Out of 86M receipts, only 42 are MESSAGE_OUT (the only type BridgeDAO reads). The `receipts_data` table (bridge log decoding) is also write-only.

However, `IndexReceipts` also uses the RETURNING clause to process bridge LOG/LOG_DATA entries into `receipts_data`. Since `receipts_data` is never read by the API either, we can skip that processing too.

- **Code**: In `IndexReceipts.insertReceiptsBatch()`, filter to only insert MESSAGE_OUT receipts. Skip bridge log processing entirely.
- **Migration**: `DELETE FROM indexer.receipts WHERE receipt_type != 'MESSAGE_OUT'` + `TRUNCATE indexer.receipts_data`
- **Savings**: ~35GB local, est. 500GB+ prod
- **Query speedup**: BridgeDAO queries on receipts go from scanning 86M rows to 42

### 3. Inputs table — extract nonce, drop data JSON

BridgeDAO only reads `(data->>'nonce')` from inputs. The rest of the JSON blob is never accessed. There's already a TODO in the code to do this.

- **Code**: Add `nonce` column, populate during indexing, update BridgeDAO query
- **Migration**: Add column, backfill from JSON, set `data = NULL`, run VACUUM
- **Savings**: ~9GB local, est. 100GB+ prod
- **Query speedup**: Index on `nonce` column vs JSON extraction on every row

## Migration

Single migration file (044). Operations are ordered to minimize lock time:
1. TRUNCATE outputs (instant)
2. DELETE non-MESSAGE_OUT receipts (may take time in prod)
3. TRUNCATE receipts_data
4. ALTER inputs ADD nonce, backfill, DROP data default

## Deployment

1. Deploy code changes first (reduced writes are backward-compatible)
2. Run migration (cleanup + schema change)
3. VACUUM FULL on affected tables to reclaim disk space (schedule during low traffic)
