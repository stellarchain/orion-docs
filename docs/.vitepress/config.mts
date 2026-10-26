import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Orion Stellar Docs',
  description: 'Official Error Reference, Result Codes & API Documentation for Orion (pubnet.stellarchain.io)',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { property: 'og:site_name', content: 'Orion StellarChain Documentation' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    outline: { level: [2, 3], label: 'On this page' },
    nav: [
      { text: 'Guide & API', link: '/guide/' },
      { text: 'Horizon Errors', link: '/horizon-errors/' },
      { text: 'Orion Problems', link: '/problems/' },
      { text: 'Result Codes', link: '/result-codes/' },
      { text: 'Live API (Pubnet)', link: 'https://pubnet.stellarchain.io/' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: {
      '/guide/': [
        {
          text: 'Orion API Guide',
          items: [
            { text: 'Getting Started', link: '/guide/' },
            { text: 'Endpoints Reference', link: '/guide/endpoints' },
            { text: 'Live Statistics (47 Metrics)', link: '/guide/statistics' },
            { text: 'Architecture & R2 Lakehouse', link: '/guide/architecture' },
            { text: 'Error Response Structure', link: '/guide/response' },
            { text: 'Error Handling Strategies', link: '/guide/error-handling' }
          ]
        }
      ],
      '/horizon-errors/': [
        {
          text: 'Horizon Error Reference',
          items: [
          {
                    "text": "All Horizon Errors",
                    "link": "/horizon-errors/"
          },
          {
                    "text": "bad_request (400)",
                    "link": "/horizon-errors/bad_request"
          },
          {
                    "text": "before_history (410)",
                    "link": "/horizon-errors/before_history"
          },
          {
                    "text": "client_disconnected (499)",
                    "link": "/horizon-errors/client_disconnected"
          },
          {
                    "text": "forbidden (403)",
                    "link": "/horizon-errors/forbidden"
          },
          {
                    "text": "invalid_accounts_params (400)",
                    "link": "/horizon-errors/invalid_accounts_params"
          },
          {
                    "text": "invalid_order_book (400)",
                    "link": "/horizon-errors/invalid_order_book"
          },
          {
                    "text": "method_not_allowed (405)",
                    "link": "/horizon-errors/method_not_allowed"
          },
          {
                    "text": "not_acceptable (406)",
                    "link": "/horizon-errors/not_acceptable"
          },
          {
                    "text": "not_found (404)",
                    "link": "/horizon-errors/not_found"
          },
          {
                    "text": "not_implemented (404)",
                    "link": "/horizon-errors/not_implemented"
          },
          {
                    "text": "not_supported (400)",
                    "link": "/horizon-errors/not_supported"
          },
          {
                    "text": "rate_limit_exceeded (429)",
                    "link": "/horizon-errors/rate_limit_exceeded"
          },
          {
                    "text": "resource_limit_exceeded (422)",
                    "link": "/horizon-errors/resource_limit_exceeded"
          },
          {
                    "text": "server_error (500)",
                    "link": "/horizon-errors/server_error"
          },
          {
                    "text": "server_over_capacity (503)",
                    "link": "/horizon-errors/server_over_capacity"
          },
          {
                    "text": "service_unavailable (503)",
                    "link": "/horizon-errors/service_unavailable"
          },
          {
                    "text": "stale_history (503)",
                    "link": "/horizon-errors/stale_history"
          },
          {
                    "text": "still_ingesting (503)",
                    "link": "/horizon-errors/still_ingesting"
          },
          {
                    "text": "timeout (504)",
                    "link": "/horizon-errors/timeout"
          },
          {
                    "text": "transaction_failed (400)",
                    "link": "/horizon-errors/transaction_failed"
          },
          {
                    "text": "transaction_malformed (400)",
                    "link": "/horizon-errors/transaction_malformed"
          },
          {
                    "text": "transaction_submission_timeout (504)",
                    "link": "/horizon-errors/transaction_submission_timeout"
          },
          {
                    "text": "unsupported_media_type (415)",
                    "link": "/horizon-errors/unsupported_media_type"
          }
]
        }
      ],
      '/problems/': [
        {
          text: 'Orion Problem Reference',
          items: [
          {
                    "text": "All Orion Problems",
                    "link": "/problems/"
          },
          {
                    "text": "account_not_found (404)",
                    "link": "/problems/account_not_found"
          },
          {
                    "text": "asset_not_found (404)",
                    "link": "/problems/asset_not_found"
          },
          {
                    "text": "bundle_advanced (409)",
                    "link": "/problems/bundle_advanced"
          },
          {
                    "text": "capability_unavailable (503)",
                    "link": "/problems/capability_unavailable"
          },
          {
                    "text": "claimable_balance_not_found (404)",
                    "link": "/problems/claimable_balance_not_found"
          },
          {
                    "text": "cursor_context_mismatch (400)",
                    "link": "/problems/cursor_context_mismatch"
          },
          {
                    "text": "expired_cursor (410)",
                    "link": "/problems/expired_cursor"
          },
          {
                    "text": "history_incomplete (409)",
                    "link": "/problems/history_incomplete"
          },
          {
                    "text": "internal_error (500)",
                    "link": "/problems/internal_error"
          },
          {
                    "text": "invalid_account (400)",
                    "link": "/problems/invalid_account"
          },
          {
                    "text": "invalid_asset (400)",
                    "link": "/problems/invalid_asset"
          },
          {
                    "text": "invalid_claimable_balance (400)",
                    "link": "/problems/invalid_claimable_balance"
          },
          {
                    "text": "invalid_client_identity (400)",
                    "link": "/problems/invalid_client_identity"
          },
          {
                    "text": "invalid_contract_id (400)",
                    "link": "/problems/invalid_contract_id"
          },
          {
                    "text": "invalid_cursor (400)",
                    "link": "/problems/invalid_cursor"
          },
          {
                    "text": "invalid_include_failed (400)",
                    "link": "/problems/invalid_include_failed"
          },
          {
                    "text": "invalid_ledger (400)",
                    "link": "/problems/invalid_ledger"
          },
          {
                    "text": "invalid_ledger_sequence (400)",
                    "link": "/problems/invalid_ledger_sequence"
          },
          {
                    "text": "invalid_limit (400)",
                    "link": "/problems/invalid_limit"
          },
          {
                    "text": "invalid_liquidity_pool (400)",
                    "link": "/problems/invalid_liquidity_pool"
          },
          {
                    "text": "invalid_offer (400)",
                    "link": "/problems/invalid_offer"
          },
          {
                    "text": "invalid_operation_id (400)",
                    "link": "/problems/invalid_operation_id"
          },
          {
                    "text": "invalid_order (400)",
                    "link": "/problems/invalid_order"
          },
          {
                    "text": "invalid_parameter (400)",
                    "link": "/problems/invalid_parameter"
          },
          {
                    "text": "invalid_path_request (400)",
                    "link": "/problems/invalid_path_request"
          },
          {
                    "text": "invalid_statistics_metric (400)",
                    "link": "/problems/invalid_statistics_metric"
          },
          {
                    "text": "invalid_statistics_query (400)",
                    "link": "/problems/invalid_statistics_query"
          },
          {
                    "text": "invalid_stream_request (400)",
                    "link": "/problems/invalid_stream_request"
          },
          {
                    "text": "invalid_transaction_hash (400)",
                    "link": "/problems/invalid_transaction_hash"
          },
          {
                    "text": "liquidity_pool_not_found (404)",
                    "link": "/problems/liquidity_pool_not_found"
          },
          {
                    "text": "method_not_allowed (405)",
                    "link": "/problems/method_not_allowed"
          },
          {
                    "text": "not_acceptable (406)",
                    "link": "/problems/not_acceptable"
          },
          {
                    "text": "offer_not_found (404)",
                    "link": "/problems/offer_not_found"
          },
          {
                    "text": "operation_not_found (404)",
                    "link": "/problems/operation_not_found"
          },
          {
                    "text": "origin_not_allowed (403)",
                    "link": "/problems/origin_not_allowed"
          },
          {
                    "text": "overload (503)",
                    "link": "/problems/overload"
          },
          {
                    "text": "publication_integrity_failure (500)",
                    "link": "/problems/publication_integrity_failure"
          },
          {
                    "text": "rate_limited (429)",
                    "link": "/problems/rate_limited"
          },
          {
                    "text": "request_body_not_allowed (400)",
                    "link": "/problems/request_body_not_allowed"
          },
          {
                    "text": "request_canceled (408)",
                    "link": "/problems/request_canceled"
          },
          {
                    "text": "request_timeout (504)",
                    "link": "/problems/request_timeout"
          },
          {
                    "text": "request_too_large (413)",
                    "link": "/problems/request_too_large"
          },
          {
                    "text": "resource_limit (422)",
                    "link": "/problems/resource_limit"
          },
          {
                    "text": "route_not_found (404)",
                    "link": "/problems/route_not_found"
          },
          {
                    "text": "service_unavailable (503)",
                    "link": "/problems/service_unavailable"
          },
          {
                    "text": "stale_cursor (409)",
                    "link": "/problems/stale_cursor"
          },
          {
                    "text": "statistics_integrity_failure (500)",
                    "link": "/problems/statistics_integrity_failure"
          },
          {
                    "text": "statistics_metric_not_found (404)",
                    "link": "/problems/statistics_metric_not_found"
          },
          {
                    "text": "statistics_unavailable (503)",
                    "link": "/problems/statistics_unavailable"
          },
          {
                    "text": "stream_gap (409)",
                    "link": "/problems/stream_gap"
          },
          {
                    "text": "transaction_not_found (404)",
                    "link": "/problems/transaction_not_found"
          },
          {
                    "text": "unsupported_media_type (415)",
                    "link": "/problems/unsupported_media_type"
          },
          {
                    "text": "unsupported_parameter (400)",
                    "link": "/problems/unsupported_parameter"
          }
]
        }
      ],
      '/result-codes/': [
        {
          text: 'Stellar Core Result Codes',
          items: [
            { text: 'Overview', link: '/result-codes/' },
            { text: 'Transaction Result Codes', link: '/result-codes/transactions' },
            { text: 'Operation Result Codes', link: '/result-codes/operations' },
            {
              text: 'Operation-Specific Codes',
              items: [
                { text: 'Create Account', link: '/result-codes/operation-specific/create-account' },
                { text: 'Payment', link: '/result-codes/operation-specific/payment' },
                { text: 'Path Payment Strict Receive', link: '/result-codes/operation-specific/path-payment-strict-receive' },
                { text: 'Path Payment Strict Send', link: '/result-codes/operation-specific/path-payment-strict-send' },
                { text: 'Manage Sell Offer', link: '/result-codes/operation-specific/manage-sell-offer' },
                { text: 'Manage Buy Offer', link: '/result-codes/operation-specific/manage-buy-offer' },
                { text: 'Create Passive Sell Offer', link: '/result-codes/operation-specific/create-passive-sell-offer' },
                { text: 'Set Options', link: '/result-codes/operation-specific/set-options' },
                { text: 'Change Trust', link: '/result-codes/operation-specific/change-trust' },
                { text: 'Allow Trust', link: '/result-codes/operation-specific/allow-trust' },
                { text: 'Account Merge', link: '/result-codes/operation-specific/account-merge' },
                { text: 'Manage Data', link: '/result-codes/operation-specific/manage-data' },
                { text: 'Bump Sequence', link: '/result-codes/operation-specific/bump-sequence' }
              ]
            }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/stellarchain/orion-docs' }
    ],
    editLink: {
      pattern: 'https://github.com/stellarchain/orion-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Open-Source Stellar Horizon & Orion Documentation under MIT License.',
      copyright: 'Copyright © 2026 StellarChain.io'
    }
  }
})
