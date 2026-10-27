const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

async function recordDocsBeacon(request, env, payload) {
  const cf = request.cf || {};
  const country = String(cf.country || request.headers.get("cf-ipcountry") || "XX").toUpperCase();
  const colo = String(cf.colo || "EDGE").toUpperCase();
  const rawPath = String(payload.path || "/").split("?")[0].split("#")[0] || "/";
  const path = rawPath.length > 1 && rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;
  const title = String(payload.title || "").slice(0, 120);
  const referrer = String(payload.referrer || "direct").slice(0, 120) || "direct";

  // Write strictly into internal Cloudflare Workers Analytics Engine (never exposed publicly)
  if (env.DOCS_ANALYTICS) {
    try {
      env.DOCS_ANALYTICS.writeDataPoint({
        indexes: [path],
        blobs: [path, country, colo, referrer, title],
        doubles: [1, Date.now()],
      });
    } catch (_) {}
  }
}

async function ingestNodeTelemetryToCloudflare(env) {
  if (!env.ORION_BUCKET || !env.API_ANALYTICS) return;
  try {
    const listed = await env.ORION_BUCKET.list({ prefix: "telemetry/api-nodes/" });
    for (const item of listed.objects || []) {
      const obj = await env.ORION_BUCKET.get(item.key);
      if (!obj) continue;
      const n = await obj.json();
      if (!n || !n.node) continue;
      env.API_ANALYTICS.writeDataPoint({
        indexes: [String(n.node)],
        blobs: [
          "pubnet.stellarchain.io",
          String(n.node),
          String(n.region || ""),
          String(n.timestamp_utc || new Date().toISOString()),
        ],
        doubles: [
          Number(n.total_requests || 0),
          Number(n.total_bytes_out || 0),
          Number(n.avg_latency_ms || 0),
          Number(n.status_2xx || 0),
          Number(n.status_4xx || 0),
          Number(n.status_5xx || 0),
        ],
      });
    }
  } catch (_) {}
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Block any public access to removed /guide/analytics or /__analytics/summary
    if (
      url.pathname === "/guide/analytics" ||
      url.pathname === "/guide/analytics.html" ||
      url.pathname === "/__analytics/summary"
    ) {
      return new Response("Not Found", { status: 404 });
    }

    if (request.method === "OPTIONS" && url.pathname === "/__analytics/beacon") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === "/__analytics/beacon" && request.method === "POST") {
      let payload = {};
      try {
        payload = await request.json();
      } catch (_) {}
      ctx.waitUntil(recordDocsBeacon(request, env, payload));
      ctx.waitUntil(ingestNodeTelemetryToCloudflare(env));
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(ingestNodeTelemetryToCloudflare(env));
  },
};
