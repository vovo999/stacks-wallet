import React from "react";
import { Field, BalanceField } from "@components/field";
import { Button, Type, Flex, Card } from "blockstack-ui";

const InitialScreen = ({
  nextView,
  hide,
  state,
  setState,
  children,
  balance,
  sender,
  wrapper: Wrapper,
  type,
  handleChange,
  handleValidation,
  pendingBalance,
  ...rest
}) => (
  <Wrapper hide={hide}>
    <Field
      name="recipient"
      label="收款地址"
      error={state.errors.recipient}
      onChange={e => handleChange(e, setState, "recipient")}
      placeholder="输入STX地址"
      value={state.values.recipient}
      autofocus
    />
    <BalanceField />
    <Field
      name="amount"
      overlay="STX"
      label="金额"
      onChange={e => handleChange(e, setState, "amount")}
      type="number"
      error={state.errors.amount}
      placeholder="0.000000"
      value={state.values.amount}
      max={balance}
    />
    <Field
      name="memo"
      label="备注"
      is="textarea"
      value={state.values.memo}
      onChange={e => handleChange(e, setState, "memo")}
      placeholder="填写备注"
      error={state.errors.memo}
    />
    {children
      ? children({
          next: {
            props: {
              disabled: state.processing
            },
            label: state.processing ? "加载中..." : "继续",
            action: () =>
              state.processing ? null :
                handleValidation(
                  sender,
                  balance,
                  pendingBalance,
                  state.values,
                  setState,
                  nextView,
                  type
                )
          },
          secondary: {
            label: "取消",
            action: hide
          }
        })
      : null}
  </Wrapper>
);

export { InitialScreen };
