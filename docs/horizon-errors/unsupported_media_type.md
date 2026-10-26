---
title: "Unsupported Media Type (unsupported_media_type)"
description: "The request `Content-Type` header is not supported by this endpoint."
---

# Unsupported Media Type (`unsupported_media_type`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 415</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Horizon RFC 7807 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>unsupported_media_type</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/horizon-errors/unsupported_media_type</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The request `Content-Type` header is not supported by this endpoint.</p>
</div>

::: tip Quick Fix & Resolution
Set `Content-Type: application/x-www-form-urlencoded` (with body `tx=<url_encoded_xdr>`) or `application/json`.
:::

## Response Payload & SDK Handling

::: code-group

```json [RFC 7807 JSON Response]
{
  "type": "https://orion.stellarchain.io/horizon-errors/unsupported_media_type",
  "title": "Unsupported Media Type",
  "status": 415,
  "detail": "The request has an unsupported content type. Presently, the only supported content type is application/x-www-form-urlencoded."
}
```

```typescript [TypeScript (@stellar/stellar-sdk)]
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://pubnet.stellarchain.io');

try {
  const res = await server.ledgers().limit(10).call();
} catch (err: any) {
  const problem = err?.response?.data;
  if (problem?.type === 'https://orion.stellarchain.io/horizon-errors/unsupported_media_type') {
    console.error('[unsupported_media_type] HTTP 415:', problem.detail, problem.extras);
  }
}
```

```go [Go (horizonclient)]
client := &horizonclient.Client{
    HorizonURL: "https://pubnet.stellarchain.io",
}
_, err := client.Root()
if hErr := horizonclient.GetError(err); hErr != nil {
    if hErr.Problem.Status == 415 {
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

- Submitting `POST /transactions` without `Content-Type: application/x-www-form-urlencoded` or `application/json`.

---

[← Back to All 23 Horizon Error Codes](/horizon-errors/)
