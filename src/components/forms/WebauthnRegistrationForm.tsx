import { Button, Input } from '@mui/joy';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useGetWebauthnSignupOptionsMutation, useWebauthnSignupMutation } from '../../features/api/apiSlice';
import { GetWebauthnSignupOptionsRequest } from '../../features/api/types';

export const WebauthnRegistrationForm = () => {
  const [
    getSignupOptions, signupOptionsResult,
  ] = useGetWebauthnSignupOptionsMutation();

  const [signup, signupResult] = useWebauthnSignupMutation();

  const register = async (request: GetWebauthnSignupOptionsRequest) => {
    const publicKeyCredentialCreationOptions = await getSignupOptions(request).unwrap();
  };

  const { handleSubmit, control, formState } = useForm<GetWebauthnSignupOptionsRequest>();

  return (
    <form onSubmit={handleSubmit(register)}>
      <Input
        placeholder="Username"
        endDecorator={<Button type="submit">Add</Button>}
      />
    </form>
  );
};
