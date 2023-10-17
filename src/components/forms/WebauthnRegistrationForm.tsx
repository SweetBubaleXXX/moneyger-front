import { Button, Input } from '@mui/joy';
import { startRegistration } from '@simplewebauthn/browser';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  useGetWebauthnSignupOptionsMutation,
  useWebauthnSignupMutation,
} from '../../features/api/apiSlice';
import { GetWebauthnSignupOptionsRequest } from '../../features/api/types';

export const WebauthnRegistrationForm = () => {
  const [
    getSignupOptions, signupOptionsResult,
  ] = useGetWebauthnSignupOptionsMutation();

  const [signup, signupResult] = useWebauthnSignupMutation();

  const register = async (request: GetWebauthnSignupOptionsRequest) => {
    const credentialCreationOptions = await getSignupOptions(request).unwrap();
    const attrResponse = await startRegistration(credentialCreationOptions);
    const verificationResponse = await signup({
      attestationObject: attrResponse.response.attestationObject,
      clientDataJSON: attrResponse.response.clientDataJSON,
      userId: credentialCreationOptions.user.id,
      username: request.username,
      email: request.email,
    }).unwrap();
  };

  const {
    handleSubmit,
    control,
    formState,
  } = useForm<GetWebauthnSignupOptionsRequest>();

  return (
    <form onSubmit={handleSubmit(register)}>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            placeholder="Username"
            {...field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            placeholder="Email"
            {...field}
          />
        )}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};
