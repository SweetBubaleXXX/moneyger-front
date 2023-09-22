import {
  Box,
  Button,
  ButtonGroup,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from '@mui/joy';
import { ArrowDownUp, Check, ListPlus, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CategoryList } from '../components/categories/CategoryList';

export const Categories = () => {
  const navigate = useNavigate();
  const [reorder, setReorder] = useState<boolean>(false);

  return (
    <Tabs defaultValue="OUT">
      <TabList tabFlex={1}>
        <Tab value="OUT">Outcome</Tab>
        <Tab value="IN">Income</Tab>
      </TabList>
      {
        ['OUT', 'IN'].map(value =>
          <TabPanel key={value} value={value}>
            <CategoryList
              filter={category =>
                !category.parentCategory && category.transactionType === value
              }
              reorder={reorder}
              onItemClick={categoryId => navigate(`./${categoryId}`)}
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
          </TabPanel >
        )
      }
    </Tabs >
  );
};
