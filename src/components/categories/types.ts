import { icons } from 'lucide-react';
import { Control } from 'react-hook-form';

export type CategoryIconName = keyof typeof icons

export type FormControllerProps<T = string> = {
  control: Control<any>,
  defaultValue?: T,
  error?: boolean,
  disabled?: boolean,
}
