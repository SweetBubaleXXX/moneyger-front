import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Input,
  Stack,
  Typography,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useResetPasswordMutation } from '../features/api/apiSlice';
import { ForgotPasswordSchema } from '../features/api/schemas';
import { ForgotPasswordRequest } from '../features/api/types';
import { ROUTER_PATHS } from './constants';

export const PasswordReset = () => {
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
    <Stack
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Card>
        <CardContent>
          <Stack gap={3}>
            <Typography level="title-lg" textAlign="center">
              Password Reset
            </Typography>
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
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
