import React from 'react';
import { Button, CircularProgress } from '@mui/joy';

type ButtonProps = {
  buttonText: string,
  isLoading?: boolean,
};

export default ({buttonText, isLoading}: ButtonProps) => {
  return (
    <Button type="submit" disabled={isLoading} startDecorator={
      isLoading && <CircularProgress variant="plain" />
    }>
      {isLoading ? 'Loading...' : buttonText}
    </Button>
  );
};