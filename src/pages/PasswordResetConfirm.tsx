import { Card, CardContent, Stack, Typography } from '@mui/joy';
import React from 'react';

import { ResetPasswordForm } from '../components/forms/ResetPasswordForm';

export const PasswordResetConfirm = () => {
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
            <ResetPasswordForm />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
