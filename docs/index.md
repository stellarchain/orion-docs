---
layout: home

hero:
  name: "Orion Stellar Docs"
  text: "Interactive Error Reference, XDR Result Codes & Lakehouse API"
  tagline: "Zero-lag Stellar Pubnet Horizon + /v3 Analytics API backed by 478+ GiB of Cloudflare R2 Parquet history. Click any error code or test live Pubnet queries below."
  image:
    src: /logo.svg
    alt: Orion StellarChain
  actions:
    - theme: brand
      text: "⚡ Horizon Errors (23)"
      link: /horizon-errors/
    - theme: alt
      text: "🛡️ Orion /v3 Problems (53)"
      link: /problems/
    - theme: alt
      text: "🧬 XDR Result Codes"
      link: /result-codes/
    - theme: alt
      text: "📘 API & Statistics Guide"
      link: /guide/

features:
  - icon: "⚡"
    title: "23 Horizon RFC 7807 Error Guides"
    details: "Instant search & troubleshooting for bad_request, transaction_failed, not_found, invalid_accounts_params, invalid_order_book, stale_history, and timeout."
    link: /horizon-errors/
  - icon: "🛡️"
    title: "53 Orion /v3 Problem Definitions"
    details: "Complete reference for /v3/statistics and edge problem codes including invalid_statistics_query, expired_cursor, resource_limit, and stream_gap."
    link: /problems/
  - icon: "🧬"
    title: "Restored Stellar Core XDR Result Codes"
    details: "Full Transaction (tx_*) and Operation (op_*) XDR failure matrices across all 13 classic & Soroban operation types."
    link: /result-codes/transactions
  - icon: "📊"
    title: "47 Live Network Statistics & R2 Lakehouse"
    details: "Query real-time and historical Stellar metrics (active accounts, Soroban resource fees, DEX volume, corridors) backed by 12 Parquet families."
    link: /guide/statistics
---

<div style="max-width: 1152px; margin: 28px auto 0; padding: 0 24px">
  <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 6px; border: none">
    Interactive Pubnet Playground & Error Decoder
  </h2>
  <p style="font-size: 14px; opacity: 0.8; margin-top: 0">
    Test live requests against <code>https://pubnet.stellarchain.io</code>, trigger real RFC 7807 error responses, or paste an error payload to diagnose it immediately:
  </p>
  <ApiPlayground />
</div>
