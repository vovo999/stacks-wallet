import React, { Component } from "react";
import { Box, Flex, Buttons, Type } from "blockstack-ui/dist";
import { Button } from "@components/button/index";
import { Seed } from "@components/seed/index";
import { Page } from "@components/page";
import { OnboardingNavigation } from "@containers/buttons/onboarding-navigation";
import { Link } from "react-router-dom";
import { ROUTES } from "@common/constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { selectWalletLoading, selectWalletSeed } from "@stores/selectors/wallet";
import { doGenerateNewSeed, doRefreshData } from "@stores/actions/wallet";

const Title = ({ ...rest }) => (
  <Type
    display="block"
    fontSize={7}
    fontWeight="300"
    fontFamily="brand"
    lineHeight={1.3}
    {...rest}
  />
);

class NewSeedScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    seed: null,
    loading: false
  };

  componentDidMount = () => {
    this.props.doGenerateNewSeed()
  }

  render () {
    const { 
      doGenerateNewSeed, 
      doRefreshData, 
      loading,
      seed, 
      ...rest 
    } = this.props

    return (
      <Page
        alignItems="center"
        justifyContent="center"
        {...rest}
      >
        <Flex
          flexGrow={1}
          flexDirection="column"
          bg="blue.dark"
          color="white"
          justifyContent="center"
          alignItems="center"
          textAlign="left"
          {...rest}
        >
          <Box maxWidth="600px">
            <Title>保存助记</Title>
          </Box>
          <Type
            pt={4}
            pb={1}
            Type
            lineHeight={1.5}
            fontSize={2}
            color="hsl(242, 56%, 75%)"
            maxWidth="600px"
          >
            每个Stacks钱包都有相对应的24个单词助记。有助记才能开启和使用钱包。
          </Type>
          <Type
            pt={2}
            pb={1}
            Type
            lineHeight={1.5}
            fontSize={2}
            textAlign="center"
            color="white"
            maxWidth="600px"
          >
            注意：保护好您的助记。如果丢失，将永久性失去您的Stacks币。
            <a href="https://docs.blockstack.org/org/secureref.html" target='_blank'>关于钱包安全（英文）</a>
          </Type>
          <Type
            pt={4}
            pb={1}
            Type
            lineHeight={1.5}
            fontSize={2}
            color="hsl(242, 56%, 75%)"
            maxWidth="600px"
            textAlign="center"
          >
            以下是您的钱包助记。请按顺序记下每个单词，然后安全保存。不建议存在电脑上。
            </Type>
          <Seed seedPhrase={seed} isInput={false} small={true}/>
          <Buttons maxWidth="420px" mx="auto" flexDirection="column" pt={4}>
            <Button outline is={Link} invert to={ROUTES.CONFIRM_SEED}>
              我记下了
            </Button>
            <OnboardingNavigation
                  onDark
                  back={ROUTES.NEW_OPTIONS}
                />
          </Buttons>
        </Flex>
      </Page>
    );
  }
}

export default connect(
  state => ({
    loading: selectWalletLoading(state),
    seed: selectWalletSeed(state)
  }),
  {
    doGenerateNewSeed,
    doRefreshData
  }
)(withRouter(NewSeedScreen));