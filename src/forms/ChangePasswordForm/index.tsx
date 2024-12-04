import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useChangePasswordMutation } from '../../api/apiSlice';
import { SetPasswordRequest } from '../../api/types';
import { useFormErrorsSnackbar, useSuccessSnackbar } from '../../hooks/snackbar';
import { PasswordField } from '../PasswordField';
import { ChangePasswordSchema } from '../schemas';

export type ChangePasswordFormProps = {
  onSuccess?: () => void;
};

export const ChangePasswordForm = ({ onSuccess }: ChangePasswordFormProps) => {
  const { handleSubmit, control, formState } = useForm<SetPasswordRequest & { confirmPassword: string }>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const [changePassword, result] = useChangePasswordMutation();

  useFormErrorsSnackbar(formState);

  useEffect(() => {
    if (!result.isError) {
      return;
    }
    for (const fieldName of ['current_password', 'new_password']) {
      const errorResponse = result.error as {
        data?: Record<string, string | undefined>;
      };
      const errorMessage = errorResponse.data?.[fieldName];
      errorMessage && toast.error(errorMessage);
    }
  }, [result.isError, result.error]);

  useSuccessSnackbar('Пароль изменен', result, onSuccess);

  return (
    <form onSubmit={handleSubmit(changePassword)}>
      <Stack spacing={3} padding={2}>
        <Controller
          name="currentPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <PasswordField field={field} error={!!formState.errors.currentPassword} label="Текущий пароль" />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <PasswordField field={field} error={!!formState.errors.newPassword} label="Новый пароль" />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <PasswordField field={field} error={!!formState.errors.confirmPassword} label="Повторите пароль" />
          )}
        />
        <Button loading={result.isLoading} type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
};
