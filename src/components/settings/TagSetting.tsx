import { ListItem, ListItemButton, ListItemContent } from '@mui/joy';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTER_PATHS } from '../../pages/constants';

export const TagSetting = () => {
  const navigate = useNavigate();

  return (
    <ListItem>
      <ListItemButton onClick={() => navigate(ROUTER_PATHS.tags)}>
        <ListItemContent>Редактировать теги</ListItemContent>
        <ChevronRight />
      </ListItemButton>
    </ListItem>
  );
};
