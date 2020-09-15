import React from "react";
import { validateStacksAddress } from "@utils/validation";
import produce from "immer";
import { prepareTransaction } from "@common/lib/transactions";
import bip39 from 'bip39';
import { mnemonicToStxAddress, emptySeedArray } from '@utils/utils'

const handleValidation = (
  sender,
  currentBalance,
  pendingBalance,
  values,
  setState,
  nextView,
  type
) => {
  const { recipient, amount, memo } = values;

  const availableBalance =
    pendingBalance && pendingBalance < currentBalance
      ? pendingBalance
      : currentBalance;

  let errors = {};

  if (amount === "") {
    errors.amount = "请输入有效金额";
  }

  if (amount && Number(amount) < 0.000001) {
    errors.amount = "最低转账金额是0.000001";
  }

  if (recipient === "") {
    errors.recipient = "请输入有效STX地址";
  }

  if (!errors.amount && !(Number(availableBalance) >= Number(amount))) {
    errors.amount = "账户余额不足!";
  }

  if (!errors.recipient) {
    const valid = validateStacksAddress(recipient);
    if (!valid) {
      errors.recipient = "无效STX地址";
    }
    if (recipient === sender) {
      errors.recipient = "收款地址和来源地址相同";
    }
  }

  if (memo !== "" && memo.length > 32) {
    errors.memo = "备注过长";
  }
  
  if (Object.entries(errors).length) {
    setState({
      errors
    });
    return null;
  }

  setState({
    processing: true
  });

  return prepareTransaction(
    sender,
    values.recipient,
    values.amount,
    type,
    values.memo || ""
  ).then(tx => {
    if (tx.error) {
      setState({
        errors: tx,
        processing: false
      });
      return nextView();
    }
    if (Object.entries(errors).length) {
      setState({
        errors,
        processing: false
      });
      return null;
    } else {
      setState({
        errors,
        processing: false
      });
      nextView();
    }
  });
};

const handleSeedValidation = (
  sender,
  values,
  setState,
  next
) => {
  setState({
    processing: true
  });
  const { seedArray } = values;
  let errors = {};
  const seedString = seedArray.join(' ')

  if (!bip39.validateMnemonic(seedString)) {
    errors.seed = "错误或无效助记";
  }

  const address = mnemonicToStxAddress(seedString)

  if (address !== sender) {
    errors.seed = "错误或无效助记";
  }

  if (Object.entries(errors).length) {
    setState({
      errors,
      processing: false
    });
    return null;
  } else {
    setState({
      errors,
      processing: false
    }, next);
  }
}

const updateValue = (value, setState, key) =>
  setState(state =>
    produce(state, draft => {
        draft.values[key] = value;
    })
  );

const updateValueWithIndex = (value, setState, key, index) => 
  setState(state =>
    produce(state, draft => {
      if(draft.values[key]) {
        draft.values[key][index] = value;
      }
    })
  );

const handleChange = (event, setState, key) =>
  updateValue(event.target.value, setState, key);

const handleSeedChange = (event, setState, index) =>
  updateValueWithIndex(event.target.value, setState, "seedArray", index);

const clearSeed = (setState) =>  
  setState(state =>
    produce(state, draft => {
      draft.seed = '',
      draft.values['seedArray'] = emptySeedArray(24)
    })
  );

const handleBtcCheck = async (
  sender,
  currentBalance,
  values,
  setState,
  nextView,
  type
) => {
  const tx = await prepareTransaction(
    sender,
    values.recipient,
    values.amount,
    type,
    values.memo || ""
  );

  if (!tx.error) {
    console.log("can proceed");
  }
};

export { handleValidation, handleSeedValidation, handleChange, handleSeedChange, updateValue, clearSeed };
