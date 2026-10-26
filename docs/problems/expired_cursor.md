---
title: "Cursor has expired (expired_cursor)"
description: "The pagination cursor has expired beyond its retention window. Restart pagination from the first page."
---

# Cursor has expired (`expired_cursor`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 410</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Orion /v3 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>expired_cursor</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/problems/expired_cursor</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The pagination cursor has expired beyond its retention window. Restart pagination from the first page.</p>
</div>

::: tip How to Resolve `expired_cursor`
1. Inspect the `status` (`410`), `code` (`expired_cursor`), and `detail` fields in the JSON response.
2. For `400` validation errors (`invalid_*`), verify query parameters against the [Endpoints Reference](/guide/endpoints) or [Statistics Catalog (`GET /v3/statistics`)](/guide/statistics).
3. For `404` errors (`*_not_found`), confirm the resource exists on Stellar Pubnet.
4. For `409`, `429`, `503`, or `504` transient states, retry with exponential backoff.
:::

## Example Response & Client Handling

::: code-group

```json [application/problem+json]
{
  "type": "https://orion.stellarchain.io/problems/expired_cursor",
  "title": "Cursor has expired",
  "status": 410,
  "detail": "Cursor has expired",
  "code": "expired_cursor"
}
```

```typescript [TypeScript / Fetch]
const res = await fetch('https://pubnet.stellarchain.io/v3/statistics');
if (!res.ok) {
  const problem = await res.json();
  if (problem.code === 'expired_cursor') {
    console.error('Orion /v3 Problem [expired_cursor]:', problem.detail);
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
