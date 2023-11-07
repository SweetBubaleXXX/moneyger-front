import { IconButton, Typography } from '@mui/joy';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { BaseTopbar } from './BaseTopbar';

export type ChatTopbarProps = {
  onReload: () => void,
}

export const ChatTopbar = ({
  onReload,
}: ChatTopbarProps) => {
  const navigate = useNavigate();

  return (
    <BaseTopbar>
      <IconButton
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
      </IconButton>
      <Typography level="title-md">
        Support Chat
      </Typography>
      <IconButton
        onClick={onReload}
        size="sm"
        variant="plain"
      >
        <RefreshCw />
      </IconButton>
    </BaseTopbar>
  );
};
