---
title: Getting Started with Orion
description: High-performance Stellar Pubnet Horizon + /v3 Analytics + Soroban RPC API at pubnet.stellarchain.io.
---

# Getting Started with Orion

**Orion** (`https://pubnet.stellarchain.io`) is a high-availability Stellar Pubnet API and historical analytics engine built on a **Cloudflare R2 Parquet Lakehouse (Ledgers `3` to Live Tip)** + **Real-Time Stellar RPC Ingestion Engine**.

## Base URLs

| Service | Base URL | Description |
| :--- | :--- | :--- |
| **Orion Pubnet API** | `https://pubnet.stellarchain.io` | Full Horizon API + Orion `/v3` Analytics API + `/rpc` JSON-RPC 2.0 |
| **Documentation & Errors** | `https://orion.stellarchain.io` | Official RFC 7807 Error Reference (`/horizon-errors` & `/problems`) & Guides |

## Quick Start Examples

::: code-group

```bash [cURL]
# 1. Root Horizon discovery & live ledger status
curl -s "https://pubnet.stellarchain.io/" | jq '{history_latest_ledger, core_latest_ledger, orion}'

# 2. Fetch operations for any historical or live ledger
curl -s "https://pubnet.stellarchain.io/ledgers/65149988/operations?limit=5" | jq .

# 3. Query live network statistics (47 pre-aggregated metrics)
curl -s "https://pubnet.stellarchain.io/v3/statistics/active-accounts-24h" | jq .
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

// Fetch latest ledgers
const ledgers = await server.ledgers().order('desc').limit(5).call();
console.log('Latest ledger:', ledgers.records[0].sequence);
```

```python [Python (stellar-sdk)]
from stellar_sdk import Server

server = Server(horizon_url="https://pubnet.stellarchain.io")
account = server.accounts().account_id("GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2ER7LBNVKOCCWN7").call()
print("Sequence:", account["sequence"])
```

:::
