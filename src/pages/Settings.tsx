import {
  List,
  ListDivider,
} from '@mui/joy';
import React from 'react';

import { CurrencySetting } from '../components/settings/CurrencySetting';
import { ThemeSetting } from '../components/settings/ThemeSetting';
import { NavigationBar } from '../components/toolbars/NavigationBar';

export const Settings = () => {
  return (
    <>
      <List
        variant="soft"
        sx={{
          maxWidth: 'sm',
          m: 2,
          borderRadius: 'md',
        }}
      >
        <CurrencySetting />
        <ListDivider />
        <ThemeSetting />
      </List>
      <NavigationBar />
    </>
  );
};
