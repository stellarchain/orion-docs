---
title: "An acceptable response content-type could not be provided for this request (not_acceptable)"
description: "The client requested a media type in the `Accept` header that the server cannot produce."
---

# An acceptable response content-type could not be provided for this request (`not_acceptable`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 406</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>not_acceptable</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/not_acceptable</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The client requested a media type in the `Accept` header that the server cannot produce.</p>
</div>

::: tip Quick Fix & Resolution
Use `Accept: application/hal+json`, `Accept: application/json`, or `Accept: text/event-stream` (for streaming endpoints).
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/not_acceptable",
  "title": "An acceptable response content-type could not be provided for this request",
  "status": 406,
  "detail": "An acceptable response content-type could not be provided for this request."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/not_acceptable') {
    console.error('[not_acceptable] HTTP 406:', problem.detail, problem.extras);
  }
}
```

```go [Go (horizonclient)]
client := &horizonclient.Client{
    HorizonURL: "https://pubnet.stellarchain.io",
}
_, err := client.Root()
if hErr := horizonclient.GetError(err); hErr != nil {
    if hErr.Problem.Status == 406 {
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

- Passing an unsupported `Accept` header (e.g. `Accept: application/xml`) to an endpoint that only serves `application/hal+json`, `application/json`, or `text/event-stream`.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
