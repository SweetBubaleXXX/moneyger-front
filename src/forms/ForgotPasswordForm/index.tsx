import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormControl, FormHelperText, Input } from '@mui/joy';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useResetPasswordMutation } from '../../api/apiSlice';
import { ForgotPasswordRequest } from '../../api/types';
import { useErrorSnackbar, useSuccessSnackbar } from '../../hooks/snackbar';
import { ROUTER_PATHS } from '../../pages/constants';
import { ForgotPasswordSchema } from '../schemas';

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [resetPassword, result] = useResetPasswordMutation();

  const { control, handleSubmit, formState } = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  useErrorSnackbar('Failed to send email', result);

  useSuccessSnackbar('Check email for reset link', result, () => navigate(ROUTER_PATHS.login));

  return (
    <form onSubmit={handleSubmit(resetPassword)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl error={!!formState.errors.email}>
            <Input
              type="email"
              placeholder="Email"
              {...field}
              endDecorator={
                <Button type="submit" loading={result.isLoading} disabled={!!formState.errors.email}>
                  Send
                </Button>
              }
              sx={{ '--Input-decoratorChildHeight': '33px' }}
            />
            <FormHelperText>{formState.errors.email?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </form>
  );
};
