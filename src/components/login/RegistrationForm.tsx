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
import { toast } from 'sonner';
import { z } from 'zod';

import { useRegisterMutation } from '../../features/api/apiSlice';
import { RegistrationRequest } from '../../features/api/types';
import { FormButton } from './FormButton';
import { LoginSchema } from './LoginForm';

export const RegistrationSchema = LoginSchema.extend({
  email: z.string().email(),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<RegistrationRequest & { confirmPassword: string }>(
    { resolver: zodResolver(RegistrationSchema) }
  );
  const [
    register,
    { isSuccess, isLoading, isError, error: registrationError },
  ] = useRegisterMutation();

  useEffect(() => {
    const registrationFailed = isError && 'data' in registrationError!;
    if (registrationFailed) {
      Object.values(registrationError.data as Map<string, string[]>)
        .forEach(messages => { messages.map(toast.error); });
    }
  }, [isError, registrationError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Your account has been successfully registered');
      resetForm();
    }
  }, [isSuccess, resetForm]);

  return (
    <form onSubmit={handleSubmit(register)}>
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
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...field} />
              <FormHelperText>
                {errors.email?.message}
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
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!errors.confirmPassword}>
              <FormLabel>Confirm password</FormLabel>
              <Input type="password" {...field} />
              <FormHelperText>
                {errors.confirmPassword?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <FormButton buttonText="Register" isLoading={isLoading} />
      </Stack>
    </form>
  );
};
