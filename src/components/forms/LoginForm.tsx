import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useLoginMutation } from '../../features/api/apiSlice';
import { LoginSchema } from '../../features/api/schemas';
import { LoginRequest } from '../../features/api/types';
import { setAccessToken } from '../../features/auth/authSlice';
import { hasErrors } from '../../helpers/forms';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>(
    { resolver: zodResolver(LoginSchema) }
  );

  const [
    login,
    {
      isSuccess,
      isLoading,
      isError,
      data: loginResponse,
      error: loginError,
    },
  ] = useLoginMutation();

  useEffect(() => {
    const loginFailed = isError && 'data' in loginError!;
    if (loginFailed) {
      const errorDetail = (loginError.data as { detail?: string }).detail;
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
            <FormControl error={!!errors.username}>
              <FormLabel>Username</FormLabel>
              <Input {...field} />
              <FormHelperText>
                {errors.username?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...field} />
              <FormHelperText>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Button
          type="submit"
          disabled={hasErrors(errors)}
          loading={isLoading}
        >
          Login
        </Button>
      </Stack>
    </form>
  );
};
