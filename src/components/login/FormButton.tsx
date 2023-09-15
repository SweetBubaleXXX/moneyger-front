import { Button, CircularProgress } from '@mui/joy';
import React from 'react';

type ButtonProps = {
  buttonText: string,
  isLoading?: boolean,
};

export const FormButton = ({ buttonText, isLoading }: ButtonProps) => {
  return (
    <Button type="submit" disabled={isLoading} startDecorator={
      isLoading && <CircularProgress variant="plain" />
    }>
      {isLoading ? 'Loading...' : buttonText}
    </Button>
  );
};