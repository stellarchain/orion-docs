---
title: "Bad Request (bad_request)"
description: "The request you sent was invalid in some way (e.g. malformed query parameter, invalid cursor, invalid asset format, or out-of-range limit)."
---

# Bad Request (`bad_request`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 400</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>bad_request</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/bad_request</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The request you sent was invalid in some way (e.g. malformed query parameter, invalid cursor, invalid asset format, or out-of-range limit).</p>
</div>

::: tip Quick Fix & Resolution
Inspect `extras.invalid_field` and `extras.reason` in the JSON response body and adjust the query parameter to match the endpoint specification.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/bad_request",
  "title": "Bad Request",
  "status": 400,
  "detail": "The request you sent was invalid in some way.",
  "extras": {
    "invalid_field": "limit",
    "reason": "limit must be between 1 and 200"
  }
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/bad_request') {
    console.error('[bad_request] HTTP 400:', problem.detail, problem.extras);
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

- A query parameter (`limit`, `cursor`, `order`, `asset`, `account_id`) failed validation.
- On `/accounts`, `asset=native` was requested (Horizon and Orion do not allow filtering all accounts by native XLM).
- On `/trade_aggregations`, `resolution`, `offset`, or time range parameters are invalid.
- An asset string was not formatted as `CODE:ISSUER` or `native`.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
