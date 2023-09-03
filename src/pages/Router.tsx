import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};