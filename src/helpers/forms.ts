import { FieldError, FormState } from 'react-hook-form';
import { toast } from 'sonner';

export const toastCategoryNameError = (error?: FieldError) => {
  if (error) {
    toast.error('Category Name', {
      description: error.message,
    });
  }
};

export const hasErrors = (form: FormState<any>) =>
  Object.values(form.errors).some(fieldError => !!fieldError);
