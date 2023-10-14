import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AccountActivation } from './AccountActivation';
import { Categories } from './Categories';
import { CategoryStatistics } from './CategoryStatistics';
import { CategoryView } from './CategoryView';
import { ROUTER_PATHS } from './constants';
import { ErrorPage } from './ErrorPage';
import { Home } from './Home';
import { Login } from './Login';
import { PasswordReset } from './PasswordReset';
import { Settings } from './Settings';
import { Transactions } from './Transactions';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTER_PATHS.home} Component={Home} />
        <Route path={ROUTER_PATHS.login} Component={Login} />
        <Route path={ROUTER_PATHS.forgotPassword} Component={PasswordReset} />
        <Route
          path={ROUTER_PATHS.activateAccount}
          Component={AccountActivation}
        />
        <Route path={ROUTER_PATHS.settings} Component={Settings} />
        <Route path={ROUTER_PATHS.categories} Component={Categories} />
        <Route path={ROUTER_PATHS.categoryById} Component={CategoryView} />
        <Route path={ROUTER_PATHS.transactions} Component={Transactions} />
        <Route
          path={ROUTER_PATHS.categoryStatsById}
          Component={CategoryStatistics}
        />
        <Route path="*" element={<ErrorPage>Page Not Found</ErrorPage>} />
      </Routes>
    </BrowserRouter>
  );
};