---
title: "Historical publication integrity failure (publication_integrity_failure)"
description: "A cryptographic hash or manifest integrity check failed while reading an archive Parquet bundle."
---

# Historical publication integrity failure (`publication_integrity_failure`)

<div class="orion-error-banner">
  <div class="orion-error-meta">
    <span class="orion-status-badge orion-status-5xx">HTTP 500</span>
    <span class="orion-status-badge" style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1)">Orion Problem</span>
    <span style="font-size: 13px; opacity: 0.8">Code: <code>publication_integrity_failure</code></span>
  </div>
  <div class="orion-uri-box">
    <span><strong>Type URI:</strong> https://orion.stellarchain.io/problems/publication_integrity_failure</span>
  </div>
  <p style="margin: 4px 0 0; font-size: 14.5px; line-height: 1.6">A cryptographic hash or manifest integrity check failed while reading an archive Parquet bundle.</p>
</div>

::: tip How to Resolve `publication_integrity_failure`
1. Inspect the `status` (`500`), `code` (`publication_integrity_failure`), and `detail` fields in the JSON response.
2. For `400` validation errors (`invalid_*`), verify query parameters against the [Endpoints Reference](/guide/endpoints) or [Statistics Catalog (`GET /statistics`)](/guide/statistics).
3. For `404` errors (`*_not_found`), confirm the resource exists on Stellar Pubnet.
4. For `409`, `429`, `503`, or `504` transient states, retry with exponential backoff.
:::

## Example Response & Client Handling

::: code-group

```json [application/problem+json]
{
  "type": "https://orion.stellarchain.io/problems/publication_integrity_failure",
  "title": "Historical publication integrity failure",
  "status": 500,
  "detail": "Historical publication integrity failure",
  "code": "publication_integrity_failure"
}
```

```typescript [TypeScript / Fetch]
const res = await fetch('https://pubnet.stellarchain.io/statistics');
if (!res.ok) {
  const problem = await res.json();
  if (problem.code === 'publication_integrity_failure') {
    console.error('Orion Problem [publication_integrity_failure]:', problem.detail);
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
