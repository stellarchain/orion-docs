---
title: "Timeout (timeout)"
description: "The request or transaction submission timed out before completing."
---

# Timeout (`timeout`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-5xx">HTTP 504</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>timeout</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/timeout</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The request or transaction submission timed out before completing.</p>
</div>

::: tip Quick Fix & Resolution
If submitting a transaction, poll `GET /transactions/{hash}` or resubmit the exact same transaction envelope (same sequence number), or use a fee-bump transaction to increase the fee.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/timeout",
  "title": "Timeout",
  "status": 504,
  "detail": "Your request timed out before completing. Please try your request again. If you are submitting a transaction make sure you are sending exactly the same transaction (with the same sequence number)."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/timeout') {
    console.error('[timeout] HTTP 504:', problem.detail, problem.extras);
  }
}
```

```go [Go (horizonclient)]
client := &horizonclient.Client{
    HorizonURL: "https://pubnet.stellarchain.io",
}
_, err := client.Root()
if hErr := horizonclient.GetError(err); hErr != nil {
    if hErr.Problem.Status == 504 {
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

- Transaction submitted via `POST /transactions` was not included in a ledger within 3 consecutive ledger closes due to surge pricing.
- A complex query exceeded the HTTP gateway timeout.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
