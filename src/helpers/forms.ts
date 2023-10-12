import { FieldError, FieldErrors } from 'react-hook-form';
import { toast } from 'sonner';

export const toastCategoryNameError = (error?: FieldError) => {
  if (error) {
    toast.error('Category Name', {
      description: error.message,
    });
  }
};

export const hasErrors = (errors: FieldErrors) =>
  Object.values(errors).some(fieldError => !!fieldError);
