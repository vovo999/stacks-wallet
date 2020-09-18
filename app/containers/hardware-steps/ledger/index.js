import React from "react";
import { State } from "react-powerplug";
import { BitcoinIcon, NoEntryIcon, UsbIcon, LockIcon } from "mdi-react";
import { Flex } from "blockstack-ui/dist";

const steps = [
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

const HardwareSteps = ({ steps, ...rest }) => (
  <State initial={{ step: 0 }}>
    {({ state, setState }) => {
      const { value, icon: Icon } = steps[state.step];
      return (
        <Flex>
          <Flex>
            <Icon />
          </Flex>
          <Flex>{value}</Flex>
        </Flex>
      );
    }}
  </State>
);

const LedgerSteps = ({ ...rest }) => (
  <State initial={{ step: 0 }}>
    {({ state, setState }) => {
      const { value, icon: Icon } = steps[state.step];
      return (
        <Flex>
          <Flex>
            <Icon />
          </Flex>
          <Flex>{value}</Flex>
        </Flex>
      );
    }}
  </State>
);
