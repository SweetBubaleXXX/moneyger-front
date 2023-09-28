import {
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  Option,
  Select,
  useColorScheme,
} from '@mui/joy';
import React from 'react';

import { NavigationBar } from '../components/toolbars/NavigationBar';
import { CURRENCY_CODES } from '../constants';
import { useGetAccountQuery } from '../features/api/apiSlice';

export const Settings = () => {
  const { mode, setMode } = useColorScheme();

  const account = useGetAccountQuery();

  return (
    <>
      <List
        variant="soft"
        sx={{
          m: 2,
          borderRadius: 'md',
        }}
      >
        <ListItem endAction={
          <Select
            disabled={account.isFetching}
            value={account.data?.defaultCurrency}
          >
            {
              CURRENCY_CODES.map(curCode =>
                <Option
                  value={curCode}
                  key={curCode}
                >
                  {curCode}
                </Option>
              )
            }
          </Select>
        }>
          <ListItemContent>
            Default Currency
          </ListItemContent>
        </ListItem>
        <ListDivider />
        <ListItem endAction={
          <Select
            value={mode}
            onChange={(_, value) => setMode(value)}
          >
            <Option value="light">Light</Option>
            <Option value="dark">Dark</Option>
            <Option value="system">System</Option>
          </Select>
        }>
          <ListItemContent>
            Theme
          </ListItemContent>
        </ListItem>
      </List>
      <NavigationBar />
    </>
  );
};
