import { Button, Stack } from '@mui/joy';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useActivateAccountMutation } from '../features/api/apiSlice';
import { ROUTER_PATHS } from './constants';

export const AccountActivation = () => {
  const params = useParams();
  const [activateAccount, result] = useActivateAccountMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (result.isError) {
      toast.error('Failed to activate account');
    }
  }, [result.isError]);

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Account activated');
      navigate(ROUTER_PATHS.login);
    }
  }, [result.isSuccess, navigate]);

  return (
    <Stack
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        size="lg"
        color="danger"
        loading={result.isLoading}
        onClick={() => activateAccount({
          uid: params.uid as string,
          token: params.token as string,
        })}
      >
        Activate Account
      </Button>
    </Stack>
  );
};
