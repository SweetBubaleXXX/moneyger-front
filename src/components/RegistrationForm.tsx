import React from 'react';
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
  Alert,
  Typography,
} from '@mui/joy';
import { useRegisterMutation } from '../features/api/apiSlice';
import { RegistrationRequest } from '../features/api/types';
import { LoginSchema } from './LoginForm';

export const RegistrationSchema = LoginSchema.extend({
  email: z.string().email(),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default () => {
  const { 
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegistrationRequest & { confirmPassword: string }>({
    resolver: zodResolver(RegistrationSchema),
  }
  );
  const [
    register,
    { isSuccess, isLoading, isError, error: registrationError },
  ] = useRegisterMutation();

  return (
    <form onSubmit={handleSubmit(register)}>
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
          name="email"
          control={control}
          defaultValue=""
          render={({field}) => (
            <FormControl error={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...field}/>
              <FormHelperText>
                {errors.email?.message}
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
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({field}) => (
            <FormControl error={!!errors.confirmPassword}>
              <FormLabel>Confirm password</FormLabel>
              <Input type="password" {...field}/>
              <FormHelperText>
                {errors.confirmPassword?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        {
          isError && 'data' in registrationError! &&
          Object.entries(registrationError.data as Map<string, string[]>)
            .map(([field, messages]) => 
              <Alert key={field} color="danger" variant="soft">
                <Typography level="body-xs">
                  {messages.join('\n')}
                </Typography>
              </Alert>)
        }
        <Button type="submit" startDecorator={
          isLoading && <CircularProgress variant="plain" />
        }>
          {isLoading ? 'Loading...' : 'Register'}
        </Button>
      </Stack>
    </form>
  );
};
