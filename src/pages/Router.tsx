import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Categories } from './Categories';
import { CategoryView } from './CategoryView';
import { ROUTER_PATHS } from './constants';
import { Home } from './Home';
import { Login } from './Login';
import { Settings } from './Settings';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTER_PATHS.home} Component={Home} />
        <Route path={ROUTER_PATHS.login} Component={Login} />
        <Route path={ROUTER_PATHS.settings} Component={Settings} />
        <Route path={ROUTER_PATHS.categories} Component={Categories} />
        <Route path={ROUTER_PATHS.categoryById} Component={CategoryView} />
      </Routes>
    </BrowserRouter>
  );
};