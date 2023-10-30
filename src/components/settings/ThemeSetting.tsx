import {
  ListItem,
  ListItemContent,
  Option,
  Select,
  useColorScheme,
} from '@mui/joy';
import React from 'react';

export const ThemeSetting = () => {
  const { mode, setMode } = useColorScheme();

  return (
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
  );
};
