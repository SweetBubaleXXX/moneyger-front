import {
  Button,
  List,
  ListDivider,
  Stack,
} from '@mui/joy';
import React from 'react';
import { useDispatch } from 'react-redux';

import { CurrencySetting } from '../components/settings/CurrencySetting';
import { ThemeSetting } from '../components/settings/ThemeSetting';
import { NavigationBar } from '../components/toolbars/NavigationBar';
import { api } from '../features/api/apiSlice';
import { API_PATHS } from '../features/api/constants';
import { logout } from '../features/auth/authSlice';
import { CSV_EXPORT_FILENAME } from '../features/export/constants';
import { downloadFile } from '../features/export/downloadFile';

export const Settings = () => {
  const dispatch = useDispatch();

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
        <Button
          variant="soft"
          color="neutral"
          onClick={() => downloadFile(API_PATHS.exportCsv, CSV_EXPORT_FILENAME)}
        >
          Export CSV
        </Button>
        <Button
          variant="soft"
          color="danger"
          onClick={() => {
            dispatch(logout());
            dispatch(api.util.resetApiState());
          }}
        >
          Logout
        </Button>
      </Stack>
      <NavigationBar />
    </>
  );
};
