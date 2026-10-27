---
title: Live Network Statistics (/statistics)
description: 47 real-time and historical Stellar network metrics organized into 7 plural REST categories in Horizon HAL+JSON format.
---

# Live Network Statistics (`/statistics`)

Orion serves **47 real-time and historical Stellar network metrics** organized into **7 plural REST category resources** (`accounts`, `assets`, `payments`, `contracts`, `markets`, `fees`, `ledgers`), following **Horizon HAL+JSON** and modern **HTTP API Design** best practices (plural nouns, `kebab-case` URL paths, `snake_case` JSON properties, string big-integers, `ETag` conditional caching, and sparse fieldsets).

## Resource Hierarchy

1. **Top-Level Discovery (`GET /statistics`)**
   Returns links to all 7 category collections plus `_embedded.records` describing all 47 metrics (`category`, `metric`, `key`, `unit`, `granularities`, `dimensions`). Supports `?category=contracts` filtering.
2. **Category Time-Series (`GET /statistics/{category}`)**
   Returns a paginated HAL+JSON time-series of unified daily (or `1w`, `1mo`, `1q`) records for that domain (`accounts`, `assets`, `payments`, `contracts`, `markets`, `fees`, `ledgers`), with all metrics for that category returned as simplified `snake_case` keys on a single record. Supports `?fields=active,events` sparse fieldsets.
3. **Individual Metric Time-Series (`GET /statistics/{category}/{metric}`)**
   Returns a paginated HAL+JSON time-series for a single metric or dimensional breakdown (e.g., `GET /statistics/assets/active`, `GET /statistics/markets/active`, `GET /statistics/contracts/active`, `GET /statistics/contracts/functions`, `GET /statistics/accounts/active`).

---

## Query Parameters

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `cursor` / `after` / `before` | *(latest UTC day)* | ISO-8601 timestamp or `YYYY-MM-DD` `paging_token` from the previous page |
| `limit` | `10` | Number of time buckets to return (`1` to `5000`) |
| `order` | `desc` | Reverse-chronological (`desc`) or chronological (`asc`) |
| `granularity` | `1d` | Bucket size (`1d`, `1w`, `1mo`, `1q`) |
| `fields` | *(all category fields)* | Comma-separated sparse fieldset on `/statistics/{category}` (e.g., `?fields=active,events`) |
| `<dimension>` | *(optional)* | Singular dimension filter with comma-separated `OR` support (e.g., `?asset=native` or `?code=tx_failed,tx_bad_seq`) |

---

## Example Requests & Responses

### 1. Single Metric (`GET /statistics/assets/active`)

```bash
curl -s "https://pubnet.stellarchain.io/statistics/assets/active?limit=2&order=desc"
```

```json
{
  "_links": {
    "category": {
      "href": "https://pubnet.stellarchain.io/statistics/assets?granularity=1d&limit=2&order=desc"
    },
    "next": {
      "href": "https://pubnet.stellarchain.io/statistics/assets/active?cursor=2026-10-25T00:00:00Z&granularity=1d&limit=2&order=desc"
    },
    "prev": {
      "href": "https://pubnet.stellarchain.io/statistics/assets/active?cursor=2026-10-26T00:00:00Z&granularity=1d&limit=2&order=asc"
    },
    "self": {
      "href": "https://pubnet.stellarchain.io/statistics/assets/active?granularity=1d&limit=2&order=desc"
    }
  },
  "_embedded": {
    "records": [
      {
        "category": "assets",
        "granularity": "1d",
        "id": "assets/active:2026-10-26T00:00:00Z",
        "metric": "active",
        "paging_token": "2026-10-26T00:00:00Z",
        "timestamp": "2026-10-26T00:00:00Z",
        "unit": "assets",
        "value": "4182"
      }
    ]
  }
}
```

### 2. Category Resource with Sparse Fieldsets (`GET /statistics/contracts?fields=active,callers,events`)

```bash
curl -s "https://pubnet.stellarchain.io/statistics/contracts?fields=active,callers,events&limit=1"
```

```json
{
  "_links": {
    "self": {
      "href": "https://pubnet.stellarchain.io/statistics/contracts?granularity=1d&limit=1&order=desc"
    },
    "index": {
      "href": "https://pubnet.stellarchain.io/statistics"
    }
  },
  "_embedded": {
    "records": [
      {
        "id": "contracts:2026-10-26T00:00:00Z",
        "paging_token": "2026-10-26T00:00:00Z",
        "timestamp": "2026-10-26T00:00:00Z",
        "category": "contracts",
        "granularity": "1d",
        "active": "1240",
        "callers": "8412",
        "events": "512093"
      }
    ]
  }
}
```

---

## All 7 Categories & 47 Simplified Metric Endpoints

| Category Endpoint | Metric Endpoints (`/statistics/{category}/{metric}`) | JSON Keys on `/statistics/{category}` |
| :--- | :--- | :--- |
| **`/statistics/accounts`** | `/statistics/accounts/active`<br>`/statistics/accounts/weekly-active`<br>`/statistics/accounts/monthly-active`<br>`/statistics/accounts/returning`<br>`/statistics/accounts/reactivated`<br>`/statistics/accounts/stickiness`<br>`/statistics/accounts/retention-7d`<br>`/statistics/accounts/retention-30d` | `active`, `weekly_active`, `monthly_active`, `returning`, `reactivated`, `stickiness`, `retention_7d`, `retention_30d` |
| **`/statistics/assets`** | `/statistics/assets/active`<br>`/statistics/assets/transferred-value` (`asset`)<br>`/statistics/assets/corridors` (`source_asset`, `destination_asset`)<br>`/statistics/assets/trustline-growth`<br>`/statistics/assets/trustline-removals`<br>`/statistics/assets/stablecoin-transfers` (`asset`)<br>`/statistics/assets/stablecoin-volume` (`asset`) | `active`, `transferred_value`, `corridors`, `trustline_growth`, `trustline_removals`, `stablecoin_transfers`, `stablecoin_volume` |
| **`/statistics/payments`** | `/statistics/payments/direct`<br>`/statistics/payments/path`<br>`/statistics/payments/path-share`<br>`/statistics/payments/senders`<br>`/statistics/payments/receivers` | `direct`, `path`, `path_share`, `senders`, `receivers` |
| **`/statistics/contracts`** | `/statistics/contracts/active`<br>`/statistics/contracts/callers`<br>`/statistics/contracts/functions` (`contract_id`, `function_name`)<br>`/statistics/contracts/events`<br>`/statistics/contracts/success-rate`<br>`/statistics/contracts/failed-calls`<br>`/statistics/contracts/instructions`<br>`/statistics/contracts/read-bytes`<br>`/statistics/contracts/write-bytes`<br>`/statistics/contracts/storage-mutations` (`durability`, `change_type`)<br>`/statistics/contracts/resource-fees` | `active`, `callers`, `functions`, `events`, `success_rate`, `failed_calls`, `instructions`, `read_bytes`, `write_bytes`, `storage_mutations`, `resource_fees` |
| **`/statistics/markets`** | `/statistics/markets/active`<br>`/statistics/markets/trades`<br>`/statistics/markets/base-volume` (`base_asset`, `counter_asset`)<br>`/statistics/markets/quote-volume` (`base_asset`, `counter_asset`)<br>`/statistics/markets/vwap` (`base_asset`, `counter_asset`)<br>`/statistics/markets/liquidity` (`venue`, `market_id`, `base_asset`, `counter_asset`) | `active`, `trades`, `base_volume`, `quote_volume`, `vwap`, `liquidity` |
| **`/statistics/fees`** | `/statistics/fees/inclusion`<br>`/statistics/fees/resource`<br>`/statistics/fees/concentration`<br>`/statistics/fees/p50`<br>`/statistics/fees/p90`<br>`/statistics/fees/p95`<br>`/statistics/fees/p99` | `inclusion`, `resource`, `concentration`, `p50`, `p90`, `p95`, `p99` |
| **`/statistics/ledgers`** | `/statistics/ledgers/capacity-utilization`<br>`/statistics/ledgers/peak-capacity`<br>`/statistics/ledgers/failure-codes` (`code`) | `capacity_utilization`, `peak_capacity`, `failure_codes` |
