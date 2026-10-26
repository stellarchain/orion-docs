---
title: "Limit parameter is invalid (invalid_limit)"
description: "The `limit` query parameter must be an integer between `1` and `200`."
---

# Limit parameter is invalid (`invalid_limit`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 400</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Orion Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>invalid_limit</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/problems/invalid_limit</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The `limit` query parameter must be an integer between `1` and `200`.</p>
</div>

::: tip How to Resolve `invalid_limit`
1. Inspect the `status` (`400`), `code` (`invalid_limit`), and `detail` fields in the JSON response.
2. For `400` validation errors (`invalid_*`), verify query parameters against the [Endpoints Reference](/guide/endpoints) or [Statistics Catalog (`GET /statistics`)](/guide/statistics).
3. For `404` errors (`*_not_found`), confirm the resource exists on Stellar Pubnet.
4. For `409`, `429`, `503`, or `504` transient states, retry with exponential backoff.
:::

## Example Response & Client Handling

::: code-group

```json [application/problem+json]
{
  "type": "https://orion.stellarchain.io/problems/invalid_limit",
  "title": "Limit parameter is invalid",
  "status": 400,
  "detail": "Limit parameter is invalid",
  "code": "invalid_limit"
}
```

```typescript [TypeScript / Fetch]
const res = await fetch('https://pubnet.stellarchain.io/statistics');
if (!res.ok) {
  const problem = await res.json();
  if (problem.code === 'invalid_limit') {
    console.error('Orion Problem [invalid_limit]:', problem.detail);
  }
}
```

```bash [cURL]
curl -i -s "https://pubnet.stellarchain.io/statistics" \
  -H "Accept: application/json"
```

:::

---

[← Back to All 53 Orion Problem Codes](/problems/)
