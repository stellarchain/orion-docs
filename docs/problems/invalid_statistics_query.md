---
title: "Statistics query parameters are invalid (invalid_statistics_query)"
description: "The `/statistics/{metric}` request is missing a required filter (such as `?asset=CODE:ISSUER`, `?corridor=A->B`, or `?account=G...`) or has an invalid `from`/`to` time range."
---

# Statistics query parameters are invalid (`invalid_statistics_query`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-4xx">HTTP 400</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Orion Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>invalid_statistics_query</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/problems/invalid_statistics_query</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">The `/statistics/{metric}` request is missing a required filter (such as `?asset=CODE:ISSUER`, `?corridor=A->B`, or `?account=G...`) or has an invalid `from`/`to` time range.</p>
</div>

::: tip How to Resolve `invalid_statistics_query`
1. Inspect the `status` (`400`), `code` (`invalid_statistics_query`), and `detail` fields in the JSON response.
2. For `400` validation errors (`invalid_*`), verify query parameters against the [Endpoints Reference](/guide/endpoints) or [Statistics Catalog (`GET /statistics`)](/guide/statistics).
3. For `404` errors (`*_not_found`), confirm the resource exists on Stellar Pubnet.
4. For `409`, `429`, `503`, or `504` transient states, retry with exponential backoff.
:::

## Example Response & Client Handling

::: code-group

```json [application/problem+json]
{
  "type": "https://orion.stellarchain.io/problems/invalid_statistics_query",
  "title": "Statistics query parameters are invalid",
  "status": 400,
  "detail": "Statistics query parameters are invalid",
  "code": "invalid_statistics_query"
}
```

```typescript [TypeScript / Fetch]
const res = await fetch('https://pubnet.stellarchain.io/statistics');
if (!res.ok) {
  const problem = await res.json();
  if (problem.code === 'invalid_statistics_query') {
    console.error('Orion Problem [invalid_statistics_query]:', problem.detail);
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
