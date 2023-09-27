import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import { Trash, Undo2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { CategoryList } from '../components/categories/CategoryList';
import { CategoryModal } from '../components/categories/CategoryModal';
import {
  CategoryUpdateForm,
} from '../components/categories/CategoryUpdateForm';
import {
  CATEGORY_UPDATE_FORM_ID,
  REORDER_FORM_ID,
} from '../components/categories/constants';
import {
  SubcategoryCreateForm,
} from '../components/categories/SubcategoryCreateForm';
import { ConfirmationModal } from '../components/ConfirmationModal';
import {
  CategoryListToolbar,
} from '../components/toolbars/CategoryListToolbar';
import { SavingToolbar } from '../components/toolbars/SavingToolbar';
import {
  selectCategoryById,
  useCreateSubcategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useUpdateDisplayOrderMutation,
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

  const [
    confirmDeletionOpen,
    setConfirmDeletionOpen,
  ] = useState<boolean>(false);

  const category = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      data: selectCategoryById(result.data, categoryId),
      isLoading: result.isFetching,
    }),
  });

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

  useEffect(() => {
    if (displayOrderUpdateResult.isSuccess) {
      toast.success('Saved');
    }
  }, [displayOrderUpdateResult.isSuccess]);

  useEffect(() => {
    if (deletionResult.isError) {
      setConfirmDeletionOpen(false);
      toast.error('Failed to delete category');
    }
  }, [deletionResult.isError]);

  useEffect(() => {
    if (deletionResult.isSuccess) {
      toast.success('Category deleted');
      navigate(-1);
    }
  }, [deletionResult.isSuccess, navigate]);

  return (
    <>
      <Sheet
        variant="outlined"
        sx={{
          position: 'sticky',
          top: 0,
          px: 1,
          py: 0.5,
          zIndex: 1100,
          boxShadow: 'xs',
        }}
      >
        <Box
          width="100%"
          maxWidth="sm"
          mx="auto"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <IconButton
            onClick={() => navigate(-1)}
          >
            <Undo2 />
          </IconButton>
          <Typography level="title-md">
            Edit Category
          </Typography>
          <IconButton
            onClick={() => setConfirmDeletionOpen(true)}
            size="sm"
            variant="plain"
            color="danger"
          >
            <Trash />
          </IconButton>
        </Box>
      </Sheet>
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
      <Stack mx="auto" maxWidth={400} padding={2} >
        <CategoryList
          filter={category => category.parentCategory === categoryId}
          loading={displayOrderUpdateResult.isLoading}
          reorder={reorder}
          onSubmitReorder={orderedCategories => {
            updateDisplayOrder(orderedCategories);
            setReorder(false);
          }}
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
      <ConfirmationModal
        open={confirmDeletionOpen}
        onCancel={() => setConfirmDeletionOpen(false)}
        onConfirm={() => deleteCategory(category.data?.id!)}
        confirmButtonText="Delete"
        confirmButtonProps={{ color: 'danger' }}
        loading={deletionResult.isLoading}
      >
        Are you sure you want to delete this category?
      </ConfirmationModal>
    </>
  );
};
