import {
  List,
  ListDivider,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/joy';
import React from 'react';

import {
  ChangePasswordSetting,
} from '../components/settings/ChangePasswordSetting';
import { CurrencySetting } from '../components/settings/CurrencySetting';
import { ExportCsvSetting } from '../components/settings/ExportCsvSetting';
import { ExportJsonSetting } from '../components/settings/ExportJsonSetting';
import { ImportJsonSetting } from '../components/settings/ImportJsonSetting';
import { LogoutButton } from '../components/settings/LogoutButton';
import { ThemeSetting } from '../components/settings/ThemeSetting';
import { NavigationBar } from '../components/toolbars/NavigationBar';
import { useGetAccountQuery } from '../features/api/apiSlice';

export const Settings = () => {
  const account = useGetAccountQuery();

  return (
    <>
      <Stack
        maxWidth="sm"
        mx="auto"
        p={2}
        spacing={2}
      >
        <Typography level="title-lg" textAlign="center" noWrap>
          {account.data?.username}
        </Typography>
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
          <ListDivider />
          <ListSubheader>Data Management</ListSubheader>
          <ExportCsvSetting />
          <ListDivider inset="gutter" />
          <ExportJsonSetting />
          <ListDivider inset="gutter" />
          <ImportJsonSetting />
        </List>
        <LogoutButton />
      </Stack>
      <NavigationBar />
    </>
  );
};
