import React, { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { 
  Button,
  FormLabel,
  Input,
  FormControl,
  Stack,
  FormHelperText,
  CircularProgress,
} from '@mui/joy';
import { useLoginMutation } from '../features/api/apiSlice';
import { LoginRequest } from '../features/api/types';

const LoginSchema = z.object({
  username: z.string()
    .nonempty('Username is required')
    .regex(/^[\w.@+-]+$/, 'Letters, digits and @/./+/-/_ only')
    .max(150),
  password: z.string()
    .min(8, {message: 'Password must contain at least 8 characters'}),
});

export default () => {
  const { control, handleSubmit, formState: {errors}} = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  }
  );
  const [login, {isSuccess, isLoading, isError, error }] = useLoginMutation();

  useEffect(() => {
    isError && 'data' in error! && alert(JSON.stringify(error.data));
  }, [isError]);

  return (
    <form onSubmit={handleSubmit(login)}>
      <Stack spacing={1}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({field}) => (
            <FormControl error={!!errors.username}>
              <FormLabel>Username</FormLabel>
              <Input {...field}/>
              <FormHelperText>
                {errors.username?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({field}) => (
            <FormControl error={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...field}/>
              <FormHelperText>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Button type="submit" startDecorator={
          isLoading && <CircularProgress variant="plain" />
        }>{
            isLoading ? 'Loading...' : 'Login'
          }</Button>
      </Stack>
    </form>
  );
};
