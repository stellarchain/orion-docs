---
title: Soroban Contracts API (/contracts)
description: Horizon-compatible HAL+JSON REST API for all Stellar Soroban WASM and Stellar Asset Contracts (/contracts and /contracts/{contract_id}/*).
---

# Soroban Contracts API (`/contracts`)

Orion extends the classic Stellar Horizon resource model (`GET /accounts/{account_id}/*`) to **Soroban smart contracts** (`C...` StrKeys), providing a complete catalog of all contracts ever deployed on Stellar alongside per-contract sub-resources for transactions, operations, payments, effects, events, instance/persistent/temporary storage data, and WASM bytecode.

---

## Resource Hierarchy

| Endpoint | Description |
| :--- | :--- |
| `GET /contracts` | Paginated HAL+JSON catalog of **all contracts ever deployed** on Stellar (`125,000+` WASM & Stellar Asset Contracts) |
| `GET /contracts/{contract_id}` | Single contract resource (metadata, WASM hash/size or Stellar Asset bindings, TTL, decoded instance storage, activity counts) |
| `GET /contracts/{contract_id}/transactions` | Paginated HAL+JSON list of transactions involving `{contract_id}` |
| `GET /contracts/{contract_id}/operations` | Paginated HAL+JSON list of operations involving `{contract_id}` |
| `GET /contracts/{contract_id}/payments` | Paginated HAL+JSON list of payment / token transfer operations involving `{contract_id}` |
| `GET /contracts/{contract_id}/effects` | Paginated HAL+JSON list of ledger effects involving `{contract_id}` |
| `GET /contracts/{contract_id}/invocations` | Paginated HAL+JSON list of Soroban host function invocations (`function_name`, `source_account`, `transaction_hash`, `successful`, `parameters`) |
| `GET /contracts/{contract_id}/events` | Paginated HAL+JSON list of Soroban contract events emitted by `{contract_id}` with decoded `topics_decoded` and `value_decoded` |
| `GET /contracts/{contract_id}/data` | Paginated HAL+JSON list of contract instance storage entries |
| `GET /contracts/{contract_id}/data/{key}` | Single contract storage entry by symbolic key name (e.g., `METADATA`) or base64 `ScVal` XDR (`?durability=persistent\|temporary`) |
| `GET /contracts/{contract_id}/code` | Contract WASM bytecode, parsed `functions` interface (`contractspecv0` & WASM exports), and `wasm_seen_count` |

---

## 1. List All Contracts (`GET /contracts`)

Returns a cursor-paginated HAL+JSON collection of all contracts indexed from the ledger state and historical archive, enriched with 24-hour network invocation rollups (`invocations_24h`, `unique_callers_24h`, `failed_invocations_24h`, `success_rate_24h_bps`, `top_functions_24h`).

### Query Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `cursor` | `string` | `""` | Stellar Contract ID (`C...` StrKey) paging token |
| `limit` | `integer` | `10` | Number of records to return (`1..200`) |
| `order` | `string` | `asc` | Sort order (`asc` or `desc`) |
| `sort` | `string` | `""` | Sort by `invocations_24h`, `change_24h`, `failure_rate_24h`, or `created_ledger` |
| `search` / `q` | `string` | `""` | Substring filter matching Contract ID, WASM hash, or asset |
| `executable_type` | `string` | — | Filter by executable type: `wasm` or `stellar_asset` |
| `wasm_hash` | `string` | — | Filter WASM contracts by 64-character lowercase hex SHA-256 WASM hash |
| `asset` | `string` | — | Filter Stellar Asset Contracts (SAC) by canonical asset (`native` or `CODE:ISSUER`) |
| `fields` | `string` | — | Comma-separated sparse fieldset (e.g., `fields=executable_type,wasm_hash,last_modified_ledger`) |

### Example Requests

```bash
# List contracts (default ascending order)
curl -s "https://pubnet.stellarchain.io/contracts?limit=5&order=asc"

# Filter only Stellar Asset Contracts (SAC)
curl -s "https://pubnet.stellarchain.io/contracts?executable_type=stellar_asset&limit=5"

# Lookup the Stellar Asset Contract for native XLM
curl -s "https://pubnet.stellarchain.io/contracts?asset=native"

# Find all contracts sharing a specific WASM bytecode hash
curl -s "https://pubnet.stellarchain.io/contracts?wasm_hash=23f35b7fb7fb8ff5f8fb33349f47b82da8b9c23f66e649f7b72bf06c2181f497"
```

---

## 2. Single Contract (`GET /contracts/{contract_id}`)

Mirrors `GET /accounts/{account_id}` for a Soroban contract, enriching the catalog baseline with live Soroban RPC `getLedgerEntries` (`ContractInstance` + `LedgerKeyTtl`) so `last_modified_ledger`, `live_until_ledger`, `archived`, and `instance_storage` are always up to date at the live ledger tip.

```bash
curl -s "https://pubnet.stellarchain.io/contracts/CAS3J7GYLGXMF6TDJBBYYSE3HQ6BBSMLNUQ34T6TZMYMW2EVH34XOWMA"
```

---

## 3. Contract Activity Sub-Resources

Every contract exposes Horizon-compatible sub-collections using standard `cursor`, `limit` (`1..200`), and `order` (`asc` or `desc`) parameters:

- **`GET /contracts/{contract_id}/transactions`** — Supports `include_failed=true|false`.
- **`GET /contracts/{contract_id}/operations`** — Supports `include_failed=true|false` and `join=transactions`.
- **`GET /contracts/{contract_id}/payments`** — Payment and Soroban host function invocation operations for the contract.
- **`GET /contracts/{contract_id}/effects`** — Ledger effects scoped to transactions involving the contract.
- **`GET /contracts/{contract_id}/invocations`** — Decoded Soroban host function invocations (`?function=`, `?include_failed=true|false`) with `function_name`, `source_account`, `transaction_hash`, `successful`, and `parameters`.
- **`GET /contracts/{contract_id}/events`** — Soroban contract and system events with both raw base64 XDR (`topic_xdr`, `value_xdr`) and human-readable decoded JSON (`topics_decoded`, `value_decoded`).

---

## 4. Contract Storage, Interface & Bytecode (`/data`, `/data/{key}`, `/code`)

- **`GET /contracts/{contract_id}/data`** — Returns all key-value entries in the contract's `ContractInstance` storage with decoded JSON (`key`, `val`) and canonical base64 XDR (`key_xdr`, `val_xdr`).
- **`GET /contracts/{contract_id}/data/{key}`** — Looks up a specific key in `instance`, `persistent`, or `temporary` contract storage via live Soroban RPC `getLedgerEntries` + `LedgerKeyTtl`. `{key}` may be passed either as a symbolic name (`METADATA`, `Admin`) or URL-encoded base64 `ScVal` XDR.
- **`GET /contracts/{contract_id}/code`** — Returns the contract's deployed WASM bytecode (`wasm_hash`, `wasm_size_bytes`, `wasm_seen_count`, `functions` parsed from Soroban `contractspecv0` custom section and WASM export section, `last_modified_ledger`, `live_until_ledger`, `wasm_base64`) and a `_links.contracts_with_same_wasm` link to discover all sibling contract instances sharing that WASM hash.
