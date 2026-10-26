---
title: Path Payment Strict Receive Result Codes
description: "These are result codes that communicate success (200) or failure (400) specific to the Path Payment Strict Receive operation."
---

These are result codes that communicate success (200) or failure (400) specific to the `Path Payment Strict Receive` operation.

Learn more about the [`Path Payment Strict Receive` operation](https://developers.stellar.org/docs/learn/fundamentals/transactions/list-of-operations#path-payment-strict-receive).


### `OpSuccess` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_SUCCESS" />


The payment was successfully completed.





### `OpMalformed` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_MALFORMED" />


The input for this path payment is invalid.





### `OpUnderfunded` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED" />


The source account (sender) does not have enough lumens to send the payment amount while maintaining its own minimum reserve.





### `OpSrcNoTrust` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST" />


The source account is missing the appropriate trustline.





### `OpSrcNotAuthorized` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED" />


The source account is not authorized to send this asset.





### `OpNoDestination` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION" />


The destination account does not exist.





### `OpNoTrust` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST" />


The destination account does not have a trustline for the asset being sent.





### `OpNotAuthorized` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED" />


The destination account is not authorized to hold this asset.





### `OpLineFull` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL" />


The destination account (receiver) does not have sufficient limits to receive amount and still satisfy its buying liabilities.





### `OpNoIssuer` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER" />


The issuer of one of the assets is missing.





### `OpTooFewOffers` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS" />


There is no path of offers connecting the send asset and destination asset. Stellar only considers paths of length 5 or shorter.





### `OpCrossSelf` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF" />


This path payment would cross one of its own offers.





### `OpOverSourceMax` <Badge type="tip" text="PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX" />


The paths that could send destination amount of destination asset would exceed send max.



