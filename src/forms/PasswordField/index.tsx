import { FormControl, FormLabel, Input } from '@mui/joy';
import React, { ReactNode } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

export type PasswordFieldProps = {
  field: ControllerRenderProps<any, any>,
  error?: boolean,
  label?: string,
  children?: ReactNode,
}

export const PasswordField = ({
  field,
  error,
  label,
  children,
}: PasswordFieldProps) => {
  return (
    <FormControl error={error}>
      <FormLabel>{label ?? 'Password'}</FormLabel>
      <Input type="password" {...field} />
      {children}
    </FormControl>
  );
};
