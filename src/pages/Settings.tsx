import {
  List,
  ListDivider,
  ListSubheader,
  Skeleton,
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
import { SupportChatButton } from '../components/settings/SupportChatButton';
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
          <Skeleton loading={account.isFetching}>
            {account.data?.username || 'Settings'}
          </Skeleton>
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
        <SupportChatButton />
        <LogoutButton />
      </Stack>
      <NavigationBar />
    </>
  );
};
