import { Button, Stack } from '@mui/joy';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useActivateAccountMutation } from '../../api/apiSlice';
import { useErrorSnackbar, useSuccessSnackbar } from '../../hooks/snackbar';
import { ROUTER_PATHS } from '../constants';

export const AccountActivation = () => {
  const params = useParams();
  const [activateAccount, result] = useActivateAccountMutation();
  const navigate = useNavigate();

  useErrorSnackbar('Не удалось активировать аккаунт', result);

  useSuccessSnackbar('Аккаунт активирован', result, () => navigate(ROUTER_PATHS.login));

  return (
    <Stack width="100vw" height="100vh" justifyContent="center" alignItems="center">
      <Button
        size="lg"
        color="danger"
        loading={result.isLoading}
        onClick={() =>
          activateAccount({
            uid: params.uid as string,
            token: params.token as string,
          })
        }
      >
        Активировать аккаунт
      </Button>
    </Stack>
  );
};
