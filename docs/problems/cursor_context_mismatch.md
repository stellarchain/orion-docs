---
title: "Cursor does not match this request (cursor_context_mismatch)"
description: "An opaque `/v3` pagination cursor was used with different query parameters or on a different endpoint than the one that issued it."
---

# Cursor does not match this request (`cursor_context_mismatch`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 400</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Orion Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>cursor_context_mismatch</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/problems/cursor_context_mismatch</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">An opaque `/v3` pagination cursor was used with different query parameters or on a different endpoint than the one that issued it.</p>
</div>

::: tip How to Resolve `cursor_context_mismatch`
1. Inspect the `status` (`400`), `code` (`cursor_context_mismatch`), and `detail` fields in the JSON response.
2. For `400` validation errors (`invalid_*`), verify query parameters against the [Endpoints Reference](/guide/endpoints) or [Statistics Catalog (`GET /statistics`)](/guide/statistics).
3. For `404` errors (`*_not_found`), confirm the resource exists on Stellar Pubnet.
4. For `409`, `429`, `503`, or `504` transient states, retry with exponential backoff.
:::

## Example Response & Client Handling

::: code-group

```json [application/problem+json]
{
  "type": "https://orion.stellarchain.io/problems/cursor_context_mismatch",
  "title": "Cursor does not match this request",
  "status": 400,
  "detail": "Cursor does not match this request",
  "code": "cursor_context_mismatch"
}
```

```typescript [TypeScript / Fetch]
const res = await fetch('https://pubnet.stellarchain.io/statistics');
if (!res.ok) {
  const problem = await res.json();
  if (problem.code === 'cursor_context_mismatch') {
    console.error('Orion Problem [cursor_context_mismatch]:', problem.detail);
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
