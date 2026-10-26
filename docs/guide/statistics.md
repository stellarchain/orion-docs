---
title: Live Network Statistics (/statistics)
description: 47 real-time and historical Stellar network metrics backed by 12 Parquet families in Cloudflare R2.
---

# Live Network Statistics (`/statistics`)

Orion continuously reduces every closed Stellar ledger into **12 Parquet statistics families** (`core`, `soroban`, `Soroban`, `fees`, `dex`, `stablecoins`, `corridors`, `trustlines`, `FailureCodes`, `ContractFunctions`, `ContractStorage`, `account-activity`) plus `native_ledger_summary.parquet` and publishes them to Cloudflare R2 (`history/v5/_derived/statistics/`).

## Discovery & Query Endpoints

- **`GET https://pubnet.stellarchain.io/statistics`** — Returns all **47 metric definitions**, supported granularities (`1d`, `1w`, `1mo`, `1q`), dimension schemas, and the live UTC coverage window.
- **`GET https://pubnet.stellarchain.io/statistics/{metric_id}?start=...&end=...&granularity=1d&limit=...`** — Queries a specific metric across UTC calendar buckets (`1d`, `1w`, `1mo`, `1q`) with optional `dimension[name]=value` filters.

### Example Query

```bash
# Discover all 47 metrics and current coverage window
curl -s "https://pubnet.stellarchain.io/statistics" | jq .

# Query daily-active-accounts
curl -s "https://pubnet.stellarchain.io/statistics/daily-active-accounts?start=2026-10-26T00:00:00Z&end=2026-10-27T00:00:00Z&granularity=1d&limit=1" | jq .
```

---

## All 47 Available Metrics (`GET /statistics/{metric_id}`)

| Category | Metrics (`metric_id`) |
| :--- | :--- |
| **Accounts & Retention** | `daily-active-accounts`, `weekly-active-accounts`, `monthly-active-accounts`, `returning-accounts`, `reactivated-accounts`, `account-stickiness`, `seven-day-account-retention`, `thirty-day-account-retention` |
| **Soroban Smart Contracts** | `active-contracts`, `unique-contract-callers`, `contract-events`, `contract-function-activity` (`contract_id`, `function_name`), `contract-instructions`, `contract-read-bytes`, `contract-write-bytes`, `contract-storage-mutations` (`contract_id`, `durability`), `contract-success-rate`, `failed-contract-calls`, `soroban-resource-fees` |
| **Payments & Stablecoins** | `direct-payments`, `path-payments`, `path-payment-share`, `unique-payment-senders`, `unique-payment-receivers`, `transferred-value-by-asset` (`asset`), `asset-payment-corridors` (`source_asset`, `destination_asset`), `stablecoin-transfer-volume` (`asset`), `stablecoin-transfer-count` (`asset`) |
| **SDEX & Markets** | `active-markets`, `filled-dex-trades`, `dex-base-volume` (`base_asset`, `counter_asset`), `dex-quote-volume` (`base_asset`, `counter_asset`), `dex-vwap` (`base_asset`, `counter_asset`), `dex-liquidity` (`base_asset`, `counter_asset`) |
| **Assets & Trustlines** | `active-assets`, `net-trustline-growth` (`asset`), `trustline-removals` (`asset`) |
| **Fees, Capacity & Reliability** | `inclusion-fees`, `resource-fee`, `fee-concentration`, `fee-p50`, `fee-p90`, `fee-p95`, `fee-p99`, `ledger-capacity-utilization`, `peak-ledger-capacity`, `failure-code-distribution` (`result_code`) |
