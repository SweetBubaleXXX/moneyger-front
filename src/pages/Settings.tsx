import {
  List,
  ListDivider,
  Stack,
} from '@mui/joy';
import React from 'react';

import { CurrencySetting } from '../components/settings/CurrencySetting';
import { ThemeSetting } from '../components/settings/ThemeSetting';
import { NavigationBar } from '../components/toolbars/NavigationBar';

export const Settings = () => {
  return (
    <>
      <Stack
        maxWidth="sm"
        mx="auto"
        p={2}
        spacing={2}
      >
        <List
          variant="soft"
          sx={{
            borderRadius: 'md',
          }}
        >
          <CurrencySetting />
          <ListDivider />
          <ThemeSetting />
        </List>
      </Stack>
      <NavigationBar />
    </>
  );
};
