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
import { toast } from 'sonner';

import { useRegisterMutation } from '../../features/api/apiSlice';
import { RegistrationSchema } from '../../features/api/schemas';
import { RegistrationRequest } from '../../features/api/types';
import { hasErrors } from '../../helpers/forms';
import { useSuccessSnackbar } from '../../hooks/snackbar';

export const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState,
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

  useSuccessSnackbar(
    'A verification link has been sent to your email address',
    { isSuccess },
    resetForm
  );

  return (
    <form onSubmit={handleSubmit(register)}>
      <Stack spacing={1}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!formState.errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                slotProps={{ input: { autoCapitalize: 'none' } }}
                {...field}
              />
              <FormHelperText>
                {formState.errors.username?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!formState.errors.email}>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...field} />
              <FormHelperText>
                {formState.errors.email?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!formState.errors.password}>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...field} />
              <FormHelperText>
                {formState.errors.password?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!formState.errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" {...field} />
              <FormHelperText>
                {formState.errors.confirmPassword?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Button
          type="submit"
          disabled={hasErrors(formState)}
          loading={isLoading}
        >
          Register
        </Button>
      </Stack>
    </form>
  );
};
