import {
  Box,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from '@mui/joy';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CategoryCreateForm,
} from '../components/categories/CategoryCreateForm';
import { CategoryList } from '../components/categories/CategoryList';
import { CategoryModal } from '../components/categories/CategoryModal';
import {
  CategoryListToolbar,
} from '../components/toolbars/CategoryListToolbar';
import { SavingToolbar } from '../components/toolbars/SavingToolbar';
import { useCreateCategoryMutation } from '../features/api/apiSlice';

export const Categories = () => {
  const navigate = useNavigate();
  const [reorder, setReorder] = useState<boolean>(false);

  const [
    categoryCreationModalOpen,
    setCategoryCreationModalOpen,
  ] = useState<boolean>(false);

  const [createCategory, result] = useCreateCategoryMutation();

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
              reorder={reorder}
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
                    onSave={() => { }}
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
