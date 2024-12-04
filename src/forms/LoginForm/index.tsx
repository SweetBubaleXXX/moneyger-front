import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormControl, FormHelperText, FormLabel, Input, Link, Stack } from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useLoginMutation } from '../../api/apiSlice';
import { setAccessToken } from '../../api/authSlice';
import { LoginRequest } from '../../api/types';
import { ROUTER_PATHS } from '../../pages/constants';
import { hasErrors } from '../helpers';
import { LoginSchema } from '../schemas';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { control, handleSubmit, formState } = useForm<LoginRequest>({ resolver: zodResolver(LoginSchema) });

  const [login, { isSuccess, isLoading, isError, data: loginResponse, error: loginError }] = useLoginMutation();

  useEffect(() => {
    const loginFailed = isError && 'data' in loginError!;
    if (loginFailed) {
      const errorDetail = (loginError.data as { detail?: string } | undefined)?.detail;
      const toastMessage = errorDetail || loginError.status;
      toast.error(toastMessage);
    }
  }, [isError, loginError]);

  useEffect(() => {
    if (isSuccess && loginResponse) {
      dispatch(setAccessToken(loginResponse.access));
      navigate('/');
    }
  }, [isSuccess, loginResponse, navigate, dispatch]);

  return (
    <form onSubmit={handleSubmit(login)}>
      <Stack spacing={1}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!formState.errors.username}>
              <FormLabel>Имя пользователя</FormLabel>
              <Input slotProps={{ input: { autoCapitalize: 'none' } }} {...field} />
              <FormHelperText>{formState.errors.username?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!formState.errors.password}>
              <FormLabel>Пароль</FormLabel>
              <Input type="password" {...field} />
              <FormHelperText>{formState.errors.password?.message}</FormHelperText>
              <Link to={ROUTER_PATHS.forgotPassword} component={RouterLink} color="neutral" level="body-sm" mb={1.5}>
                Забыли пароль?
              </Link>
            </FormControl>
          )}
        />
        <Button type="submit" disabled={hasErrors(formState)} loading={isLoading}>
          Войти
        </Button>
      </Stack>
    </form>
  );
};
