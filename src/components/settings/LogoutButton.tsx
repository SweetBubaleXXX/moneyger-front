import { Button } from '@mui/joy';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { api, useLogoutMutation } from '../../features/api/apiSlice';
import { clearToken } from '../../features/auth/authSlice';
import { ROUTER_PATHS } from '../../pages/constants';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, logoutResult] = useLogoutMutation();

  return (
    <Button
      loading={logoutResult.isLoading}
      variant="soft"
      color="danger"
      onClick={() => {
        logout().then(() => {
          dispatch(clearToken());
          dispatch(api.util.resetApiState());
          navigate(ROUTER_PATHS.login);
        });
      }}
    >
      Logout
    </Button>
  );
};
