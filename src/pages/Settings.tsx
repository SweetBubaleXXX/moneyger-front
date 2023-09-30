import {
  List,
  ListDivider,
  ListSubheader,
  Stack,
} from '@mui/joy';
import React from 'react';

import {
  ChangePasswordSetting,
} from '../components/settings/ChangePasswordSetting';
import { CurrencySetting } from '../components/settings/CurrencySetting';
import { ExportCsvButton } from '../components/settings/ExportCsvButton';
import { ExportJsonButton } from '../components/settings/ExportJsonButton';
import { LogoutButton } from '../components/settings/LogoutButton';
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
          <ListSubheader>Application</ListSubheader>
          <ThemeSetting />
          <ListDivider />
          <ListSubheader>Account</ListSubheader>
          <CurrencySetting />
          <ListDivider inset="gutter" />
          <ChangePasswordSetting />
        </List>
        <ExportCsvButton />
        <ExportJsonButton />
        <LogoutButton />
      </Stack>
      <NavigationBar />
    </>
  );
};
