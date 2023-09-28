import {
  List,
  ListItem,
  ListItemContent,
  Option,
  Select,
  useColorScheme,
} from '@mui/joy';
import React from 'react';

import { NavigationBar } from '../components/toolbars/NavigationBar';

export const Settings = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <List variant="outlined">
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
