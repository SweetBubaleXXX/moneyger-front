import {
  Box,
  Card,
  CardContent,
  Divider,
} from '@mui/joy';
import { usePrevious } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CategoryList } from '../components/categories/CategoryList';
import { CategoryModal } from '../components/categories/CategoryModal';
import {
  CATEGORY_UPDATE_FORM_ID,
  REORDER_FORM_ID,
} from '../components/categories/constants';
import {
  CategoryUpdateForm,
} from '../components/forms/CategoryUpdateForm';
import {
  SubcategoryCreateForm,
} from '../components/forms/SubcategoryCreateForm';
import {
  CategoryListToolbar,
} from '../components/toolbars/CategoryListToolbar';
import { CategoryViewTopbar } from '../components/toolbars/CategoryViewTopbar';
import { NavigationBar } from '../components/toolbars/NavigationBar';
import { SavingToolbar } from '../components/toolbars/SavingToolbar';
import {
  useCreateSubcategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateDisplayOrderMutation,
} from '../features/api/apiSlice';
import { useCategoryById } from '../hooks/category';
import { useCategoryIdParam } from '../hooks/params';
import { useErrorSnackbar, useSuccessSnackbar } from '../hooks/snackbar';
import {
  CATEGORY_BOTTOM_TOOLBAR_PROPS,
  CATEGORY_LIST_OFFSET_FOR_TOOLBAR,
  ROUTER_PATHS,
} from './constants';

export type CategoryViewParams = {
  categoryId: string,
}

export const CategoryView = () => {
  const navigate = useNavigate();
  const categoryId = useCategoryIdParam();
  const previousCategoryId = usePrevious(categoryId);
  const [reorder, setReorder] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  const [
    subcategoryCreationModalOpen,
    setSubcategoryCreationModalOpen,
  ] = useState<boolean>(false);

  const category = useCategoryById(categoryId);

  const [
    updateDisplayOrder,
    displayOrderUpdateResult,
  ] = useUpdateDisplayOrderMutation();

  const [
    createSubcategory,
    subcategoryCreationResult,
  ] = useCreateSubcategoryMutation();

  const [updateCategory, updateResult] = useUpdateCategoryMutation();

  const [deleteCategory, deletionResult] = useDeleteCategoryMutation();

  useEffect(() => {
    if (categoryId !== previousCategoryId) {
      setReorder(false);
      setEditing(false);
    }
  }, [categoryId, previousCategoryId]);

  useErrorSnackbar('Failed to add subcategory', subcategoryCreationResult);

  useSuccessSnackbar(
    'Subcategory added',
    subcategoryCreationResult,
    () => setSubcategoryCreationModalOpen(false)
  );

  useSuccessSnackbar(
    'Category updated',
    updateResult,
    () => setEditing(false)
  );

  useErrorSnackbar('Failed to update category', updateResult);

  useSuccessSnackbar('Saved', displayOrderUpdateResult);

  useErrorSnackbar('Failed to delete category', deletionResult);

  useSuccessSnackbar(
    'Category deleted',
    deletionResult,
    () => navigate(-1),
  );

  return (
    <>
      <CategoryViewTopbar
        onGoBack={() => navigate(-1)}
        onDelete={() => deleteCategory(category.data?.id!)}
        isDeleting={deletionResult.isLoading}
      />
      <Card variant="outlined" sx={{
        mx: 'auto',
        my: 3,
        maxWidth: 256,
      }}>
        <CardContent>
          <CategoryUpdateForm
            category={category.data}
            loading={updateResult.isLoading}
            disabled={reorder}
            onEdit={setEditing}
            onSubmit={formData => updateCategory({
              id: category.data?.id!,
              ...formData,
            })}
          />
        </CardContent>
      </Card>
      <Divider sx={{
        maxWidth: 256,
        mx: 'auto',
        my: 0.5,
      }}>
        Subcategories
      </Divider>
      <CategoryList
        filter={category => category.parentCategory === categoryId}
        loading={displayOrderUpdateResult.isLoading}
        reorder={reorder}
        onSubmitReorder={orderedCategories => {
          updateDisplayOrder(orderedCategories);
          setReorder(false);
        }}
        onItemClick={subcategoryId =>
          !reorder && navigate(ROUTER_PATHS.getCategoryById(subcategoryId))
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
            editing ?
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
              :
              <CategoryListToolbar
                onReorder={() => setReorder(true)}
                onAdd={() => setSubcategoryCreationModalOpen(true)}
              />
        }
      </Box>
      <NavigationBar />
      <CategoryModal
        open={subcategoryCreationModalOpen}
        onClose={setSubcategoryCreationModalOpen}
        title="Add Subcategory"
      >
        <SubcategoryCreateForm onSubmit={formData => createSubcategory({
          id: category.data?.id!,
          ...formData,
        })} />
      </CategoryModal>
    </>
  );
};
