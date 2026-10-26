---
title: "Statistics dataset is unavailable (statistics_unavailable)"
description: "The statistics Parquet dataset is not currently mounted or reachable."
---

# Statistics dataset is unavailable (`statistics_unavailable`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-5xx">HTTP 503</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Orion /v3 Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>statistics_unavailable</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/problems/statistics_unavailable</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The statistics Parquet dataset is not currently mounted or reachable.</p>
</div>

::: tip How to Resolve `statistics_unavailable`
1. Inspect the `status` (`503`), `code` (`statistics_unavailable`), and `detail` fields in the JSON response.
2. For `400` validation errors (`invalid_*`), verify query parameters against the [Endpoints Reference](/guide/endpoints) or [Statistics Catalog (`GET /v3/statistics`)](/guide/statistics).
3. For `404` errors (`*_not_found`), confirm the resource exists on Stellar Pubnet.
4. For `409`, `429`, `503`, or `504` transient states, retry with exponential backoff.
:::

## Example Response & Client Handling

::: code-group

```json [application/problem+json]
{
  "type": "https://orion.stellarchain.io/problems/statistics_unavailable",
  "title": "Statistics dataset is unavailable",
  "status": 503,
  "detail": "Statistics dataset is unavailable",
  "code": "statistics_unavailable"
}
```

```typescript [TypeScript / Fetch]
const res = await fetch('https://pubnet.stellarchain.io/v3/statistics');
if (!res.ok) {
  const problem = await res.json();
  if (problem.code === 'statistics_unavailable') {
    console.error('Orion /v3 Problem [statistics_unavailable]:', problem.detail);
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
