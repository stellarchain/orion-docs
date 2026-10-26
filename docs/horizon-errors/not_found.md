---
title: "Resource Missing (not_found)"
description: "The requested URL route, account, ledger, transaction, operation, offer, liquidity pool, or claimable balance does not exist."
---

# Resource Missing (`not_found`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-404">HTTP 404</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>not_found</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/not_found</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The requested URL route, account, ledger, transaction, operation, offer, liquidity pool, or claimable balance does not exist.</p>
</div>

::: tip Quick Fix & Resolution
Verify the identifier (account G-address, 64-hex transaction hash, ledger sequence, or operation ID) and confirm the resource exists on Stellar Pubnet.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/not_found",
  "title": "Resource Missing",
  "status": 404,
  "detail": "The resource at the url requested was not found. This usually occurs for one of two reasons: The url requested is not valid, or no data in our database could be found with the parameters provided."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/not_found') {
    console.error('[not_found] HTTP 404:', problem.detail, problem.extras);
  }
}
```

```go [Go (horizonclient)]
client := &horizonclient.Client{
    HorizonURL: "https://pubnet.stellarchain.io",
}
_, err := client.Root()
if hErr := horizonclient.GetError(err); hErr != nil {
    if hErr.Problem.Status == 404 {
        log.Printf("Problem (%s): %s - extras=%v", hErr.Problem.Type, hErr.Problem.Detail, hErr.Problem.Extras)
    }
}
```

```bash [cURL Diagnostic]
curl -i -s "https://pubnet.stellarchain.io/" \
  -H "Accept: application/hal+json"
```

:::

## Common Root Causes

- Querying an account (`GET /accounts/{id}`) that has not been funded on-chain or was merged.
- Querying a transaction hash (`GET /transactions/{hash}`) that was never included in a ledger.
- Querying a ledger sequence higher than `history_latest_ledger` or `0`.
- Requesting a URL path that does not exist.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
