---
title: "Request exceeds maximum allowed size (request_too_large)"
description: "The HTTP request body or URL exceeds the maximum permitted byte size."
---

# Request exceeds maximum allowed size (`request_too_large`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 413</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Orion Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>request_too_large</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/problems/request_too_large</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The HTTP request body or URL exceeds the maximum permitted byte size.</p>
</div>

::: tip How to Resolve `request_too_large`
1. Inspect the `status` (`413`), `code` (`request_too_large`), and `detail` fields in the JSON response.
2. For `400` validation errors (`invalid_*`), verify query parameters against the [Endpoints Reference](/guide/endpoints) or [Statistics Catalog (`GET /statistics`)](/guide/statistics).
3. For `404` errors (`*_not_found`), confirm the resource exists on Stellar Pubnet.
4. For `409`, `429`, `503`, or `504` transient states, retry with exponential backoff.
:::

## Example Response & Client Handling

::: code-group

```json [application/problem+json]
{
  "type": "https://orion.stellarchain.io/problems/request_too_large",
  "title": "Request exceeds maximum allowed size",
  "status": 413,
  "detail": "Request exceeds maximum allowed size",
  "code": "request_too_large"
}
```

```typescript [TypeScript / Fetch]
const res = await fetch('https://pubnet.stellarchain.io/statistics');
if (!res.ok) {
  const problem = await res.json();
  if (problem.code === 'request_too_large') {
    console.error('Orion Problem [request_too_large]:', problem.detail);
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
