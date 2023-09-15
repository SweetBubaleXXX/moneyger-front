import { zodResolver } from '@hookform/resolvers/zod';
import {
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
import { z } from 'zod';

import { useLoginMutation } from '../../features/api/apiSlice';
import { setAccessToken } from '../../features/api/auth';
import { LoginRequest } from '../../features/api/types';
import { FormButton } from './FormButton';

export const LoginSchema = z.object({
  username: z.string()
    .nonempty('Username is required')
    .regex(/^[\w.@+-]+$/, 'Letters, digits and @/./+/-/_ only')
    .max(150),
  password: z.string()
    .min(8, { message: 'Password must contain at least 8 characters' }),
});

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
        <FormButton buttonText="Login" isLoading={isLoading} />
      </Stack>
    </form>
  );
};
