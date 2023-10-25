import { Box, IconButton, Sheet, Stack } from '@mui/joy';
import { Home, LayoutPanelLeft, ScrollText, Settings } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTER_PATHS } from '../../pages/constants';
import { BOTTOM_BAR_SHEET_STYLES } from './constants';

export type NavigationBarProps = {
  centerSpacing?: number,
}

export const NavigationBar = ({
  centerSpacing,
}: NavigationBarProps) => {
  return (
    <Sheet
      variant="outlined"
      sx={BOTTOM_BAR_SHEET_STYLES}
    >
      <Stack
        width="100%"
        maxWidth="sm"
        mx="auto"
        direction="row"
        justifyContent="space-around"
        gap={1}
      >
        <Link to={ROUTER_PATHS.home}>
          <IconButton>
            <Home />
          </IconButton>
        </Link>
        <IconButton>
          <ScrollText />
        </IconButton>
        {centerSpacing && <Box width={centerSpacing} />}
        <Link to={ROUTER_PATHS.categories}>
          <IconButton>
            <LayoutPanelLeft />
          </IconButton>
        </Link>
        <Link to={ROUTER_PATHS.settings}>
          <IconButton>
            <Settings />
          </IconButton>
        </Link>
      </Stack>
    </Sheet>
  );
};
