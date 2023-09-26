import {
  Box,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  CategoryCreateForm,
} from '../components/categories/CategoryCreateForm';
import { CategoryList } from '../components/categories/CategoryList';
import { CategoryModal } from '../components/categories/CategoryModal';
import { REORDER_FORM_ID } from '../components/categories/constants';
import {
  CategoryListToolbar,
} from '../components/toolbars/CategoryListToolbar';
import { SavingToolbar } from '../components/toolbars/SavingToolbar';
import {
  useCreateCategoryMutation,
  useUpdateDisplayOrderMutation,
} from '../features/api/apiSlice';

export const Categories = () => {
  const navigate = useNavigate();
  const [reorder, setReorder] = useState<boolean>(false);

  const [
    categoryCreationModalOpen,
    setCategoryCreationModalOpen,
  ] = useState<boolean>(false);

  const [createCategory, categoryCreationResult] = useCreateCategoryMutation();

  const [
    updateDisplayOrder,
    displayOrderUpdateResult,
  ] = useUpdateDisplayOrderMutation();

  useEffect(() => {
    if (categoryCreationResult.isError) {
      toast.error('Failed to add category');
    }
  }, [categoryCreationResult.isError]);

  useEffect(() => {
    if (categoryCreationResult.isSuccess) {
      toast.success('Category added');
      setCategoryCreationModalOpen(false);
    }
  }, [categoryCreationResult.isSuccess]);

  useEffect(() => {
    if (displayOrderUpdateResult.isError) {
      toast.error('Failed to save order');
    }
  }, [displayOrderUpdateResult.isError]);

  useEffect(() => {
    if (displayOrderUpdateResult.isSuccess) {
      toast.success('Saved');
    }
  }, [displayOrderUpdateResult.isSuccess]);

  return (
    <>
      <Tabs defaultValue="OUT" sx={{
        maxWidth: 'sm',
        mx: 'auto',
        background: 'transparent',
      }}>
        <TabList tabFlex={1}>
          <Tab value="OUT">Outcome</Tab>
          <Tab value="IN">Income</Tab>
        </TabList>
        {['OUT', 'IN'].map(value =>
          <TabPanel key={value} value={value}>
            <CategoryList
              filter={
                category =>
                  !category.parentCategory && category.transactionType === value
              }
              loading={displayOrderUpdateResult.isLoading}
              reorder={reorder}
              onSubmitReorder={orderedCategories => {
                updateDisplayOrder(orderedCategories);
                setReorder(false);
              }}
              onItemClick={
                categoryId => !reorder && navigate(`./${categoryId}`)
              }
            />
            <Box
              position="fixed"
              padding={2}
              left={0}
              bottom={0}
              right={0}
            >
              {
                reorder ?
                  <SavingToolbar
                    onCancel={() => setReorder(false)}
                    saveButtonProps={{
                      form: REORDER_FORM_ID,
                      type: 'submit',
                    }}
                  />
                  :
                  <CategoryListToolbar
                    onReorder={() => setReorder(true)}
                    onAdd={() => setCategoryCreationModalOpen(true)}
                  />
              }
            </Box>
          </TabPanel>
        )}
      </Tabs>
      <CategoryModal
        open={categoryCreationModalOpen}
        onClose={setCategoryCreationModalOpen}
        title="Add Category"
      >
        <CategoryCreateForm onSubmit={createCategory} />
      </CategoryModal>
    </>
  );
};
