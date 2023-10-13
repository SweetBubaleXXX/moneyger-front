import { Stack, Typography } from '@mui/joy';
import React from 'react';

export type ErrorPageProps = {
  children?: string,
}

export const ErrorPage = ({ children }: ErrorPageProps) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      p={2}
    >
      <Typography level="h2" textAlign="center">
        {children || 'Something went wrong. Try to reload the page.'}
      </Typography>
    </Stack>
  );
};
