import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from '@mui/joy';
import React from 'react';

import { CategoryList } from '../components/categories/CategoryList';

export const Categories = () => {

  return (
    <Tabs defaultValue="OUT">
      <TabList tabFlex={1}>
        <Tab value="OUT">Outcome</Tab>
        <Tab value="IN">Income</Tab>
      </TabList>
      {
        ['OUT', 'IN'].map(value =>
          <TabPanel key={value} value={value}>
            <CategoryList filter={category =>
              !category.parentCategory && category.transactionType === value
            } />
          </TabPanel>
        )
      }
    </Tabs>
  );
};
