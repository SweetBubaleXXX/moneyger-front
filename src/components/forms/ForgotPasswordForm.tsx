
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useResetPasswordMutation } from '../../features/api/apiSlice';
import { ForgotPasswordSchema } from '../../features/api/schemas';
import { ForgotPasswordRequest } from '../../features/api/types';
import { ROUTER_PATHS } from '../../pages/constants';


export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [resetPasword, result] = useResetPasswordMutation();

  const {
    control,
    handleSubmit,
    formState,
  } = useForm<ForgotPasswordRequest>(
    { resolver: zodResolver(ForgotPasswordSchema) }
  );

  useEffect(() => {
    if (result.isError) {
      toast.error('Failed to send email');
    }
  }, [result.isError]);

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Check email for reset link');
      navigate(ROUTER_PATHS.login);
    }
  }, [result.isSuccess, navigate]);

  return (
    <form onSubmit={handleSubmit(resetPasword)}>
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
                <Button
                  type="submit"
                  loading={result.isLoading}
                  disabled={!!formState.errors.email}
                >
                  Send
                </Button>
              }
            />
            <FormHelperText>
              {formState.errors.email?.message}
            </FormHelperText>
          </FormControl>
        )}
      />
    </form>
  );
};
