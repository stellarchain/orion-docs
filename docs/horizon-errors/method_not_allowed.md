---
title: "Method Not Allowed (method_not_allowed)"
description: "The HTTP method used is not supported for this endpoint."
---

# Method Not Allowed (`method_not_allowed`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 405</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>method_not_allowed</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/method_not_allowed</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The HTTP method used is not supported for this endpoint.</p>
</div>

::: tip Quick Fix & Resolution
Check the `Allow` response header and use `GET` for queries or `POST` for `/transactions`, `/transactions_async`, and `/rpc`.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/method_not_allowed",
  "title": "Method Not Allowed",
  "status": 405,
  "detail": "The HTTP method is not allowed for this resource."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/method_not_allowed') {
    console.error('[method_not_allowed] HTTP 405:', problem.detail, problem.extras);
  }
}
```

```go [Go (horizonclient)]
client := &horizonclient.Client{
    HorizonURL: "https://pubnet.stellarchain.io",
}
_, err := client.Root()
if hErr := horizonclient.GetError(err); hErr != nil {
    if hErr.Problem.Status == 405 {
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

- Sending a `POST`, `PUT`, or `DELETE` request to a read-only `GET` endpoint.
- Sending a `GET` request to `POST /transactions` or `POST /rpc`.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
