---
title: Transaction Result Codes
description: "These are Result Codes that communicate success (200) or failure (400) at the transaction level: bad sequence numbers, insufficient balances, insufficient..."
---

These are Result Codes that communicate success (200) or failure (400) at the transaction level: bad sequence numbers, insufficient balances, insufficient fees, etc.

Each entry shows the Horizon result code, then the Stellar protocol code.


### `tx_success` <Badge type="tip" text="txSUCCESS" />


The transaction succeeded.





### `tx_failed` <Badge type="tip" text="txFAILED" />


One of the operations failed (none were applied).





### `tx_too_early` <Badge type="tip" text="txTOO_EARLY" />


The ledger closeTime was before the minTime.





### `tx_too_late` <Badge type="tip" text="txTOO_LATE" />


The ledger closeTime was after the maxTime.





### `tx_missing_operation` <Badge type="tip" text="txMISSING_OPERATION" />


No operation was specified





### `tx_bad_seq` <Badge type="tip" text="txBAD_SEQ" />


sequence number does not match source account





### `tx_bad_auth` <Badge type="tip" text="txBAD_AUTH" />


too few valid signatures / wrong network





### `tx_insufficient_balance` <Badge type="tip" text="txINSUFFICIENT_BALANCE" />


fee would bring account below reserve





### `tx_no_source_account` <Badge type="tip" text="txNO_ACCOUNT" />


source account not found





### `tx_insufficient_fee` <Badge type="tip" text="txINSUFFICIENT_FEE" />


fee is too small





### `tx_bad_auth_extra` <Badge type="tip" text="txBAD_AUTH_EXTRA" />


unused signatures attached to transaction





### `tx_internal_error` <Badge type="tip" text="txINTERNAL_ERROR" />


an unknown error occurred




```json Example Response for a 'tx_bad_seq' Result Code
{
  "type": "https://orion.stellarchain.io/horizon-errors/transaction_failed",
  "title": "Transaction Failed",
  "status": 400,
  "detail": "The transaction failed when submitted to the Stellar network. The `extras.result_codes` field on this response contains further details.  Descriptions of each code can be found at: https://stellar.org/developers/learn/concepts/list-of-operations.html",
  "extras": {
    "envelope_xdr": "AAAAANPRjCD1iCti3hovsrrz6aSAjmp263grVr6+mI3SQSkcAAAAZAAPRLgAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAArki/TnIipBc7Y+Hd87mnZdtBxzm7vu6iXpwcRz6zGskAAAAAAAAAAAAHoSAAAAAAAAAAAdJBKRwAAABANWeKuRYFmBm1lrMQqMvhbSouwL270SnxcTtv1XI4Y+uVe4yw4Jq7/43EoxwLbRh/pC3V4WfOZRzDqwsTyEztAA==",
    "result_codes": {
      "transaction": "tx_bad_seq"
    },
    "result_xdr": "AAAAAAAAAAD////7AAAAAA=="
  }
}
```
