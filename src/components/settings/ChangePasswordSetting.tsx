import {
  ListItem,
  ListItemButton,
  ListItemContent,
} from '@mui/joy';
import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

import { ChangePasswordModal } from './ChangePasswordModal';

export const ChangePasswordSetting = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <ListItem>
      <ListItemButton onClick={() => setModalOpen(true)}>
        <ListItemContent>Change Password</ListItemContent>
        <ChevronRight />
      </ListItemButton>
      <ChangePasswordModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </ListItem>
  );
};
