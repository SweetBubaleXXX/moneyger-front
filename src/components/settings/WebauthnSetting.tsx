import {
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from '@mui/joy';
import { Fingerprint } from 'lucide-react';
import React from 'react';

export const WebauthnSetting = () => {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemDecorator>
          <Fingerprint />
        </ListItemDecorator>
        <ListItemContent>
          Setup WebAuthn
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
};