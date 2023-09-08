import React, { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { 
  FormLabel,
  Input,
  FormControl,
  Stack,
  FormHelperText,
} from '@mui/joy';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useLoginMutation,
  useLazyGetAccountQuery,
} from '../../features/api/apiSlice';
import { LoginRequest } from '../../features/api/types';
import FormButton from './FormButton';
import { setAccessToken } from '../../features/api/auth';

export const LoginSchema = z.object({
  username: z.string()
    .nonempty('Username is required')
    .regex(/^[\w.@+-]+$/, 'Letters, digits and @/./+/-/_ only')
    .max(150),
  password: z.string()
    .min(8, {message: 'Password must contain at least 8 characters'}),
});

export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: {errors}} = useForm<LoginRequest>(
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
  const [getAccount] = useLazyGetAccountQuery();

  useEffect(() => {
    isError && 'data' in loginError! &&
      toast.error(
        (loginError.data as { detail?: string }).detail || loginError.status
      );
  }, [isError]);

  useEffect(() => {
    if (isSuccess && loginResponse) {
      dispatch(setAccessToken(loginResponse.access));
      getAccount().then(() => {
        navigate('/');
      });
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(login)}>
      <Stack spacing={1}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({field}) => (
            <FormControl error={!!errors.username}>
              <FormLabel>Username</FormLabel>
              <Input {...field}/>
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
          render={({field}) => (
            <FormControl error={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...field}/>
              <FormHelperText>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <FormButton buttonText="Login" isLoading={isLoading}/>
      </Stack>
    </form>
  );
};
