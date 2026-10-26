---
title: Error Response
description: "When any error occurs, Horizon responds with a JSON document with the below attributes."
---

When any error occurs, Horizon responds with a JSON document with the below attributes.


### `type` <Badge type="tip" text="URL" />


The type of Status Code returned.





### `title` <Badge type="tip" text="string" />


A short title describing the Status Code, which can be used to look up more information about a error.





### `status` <Badge type="tip" text="number" />


A short title describing the Status Code, which can be used to look up more information about a error.





### `detail` <Badge type="tip" text="string" />


A short title describing the Status Code, which can be used to look up more information about a error.





### `extras` <Badge type="tip" text="map" />


If the Status Code is `Transaction Failed`, this extras field displays the Result Code returned by Stellar Core describing why the transaction failed.

  
::: details extras properties

    
### `envelope_xdr` <Badge type="tip" text="string" />


      A base64-encoded representation of the TransactionEnvelope XDR whose failure triggered this response.

    


    
### `result_xdr` <Badge type="tip" text="string" />


      A base64-encoded representation of the TransactionResult XDR returned by stellar-core when submitting this transaction.

    


    
### `result_codes.transaction` <Badge type="tip" text="string" />


      The transaction Result Code returned by Stellar Core, which can be used to look up more information about an error in the docs.

    


    
### `result_codes.operations` <Badge type="tip" text="array" />


      An array of operation Result Codes returned by Stellar Core, which can be used to look up more information about an error in the docs.

    


  
:::




```json Example
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
