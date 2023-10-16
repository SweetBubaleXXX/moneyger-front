import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, Stack, Typography } from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { PasswordField } from '../components/forms/PasswordField';
import { useResetPasswordConfirmMutation } from '../features/api/apiSlice';
import { PasswordResetSchema } from '../features/api/schemas';
import { PasswordResetForm } from '../features/api/types';
import { hasErrors } from '../helpers/forms';
import { ROUTER_PATHS } from './constants';

export const PasswordResetConfirm = () => {
  const params = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    for (const error of Object.values(formState.errors)) {
      toast.error(error.message);
    }
  }, [formState.errors]);

  useEffect(() => {
    if (result.isError) {
      toast.error('Failed to change password');
    }
  }, [result.isError]);

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Password changed');
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
      <Card>
        <CardContent>
          <Stack gap={1}>
            <Typography level="title-lg" textAlign="center">
              Reset Password
            </Typography>
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
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
