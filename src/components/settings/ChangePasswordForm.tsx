import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useChangePasswordMutation } from '../../features/api/apiSlice';
import { ChangePasswordSchema } from '../../features/api/schemas';
import { SetPasswordRequest } from '../../features/api/types';

export const ChagnePasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState,
  } = useForm<SetPasswordRequest>(
    { resolver: zodResolver(ChangePasswordSchema) }
  );

  const [changePassword, result] = useChangePasswordMutation();

  useEffect(() => {
    if (formState.errors.currentPassword) {
      toast.error(formState.errors.currentPassword.message);
    }
  }, [formState.errors.currentPassword]);

  useEffect(() => {
    if (formState.errors.newPassword) {
      toast.error(formState.errors.newPassword.message);
    }
  }, [formState.errors.newPassword]);

  useEffect(() => {
    if (!result.isError) { return; }
    toast.error('Failed to change password');
  }, [result.isError]);

  return (
    <form onSubmit={handleSubmit(changePassword)}>
      <Stack spacing={3} padding={2}>
        <Controller
          name="currentPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!formState.errors.currentPassword}>
              <FormLabel>Current Password</FormLabel>
              <Input type="password" {...field} />
            </FormControl>
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl error={!!formState.errors.newPassword}>
              <FormLabel>New Password</FormLabel>
              <Input type="password" {...field} />
            </FormControl>
          )}
        />
        <Button loading={result.isLoading} type="submit">Save</Button>
      </Stack>
    </form>
  );
};
