import React from "react";
import { Flex, Box, Type, Button } from "blockstack-ui/dist";
import { satoshisToBtc } from "@utils/utils";

import { connect } from "react-redux";
import { selectWalletBitcoinBalance } from "@stores/selectors/wallet";

import { StaticField, Label } from "@components/field";
import { TopSection, BottomSection } from "@containers/modals/withdraw/common";

const mapStateToProps = state => ({
  balance: selectWalletBitcoinBalance(state)
});

export const SuccessScreen = connect(mapStateToProps)(
  ({ hide, recipient, rawTx, transaction, balance }) => (
    <>
      <TopSection>
        <Type fontSize={4} lineHeight={1.5}>
          转账交易完成发送！
        </Type>
      </TopSection>
      <BottomSection>
        <Flex pb={4} flexDirection="column">
          <Label>转出金额</Label>
          <Type fontSize={4}>{satoshisToBtc(balance - rawTx.fee)} BTC</Type>
          <Label pt={3}>转账手续费</Label>
          <Type>{satoshisToBtc(rawTx.fee)} BTC</Type>
        </Flex>
        <Flex flexDirection="column">
          <StaticField label="收款地址" value={recipient} />
          <StaticField
            label="交易哈希值"
            value={transaction}
            link={`https://explorer.blockstack.org/tx/${transaction}`}
          />
        </Flex>
        <Box mx="auto">
          <Button onClick={hide}>关闭</Button>
        </Box>
      </BottomSection>
    </>
  )
);
