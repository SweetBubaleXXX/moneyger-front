import { Box, Card, CardContent, Divider, Stack } from '@mui/joy';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CategoryList } from '../components/categories/CategoryList';
import {
  CategoryUpdateForm,
} from '../components/categories/CategoryUpdateForm';
import {
  CategoryListToolbar,
} from '../components/toolbars/CategoryListToolbar';
import { SavingToolbar } from '../components/toolbars/SavingToolbar';
import {
  selectCategoryById,
  useGetAllCategoriesQuery,
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

  const category = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      data: selectCategoryById(result.data, categoryId),
      isLoading: result.isFetching,
    }),
  });

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
            onEdit={() => setEditing(true)}
            onSubmit={() => { }}
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
                onSave={() => { }}
              />
              :
              <CategoryListToolbar
                onReorder={() => setReorder(true)}
                onAdd={() => { }}
              />
        }
      </Box>
    </>
  );
};
