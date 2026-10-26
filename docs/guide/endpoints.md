---
title: Endpoints Reference
description: Complete list of Horizon REST/SSE, /statistics, /contracts/{id}/events, and /rpc endpoints served at https://pubnet.stellarchain.io.
---

# Endpoints Reference

Orion provides 100% drop-in compatibility with Stellar Horizon (`/` root discovery and all HAL+JSON `_links` relations) plus unversioned network analytics (`/statistics`), lossless Soroban contract events (`/contracts/{contract_id}/events`), and Protocol 30 Soroban JSON-RPC 2.0 (`/rpc`).

## Horizon & Core Endpoints (`https://pubnet.stellarchain.io`)

| Endpoint | Description |
| :--- | :--- |
| `GET /` | Root discovery document (`_links`, `history_latest_ledger`, `orion.live`) |
| `GET /statistics` | Network statistics catalog (47 metrics, coverage, snapshot digest) |
| `GET /statistics/{metric_id}` | Time-series and dimensional query for any of the 47 network metrics |
| `GET /contracts/{contract_id}/events` | Lossless deployment-to-tip Soroban contract event history |
| `POST /rpc` | Soroban JSON-RPC 2.0 (`getHealth`, `getLatestLedger`, `getEvents`, `getLedgerEntries`, `simulateTransaction`, `sendTransaction`, etc.) |
| `GET /ledgers` | List ledgers (`?cursor=&limit=&order=asc\|desc`) |
| `GET /ledgers/{sequence}` | Single ledger details (Genesis `#3` through Live Tip) |
| `GET /ledgers/{sequence}/transactions` | Transactions in a ledger |
| `GET /ledgers/{sequence}/operations` | Operations in a ledger |
| `GET /ledgers/{sequence}/payments` | Payment operations in a ledger |
| `GET /ledgers/{sequence}/effects` | Effects in a ledger |
| `GET /transactions` | List transactions (`?cursor=&limit=&order=&include_failed=`) |
| `GET /transactions/{hash}` | Single transaction by 64-hex SHA-256 hash |
| `GET /transactions/{hash}/operations` | Operations in a transaction |
| `GET /transactions/{hash}/payments` | Payments in a transaction |
| `GET /transactions/{hash}/effects` | Effects in a transaction |
| `POST /transactions` | Submit signed transaction XDR synchronously |
| `POST /transactions_async` | Submit signed transaction XDR asynchronously |
| `GET /operations` | List operations (`?cursor=&limit=&order=&include_failed=`) |
| `GET /operations/{id}` | Single operation by TotalOrderID |
| `GET /operations/{id}/effects` | Effects for a single operation |
| `GET /payments` | List payment-family operations |
| `GET /effects` | List effects (`?cursor=&limit=&order=`) |
| `GET /accounts` | Filter accounts (`?signer=`, `?sponsor=`, `?asset=`, or `?liquidity_pool=`) |
| `GET /accounts/{account_id}` | Single account with live RPC state overlay (`sequence`, `balances`, `signers`) |
| `GET /accounts/{account_id}/transactions` | Transactions for an account |
| `GET /accounts/{account_id}/operations` | Operations for an account |
| `GET /accounts/{account_id}/payments` | Payments for an account |
| `GET /accounts/{account_id}/effects` | Effects for an account |
| `GET /accounts/{account_id}/offers` | Open SDEX offers for an account |
| `GET /accounts/{account_id}/trades` | Trades involving an account |
| `GET /accounts/{account_id}/data/{key}` | Account data entry value |
| `GET /assets` | List issued assets (`?asset_code=&asset_issuer=&cursor=&limit=&order=`) |
| `GET /offers` | List active SDEX offers (`?seller=&selling=&buying=`) |
| `GET /offers/{offer_id}` | Single SDEX offer by ID |
| `GET /trades` | List SDEX and liquidity pool trades |
| `GET /trade_aggregations` | OHLCV candlestick trade aggregations |
| `GET /order_book` | Current SDEX order book depth (`bids` and `asks`) |
| `GET /paths/strict-receive` | Find optimal payment paths for a fixed destination amount |
| `GET /paths/strict-send` | Find optimal payment paths for a fixed source amount |
| `GET /claimable_balances` | List claimable balances (`?asset=&sponsor=&claimant=`) |
| `GET /claimable_balances/{id}` | Single claimable balance by ID |
| `GET /liquidity_pools` | List AMM liquidity pools (`?reserves=&account=`) |
| `GET /liquidity_pools/{id}` | Single AMM liquidity pool plus `/trades`, `/transactions`, `/operations`, `/effects` |
| `GET /fee_stats` | Live network fee statistics (`fee_charged` and `max_fee` percentiles) |
