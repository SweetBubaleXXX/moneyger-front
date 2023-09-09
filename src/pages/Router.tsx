import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import { ROUTER_PATHS } from './constants';

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