# Testing the Testnet E2E Implementation

This guide provides step-by-step instructions for testing the testnet E2E implementation **before merging the PR**.

## Table of Contents
- [Pre-Merge Testing Strategy](#pre-merge-testing-strategy)
- [Local Testing](#local-testing)
- [Branch Testing in CI](#branch-testing-in-ci)
- [Manual Workflow Validation](#manual-workflow-validation)
- [Test Checklist](#test-checklist)

---

## Pre-Merge Testing Strategy

### Overview
Test the implementation in **3 phases** to ensure everything works before merging:

1. **Local Testing** - Verify environment detection and configuration locally
2. **Branch CI Testing** - Test the workflow on your feature branch
3. **Manual Trigger Testing** - Validate scheduled job behavior and failure handling

### Why This Approach?
- ✅ Catches issues before they affect `main` branch
- ✅ Validates both soft and hard test paths
- ✅ Tests failure notification system
- ✅ Verifies secrets and permissions work correctly

---

## Phase 1: Local Testing

### 1.1 Test Environment Detection

Verify that environment detection works correctly:

```bash
cd packages/e2e-tests

# Test local environment detection (default)
node -e "const env = require('./tests/hard/bridge/utils/env.ts'); console.log('Is testnet:', env.isTestnetEnvironment()); console.log('Provider URL:', env.getProviderUrl());"

# Expected output:
# Is testnet: false
# Provider URL: http://localhost:4000/v1/graphql
```

### 1.2 Test Testnet Configuration

Set testnet environment variables and verify:

```bash
# Set testnet environment
export VITE_FUEL_CHAIN_NAME=fuelTestnet
export FUEL_PROVIDER_URL=https://testnet.fuel.network/v1/graphql
export E2E_TARGET_ENV=testnet

# Test environment detection
node -e "const env = require('./tests/hard/bridge/utils/env.ts'); console.log('Is testnet:', env.isTestnetEnvironment()); console.log('Provider URL:', env.getProviderUrl()); console.log('ETH Chain:', env.getEthereumChain());"

# Expected output:
# Is testnet: true
# Provider URL: https://testnet.fuel.network/v1/graphql
# ETH Chain: sepolia
```

### 1.3 Test Soft Tests Locally (Optional)

If you want to run soft tests against testnet locally:

```bash
# From repo root
export VITE_FUEL_CHAIN_NAME=fuelTestnet
export E2E_TARGET_ENV=testnet

# Build explorer for testnet
pnpm build:prod

# Run soft tests (these don't need blockchain interaction)
pnpm test:e2e-soft
```

**Note:** This tests the explorer UI against testnet data sources, but won't test wallet interactions.

### 1.4 Verify Mocks Support Environment Variables

```bash
cd packages/e2e-tests

# Check that mocks respect environment variables
export E2E_ETH_MNEMONIC="test mnemonic override"
export E2E_ETH_PASSWORD="TestPassword123"

node -e "const mocks = require('./tests/hard/bridge/mocks/mocks.ts'); console.log('ETH_MNEMONIC:', mocks.ETH_MNEMONIC); console.log('ETH_WALLET_PASSWORD:', mocks.ETH_WALLET_PASSWORD);"

# Expected output:
# ETH_MNEMONIC: test mnemonic override
# ETH_WALLET_PASSWORD: TestPassword123
```

---

## Phase 2: Branch Testing in CI

### 2.1 Push Your Feature Branch

```bash
git add .
git commit -m "feat: add testnet E2E cron workflow"
git push origin your-feature-branch-name
```

### 2.2 Verify Workflow File is Valid

1. Go to **GitHub Actions** tab in your repository
2. Look for the workflow **"Testnet E2E Tests (Scheduled)"** in the left sidebar
3. If it appears, the YAML syntax is valid ✅
4. If it doesn't appear, check for syntax errors in the workflow file

### 2.3 Check for Security Alerts

1. Go to your PR page
2. Look for **Advanced Security** bot comments
3. Verify that **no security issues** are flagged
4. If flagged: review and fix (we already added `permissions: contents: read`)

---

## Phase 3: Manual Workflow Validation

### 3.1 Test Manual Trigger (Soft Tests)

**Goal:** Verify the workflow runs successfully with soft tests

**Steps:**
1. Go to **Actions** → **Testnet E2E Tests (Scheduled)**
2. Click **"Run workflow"** dropdown
3. Select your feature branch
4. Choose test suite: **"soft"**
5. Click **"Run workflow"**

**What to Check:**
- ✅ Workflow starts and runs all steps
- ✅ Environment variables are set correctly
- ✅ Testnet .env files are created
- ✅ Build completes successfully
- ✅ Playwright browsers install
- ✅ Soft tests execute (may pass or fail - that's OK for now)
- ✅ Artifacts are uploaded

**Expected Duration:** ~15-30 minutes

### 3.2 Review Workflow Logs

After the run completes:

1. Click on the workflow run
2. Expand each step and review logs:
   - **Create testnet .env file**: Verify correct values
   - **Build production for testnet**: Check for build errors
   - **Run soft E2E tests**: Check test output

**Key Things to Verify:**
```
# In logs, look for:
VITE_FUEL_CHAIN_NAME=fuelTestnet ✅
FUEL_PROVIDER_URL=https://testnet.fuel.network/v1/graphql ✅
E2E_TARGET_ENV=testnet ✅
```

### 3.3 Download and Review Test Artifacts

1. Scroll to bottom of workflow run page
2. Download **testnet-soft-report-XXX** artifact
3. Extract and open `playwright-report/index.html`
4. Review test results:
   - Which tests passed/failed
   - Screenshots of failures
   - Traces for debugging

### 3.4 Test Failure Notification (Important!)

**Goal:** Verify that GitHub Issues are created on failure

**Option A: Force a Failure (Recommended)**

Temporarily modify the workflow to force a failure:

```yaml
# In .github/workflows/testnet-e2e-cron.yml
- name: Run soft E2E tests
  run: |
    pnpm test:e2e-soft
    exit 1  # Force failure for testing
```

Then:
1. Commit and push this change
2. Run workflow manually with "soft" tests
3. Wait for it to fail
4. Check **Issues** tab for auto-created issue
5. Verify issue contains:
   - ✅ Workflow run link
   - ✅ Failed job name
   - ✅ Possible causes
   - ✅ Next steps
   - ✅ Labels: `e2e-failure`, `testnet`, `automated`

**Option B: Wait for Natural Failure**

If you prefer not to force a failure, wait for the first scheduled run and check if tests fail naturally. Then verify the issue creation.

**After Testing:**
- Remove the `exit 1` line
- Commit and push

### 3.5 Test Hard Tests (Manual Trigger Only)

**Prerequisites:**
- ⚠️ **Requires funded testnet wallets** (skip if not ready)
- Secrets must be configured (see below)

**If Prerequisites Met:**

1. Add these GitHub secrets in repository settings:
   - `E2E_TESTNET_ETH_MNEMONIC`
   - `E2E_TESTNET_FUEL_MNEMONIC`
   - `E2E_TESTNET_ETH_PASSWORD`
   - `SEPOLIA_RPC_URL`

2. Run workflow with test suite: **"hard"**

3. Monitor for:
   - ✅ MetaMask setup completes
   - ✅ Browser args applied (check for `--no-sandbox` in logs)
   - ✅ 30-second initial wait in CI
   - ✅ MetaMask import retry logic works
   - ✅ Network switching skipped for testnet
   - ✅ Tests execute against testnet

**Note:** Hard tests may fail if wallets lack funds or contracts are outdated. This is expected for initial testing.

---

## Phase 4: Verify CI Enhancements

### 4.1 Check CI Stabilization Features

Review the fixture code is being used correctly:

**In workflow logs, verify:**
```
# Browser args should include:
--no-sandbox ✅
--disable-gpu ✅
--disable-dev-shm-usage ✅

# Initial wait should be 30 seconds in CI
# (Check timestamp difference between browser launch and next step)
```

### 4.2 Verify Network Switching Logic

**In fixture setup logs, check for:**
```
# For testnet:
"Skipping MetaMask network switch (testnet detected)" ✅

# For local:
"Switching MetaMask to localhost" ✅
```

### 4.3 Test MetaMask Retry Logic

The retry logic will only be visible if MetaMask import fails initially:

```
# If retry occurs, logs should show:
"MetaMask import attempt 1 failed, retrying..." ✅
"MetaMask import attempt 2 failed, retrying..." ✅
```

If all attempts succeed on first try, you won't see retry logs (which is good!).

---

## Test Checklist

Use this checklist to track your testing progress:

### ✅ Pre-Merge Testing Checklist

**Local Environment:**
- [ ] Environment detection works (local vs testnet)
- [ ] Provider URL changes based on environment
- [ ] Ethereum chain detection works (foundry vs sepolia)
- [ ] Mocks respect environment variable overrides
- [ ] Soft tests can run locally against testnet (optional)

**Workflow Validation:**
- [ ] Workflow appears in GitHub Actions
- [ ] No security alerts from Advanced Security bot
- [ ] Workflow has correct `permissions:` block

**Manual Trigger - Soft Tests:**
- [ ] Workflow runs successfully
- [ ] Testnet environment variables are set
- [ ] Build completes without errors
- [ ] Soft tests execute
- [ ] Artifacts are uploaded correctly

**Failure Notification:**
- [ ] GitHub issue is created on failure
- [ ] Issue contains workflow run link
- [ ] Issue has correct labels
- [ ] Issue body is formatted correctly
- [ ] Issue provides debugging instructions

**CI Enhancements:**
- [ ] Browser args include `--no-sandbox`, `--disable-gpu`, `--disable-dev-shm-usage`
- [ ] 30-second initial wait in CI
- [ ] MetaMask retry logic present (check code)
- [ ] Network switching skipped for testnet
- [ ] Additional 10s wait after MetaMask setup in CI

**Optional - Hard Tests:**
- [ ] Secrets configured in repository
- [ ] Hard tests can be triggered manually
- [ ] MetaMask setup completes
- [ ] Tests connect to testnet correctly
- [ ] Bridge tests execute (pass/fail is OK for now)

---

## Troubleshooting

### Issue: Workflow doesn't appear in GitHub Actions

**Solution:** Check YAML syntax
```bash
# Install yamllint
pip install yamllint

# Validate workflow file
yamllint .github/workflows/testnet-e2e-cron.yml
```

### Issue: Tests fail with "PROVIDER_URL not defined"

**Solution:** Verify environment variables are set in workflow:
```yaml
env:
  VITE_FUEL_CHAIN_NAME: fuelTestnet
  FUEL_PROVIDER_URL: https://testnet.fuel.network/v1/graphql
  E2E_TARGET_ENV: testnet
```

### Issue: MetaMask network switching fails

**Check:**
1. Verify `isTestnet` detection in fixtures
2. Ensure Sepolia is configured in MetaMask
3. Check network switching logic doesn't run for testnet

### Issue: Tests timeout in CI

**Solution:** Increase timeouts in `playwright.config.testnet.ts`:
```typescript
timeout: 60_000 * 20,  // 20 minutes
expect: { timeout: 20_000 }, // 20 seconds
```

### Issue: No GitHub issue created on failure

**Check:**
1. `create-issue-on-failure` job has `permissions: issues: write`
2. Job dependency: `needs: [testnet-e2e-soft]`
3. Condition: `if: always() && needs.testnet-e2e-soft.result == 'failure'`

---

## Success Criteria

Before merging, ensure:

✅ **All local tests pass**
✅ **Workflow runs successfully on feature branch**
✅ **Manual trigger works for soft tests**
✅ **Failure notification creates GitHub issue**
✅ **CI stabilization features are working**
✅ **No security alerts**
✅ **Documentation is clear and complete**

---

## Next Steps After Testing

Once all tests pass:

1. **Review PR** - Have team review the implementation
2. **Merge to main** - Merge your feature branch
3. **Monitor first scheduled run** - Watch the first cron execution
4. **Fund wallets (Phase 2)** - When ready, fund testnet wallets for hard tests
5. **Enable hard tests** - Remove `if` condition from `testnet-e2e-hard` job

---

## Questions or Issues?

If you encounter problems during testing:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review workflow logs carefully
3. Test locally to isolate issues
4. Create a GitHub discussion for team input

Happy testing! 🚀
