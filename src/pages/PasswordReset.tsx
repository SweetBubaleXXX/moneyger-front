import {
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/joy';
import React from 'react';

import { ForgotPasswordForm } from '../components/forms/ForgotPasswordForm';

export const PasswordReset = () => {
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
            <ForgotPasswordForm />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
