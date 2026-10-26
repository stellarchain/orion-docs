---
title: "History bundle advanced; retry the request (bundle_advanced)"
description: "The underlying immutable state/history bundle rotated while executing a multi-part scan. Retry the request immediately."
---

# History bundle advanced; retry the request (`bundle_advanced`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 409</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Orion Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>bundle_advanced</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/problems/bundle_advanced</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The underlying immutable state/history bundle rotated while executing a multi-part scan. Retry the request immediately.</p>
</div>

::: tip How to Resolve `bundle_advanced`
1. Inspect the `status` (`409`), `code` (`bundle_advanced`), and `detail` fields in the JSON response.
2. For `400` validation errors (`invalid_*`), verify query parameters against the [Endpoints Reference](/guide/endpoints) or [Statistics Catalog (`GET /statistics`)](/guide/statistics).
3. For `404` errors (`*_not_found`), confirm the resource exists on Stellar Pubnet.
4. For `409`, `429`, `503`, or `504` transient states, retry with exponential backoff.
:::

## Example Response & Client Handling

::: code-group

```json [application/problem+json]
{
  "type": "https://orion.stellarchain.io/problems/bundle_advanced",
  "title": "History bundle advanced; retry the request",
  "status": 409,
  "detail": "History bundle advanced; retry the request",
  "code": "bundle_advanced"
}
```

```typescript [TypeScript / Fetch]
const res = await fetch('https://pubnet.stellarchain.io/statistics');
if (!res.ok) {
  const problem = await res.json();
  if (problem.code === 'bundle_advanced') {
    console.error('Orion Problem [bundle_advanced]:', problem.detail);
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
