---
title: Create Passive Sell Offer Result Codes
description: "These are result codes that communicate success (200) or failure (400) specific to the Create Passive Sell Offer operation."
---

These are result codes that communicate success (200) or failure (400) specific to the `Create Passive Sell Offer` operation.

Learn more about the [`Create Passive Sell Offer` operation](https://developers.stellar.org/docs/learn/fundamentals/transactions/list-of-operations#create-passive-sell-offer).


### `OpSuccess` <Badge type="tip" text="CREATE_PASSIVE_SELL_OFFER_SUCCESS" />


The passive sell offer was successfully placed.





### `OpMalformed` <Badge type="tip" text="MANAGE_SELL_OFFER_MALFORMED" />


The input is incorrect and would result in an invalid offer.





### `op_sell_no_trust` <Badge type="tip" text="MANAGE_SELL_OFFER_SELL_NO_TRUST" />


The account creating the offer does not have a trustline for the asset it is selling.





### `op_buy_no_trust` <Badge type="tip" text="MANAGE_SELL_OFFER_BUY_NO_TRUST" />


The account creating the offer does not have a trustline for the asset it is buying.





### `sell_not_authorized` <Badge type="tip" text="MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED" />


The account creating the offer is not authorized to sell this asset.





### `buy_not_authorized` <Badge type="tip" text="MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED" />


The account creating the offer is not authorized to buy this asset.





### `OpLineFull` <Badge type="tip" text="MANAGE_SELL_OFFER_LINE_FULL" />


The account creating the offer does not have sufficient limits to receive buying and still satisfy its buying liabilities.





### `OpUnderfunded` <Badge type="tip" text="MANAGE_SELL_OFFER_UNDERFUNDED" />


The account creating the offer does not have sufficient limits to send selling and still satisfy its selling liabilities. Note that if selling XLM then the account must additionally maintain its minimum XLM reserve, which is calculated assuming this offer will not completely execute immediately.





### `op_cross_self` <Badge type="tip" text="MANAGE_SELL_OFFER_CROSS_SELF" />


The account has opposite offer of equal or lesser price active, so the account creating this offer would immediately cross itself.





### `op_sell_no_issuer` <Badge type="tip" text="MANAGE_SELL_OFFER_SELL_NO_ISSUER" />


The issuer of selling asset does not exist.





### `buy_no_issuer` <Badge type="tip" text="MANAGE_SELL_OFFER_BUY_NO_ISSUER" />


The issuer of buying asset does not exist.





### `op_offer_not_found` <Badge type="tip" text="MANAGE_SELL_OFFER_NOT_FOUND" />


An offer with that offerID cannot be found.





### `OpLowReserve` <Badge type="tip" text="MANAGE_SELL_OFFER_LOW_RESERVE" />


The account creating this offer does not have enough XLM to satisfy the minimum XLM reserve increase caused by adding a subentry and still satisfy its XLM selling liabilities. For every offer an account creates, the minimum amount of XLM that account must hold will increase.



