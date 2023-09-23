import { Box, Button, ButtonGroup } from '@mui/joy';
import { ArrowDownUp, Check, ListPlus, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CategoryList } from '../components/categories/CategoryList';
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

  const category = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      data: selectCategoryById(result.data, categoryId),
      isLoading: result.isFetching,
    }),
  });

  return (
    <>
      <CategoryList
        reorder={reorder}
        filter={category => category.parentCategory === categoryId}
        onItemClick={subcategoryId => navigate(`/categories/${subcategoryId}`)}
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
            <ButtonGroup
              buttonFlex="0 1 200px"
              sx={{ justifyContent: 'center' }}
            >
              <Button
                color="danger"
                startDecorator={<X />}
                onClick={() => setReorder(false)}
              >
                Cancel
              </Button>
              <Button
                color="success"
                startDecorator={<Check />}
              >
                Save
              </Button >
            </ButtonGroup>
            :
            <ButtonGroup
              buttonFlex="0 1 200px"
              sx={{ justifyContent: 'center' }}
            >
              <Button
                startDecorator={<ArrowDownUp />}
                onClick={() => setReorder(true)}
              >
                Reorder
              </Button>
              <Button startDecorator={<ListPlus />}>
                Add
              </Button>
            </ButtonGroup>
        }
      </Box>
    </>
  );
};
