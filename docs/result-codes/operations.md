---
title: Operation Result Codes
description: "These are Result Codes that communicate success (200) or failure (400) at the operation level: no source account, too many subentries, etc."
---

These are Result Codes that communicate success (200) or failure (400) at the operation level: no source account, too many subentries, etc.

Each entry shows the Horizon result code, then the Stellar protocol code.


### `op_inner` <Badge type="tip" text="opINNER" />


The inner object result is valid and the operation was a success.





### `op_bad_auth` <Badge type="tip" text="opBAD_AUTH" />


There are too few valid signatures, or the transaction was submitted to the wrong network.





### `op_no_source_account` <Badge type="tip" text="opNO_ACCOUNT" />


The source account was not found.





### `op_not_supported` <Badge type="tip" text="opNOT_SUPPORTED" />


The operation is not supported at this time.





### `op_too_many_subentries` <Badge type="tip" text="opTOO_MANY_SUBENTRIES" />


Max number of subentries (1000) already reached





### `op_exceeded_work_limit` <Badge type="tip" text="opEXCEEDED_WORK_LIMIT" />


Operation did too much work




```json Example Response for an 'op_no_source_account' Result Code
{
  "type": "https://orion.stellarchain.io/horizon-errors/transaction_failed",
  "title": "Transaction Failed",
  "status": 400,
  "detail": "The transaction failed when submitted to the Stellar network. The `extras.result_codes` field on this response contains further details.  Descriptions of each code can be found at: https://stellar.org/developers/learn/concepts/list-of-operations.html",
  "extras": {
    "envelope_xdr": "AAAAANPRjCD1iCti3hovsrrz6aSAjmp263grVr6+mI3SQSkcAAAAZAAPRLgAAAADAAAAAAAAAAAAAAABAAAAAQAAAACuSL9OciKkFztj4d3zuadl20HHObu+7qJenBxHPrMayQAAAAUAAAABAAAAANPRjCD1iCti3hovsrrz6aSAjmp263grVr6+mI3SQSkcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtJBKRwAAABA1N0iqDAgqS6+3RIZGoNB9OXrY3wd/nLruXYi+eiTt4jn94fLVLwAw6jJCaK+qxStwO7c4kP6u5k0RPbuYC55CT6zGskAAABAiUGCNCS4pGlfcRmi82kbralzcFlTQAFzLyfUrYGn3RtQ4p/7TUwAqIanVoWGfEqzIJo64ZT+mYtJ72BfI+FiDg==",
    "result_codes": {
      "transaction": "tx_failed",
      "operations": ["op_no_source_account"]
    },
    "result_xdr": "AAAAAAAAAGT/////AAAAAf////4AAAAA"
  }
}
```
