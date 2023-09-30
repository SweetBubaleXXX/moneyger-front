import {
  Box,
} from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { CategoryList } from '../components/categories/CategoryList';
import { CategoryModal } from '../components/categories/CategoryModal';
import { REORDER_FORM_ID } from '../components/categories/constants';
import {
  CategoryCreateForm,
} from '../components/forms/CategoryCreateForm';
import {
  CategoryListToolbar,
} from '../components/toolbars/CategoryListToolbar';
import { NavigationBar } from '../components/toolbars/NavigationBar';
import { SavingToolbar } from '../components/toolbars/SavingToolbar';
import {
  TransactionTypeToggle,
} from '../components/toolbars/TransactionTypeToggle';
import {
  useCreateCategoryMutation,
  useUpdateDisplayOrderMutation,
} from '../features/api/apiSlice';
import { TransactionType } from '../features/api/types';
import {
  CATEGORY_BOTTOM_TOOLBAR_PROPS,
  CATEGORY_LIST_OFFSET_FOR_TOOLBAR,
  ROUTER_PATHS,
} from './constants';

export const Categories = () => {
  const navigate = useNavigate();
  const [reorder, setReorder] = useState<boolean>(false);

  const [
    transactionType,
    setTransactionType,
  ] = useState<TransactionType>('OUT');

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
    if (displayOrderUpdateResult.isSuccess) {
      toast.success('Saved');
    }
  }, [displayOrderUpdateResult.isSuccess]);

  return (
    <>
      <TransactionTypeToggle
        value={transactionType}
        onChange={setTransactionType}
        disabled={reorder}
      />
      <CategoryList
        filter={
          category => !category.parentCategory &&
            category.transactionType === transactionType
        }
        loading={displayOrderUpdateResult.isLoading}
        reorder={reorder}
        onSubmitReorder={orderedCategories => {
          updateDisplayOrder(orderedCategories);
          setReorder(false);
        }}
        onItemClick={
          categoryId =>
            !reorder && navigate(ROUTER_PATHS.getCategoryById(categoryId))
        }
        sx={CATEGORY_LIST_OFFSET_FOR_TOOLBAR}
      />
      <Box {...CATEGORY_BOTTOM_TOOLBAR_PROPS}>
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
      <NavigationBar />
      <CategoryModal
        open={categoryCreationModalOpen}
        onClose={setCategoryCreationModalOpen}
        title="Add Category"
      >
        <CategoryCreateForm
          onSubmit={createCategory}
          loading={categoryCreationResult.isLoading}
        />
      </CategoryModal>
    </>
  );
};
