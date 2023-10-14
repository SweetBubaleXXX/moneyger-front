import { Card, CardContent, Stack, Typography } from '@mui/joy';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useResetPasswordConfirmMutation } from '../features/api/apiSlice';

export const PasswordResetConfirm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [resetPassword, result] = useResetPasswordConfirmMutation();

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
              Reset Password
            </Typography>
            <form onSubmit={handleSubmit(resetPasword)}>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
