# Live Web & API Analytics (Cloudflare)

Orion tracks privacy-first **Documentation Web Analytics** (`orion.stellarchain.io`) and **Real-Time API Endpoint Telemetry** (`pubnet.stellarchain.io`) directly in **Cloudflare Workers Analytics Engine**, **Cloudflare Workers Observability**, and **Cloudflare R2 (`orion`)**.

<LiveAnalyticsDashboard />

---

## Telemetry Architecture & Public Endpoints

| Telemetry Stream | Cloudflare Dataset / Storage | Public JSON Endpoint |
| :--- | :--- | :--- |
| **Combined Docs & API Summary** | Workers Analytics Engine (`orion_docs_analytics`, `orion_api_telemetry`) + R2 (`telemetry/*`) | [`https://orion.stellarchain.io/__analytics/summary`](https://orion.stellarchain.io/__analytics/summary) |
| **Live Edge Node Status & Route Stats** | Active HA Edge Nodes (`FRA1` + `NYC3`) + R2 (`telemetry/api-nodes/*.json`) | [`https://pubnet.stellarchain.io/__orion/status`](https://pubnet.stellarchain.io/__orion/status) |
| **Dedicated API Telemetry Snapshot** | Per-route latency, status codes, cache tiers, `CF-IPCountry`, `CF-Ray` colos | [`https://pubnet.stellarchain.io/__orion/telemetry`](https://pubnet.stellarchain.io/__orion/telemetry) |
| **Docs Web Analytics Beacon** | Privacy-first pageview & SPA route transition beacon (zero cookies/PII) | `POST https://orion.stellarchain.io/__analytics/beacon` |

## Querying in Cloudflare Dashboard (SQL API)

All documentation pageviews and API telemetry snapshots are also written directly to **Cloudflare Workers Analytics Engine** under the `StellarChain` account (`orion_docs_analytics` and `orion_api_telemetry` datasets), where they can be queried via the Cloudflare Dashboard (**Workers & Pages -> Analytics Engine**) or the Cloudflare SQL API:

```sql
-- Top documentation pages in Cloudflare Workers Analytics Engine
SELECT
  blob1 AS path,
  blob2 AS country,
  blob3 AS cf_colo,
  SUM(double1) AS pageviews
FROM orion_docs_analytics
GROUP BY path, country, cf_colo
ORDER BY pageviews DESC
LIMIT 25
```
