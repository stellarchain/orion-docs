---
title: "Still Ingesting (still_ingesting)"
description: "Data cannot be presented because initial state or order book ingestion is still in progress."
---

# Still Ingesting (`still_ingesting`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-5xx">HTTP 503</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>still_ingesting</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/still_ingesting</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">Data cannot be presented because initial state or order book ingestion is still in progress.</p>
</div>

::: tip Quick Fix & Resolution
Wait a few seconds for ingestion readiness (`orion.state_ready: true`) and retry.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/still_ingesting",
  "title": "Still Ingesting",
  "status": 503,
  "detail": "Data cannot be presented because it's still being ingested. Please wait for several minutes before trying your request again."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/still_ingesting') {
    console.error('[still_ingesting] HTTP 503:', problem.detail, problem.extras);
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

- Node recently booted and is still loading initial state bundles.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
