---
title: "Invalid Order Book Parameters (invalid_order_book)"
description: "The parameters specifying the SDEX order book pair (`/order_book`) are missing or invalid."
---

# Invalid Order Book Parameters (`invalid_order_book`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 400</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>invalid_order_book</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/invalid_order_book</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The parameters specifying the SDEX order book pair (`/order_book`) are missing or invalid.</p>
</div>

::: tip Quick Fix & Resolution
Provide valid `selling_asset_type` and `buying_asset_type` parameters along with code and issuer for credit assets.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/invalid_order_book",
  "title": "Invalid Order Book Parameters",
  "status": 400,
  "detail": "The parameters that specify what order book to view are invalid in some way. Please ensure that your type parameters (selling_asset_type and buying_asset_type) are one of the following valid values: native, credit_alphanum4, credit_alphanum12. Also ensure that you have specified selling_asset_code and selling_asset_issuer if selling_asset_type is not 'native', as well as buying_asset_code and buying_asset_issuer if buying_asset_type is not 'native'."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/invalid_order_book') {
    console.error('[invalid_order_book] HTTP 400:', problem.detail, problem.extras);
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

- `selling_asset_type` or `buying_asset_type` is missing or not one of `native`, `credit_alphanum4`, `credit_alphanum12`.
- Non-native asset is missing `*_asset_code` or a valid StrKey `*_asset_issuer`.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
