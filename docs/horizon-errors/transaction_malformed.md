---
title: "Transaction Malformed (transaction_malformed)"
description: "The `tx` parameter could not be decoded as a valid base64-encoded Stellar `TransactionEnvelope` XDR structure."
---

# Transaction Malformed (`transaction_malformed`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 400</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>transaction_malformed</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/transaction_malformed</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The `tx` parameter could not be decoded as a valid base64-encoded Stellar `TransactionEnvelope` XDR structure.</p>
</div>

::: tip Quick Fix & Resolution
Ensure the transaction is serialized as a valid base64 `TransactionEnvelope` XDR and properly URL-encoded when sent via `POST /transactions`.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/transaction_malformed",
  "title": "Transaction Malformed",
  "status": 400,
  "detail": "Horizon could not decode the transaction envelope in this request. A transaction should be an XDR TransactionEnvelope struct encoded using base64. The envelope read from this request is echoed in the `extras.envelope_xdr` field of this response for your convenience.",
  "extras": {
    "envelope_xdr": "BBBBBPORy3CoX6ox2ilbeiVjBA5WlpCSZRcjZ7VE9Wf4QVk7..."
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
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/transaction_malformed') {
    console.error('[transaction_malformed] HTTP 400:', problem.detail, problem.extras);
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

- The `tx` parameter was empty or not URL-encoded (`+` characters in base64 must be URL-encoded as `%2B` in `application/x-www-form-urlencoded` bodies).
- Truncated base64 string or leftover trailing bytes in the XDR buffer.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
