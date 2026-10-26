---
title: "Data Requested Is Before Recorded History (before_history)"
description: "The requested ledger or cursor predates the earliest ledger retained by this instance."
---

# Data Requested Is Before Recorded History (`before_history`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 410</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>before_history</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/before_history</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The requested ledger or cursor predates the earliest ledger retained by this instance.</p>
</div>

::: tip Quick Fix & Resolution
On `https://pubnet.stellarchain.io`, full history is retained back to genesis (`history_elder_ledger: 3`) in Cloudflare R2 Parquet storage. Ensure ledger sequence is `>= 3`.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/before_history",
  "title": "Data Requested Is Before Recorded History",
  "status": 410,
  "detail": "This horizon instance is configured to only track a portion of the stellar network's latest history. This request is asking for results prior to the recorded history known to this horizon instance."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/before_history') {
    console.error('[before_history] HTTP 410:', problem.detail, problem.extras);
  }
}
```

```go [Go (horizonclient)]
client := &horizonclient.Client{
    HorizonURL: "https://pubnet.stellarchain.io",
}
_, err := client.Root()
if hErr := horizonclient.GetError(err); hErr != nil {
    if hErr.Problem.Status == 410 {
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

- Requesting a ledger sequence prior to the node's `history_elder_ledger`.
- Supplying a paging `cursor` that points to a ledger prior to recorded history.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
