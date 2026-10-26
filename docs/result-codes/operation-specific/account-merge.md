---
title: Account Merge Result Codes
description: "These are result codes that communicate success (200) or failure (400) specific to the Account Merge operation."
---

These are result codes that communicate success (200) or failure (400) specific to the `Account Merge` operation.

Learn more about the [`Account Merge` operation](https://developers.stellar.org/docs/learn/fundamentals/transactions/list-of-operations#account-merge).


### `OpSuccess` <Badge type="tip" text="ACCOUNT_MERGE_SUCCESS" />


Account succesfully merged.





### `OpMalformed` <Badge type="tip" text="ACCOUNT_MERGE_MALFORMED" />


The operation is malformed because the source account cannot merge with itself. The destination must be a different account.





### `op_no_account` <Badge type="tip" text="ACCOUNT_MERGE_NO_ACCOUNT" />


The destination account does not exist.





### `op_immutable_set` <Badge type="tip" text="ACCOUNT_MERGE_IMMUTABLE_SET" />


The source account has AUTH_IMMUTABLE flag set.





### `op_has_sub_entries` <Badge type="tip" text="ACCOUNT_MERGE_HAS_SUB_ENTRIES" />


The source account still has non-signer subentries (trustlines, offers, or data entries). Signers are not a blocker — they are removed automatically as part of the merge.





### `op_seq_num_too_far` <Badge type="tip" text="ACCOUNT_MERGE_SEQNUM_TOO_FAR" />


Source account sequence number is too high.





### `op_dest_full` <Badge type="tip" text="ACCOUNT_MERGE_DEST_FULL" />


The destination account cannot receive the balance of the source account and still satisfy its lumen buying liabilities.





### `op_is_sponsor` <Badge type="tip" text="ACCOUNT_MERGE_IS_SPONSOR" />


The source account cannot be merged because it is sponsoring reserves. This covers two cases: it is already sponsoring reserves for other accounts (`numSponsoring > 0`), which must be revoked first; or it has an open is-sponsoring-future-reserves relationship earlier in the same transaction, which must be ended with `EndSponsoringFutureReserves` (there may be no created reserve to revoke in this case). Merely being sponsored by another account is not a blocker.



