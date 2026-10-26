---
title: Live Network Statistics (/v3/statistics)
description: 47 real-time and historical Stellar network metrics backed by 12 Parquet families in Cloudflare R2.
---

# Live Network Statistics (`/v3/statistics`)

Orion continuously reduces every closed Stellar ledger into **12 Parquet statistics families** (`core`, `account-windows`, `account-activity`, `failure-codes`, `contract-functions`, `asset-transfers`, `payment-corridors`, `payment-participants`, `stablecoin-transfers`, `market-daily`, `market-liquidity`, `storage-mutations`) plus `native_ledger_summary.parquet` and publishes them to Cloudflare R2 (`history/v5/_derived/statistics/`).

## Discovery Endpoint

- `GET https://pubnet.stellarchain.io/v3/statistics` — Returns all **47 metric definitions**, supported granularities (`ledger`, `5m`, `1h`, `1d`), required filters, and the live coverage window.

## 47 Available Metrics (`GET /v3/statistics/{metric}`)

| Category | Metrics |
| :--- | :--- |
| **Ledger & Throughput** | `ledger-close-latency`, `transactions`, `operations`, `soroban-Invocation-throughput` |
| **Fees & Soroban Resources** | `total-charged-fees`, `inclusion-fees`, `resource-fees`, `soroban-cpu-instructions`, `soroban-read-bytes`, `soroban-write-bytes`, `soroban-read-entries`, `soroban-write-entries`, `soroban-tx-byte-size` |
| **Accounts & Activity** | `active-accounts`, `active-accounts-24h`, `active-accounts-7d`, `active-accounts-30d`, `accounts-created`, `accounts-merged`, `net-account-growth`, `account-activity` (`?account=G...`) |
| **Payments & Corridors** | `native-xlm-payment-volume`, `issued-asset-payment-volume` (`?asset=CODE:ISSUER`), `direct-payments` (`?asset=`), `path-payments` (`?asset=`), `payment-corridors` (`?corridor=A->B`), `payment-senders` (`?asset=`), `payment-receivers` (`?asset=`), `stablecoin-transfer-volume` |
| **SDEX & Liquidity Pools** | `dex-trade-count` (`?pair=A/B`), `dex-volume` (`?pair=A/B`), `liquidity-pool-trade-volume` (`?pool=ID`), `liquidity-pool-tvl` (`?pool=ID`), `orderbook-spread` (`?pair=A/B`), `top-of-book-depth` (`?pair=A/B`), `offer-churn` (`?pair=A/B`) |
| **Soroban Smart Contracts** | `contract-invocations`, `unique-contracts-invoked`, `contract-subcall-count`, `contract-events-emitted`, `contract-function-calls` (`?contract=C...&function=fn`) |
| **State & Failure Codes** | `state-creations`, `state-updates`, `state-deletions`, `state-restores`, `transaction-failure-codes`, `operation-failure-codes` |
