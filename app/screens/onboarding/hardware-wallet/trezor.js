import React from "react";
import { Flex } from "blockstack-ui/dist";
import { Page } from "@components/page";
import { HardwareSteps } from "@containers/hardware-steps";
import { OnboardingNavigation } from "@containers/buttons/onboarding-navigation";
import { UsbIcon } from "mdi-react";
import { doAddHardwareWallet } from "@stores/actions/wallet";
import { WALLET_TYPES } from "@stores/reducers/wallet";
import { Notice } from "@components/notice";
import { connect } from "react-redux";
import { TextLink } from "@containers/buttons/onboarding-navigation";
import { shell } from "electron";
export const trezorSteps = [
  {
    value: `将硬件钱包连接到电脑USB插口`,
    icon: UsbIcon
  }
];
const TrezorPage = connect(
  null,
  { doAddHardwareWallet }
)(({ doAddHardwareWallet, style, ...rest }) => {
  const handleSubmit = () => {
    doAddHardwareWallet(WALLET_TYPES.TREZOR);
  };
  return (
    <Page
      alignItems="center"
      justifyContent="center"
      title="连接Trezor硬件钱包"
      style={style}
    >
      <Flex width={1} flexDirection={"column"} maxWidth="600px">
        <Flex
          py={6}
          justifyContent="space-between"
          flexDirection="column"
          width={1}
        >
          <Notice mb={6} dark>
          请确认电脑已安装{" "}
            <TextLink
              onClick={() =>
                shell.openExternal("https://wallet.trezor.io/#/bridge")
              }
              px={1}
              onDark
              pt={0}
              fontSize="1rem"
            >
              Trezor Bridge
            </TextLink>{" "}
            插件。
          </Notice>

          <HardwareSteps steps={trezorSteps}>
            {({ step, next, hasNext }) => (
              <>
                <OnboardingNavigation
                  onDark
                  back={"/restore-hardware"}
                  next={hasNext ? next : handleSubmit}
                />
              </>
            )}
          </HardwareSteps>
        </Flex>
      </Flex>
    </Page>
  );
});

export default TrezorPage;
