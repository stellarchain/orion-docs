---
title: "Historical DB Is Too Stale (stale_history)"
description: "The node's ingested history is lagging behind the Stellar network tip beyond the configured staleness threshold."
---

# Historical DB Is Too Stale (`stale_history`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-5xx">HTTP 503</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>stale_history</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/stale_history</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The node's ingested history is lagging behind the Stellar network tip beyond the configured staleness threshold.</p>
</div>

::: tip Quick Fix & Resolution
Check `GET /` (`history_latest_ledger` vs `core_latest_ledger`) and retry.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/stale_history",
  "title": "Historical DB Is Too Stale",
  "status": 503,
  "detail": "This horizon instance is configured to reject client requests when it can determine that the history database is lagging too far behind the connected instance of Stellar-Core or read replica."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/stale_history') {
    console.error('[stale_history] HTTP 503:', problem.detail, problem.extras);
  }
}
```

```go [Go (horizonclient)]
client := &horizonclient.Client{
    HorizonURL: "https://pubnet.stellarchain.io",
}
_, err := client.Root()
if hErr := horizonclient.GetError(err); hErr != nil {
    if hErr.Problem.Status == 503 {
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

- Archive snapshot or live ingestion pipeline fell behind the network tip.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
