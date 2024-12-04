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
        <Option value="light">Светлая</Option>
        <Option value="dark">Темная</Option>
        <Option value="system">Системная</Option>
      </Select>
    }>
      <ListItemContent>
        Тема
      </ListItemContent>
    </ListItem>
  );
};
