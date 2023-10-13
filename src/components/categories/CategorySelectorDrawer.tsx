import {
  Box,
  Button,
  Drawer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  useTheme,
} from '@mui/joy';
import { useMediaQuery } from '@mui/material';
import React from 'react';

import { Category } from '../../features/api/types';
import { CategorySelector } from './CategorySelector';

export type CategorySelectorDrawerProps = {
  open: boolean,
  onClose: () => void,
  onChange: (category: Category) => void
  category?: Category,
}

export const CategorySelectorDrawer = ({
  open,
  onClose,
  onChange,
  category,
}: CategorySelectorDrawerProps) => {
  const theme = useTheme();
  const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Drawer
      open={open}
      anchor={greaterThanMd ? 'left' : 'bottom'}
      size={greaterThanMd ? 'md' : 'lg'}
      onClose={() => onClose()}
    >
      <Stack justifyContent="space-between" height="100%">
        <Tabs defaultValue="OUT" sx={{ overflowX: 'hidden' }}>
          <TabList tabFlex={1}>
            <Tab value="OUT">OUTCOME</Tab>
            <Tab value="IN">INCOME</Tab>
          </TabList>
          {
            ['OUT', 'IN'].map(value =>
              <TabPanel key={value} value={value}>
                <CategorySelector
                  selected={category}
                  onChange={onChange}
                  filter={
                    category =>
                      !category.parentCategory
                      && category.transactionType === value
                  } />
              </TabPanel>
            )
          }
        </Tabs>
        <Box padding={2}>
          <Button
            variant="outlined"
            color="neutral"
            fullWidth
            onClick={onClose}
          >
            OK
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );
};
