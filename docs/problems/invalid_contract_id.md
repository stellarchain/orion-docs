---
title: "Contract ID is invalid (invalid_contract_id)"
description: "The Soroban contract identifier must be a valid 56-character StrKey contract address (`C...`)."
---

# Contract ID is invalid (`invalid_contract_id`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 400</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Orion /v3 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>invalid_contract_id</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/problems/invalid_contract_id</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The Soroban contract identifier must be a valid 56-character StrKey contract address (`C...`).</p>
</div>

::: tip How to Resolve `invalid_contract_id`
1. Inspect the `status` (`400`), `code` (`invalid_contract_id`), and `detail` fields in the JSON response.
2. For `400` validation errors (`invalid_*`), verify query parameters against the [Endpoints Reference](/guide/endpoints) or [Statistics Catalog (`GET /v3/statistics`)](/guide/statistics).
3. For `404` errors (`*_not_found`), confirm the resource exists on Stellar Pubnet.
4. For `409`, `429`, `503`, or `504` transient states, retry with exponential backoff.
:::

## Example Response & Client Handling

::: code-group

```json [application/problem+json]
{
  "type": "https://orion.stellarchain.io/problems/invalid_contract_id",
  "title": "Contract ID is invalid",
  "status": 400,
  "detail": "Contract ID is invalid",
  "code": "invalid_contract_id"
}
```

```typescript [TypeScript / Fetch]
const res = await fetch('https://pubnet.stellarchain.io/v3/statistics');
if (!res.ok) {
  const problem = await res.json();
  if (problem.code === 'invalid_contract_id') {
    console.error('Orion /v3 Problem [invalid_contract_id]:', problem.detail);
  }
}
```

```bash [cURL]
curl -i -s "https://pubnet.stellarchain.io/v3/statistics" \
  -H "Accept: application/json"
```

:::

---

[← Back to All 53 Orion `/v3` Problem Codes](/problems/)
