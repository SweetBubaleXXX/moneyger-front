import React from 'react';
import { LoginRequest, useLoginMutation } from '../features/api';
import { useForm, Controller } from 'react-hook-form';
import { Button, FormLabel, Input, FormControl, Stack } from '@mui/joy';

export default () => {
  const { control, handleSubmit, formState: {errors}} = useForm<LoginRequest>();
  const [login, {isLoading, isError}] = useLoginMutation();

  return (
    // <form onSubmit={handleSubmit(login)}>
    <form onSubmit={handleSubmit(console.log)}>
      <Stack spacing={1}>
        <Controller
          name="username"
          control={control}
          render={({field}) => (
            <FormControl required>
              <FormLabel>Username</FormLabel>
              <Input {...field}/>
            </FormControl>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({field}) => (
            <FormControl required>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...field}/>
            </FormControl>
          )}
        />
        <Button type="submit">Login</Button>
      </Stack>
    </form>
  );
};
