---
title: Orion Lakehouse Architecture
description: How Orion delivers zero-lag Stellar Pubnet queries backed by Cloudflare R2 Parquet storage and live RPC state overlay.
---

# Orion Lakehouse Architecture

Orion decouples historical storage from live ledger ingestion by combining a **Cloudflare R2 Apache Parquet Lakehouse** with a **Real-Time XDR Decoder & State Overlay Engine**.

```
                       +-------------------------------------------+
                       |      Cloudflare Global Edge Network       |
                       |   https://pubnet.stellarchain.io ( API )  |
                       |   https://orion.stellarchain.io  ( Docs ) |
                       +---------------------+---------------------+
                                             |
                                             v
                       +-------------------------------------------+
                       |     Multi-Region Active-Active Cluster    |
                       |  - Live RPC Poller (0s lag at tip)        |
                       |  - XDR Decoder (19 history families)      |
                       |  - Stats Reducer (12 statistics families) |
                       |  - Live Account & Trustline State Overlay |
                       +---------------------+---------------------+
                                             |
                                             v
                       +-------------------------------------------+
                       |        Cloudflare R2 Parquet Lakehouse    |
                       |  - Immutable Parquet Partitions           |
                       |  - History v5 (Ledgers 3 .. Live Tip)     |
                       |  - Statistics v1 (47 Network Metrics)     |
                       +-------------------------------------------+
```

## Key Architectural Guarantees

1. **Zero-Lag Tip Parity (`orion.live: true`):** Every closed Stellar ledger is decoded in memory within milliseconds of closure and streamed into Cloudflare R2 as immutable Parquet partitions.
2. **Full Genesis-to-Tip History (`Ledgers 3 .. Live Tip`):** Historical queries seamlessly read byte-range slices from Cloudflare R2 Parquet files, while recent ledgers are served directly from the in-memory ring buffer.
3. **47 Real-Time Statistics Metrics (`/statistics`):** Every ledger updates 12 Parquet statistics families (`core`, `account-windows`, `account-activity`, `failure-codes`, `contract-functions`, `asset-transfers`, `payment-corridors`, `payment-participants`, `stablecoin-transfers`, `market-daily`, `market-liquidity`, `storage-mutations`).
