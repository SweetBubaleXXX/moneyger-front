import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ROUTER_PATHS } from './constants';
import { Home } from './Home';
import { Login } from './Login';

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTER_PATHS.home} element={<Home />}></Route>
        <Route path={ROUTER_PATHS.login} element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};