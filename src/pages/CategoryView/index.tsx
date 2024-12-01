import { Box, Card, CardContent, Divider } from '@mui/joy';
import { usePrevious } from '@uidotdev/usehooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useCreateSubcategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateDisplayOrderMutation,
} from '../../api/apiSlice';
import { CategoryList } from '../../components/categories/CategoryList';
import { CategoryModal } from '../../components/categories/CategoryModal';
import { CATEGORY_UPDATE_FORM_ID, REORDER_FORM_ID } from '../../components/categories/constants';
import { CategoryListToolbar } from '../../components/toolbars/CategoryListToolbar';
import { CategoryViewTopbar } from '../../components/toolbars/CategoryViewTopbar';
import { NavigationBar } from '../../components/toolbars/NavigationBar';
import { SavingToolbar } from '../../components/toolbars/SavingToolbar';
import { CategoryUpdateForm } from '../../forms/CategoryUpdateForm';
import { SubcategoryCreateForm } from '../../forms/SubcategoryCreateForm';
import { useCategoryById } from '../../hooks/category';
import { useCategoryIdParam } from '../../hooks/params';
import { useErrorSnackbar, useSuccessSnackbar } from '../../hooks/snackbar';
import { CATEGORY_BOTTOM_TOOLBAR_PROPS, CATEGORY_LIST_OFFSET_FOR_TOOLBAR, ROUTER_PATHS } from '../constants';

export type CategoryViewParams = {
  categoryId: string;
};

export const CategoryView = () => {
  const navigate = useNavigate();
  const categoryId = useCategoryIdParam();
  const previousCategoryId = usePrevious(categoryId);
  const [reorder, setReorder] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  const [subcategoryCreationModalOpen, setSubcategoryCreationModalOpen] = useState<boolean>(false);

  const category = useCategoryById(categoryId);

  const [updateDisplayOrder, displayOrderUpdateResult] = useUpdateDisplayOrderMutation();

  const [createSubcategory, subcategoryCreationResult] = useCreateSubcategoryMutation();

  const [updateCategory, updateResult] = useUpdateCategoryMutation();

  const [deleteCategory, deletionResult] = useDeleteCategoryMutation();

  useEffect(() => {
    if (categoryId !== previousCategoryId) {
      setReorder(false);
      setEditing(false);
    }
  }, [categoryId, previousCategoryId]);

  useErrorSnackbar('Failed to add subcategory', subcategoryCreationResult);

  useSuccessSnackbar('Subcategory added', subcategoryCreationResult, () => setSubcategoryCreationModalOpen(false));

  useSuccessSnackbar('Category updated', updateResult, () => setEditing(false));

  useErrorSnackbar('Failed to update category', updateResult);

  useSuccessSnackbar('Saved', displayOrderUpdateResult);

  useErrorSnackbar('Failed to delete category', deletionResult);

  useSuccessSnackbar('Category deleted', deletionResult, () => navigate(-1));

  const handleGoBack = useCallback(() => navigate(-1), [navigate]);

  const handleDelete = useCallback(() => deleteCategory(category.data?.id!), [deleteCategory, category.data?.id]);

  const handleUpdateCategory = useCallback(
    (formData: any) =>
      updateCategory({
        id: category.data?.id!,
        ...formData,
      }),
    [updateCategory, category.data?.id],
  );

  const handleCategoryFilter = useCallback((category: any) => category.parentId === categoryId, [categoryId]);

  const handleSubmitReorder = useCallback(
    (orderedCategories: any) => {
      updateDisplayOrder(orderedCategories);
      setReorder(false);
    },
    [updateDisplayOrder],
  );

  const handleItemClick = useCallback(
    (subcategoryId: number) => !reorder && navigate(ROUTER_PATHS.getCategoryById(subcategoryId)),
    [reorder, navigate],
  );

  const handleReorderToggle = useCallback(() => setReorder(true), []);
  const handleReorderCancel = useCallback(() => setReorder(false), []);
  const handleModalOpen = useCallback(() => setSubcategoryCreationModalOpen(true), []);
  const handleModalClose = useCallback(() => setSubcategoryCreationModalOpen(false), []);

  const handleCreateSubcategory = useCallback(
    (formData: any) =>
      createSubcategory({
        id: category.data?.id!,
        ...formData,
      }),
    [createSubcategory, category.data?.id],
  );

  return (
    <>
      <CategoryViewTopbar onGoBack={handleGoBack} onDelete={handleDelete} isDeleting={deletionResult.isLoading} />
      <Card
        variant="outlined"
        sx={{
          mx: 'auto',
          my: 3,
          maxWidth: 256,
        }}
      >
        <CardContent>
          <CategoryUpdateForm
            category={category.data}
            loading={updateResult.isLoading}
            disabled={reorder}
            onEdit={setEditing}
            onSubmit={handleUpdateCategory}
          />
        </CardContent>
      </Card>
      <Divider
        sx={{
          maxWidth: 256,
          mx: 'auto',
          my: 0.5,
        }}
      >
        Subcategories
      </Divider>
      <CategoryList
        filter={handleCategoryFilter}
        loading={displayOrderUpdateResult.isLoading}
        reorder={reorder}
        onSubmitReorder={handleSubmitReorder}
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
        ) : editing ? (
          <SavingToolbar
            loading={updateResult.isLoading}
            cancelButtonProps={{
              form: CATEGORY_UPDATE_FORM_ID,
              type: 'reset',
            }}
            saveButtonProps={{
              form: CATEGORY_UPDATE_FORM_ID,
              type: 'submit',
            }}
          />
        ) : (
          <CategoryListToolbar onReorder={handleReorderToggle} onAdd={handleModalOpen} />
        )}
      </Box>
      <NavigationBar />
      <CategoryModal open={subcategoryCreationModalOpen} onClose={handleModalClose} title="Add Subcategory">
        <SubcategoryCreateForm onSubmit={handleCreateSubcategory} />
      </CategoryModal>
    </>
  );
};
