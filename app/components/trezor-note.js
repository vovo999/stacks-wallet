import React from "react";
import { Box } from "blockstack-ui/dist";
import { TextLink } from "@containers/buttons/onboarding-navigation";
import { shell } from "electron";

export const TrezorNote = ({ onDark = true, ...rest }) => (
  <Box fontSize="14px" {...rest}>
    如果使用Trezor遇到问题请查看相关
    <TextLink
      onClick={() =>
        shell.openExternal(
          "https://docs.blockstack.org/stacks-wallet/usage#trezor-wallet-support"
        )
      }
      fontSize="14px"
      px={1}
      pt={0}
      onDark={onDark}
    >
      帮助
    </TextLink>
  </Box>
);
