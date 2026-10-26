---
title: "Invalid Accounts Parameters (invalid_accounts_params)"
description: "The `/accounts` collection endpoint requires exactly one filter parameter (`signer`, `sponsor`, `asset`, or `liquidity_pool`)."
---

# Invalid Accounts Parameters (`invalid_accounts_params`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 400</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>invalid_accounts_params</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/invalid_accounts_params</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The `/accounts` collection endpoint requires exactly one filter parameter (`signer`, `sponsor`, `asset`, or `liquidity_pool`).</p>
</div>

::: tip Quick Fix & Resolution
Pass exactly one filter parameter: `?signer=G...`, `?sponsor=G...`, `?asset=CODE:ISSUER`, or `?liquidity_pool=L...`.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/invalid_accounts_params",
  "title": "Invalid Accounts Parameters",
  "status": 400,
  "detail": "Exactly one filter is required. Please ensure that you are including a signer, sponsor, asset, or liquidity pool filter."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/invalid_accounts_params') {
    console.error('[invalid_accounts_params] HTTP 400:', problem.detail, problem.extras);
  }
}
```

```go [Go (horizonclient)]
client := &horizonclient.Client{
    HorizonURL: "https://pubnet.stellarchain.io",
}
_, err := client.Root()
if hErr := horizonclient.GetError(err); hErr != nil {
    if hErr.Problem.Status == 400 {
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

- Calling `GET /accounts` with no filter parameters.
- Calling `GET /accounts` with multiple conflicting filter parameters simultaneously (e.g. both `signer` and `asset`).

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
