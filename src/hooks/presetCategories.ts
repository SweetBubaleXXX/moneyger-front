import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { PRESET_CATEGORIES } from '../constants';
import {
  useGetCategoriesQuery,
  useImportJsonMutation,
} from '../features/api/apiSlice';

export const usePromptForPresetCategoriesCreation = () => {
  const [importCategories, results] = useImportJsonMutation();
  const categories = useGetCategoriesQuery();
  const [noCategories, setNoCategories] = useState(false);

  useEffect(() => {
    setNoCategories(categories.data?.length === 0);
  }, [categories.data?.length]);

  useEffect(() => {
    if (results.isError) {
      toast.error('Failed to create categories');
    }
  }, [results.isError]);

  useEffect(() => {
    if (results.isSuccess) {
      toast.success('Categories created');
    }
  }, [results.isSuccess]);

  useEffect(() => {
    if (noCategories) {
      toast("You don't have any transaction categories", {
        description: 'Would you like to add preset ones?',
        action: {
          label: 'Yes',
          onClick: () =>
            !results.isLoading && importCategories(PRESET_CATEGORIES),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noCategories]);
};