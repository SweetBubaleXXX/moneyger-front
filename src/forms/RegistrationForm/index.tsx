import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormControl, FormHelperText, FormLabel, Input, Stack } from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useRegisterMutation } from '../../api/apiSlice';
import { RegistrationRequest } from '../../api/types';
import { useSuccessSnackbar } from '../../hooks/snackbar';
import { hasErrors } from '../helpers';
import { RegistrationSchema } from '../schemas';

export const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState,
  } = useForm<RegistrationRequest & { confirmPassword: string }>({ resolver: zodResolver(RegistrationSchema) });

  const [register, { isSuccess, isLoading, isError, error: registrationError }] = useRegisterMutation();

  useEffect(() => {
    const registrationFailed = isError && 'data' in registrationError!;
    if (registrationFailed) {
      Object.values(registrationError.data as Map<string, string[]>).forEach((messages) => {
        messages.map(toast.error);
      });
    }
  }, [isError, registrationError]);

  useSuccessSnackbar('Ссылка для активации аккаунта отправлена на ваш почтовый ящик', { isSuccess }, resetForm);

  return (
    <form onSubmit={handleSubmit(register)}>
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
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!formState.errors.email}>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...field} />
              <FormHelperText>{formState.errors.email?.message}</FormHelperText>
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
            </FormControl>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!formState.errors.confirmPassword}>
              <FormLabel>Подтвердите пароль</FormLabel>
              <Input type="password" {...field} />
              <FormHelperText>{formState.errors.confirmPassword?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Button type="submit" disabled={hasErrors(formState)} loading={isLoading}>
          Зарегистрироваться
        </Button>
      </Stack>
    </form>
  );
};
