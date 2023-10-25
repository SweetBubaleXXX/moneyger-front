import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { PRESET_CATEGORIES } from '../constants';
import {
  useGetCategoriesQuery,
  useImportJsonMutation,
} from '../features/api/apiSlice';
import { useErrorSnackbar, useSuccessSnackbar } from './snackbar';

export const usePromptForPresetCategoriesCreation = () => {
  const [importCategories, result] = useImportJsonMutation();
  const categories = useGetCategoriesQuery();
  const [noCategories, setNoCategories] = useState(false);

  useEffect(() => {
    setNoCategories(categories.data?.length === 0);
  }, [categories.data?.length]);

  useErrorSnackbar('Failed to create categories', result);

  useSuccessSnackbar('Categories created', result);

  useEffect(() => {
    if (noCategories) {
      toast("You don't have any transaction categories", {
        description: 'Would you like to add preset ones?',
        action: {
          label: 'Yes',
          onClick: () =>
            !result.isLoading && importCategories(PRESET_CATEGORIES),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noCategories]);
};