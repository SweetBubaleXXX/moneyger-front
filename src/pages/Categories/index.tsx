import { Box } from '@mui/joy';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateCategoryMutation, useUpdateDisplayOrderMutation } from '../../api/apiSlice';
import { Category, TransactionType } from '../../api/types';
import { CategoryList } from '../../components/categories/CategoryList';
import { CategoryModal } from '../../components/categories/CategoryModal';
import { REORDER_FORM_ID } from '../../components/categories/constants';
import { CategoryListToolbar } from '../../components/toolbars/CategoryListToolbar';
import { NavigationBar } from '../../components/toolbars/NavigationBar';
import { SavingToolbar } from '../../components/toolbars/SavingToolbar';
import { TransactionTypeToggle } from '../../components/toolbars/TransactionTypeToggle';
import { CategoryCreateForm } from '../../forms/CategoryCreateForm';
import { useErrorSnackbar, useSuccessSnackbar } from '../../hooks/snackbar';
import { CATEGORY_BOTTOM_TOOLBAR_PROPS, CATEGORY_LIST_OFFSET_FOR_TOOLBAR, ROUTER_PATHS } from '../constants';

export const Categories = () => {
  const navigate = useNavigate();
  const [reorder, setReorder] = useState<boolean>(false);

  const [transactionType, setTransactionType] = useState<TransactionType>('OUT');

  const [categoryCreationModalOpen, setCategoryCreationModalOpen] = useState<boolean>(false);

  const [createCategory, categoryCreationResult] = useCreateCategoryMutation();

  const [updateDisplayOrder, displayOrderUpdateResult] = useUpdateDisplayOrderMutation();

  useErrorSnackbar('Failed to add category', categoryCreationResult);

  useSuccessSnackbar('Category added', categoryCreationResult, () => setCategoryCreationModalOpen(false));

  useSuccessSnackbar('Saved', displayOrderUpdateResult);

  const categoryFilter = useCallback(
    (category: Category) => !category.rootId && category.type === transactionType,
    [transactionType],
  );

  const handleReorderSubmit = useCallback(
    (orderedCategories: Category[]) => {
      updateDisplayOrder(orderedCategories);
      setReorder(false);
    },
    [updateDisplayOrder],
  );

  const handleItemClick = useCallback(
    (categoryId: number) => {
      if (!reorder) {
        navigate(ROUTER_PATHS.getCategoryById(categoryId));
      }
    },
    [navigate, reorder],
  );

  const handleReorderToggle = useCallback(() => setReorder(true), []);
  const handleReorderCancel = useCallback(() => setReorder(false), []);
  const handleModalOpen = useCallback(() => setCategoryCreationModalOpen(true), []);
  const handleModalClose = useCallback(() => setCategoryCreationModalOpen(false), []);

  return (
    <>
      <TransactionTypeToggle value={transactionType} onChange={setTransactionType} disabled={reorder} />
      <CategoryList
        filter={categoryFilter}
        loading={displayOrderUpdateResult.isLoading}
        reorder={reorder}
        onSubmitReorder={handleReorderSubmit}
        onItemClick={handleItemClick}
        sx={CATEGORY_LIST_OFFSET_FOR_TOOLBAR}
      />
      <Box {...CATEGORY_BOTTOM_TOOLBAR_PROPS}>
        {reorder ? (
          <SavingToolbar
            onCancel={handleReorderCancel}
            saveButtonProps={{
              form: REORDER_FORM_ID,
              type: 'submit',
            }}
          />
        ) : (
          <CategoryListToolbar onReorder={handleReorderToggle} onAdd={handleModalOpen} />
        )}
      </Box>
      <NavigationBar />
      <CategoryModal open={categoryCreationModalOpen} onClose={handleModalClose} title="Add Category">
        <CategoryCreateForm onSubmit={createCategory} loading={categoryCreationResult.isLoading} />
      </CategoryModal>
    </>
  );
};
