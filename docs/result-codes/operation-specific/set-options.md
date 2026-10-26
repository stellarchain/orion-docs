---
title: Set Options Result Codes
description: "These are result codes that communicate success (200) or failure (400) specific to the Set Options operation."
---

These are result codes that communicate success (200) or failure (400) specific to the `Set Options` operation.

Learn more about the [`Set Options` operation](https://developers.stellar.org/docs/learn/fundamentals/transactions/list-of-operations#set-options).


### `OpSuccess` <Badge type="tip" text="SET_OPTIONS_SUCCESS" />


Options successfully set.





### `OpLowReserve` <Badge type="tip" text="SET_OPTIONS_LOW_RESERVE" />


This account does not have enough XLM to satisfy the minimum XLM reserve increase caused by adding a subentry and still satisfy its XLM selling liabilities. For every new signer added to an account, the minimum reserve of XLM that account must hold increases.





### `op_too_many_signers` <Badge type="tip" text="SET_OPTIONS_TOO_MANY_SIGNERS" />


20 is the maximum number of signers an account can have, and adding another signer would exceed that.





### `op_bad_flags` <Badge type="tip" text="SET_OPTIONS_BAD_FLAGS" />


The flags set and/or cleared are invalid by themselves or in combination.





### `op_invalid_inflation` <Badge type="tip" text="SET_OPTIONS_INVALID_INFLATION" />


The destination account set in the inflation field does not exist.





### `op_cant_change` <Badge type="tip" text="SET_OPTIONS_CANT_CHANGE" />


This account can no longer change the option it wants to change.





### `op_unknown_flag` <Badge type="tip" text="SET_OPTIONS_UNKNOWN_FLAG" />


The account is trying to set a flag that is unknown.





### `op_threshold_out_of_range` <Badge type="tip" text="SET_OPTIONS_THRESHOLD_OUT_OF_RANGE" />


The value for a key weight or threshold is invalid.





### `op_bad_signer` <Badge type="tip" text="SET_OPTIONS_BAD_SIGNER" />


Any additional signers added to the account cannot be the master key.





### `op_invalid_home_domain` <Badge type="tip" text="SET_OPTIONS_INVALID_HOME_DOMAIN" />


Home domain is malformed.



