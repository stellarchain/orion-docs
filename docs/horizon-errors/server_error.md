---
title: "Internal Server Error (server_error)"
description: "An unexpected internal error occurred while processing the request."
---

# Internal Server Error (`server_error`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-5xx">HTTP 500</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>server_error</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/server_error</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">An unexpected internal error occurred while processing the request.</p>
</div>

::: tip Quick Fix & Resolution
Retry the request with exponential backoff. On `pubnet.stellarchain.io`, Caddy automatically fails over between `FRA1` and `NYC3` on 5xx errors.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/server_error",
  "title": "Internal Server Error",
  "status": 500,
  "detail": "An error occurred while processing this request. This is usually due to a bug within the server software. Trying this request again may succeed if the bug is transient. Otherwise, please contact the system administrator."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/server_error') {
    console.error('[server_error] HTTP 500:', problem.detail, problem.extras);
  }
}
```

```go [Go (horizonclient)]
client := &horizonclient.Client{
    HorizonURL: "https://pubnet.stellarchain.io",
}
_, err := client.Root()
if hErr := horizonclient.GetError(err); hErr != nil {
    if hErr.Problem.Status == 500 {
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

- Transient upstream RPC or R2 storage timeout.
- Unexpected internal exception while decoding historical records.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
