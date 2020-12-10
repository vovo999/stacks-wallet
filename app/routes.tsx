import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useStore } from 'react-redux';

import routes from './constants/routes.json';
import { Home } from './pages/home/home';
import { selectAddress } from './store/keys/keys.reducer';

import {
  Welcome,
  CreateWallet,
  RestoreWallet,
  GeneratingSecret,
  ConnectLedger,
  SecretKey,
  VerifyKey,
  SetPassword,
} from './pages/onboarding';

import { App } from './pages/app';
import { Settings } from './pages/settings/settings';
import { Stacking } from './pages/stacking/stacking';

export const routerConfig = [
  {
    path: routes.HOME,
    component: Home,
  },
  {
    path: routes.WELCOME,
    component: Welcome,
  },
  {
    path: routes.CREATE,
    component: CreateWallet,
  },
  {
    path: routes.RESTORE,
    component: RestoreWallet,
  },
  {
    path: routes.GENERATING,
    component: GeneratingSecret,
  },
  {
    path: routes.CONNECT_LEDGER,
    component: ConnectLedger,
  },
  {
    path: routes.SECRET_KEY,
    component: SecretKey,
  },
  {
    path: routes.VERIFY_KEY,
    component: VerifyKey,
  },
  {
    path: routes.SET_PASSWORD,
    component: SetPassword,
  },
  {
    path: routes.SET_PASSWORD,
    component: SetPassword,
  },
  {
    path: routes.SETTINGS,
    component: Settings,
  },
  {
    path: routes.STACKING,
    component: Stacking,
  },
];

const getAppStartingRoute = (address?: string) => (!!address ? routes.HOME : routes.WELCOME);

export function Routes() {
  // `useStore` required as we only want the value on initial render
  const store = useStore();
  const address = selectAddress(store.getState());
  return (
    <App>
      <Switch>
        {routerConfig.map((route, i) => (
          <Route key={i} exact {...route} />
        ))}
      </Switch>
      <Redirect exact from="/" to={getAppStartingRoute(address)} />
    </App>
  );
}
