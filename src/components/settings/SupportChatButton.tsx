import { Button } from '@mui/joy';
import { MessagesSquare } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTER_PATHS } from '../../pages/constants';

export const SupportChatButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      color="neutral"
      variant="soft"
      startDecorator={<MessagesSquare />}
      onClick={() => navigate(ROUTER_PATHS.chat)}
    >
      Support Chat
    </Button>
  );
};
