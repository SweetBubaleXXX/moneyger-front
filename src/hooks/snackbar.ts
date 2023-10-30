import { ReactNode, useEffect } from 'react';
import { FieldError, FieldValues, FormState } from 'react-hook-form';
import { toast } from 'sonner';

export const useFormErrorsSnackbar = (formState: FormState<FieldValues>) =>
  useEffect(() => {
    for (const error of Object.values(formState.errors)) {
      if (typeof error?.message === 'string') {
        toast.error(error.message);
      }
    }
  }, [formState.errors]);

export const useCategoryNameErrorSnackbar = (error?: FieldError) =>
  useEffect(() => {
    if (error) {
      toast.error('Category Name', {
        description: error.message,
      });
    }
  }, [error]);

export const useSuccessSnackbar = (
  message: ReactNode,
  result: { isSuccess?: boolean },
  onSuccess?: () => void,
) => useEffect(() => {
  if (result.isSuccess) {
    toast.success(message);
    onSuccess?.();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [result.isSuccess]);

export const useErrorSnackbar = (
  message: ReactNode,
  result: { isError?: boolean },
  onError?: () => void,
) => useEffect(() => {
  if (result.isError) {
    toast.error(message);
    onError?.();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [result.isError]);
