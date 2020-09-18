import React from "react";
import { Flex, Type, Card } from "blockstack-ui/dist";
import SettingsIcon from "mdi-react/SettingsIcon";
import { Hover } from "react-powerplug";
import { TxList } from "@components/transaction-list";
import { OpenModal } from "@components/modal";
import { TableHeader } from "@components/table";
import { SettingsModal } from "@containers/modals/settings";
import { Balance } from "@containers/balance";
import { connect } from "react-redux";
import {
  selectWalletLoading,
  selectWalletData,
  selectPendingTxs,
  selectWalletIsFetching
} from "@stores/selectors/wallet";
import { ReceiveButton } from "@containers/balance";
import { ButtonCombo } from "@containers/buttons/onboarding-navigation";
import { doRefreshData } from "@stores/actions/wallet";
import debounce from "lodash.debounce";
import { Spinner } from "@components/spinner";

const Content = ({ ...rest }) => (
  <Flex flexDirection="column" flexShrink={0} flexGrow={1} {...rest} />
);

const SettingsButton = ({ ...rest }) => {
  return (
    <OpenModal component={({ visible, hide }) => <SettingsModal hide={hide} />}>
      {({ bind }) => (
        <Hover>
          {({ hovered, bind: hoveredBind }) => (
            <Flex
              position="relative"
              zIndex={999}
              p={2}
              opacity={hovered ? 1 : 0.5}
              cursor={hovered ? "pointer" : undefined}
              {...bind}
              {...hoveredBind}
            >
              <SettingsIcon />
            </Flex>
          )}
        </Hover>
      )}
    </OpenModal>
  );
};

const Header = ({ ...rest }) => {
  return (
    <Flex justifyContent="space-between">
      <Flex />
      <SettingsButton />
    </Flex>
  );
};
const tableHeadItems = [
  {
    label: "日期",
    width: 52
  },
  {
    label: "细节",
    width: 60,
    flexGrow: 1
  },
  {
    label: "金额",
    mr: 4
  }
];

const NewWallet = ({ doRefreshData, fetching, ...rest }) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    flexGrow={1}
  >
    <Card
      pt={8}
      px={7}
      pb={6}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Type pb={5} fontSize={5}>
        欢迎使用Stacks钱包
      </Type>
      <Type pb={2}>
        未有转账记录
      </Type>
      <Type pb={5}>点击收款查看STX地址和二维码</Type>
      <ButtonCombo
        pt={2}
        primary={{
          component: <ReceiveButton />
        }}
        secondary={{
          label: fetching ? (
            <Spinner stroke={4} size={18} color="currentColor" />
          ) : (
            "刷新"
          ),
          color: "blue",
          onClick: debounce(doRefreshData, 500)
        }}
      />
    </Card>
  </Flex>
);
const Dashboard = ({
  loading,
  data,
  style,
  doRefreshData,
  fetching,
  ...rest
}) => (
  <Flex style={style} bg="blue.light" flexGrow={1} maxWidth={"100%"}>
    <Content p={3} maxWidth={"100%"}>
      <Header />
      {!loading && data && !data.transactions ? (
        <NewWallet fetching={fetching} doRefreshData={doRefreshData} />
      ) : (
        <>
          <Balance />
          <TxList
            title="转账记录"
            contentHeader={<TableHeader items={tableHeadItems} />}
            action={{
              label: fetching ? (
                <Spinner stroke={4} size={20} color="currentColor" />
              ) : (
                "刷新"
              ),
              onClick: fetching ? () => null : doRefreshData
            }}
          />
        </>
      )}
    </Content>
  </Flex>
);

const mapStateToProps = state => ({
  loading: selectWalletLoading(state),
  data: selectWalletData(state),
  pending: selectPendingTxs(state),
  fetching: selectWalletIsFetching(state)
});

export default connect(
  mapStateToProps,
  { doRefreshData }
)(Dashboard);
