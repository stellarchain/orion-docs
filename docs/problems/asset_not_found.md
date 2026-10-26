---
title: "Asset was not found (asset_not_found)"
description: "No trustlines or supply records exist for the requested asset (`CODE:ISSUER`)."
---

# Asset was not found (`asset_not_found`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-404">HTTP 404</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Orion /v3 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>asset_not_found</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/problems/asset_not_found</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">No trustlines or supply records exist for the requested asset (`CODE:ISSUER`).</p>
</div>

::: tip How to Resolve `asset_not_found`
1. Inspect the `status` (`404`), `code` (`asset_not_found`), and `detail` fields in the JSON response.
2. For `400` validation errors (`invalid_*`), verify query parameters against the [Endpoints Reference](/guide/endpoints) or [Statistics Catalog (`GET /v3/statistics`)](/guide/statistics).
3. For `404` errors (`*_not_found`), confirm the resource exists on Stellar Pubnet.
4. For `409`, `429`, `503`, or `504` transient states, retry with exponential backoff.
:::

## Example Response & Client Handling

::: code-group

```json [application/problem+json]
{
  "type": "https://orion.stellarchain.io/problems/asset_not_found",
  "title": "Asset was not found",
  "status": 404,
  "detail": "Asset was not found",
  "code": "asset_not_found"
}
```

```typescript [TypeScript / Fetch]
const res = await fetch('https://pubnet.stellarchain.io/v3/statistics');
if (!res.ok) {
  const problem = await res.json();
  if (problem.code === 'asset_not_found') {
    console.error('Orion /v3 Problem [asset_not_found]:', problem.detail);
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
