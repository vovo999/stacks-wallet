import React from "react";
import { Button, Buttons, Flex, Type } from "blockstack-ui/dist";
import { Modal } from "@components/modal";
import { Label } from "@components/field";
import { Value } from "@components/stacks";
import { TypeIcon } from "@components/transaction-item";
import { StaticField } from "@components/field";

const TxAmounts = ({ amount, fees, ...rest }) => (
  <Flex py={4} px={6} flexDirection="column" justifyContent="center">
    <Label>金额</Label>
    <Flex>
      <Value fontSize={6} amount={amount} suffix="STX" />
    </Flex>
    <Label pt={4} pb={0}>
      手续费
    </Label>
    <Value fontSize={2} fontWeight={500} amount={fees} suffix="BTC" satoshis />
  </Flex>
);

const OperationTypeSection = ({ item, stx, ...rest }) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    py={4}
    px={6}
    flexShrink={0}
    borderRight={1}
    borderColor="blue.mid"
    alignSelf={"stretch"}
  >
    <TypeIcon mb={2} size={72} item={item} stx={stx} />
    <Label pb={0}>{item.sender === stx ? "转出" : "转入"}</Label>
    <Label pb={0}>Stacks</Label>
  </Flex>
);

const TxDetailsModal = ({ hide, visible, tx, stx, ...rest }) => {
  const {
    sender,
    block_id,
    txid,
    consensusHash,
    valueStacks,
    value: amount,
    tokenAmountReadable,
    scratchData,
    tokenAmount,
    recipientBitcoinAddress,
    recipient,
    operation,
    memo,
    fees
  } = tx;

  const items = [
    {
      label: "源自地址",
      value: sender && typeof sender === "string" ? sender : sender.stx,
      link: `https://explorer.blockstack.org/address/stacks/${
        sender && typeof sender === "string" ? sender : sender.stx
      }`
    },
    {
      label: "收款地址",
      value: recipient,
      link: `https://explorer.blockstack.org/address/stacks/${recipient}`
    },
    {
      label: "BTC交易哈希值",
      value: txid,
      link: `https://explorer.blockstack.org/tx/${txid}`
    },
    {
      label: "BTC块",
      value: block_id,
      link: `https://explorer.blockstack.org/block/${block_id}`
    },
    { label: "备注", value: memo || scratchData }
  ];
  return (
    <Modal title="交易细节" hide={hide} p={0}>
      <Flex
        p={4}
        borderBottom={1}
        borderColor="blue.mid"
        bg="blue.light"
        alignItems="center"
        flexShrink={0}
      >
        <Flex
          width={1}
          bg="white"
          borderRadius={6}
          border={1}
          borderColor="blue.mid"
          alignItems="center"
          flexShrink={0}
          boxShadow="card"
        >
          <OperationTypeSection item={tx} stx={stx} />
          <TxAmounts fees={fees} satoshis amount={tokenAmountReadable} />
        </Flex>
      </Flex>
      <Flex flexDirection="column" p={4} pb={0} flexShrink={0}>
        {items.map(({ label, value, link }, i) =>
          value && value !== "" ? (
            <StaticField key={i} label={label} value={value} link={link} />
          ) : null
        )}
      </Flex>
    </Modal>
  );
};

export { TxDetailsModal };
