---
title: "Rate Limit Exceeded (rate_limit_exceeded)"
description: "The client has sent too many requests in a given time window."
---

# Rate Limit Exceeded (`rate_limit_exceeded`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 429</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>rate_limit_exceeded</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/rate_limit_exceeded</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The client has sent too many requests in a given time window.</p>
</div>

::: tip Quick Fix & Resolution
Implement exponential backoff with jitter, use SSE streaming (`Accept: text/event-stream`), or batch state lookups.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/rate_limit_exceeded",
  "title": "Rate Limit Exceeded",
  "status": 429,
  "detail": "The rate limit for the requesting IP address is over its alloted limit. The allowed limit and requests left per time period are communicated to clients via the http response headers 'X-RateLimit-*' headers."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/rate_limit_exceeded') {
    console.error('[rate_limit_exceeded] HTTP 429:', problem.detail, problem.extras);
  }
}
```

```go [Go (horizonclient)]
client := &horizonclient.Client{
    HorizonURL: "https://pubnet.stellarchain.io",
}
_, err := client.Root()
if hErr := horizonclient.GetError(err); hErr != nil {
    if hErr.Problem.Status == 429 {
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

- Bursting above the per-IP request rate limit.
- Polling endpoints in a tight loop without backoff.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
