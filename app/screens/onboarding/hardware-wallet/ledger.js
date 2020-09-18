// @flow
import React, { Component } from "react";
import { Flex, Type, Input, Box, Buttons } from "blockstack-ui/dist";
import { Page } from "@components/page";
import { OnboardingNavigation } from "@containers/buttons/onboarding-navigation";
import { ROUTES } from "@common/constants";
import { BitcoinIcon, NoEntryIcon, UsbIcon, LockIcon } from "mdi-react";
import { HardwareSteps } from "@containers/hardware-steps";
import { doAddHardwareWallet, doFetchBalances } from "@stores/actions/wallet";
import { selectWalletLoading } from "@stores/selectors/wallet";
import { WALLET_TYPES } from "@stores/reducers/wallet";
import { connect } from "react-redux";

export const ledgerSteps = [
  {
    value: `将硬件钱包连接至电脑USB插口`,
    icon: UsbIcon
  },
  {
    value: "在硬件钱包上输入PIN解锁",
    icon: LockIcon
  },
  {
    value: "在硬件钱包上选择Bitcoin App",
    icon: BitcoinIcon
  },
  {
    value: `如果你的硬件钱包支持Browser Support选项，请选择No（关闭）`,
    icon: NoEntryIcon
  }
];

export const LedgerSteps = connect(
  state => ({
    loading: selectWalletLoading(state)
  }),
  { doAddHardwareWallet }
)(({ doAddHardwareWallet, loading, ...rest }) => {
  const handleSubmit = () => {
    doAddHardwareWallet(WALLET_TYPES.LEDGER);
  };
  return (
    <HardwareSteps steps={ledgerSteps}>
      {({ step, next, hasNext, hasPrev, prev }) => (
        <OnboardingNavigation
          onDark
          back={hasPrev ? prev : ROUTES.RESTORE_HARDWARE}
          next={{
            action: hasNext ? next : handleSubmit,
            label: loading ? "加载中…" : hasNext ? "下一步" : "继续",
            props: {
              style: {
                pointerEvents: loading ? "none" : "unset"
              }
            }
          }}
        />
      )}
    </HardwareSteps>
  );
});

const LedgerPage = ({ style, ...rest }) => (
  <Page
    alignItems="center"
    justifyContent="center"
    title="连接Ledger硬件钱包"
    style={style}
  >
    <Flex width={1} flexDirection={"column"} maxWidth="600px">
      <Flex py={6} justifyContent="space-between" width={1}>
        <LedgerSteps />
      </Flex>
    </Flex>
  </Page>
);

export default LedgerPage;
