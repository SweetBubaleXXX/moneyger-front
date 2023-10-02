import { Box, Sheet } from '@mui/joy';
import React, { ReactNode } from 'react';

import { TOP_BAR_SHEET_STYLES } from './constants';

export type BaseTopbarProps = {
  children: ReactNode,
}

export const BaseTopbar = ({
  children,
}: BaseTopbarProps) => {
  return (
    <Sheet
      variant="outlined"
      sx={TOP_BAR_SHEET_STYLES}
    >
      <Box
        width="100%"
        maxWidth="sm"
        mx="auto"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
        {children}
      </Box>
    </Sheet>
  );
};
