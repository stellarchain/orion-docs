---
title: "Resource Limit Exceeded (resource_limit_exceeded)"
description: "The query exceeded the server's scan/work budget or member fanout limit."
---

# Resource Limit Exceeded (`resource_limit_exceeded`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 422</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>resource_limit_exceeded</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/resource_limit_exceeded</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The query exceeded the server's scan/work budget or member fanout limit.</p>
</div>

::: tip Quick Fix & Resolution
Supply a narrower `cursor` range, lower the `limit` parameter, or use pre-aggregated `/v3/statistics` endpoints for network-wide analytics.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/resource_limit_exceeded",
  "title": "Resource Limit Exceeded",
  "status": 422,
  "detail": "The request exceeded the configured resource or query work limit."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/resource_limit_exceeded') {
    console.error('[resource_limit_exceeded] HTTP 422:', problem.detail, problem.extras);
  }
}
```

```go [Go (horizonclient)]
client := &horizonclient.Client{
    HorizonURL: "https://pubnet.stellarchain.io",
}
_, err := client.Root()
if hErr := horizonclient.GetError(err); hErr != nil {
    if hErr.Problem.Status == 422 {
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

- Scanning an unbounded historical range without a selective filter or cursor.
- Querying an account with an extremely large subentry or participant fanout beyond the single-query work budget.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
