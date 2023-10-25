import { FieldError } from 'react-hook-form';
import { toast } from 'sonner';

export const toastCategoryNameError = (error?: FieldError) => {
  if (error) {
    toast.error('Category Name', {
      description: error.message,
    });
  }
};