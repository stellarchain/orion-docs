# Orion Stellar Documentation & Error Reference (`orion.stellarchain.io`)

Open-source documentation and RFC 7807 error reference for **Orion** (`https://pubnet.stellarchain.io`) and **Stellar Horizon**, built with [VitePress](https://vitepress.dev) and deployed on **Cloudflare Pages** (`https://orion.stellarchain.io`).

## Why This Exists

Historically, Stellar Horizon error responses included `"type": "https://stellar.org/horizon-errors/<code>"` URLs that began returning `404 Not Found` after `stellar.org` restructured its documentation site.

**Orion (`pubnet.stellarchain.io`)** links all RFC 7807 error responses directly to live, searchable VitePress pages on **`https://orion.stellarchain.io`**:

- **23 Horizon Error Codes:** `https://orion.stellarchain.io/horizon-errors/bad_request`, `/horizon-errors/transaction_failed`, `/horizon-errors/not_found`, `/horizon-errors/invalid_accounts_params`, etc.
- **53 Orion `/v3` Problem Codes:** `https://orion.stellarchain.io/problems/invalid_statistics_query`, `/problems/expired_cursor`, `/problems/resource_limit`, etc.
- **Complete Stellar Core XDR Result Codes Reference:** Transaction (`tx_*`), Operation (`op_*`), and all 13 operation-specific result code tables restored from `github.com/stellar/stellar-docs`.

## Local Development

```bash
npm install
npm run docs:dev
```

## Production Build

```bash
npm run docs:build
```
