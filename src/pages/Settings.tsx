import {
  Button,
  List,
  ListDivider,
  Stack,
} from '@mui/joy';
import React from 'react';

import { CurrencySetting } from '../components/settings/CurrencySetting';
import { LogoutButton } from '../components/settings/LogoutButton';
import { ThemeSetting } from '../components/settings/ThemeSetting';
import { NavigationBar } from '../components/toolbars/NavigationBar';
import { API_PATHS } from '../features/api/constants';
import { CSV_EXPORT_FILENAME } from '../features/export/constants';
import { downloadFile } from '../features/export/downloadFile';

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
        <Button
          variant="soft"
          color="neutral"
          onClick={() => downloadFile(API_PATHS.exportCsv, CSV_EXPORT_FILENAME)}
        >
          Export CSV
        </Button>
        <LogoutButton />
      </Stack>
      <NavigationBar />
    </>
  );
};
