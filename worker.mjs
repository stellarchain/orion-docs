const DOCS_ANALYTICS_KEY = "telemetry/docs-web-analytics.json";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function defaultDocsState() {
  return {
    started_at_utc: new Date().toISOString(),
    updated_at_utc: new Date().toISOString(),
    total_pageviews: 0,
    pages: {},
    countries: {},
    colos: {},
    referrers: {},
    recent_events: [],
  };
}

async function loadDocsAnalytics(env) {
  if (!env.ORION_BUCKET) return defaultDocsState();
  try {
    const obj = await env.ORION_BUCKET.get(DOCS_ANALYTICS_KEY);
    if (!obj) return defaultDocsState();
    const parsed = await obj.json();
    return {
      ...defaultDocsState(),
      ...parsed,
    };
  } catch (_) {
    return defaultDocsState();
  }
}

async function recordDocsBeacon(request, env, payload) {
  const cf = request.cf || {};
  const country = String(cf.country || request.headers.get("cf-ipcountry") || "XX").toUpperCase();
  const colo = String(cf.colo || "EDGE").toUpperCase();
  const rawPath = String(payload.path || "/").split("?")[0].split("#")[0] || "/";
  const path = rawPath.length > 1 && rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;
  const title = String(payload.title || "").slice(0, 120);
  const referrer = String(payload.referrer || "direct").slice(0, 120) || "direct";
  const nowISO = new Date().toISOString();

  if (env.DOCS_ANALYTICS) {
    try {
      env.DOCS_ANALYTICS.writeDataPoint({
        indexes: [path],
        blobs: [path, country, colo, referrer, title],
        doubles: [1, Date.now()],
      });
    } catch (_) {}
  }

  if (!env.ORION_BUCKET) return;
  const state = await loadDocsAnalytics(env);
  state.updated_at_utc = nowISO;
  state.total_pageviews = Number(state.total_pageviews || 0) + 1;
  state.pages[path] = Number(state.pages[path] || 0) + 1;
  state.countries[country] = Number(state.countries[country] || 0) + 1;
  state.colos[colo] = Number(state.colos[colo] || 0) + 1;
  state.referrers[referrer] = Number(state.referrers[referrer] || 0) + 1;

  const recent = Array.isArray(state.recent_events) ? state.recent_events : [];
  recent.unshift({
    ts: nowISO,
    path,
    country,
    colo,
    referrer,
  });
  state.recent_events = recent.slice(0, 25);

  await env.ORION_BUCKET.put(DOCS_ANALYTICS_KEY, JSON.stringify(state), {
    httpMetadata: { contentType: "application/json" },
  });
}

async function buildAnalyticsSummary(env) {
  const docsState = await loadDocsAnalytics(env);

  const nodes = [];
  if (env.ORION_BUCKET) {
    try {
      const listed = await env.ORION_BUCKET.list({ prefix: "telemetry/api-nodes/" });
      for (const item of listed.objects || []) {
        const obj = await env.ORION_BUCKET.get(item.key);
        if (obj) {
          const data = await obj.json();
          if (data && data.node) {
            nodes.push(data);
          }
        }
      }
    } catch (_) {}
  }

  let liveStatus = null;
  try {
    const resp = await fetch("https://pubnet.stellarchain.io/__orion/status", {
      headers: { Accept: "application/json" },
    });
    if (resp.ok) {
      liveStatus = await resp.json();
      if (liveStatus && liveStatus.api_telemetry && liveStatus.api_telemetry.node) {
        const idx = nodes.findIndex((n) => n.node === liveStatus.api_telemetry.node);
        if (idx >= 0) {
          nodes[idx] = liveStatus.api_telemetry;
        } else {
          nodes.push(liveStatus.api_telemetry);
        }
      }
    }
  } catch (_) {}

  let totalRequests = 0;
  let totalBytesOut = 0;
  let status2xx = 0;
  let status4xx = 0;
  let status5xx = 0;
  let weightedLatSum = 0;
  const routeMap = new Map();
  const countries = {};
  const colos = {};
  const cacheTiers = {};

  for (const n of nodes) {
    const reqs = Number(n.total_requests || 0);
    totalRequests += reqs;
    totalBytesOut += Number(n.total_bytes_out || 0);
    status2xx += Number(n.status_2xx || 0);
    status4xx += Number(n.status_4xx || 0);
    status5xx += Number(n.status_5xx || 0);
    weightedLatSum += reqs * Number(n.avg_latency_ms || 0);

    for (const [k, v] of Object.entries(n.top_countries || {})) {
      countries[k] = (countries[k] || 0) + Number(v || 0);
    }
    for (const [k, v] of Object.entries(n.top_cf_colos || {})) {
      colos[k] = (colos[k] || 0) + Number(v || 0);
    }
    for (const [k, v] of Object.entries(n.cache_tiers || {})) {
      cacheTiers[k] = (cacheTiers[k] || 0) + Number(v || 0);
    }
    for (const r of n.routes || []) {
      const prev = routeMap.get(r.route) || {
        route: r.route,
        requests: 0,
        bytes_out: 0,
        status_2xx: 0,
        status_4xx: 0,
        status_5xx: 0,
        lat_weighted: 0,
        max_latency_ms: 0,
        last_seen_utc: "",
      };
      const rReqs = Number(r.requests || 0);
      prev.requests += rReqs;
      prev.bytes_out += Number(r.bytes_out || 0);
      prev.status_2xx += Number(r.status_2xx || 0);
      prev.status_4xx += Number(r.status_4xx || 0);
      prev.status_5xx += Number(r.status_5xx || 0);
      prev.lat_weighted += rReqs * Number(r.avg_latency_ms || 0);
      if (Number(r.max_latency_ms || 0) > prev.max_latency_ms) {
        prev.max_latency_ms = Number(r.max_latency_ms || 0);
      }
      if (String(r.last_seen_utc || "") > prev.last_seen_utc) {
        prev.last_seen_utc = String(r.last_seen_utc || "");
      }
      routeMap.set(r.route, prev);
    }
  }

  const aggregatedRoutes = Array.from(routeMap.values())
    .map((r) => ({
      route: r.route,
      requests: r.requests,
      bytes_out: r.bytes_out,
      status_2xx: r.status_2xx,
      status_4xx: r.status_4xx,
      status_5xx: r.status_5xx,
      avg_latency_ms: r.requests > 0 ? Math.round((r.lat_weighted / r.requests) * 100) / 100 : 0,
      max_latency_ms: r.max_latency_ms,
      last_seen_utc: r.last_seen_utc,
    }))
    .sort((a, b) => b.requests - a.requests);

  const avgLatencyMs = totalRequests > 0 ? Math.round((weightedLatSum / totalRequests) * 100) / 100 : 0;

  if (env.API_ANALYTICS && totalRequests > 0) {
    try {
      env.API_ANALYTICS.writeDataPoint({
        indexes: ["pubnet.stellarchain.io"],
        blobs: ["pubnet.stellarchain.io", new Date().toISOString()],
        doubles: [totalRequests, totalBytesOut, avgLatencyMs, nodes.length],
      });
    } catch (_) {}
  }

  return {
    generated_at_utc: new Date().toISOString(),
    cloudflare: {
      workers_observability_enabled: true,
      analytics_engine_datasets: ["orion_docs_analytics", "orion_api_telemetry"],
      r2_bucket: "orion (WEUR)",
    },
    docs_web_analytics: docsState,
    api_telemetry: {
      domain: "pubnet.stellarchain.io",
      active_nodes: nodes.length,
      live_tip_ledger: liveStatus?.live_tip_ledger || 0,
      live_tip_closed_at: liveStatus?.live_tip_closed_at || "",
      total_requests: totalRequests,
      total_bytes_out: totalBytesOut,
      status_2xx: status2xx,
      status_4xx: status4xx,
      status_5xx: status5xx,
      avg_latency_ms: avgLatencyMs,
      cache_tiers: cacheTiers,
      top_countries: countries,
      top_cf_colos: colos,
      routes: aggregatedRoutes,
      nodes,
    },
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS" && url.pathname.startsWith("/__analytics/")) {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === "/__analytics/beacon") {
      let payload = {};
      if (request.method === "POST") {
        try {
          payload = await request.json();
        } catch (_) {}
      } else {
        payload = {
          path: url.searchParams.get("path") || "/",
          title: url.searchParams.get("title") || "",
          referrer: url.searchParams.get("ref") || "direct",
        };
      }
      ctx.waitUntil(recordDocsBeacon(request, env, payload));
      return Response.json({ ok: true }, { headers: corsHeaders });
    }

    if (url.pathname === "/__analytics/summary") {
      const summary = await buildAnalyticsSummary(env);
      return Response.json(summary, {
        headers: {
          ...corsHeaders,
          "Cache-Control": "no-store",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
