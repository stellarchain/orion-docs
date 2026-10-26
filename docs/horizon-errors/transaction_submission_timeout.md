---
title: "Transaction Submission Timeout (transaction_submission_timeout)"
description: "The transaction submission timed out waiting for ledger inclusion."
---

# Transaction Submission Timeout (`transaction_submission_timeout`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-5xx">HTTP 504</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>transaction_submission_timeout</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/transaction_submission_timeout</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The transaction submission timed out waiting for ledger inclusion.</p>
</div>

::: tip Quick Fix & Resolution
Poll `GET /transactions/{hash}` using `extras.hash` before resubmitting, or use `POST /transactions_async`.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/transaction_submission_timeout",
  "title": "Transaction Submission Timeout",
  "status": 504,
  "detail": "Your transaction submission request has timed out. This does not necessarily mean the submission has failed. Before resubmitting, please use the transaction hash provided in `extras.hash` to poll the GET /transactions endpoint.",
  "extras": {
    "hash": "3389e9f0f1a65f19736cacf544c2e825313e8447f569233bb8db39aa607c8889"
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
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/transaction_submission_timeout') {
    console.error('[transaction_submission_timeout] HTTP 504:', problem.detail, problem.extras);
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

- Network congestion / surge pricing delayed inclusion beyond the HTTP wait window.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
