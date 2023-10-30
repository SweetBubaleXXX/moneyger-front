import { FormState } from 'react-hook-form';

export const hasErrors = (form: FormState<any>) =>
  Object.values(form.errors).some(fieldError => !!fieldError);
