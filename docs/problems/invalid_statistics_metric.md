---
title: "Statistics metric identifier is invalid (invalid_statistics_metric)"
description: "The metric slug in `/statistics/{metric}` contains invalid characters. See `GET /statistics` for all 47 valid metrics."
---

# Statistics metric identifier is invalid (`invalid_statistics_metric`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 400</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Orion Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>invalid_statistics_metric</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/problems/invalid_statistics_metric</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The metric slug in `/statistics/{metric}` contains invalid characters. See `GET /statistics` for all 47 valid metrics.</p>
</div>

::: tip How to Resolve `invalid_statistics_metric`
1. Inspect the `status` (`400`), `code` (`invalid_statistics_metric`), and `detail` fields in the JSON response.
2. For `400` validation errors (`invalid_*`), verify query parameters against the [Endpoints Reference](/guide/endpoints) or [Statistics Catalog (`GET /statistics`)](/guide/statistics).
3. For `404` errors (`*_not_found`), confirm the resource exists on Stellar Pubnet.
4. For `409`, `429`, `503`, or `504` transient states, retry with exponential backoff.
:::

## Example Response & Client Handling

::: code-group

```json [application/problem+json]
{
  "type": "https://orion.stellarchain.io/problems/invalid_statistics_metric",
  "title": "Statistics metric identifier is invalid",
  "status": 400,
  "detail": "Statistics metric identifier is invalid",
  "code": "invalid_statistics_metric"
}
```

```typescript [TypeScript / Fetch]
const res = await fetch('https://pubnet.stellarchain.io/statistics');
if (!res.ok) {
  const problem = await res.json();
  if (problem.code === 'invalid_statistics_metric') {
    console.error('Orion Problem [invalid_statistics_metric]:', problem.detail);
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
