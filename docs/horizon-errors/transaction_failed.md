---
title: "Transaction Failed (transaction_failed)"
description: "The transaction was well-formed XDR, but Stellar Core rejected it or one of its operations failed during execution."
---

# Transaction Failed (`transaction_failed`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 400</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>transaction_failed</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/transaction_failed</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The transaction was well-formed XDR, but Stellar Core rejected it or one of its operations failed during execution.</p>
</div>

::: tip Quick Fix & Resolution
Inspect `extras.result_codes.transaction` and `extras.result_codes.operations` in the response and consult the [Transaction Result Codes](/result-codes/transactions) and [Operation Result Codes](/result-codes/operations) reference.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/transaction_failed",
  "title": "Transaction Failed",
  "status": 400,
  "detail": "The transaction failed when submitted to the stellar network. The `extras.result_codes` field on this response contains further details.",
  "extras": {
    "envelope_xdr": "AAAAAgAAAADdfhHDs4Vaug6p8Oxb1QRjNRdJt3pYKKBVhFHrEgd9QAAAAAoAEi4YAAAAAwAAAAE...",
    "result_codes": {
      "transaction": "tx_failed",
      "operations": [
        "op_underfunded"
      ]
    },
    "result_xdr": "AAAAAAAAAGT/////AAAAAQAAAAAAAAAB////+wAAAAA="
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
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/transaction_failed') {
    console.error('[transaction_failed] HTTP 400:', problem.detail, problem.extras);
  }
}
```

```go [Go (horizonclient)]
client := &horizonclient.Client{
    HorizonURL: "https://pubnet.stellarchain.io",
}
_, err := client.Root()
if hErr := horizonclient.GetError(err); hErr != nil {
    if hErr.Problem.Status == 400 {
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

- Insufficient XLM or asset balance (`op_underfunded`, `tx_insufficient_balance`).
- Invalid sequence number (`tx_bad_seq`).
- Missing or invalid signatures (`tx_bad_auth`, `op_bad_auth`).
- Missing trustline on destination account (`op_no_trust`).
- Minimum fee not met (`tx_insufficient_fee`).

## XDR Result Codes Reference (`extras.result_codes`)

| Result Code Level | Documentation Link | Description |
| :--- | :--- | :--- |
| **Transaction (`tx_*`)** | [Transaction Result Codes](/result-codes/transactions) | `tx_failed`, `tx_bad_seq`, `tx_insufficient_balance`, `tx_insufficient_fee`, `tx_bad_auth` |
| **Operation (`op_*`)** | [Operation Result Codes](/result-codes/operations) | `op_underfunded`, `op_no_trust`, `op_bad_auth`, `op_line_full`, `op_low_reserve` |
| **Operation-Specific** | [13 Operation Tables](/result-codes/operation-specific/) | Detailed per-operation failure matrices for Payments, Offers, Trustlines, and Account Merge |

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
