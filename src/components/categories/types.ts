import { Control } from 'react-hook-form';

export type FormControllerProps<T = string> = {
  control: Control<any>,
  defaultValue?: T,
  error?: boolean,
  disabled?: boolean,
}
