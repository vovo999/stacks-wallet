import React from "react";
import { Button, Type, Flex, Card } from "blockstack-ui";
import { StaticField, Label } from "@components/field";
import { satoshisToBtc } from "@utils/utils";

const Confirmation = ({
  hide,
  wrapper: Wrapper,
  nextView,
  children,
  state,
  goToView,
  setState,
  doBroadcastTransaction,
  ...rest
}) => {

  if (!state.tx) return <>出现错误！</>;

  const { fee, rawTx, decoded } = state.tx;
  if (!decoded) {
    return null;
  }

  return (
    <Wrapper p={0} pb={4} hide={hide}>
      <Flex
        borderBottom={1}
        borderColor="blue.mid"
        bg="blue.light"
        p={4}
        width={1}
      >
        <Card p={0} width={1}>
          <Flex flexGrow={1}>
            <Flex
              alignItems={"center"}
              p={4}
              borderRight={1}
              borderColor="blue.mid"
              width="50%"
            >
              <Type fontSize={3}>请确认转账</Type>
            </Flex>
            <Flex p={4} flexDirection="column">
              <Label>转账金额</Label>
              <Type fontSize={4}>{decoded.tokenAmountReadable} STX</Type>
              <Label pt={3}>手续费</Label>
              <Type>{satoshisToBtc(fee)} BTC</Type>
            </Flex>
          </Flex>
        </Card>
      </Flex>
      <Flex flexDirection="column" p={4} pb={0}>
        <StaticField label="收款地址" value={decoded.recipient} />
        {decoded.memo !== "" ? (
          <StaticField label="备注" value={decoded.memo} />
        ) : null}
      </Flex>
      {children
        ? children({
            next: {
              action: async () => {
                setState({
                  processing: true
                });
                const txHash = await doBroadcastTransaction(state.tx.rawTx);
                if (txHash) {
                  setState(
                    {
                      txHash,
                      processing: false
                    },
                    () => nextView()
                  );
                } else {
                  setState({
                    processing: false
                  });
                }
              },
              label: "确认"
            },
            secondary: {
              label: "取消",
              action: () => {
                goToView(0);
                setState({
                  tx: null
                });
              }
            }
          })
        : null}
    </Wrapper>
  );
};
export { Confirmation };
