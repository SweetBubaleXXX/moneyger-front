import { Box, Card, CardContent, Divider, Stack } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { CategoryList } from '../components/categories/CategoryList';
import { CategoryModal } from '../components/categories/CategoryModal';
import {
  CategoryUpdateForm,
} from '../components/categories/CategoryUpdateForm';
import { CATEGORY_UPDATE_FORM_ID } from '../components/categories/constants';
import {
  SubcategoryCreateForm,
} from '../components/categories/SubcategoryCreateForm';
import {
  CategoryListToolbar,
} from '../components/toolbars/CategoryListToolbar';
import { SavingToolbar } from '../components/toolbars/SavingToolbar';
import {
  selectCategoryById,
  useCreateSubcategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from '../features/api/apiSlice';

export type CategoryViewParams = {
  categoryId: string,
}

export const CategoryView = () => {
  const navigate = useNavigate();
  const params = useParams<CategoryViewParams>();
  const categoryId = params.categoryId ? +params.categoryId : undefined;
  const [reorder, setReorder] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  const [
    subcategoryCreationModalOpen,
    setSubcategoryCreationModalOpen,
  ] = useState<boolean>(false);

  const category = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      data: selectCategoryById(result.data, categoryId),
      isLoading: result.isFetching,
    }),
  });

  const [
    createSubcategory,
    subcategoryCreationResult,
  ] = useCreateSubcategoryMutation();

  const [updateCategory, updateResult] = useUpdateCategoryMutation();

  useEffect(() => {
    if (subcategoryCreationResult.isError) {
      toast.error('Failed to add subcategory');
    }
  }, [subcategoryCreationResult.isError]);

  useEffect(() => {
    if (subcategoryCreationResult.isSuccess) {
      toast.success('Subcategory added');
      setSubcategoryCreationModalOpen(false);
    }
  }, [subcategoryCreationResult.isSuccess]);

  useEffect(() => {
    if (updateResult.isSuccess) {
      toast.success('Category updated');
      setEditing(false);
    }
  }, [updateResult.isSuccess]);

  useEffect(() => {
    if (updateResult.isError) {
      toast.error('Failed to update category');
    }
  }, [updateResult.isError]);

  return (
    <>
      <Card variant="outlined" sx={{
        mx: 'auto',
        my: 3,
        maxWidth: 256,
      }}>
        <CardContent>
          <CategoryUpdateForm
            category={category.data}
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
      <Stack mx="auto" maxWidth={400} padding={2} >
        <CategoryList
          reorder={reorder}
          filter={category => category.parentCategory === categoryId}
          onItemClick={
            subcategoryId => navigate(`/categories/${subcategoryId}`)
          }
        />
      </Stack>
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
              onSave={() => { }}
            />
            :
            editing ?
              <SavingToolbar
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