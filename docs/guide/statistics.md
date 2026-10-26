---
title: Live Network Statistics (/statistics)
description: 47 real-time and historical Stellar network metrics served in Horizon HAL+JSON format.
---

# Live Network Statistics (`/statistics`)

Orion serves **47 real-time and historical Stellar network metrics** using the exact same **Horizon REST + HAL+JSON** conventions (`_links`, `_embedded.records`, `paging_token`, `cursor`, `limit`, `order`) as `/ledgers`, `/transactions`, and `/operations`.

## Endpoints

- **`GET https://pubnet.stellarchain.io/statistics`** — Returns a HAL+JSON collection (`_embedded.records`) of all **47 available metrics**, their units, supported granularities (`1d`, `1w`, `1mo`, `1q`), dimensions, and templated `_links.self` URLs.
- **`GET https://pubnet.stellarchain.io/statistics/{metric_id}{?cursor,limit,order,granularity}`** — Returns a paginated HAL+JSON time-series (`_embedded.records`) with `_links.self`, `_links.next`, and `_links.prev`.

### Query Parameters (`GET /statistics/{metric_id}`)

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `cursor` | *(latest UTC day)* | ISO-8601 timestamp or `YYYY-MM-DD` `paging_token` from the previous page |
| `limit` | `10` | Number of time buckets to return (`1` to `5000`) |
| `order` | `desc` | Sort order (`desc` or `asc`) |
| `granularity` | `1d` | Bucket size (`1d`, `1w`, `1mo`, `1q`) |
| `<dimension>` | *(optional)* | Direct dimension filter (e.g., `?asset=native` or `?result_code=tx_bad_seq`) |

### Example Requests & Responses

```bash
# 1. List all 47 statistics metrics (HAL+JSON)
curl -s "https://pubnet.stellarchain.io/statistics" | jq .

# 2. Query daily-active-accounts (defaults to latest 10 days, order=desc)
curl -s "https://pubnet.stellarchain.io/statistics/daily-active-accounts?limit=3&order=desc" | jq .
```

```json
{
  "_links": {
    "self": {
      "href": "https://pubnet.stellarchain.io/statistics/daily-active-accounts?granularity=1d&limit=3&order=desc"
    },
    "next": {
      "href": "https://pubnet.stellarchain.io/statistics/daily-active-accounts?cursor=2026-10-24T00:00:00Z&granularity=1d&limit=3&order=desc"
    },
    "prev": {
      "href": "https://pubnet.stellarchain.io/statistics/daily-active-accounts?cursor=2026-10-26T00:00:00Z&granularity=1d&limit=3&order=asc"
    }
  },
  "_embedded": {
    "records": [
      {
        "id": "daily-active-accounts:2026-10-26T00:00:00Z",
        "paging_token": "2026-10-26T00:00:00Z",
        "timestamp": "2026-10-26T00:00:00Z",
        "metric": "daily-active-accounts",
        "unit": "accounts",
        "granularity": "1d",
        "value": "48210"
      }
    ]
  }
}
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
