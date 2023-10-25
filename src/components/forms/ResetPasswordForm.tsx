import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/joy';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useResetPasswordConfirmMutation } from '../../features/api/apiSlice';
import { PasswordResetSchema } from '../../features/api/schemas';
import { PasswordResetForm } from '../../features/api/types';
import { hasErrors } from '../../helpers/forms';
import {
  useErrorSnackbar,
  useFormErrorsSnackbar,
  useSuccessSnackbar,
} from '../../hooks/snackbar';
import { ROUTER_PATHS } from '../../pages/constants';
import { PasswordField } from './PasswordField';

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [resetPassword, result] = useResetPasswordConfirmMutation();

  const {
    control,
    handleSubmit,
    formState,
  } = useForm<PasswordResetForm>(
    { resolver: zodResolver(PasswordResetSchema) }
  );

  const onSubmit = handleSubmit(formData => resetPassword({
    uid: params.uid as string,
    token: params.token as string,
    newPassword: formData.newPassword,
  }));

  useFormErrorsSnackbar(formState);

  useErrorSnackbar('Failed to change password', result);

  useSuccessSnackbar(
    'Password changed',
    result,
    () => navigate(ROUTER_PATHS.login)
  );

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3} padding={2}>
        <Controller
          name="newPassword"
          control={control}
          defaultValue=""
          render={({ field }) =>
            <PasswordField
              field={field}
              error={!!formState.errors.newPassword}
              label="New Password"
            />
          }
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) =>
            <PasswordField
              field={field}
              error={!!formState.errors.confirmPassword}
              label="Confirm Password"
            />
          }
        />
        <Button
          type="submit"
          loading={result.isLoading}
          disabled={!!hasErrors(formState)}
        >
          Change
        </Button>
      </Stack>
    </form>
  );
};
