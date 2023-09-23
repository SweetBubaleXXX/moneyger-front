import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AddCategory } from './AddCategory';
import { Categories } from './Categories';
import { CategoryView } from './CategoryView';
import { ROUTER_PATHS } from './constants';
import { Home } from './Home';
import { Login } from './Login';

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTER_PATHS.home} Component={Home} />
        <Route path={ROUTER_PATHS.login} Component={Login} />
        <Route path={ROUTER_PATHS.categories} Component={Categories} />
        <Route path={ROUTER_PATHS.createCategory} Component={AddCategory} />
        <Route path={ROUTER_PATHS.categoryById} Component={CategoryView} />
      </Routes>
    </BrowserRouter>
  );
};