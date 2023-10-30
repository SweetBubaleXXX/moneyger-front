import { Box, BoxProps, Sheet } from '@mui/joy';
import React from 'react';

import { TOP_BAR_SHEET_STYLES } from './constants';

export type BaseTopbarProps = BoxProps

export const BaseTopbar = (props: BaseTopbarProps) => {
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
        {...props}
      />
    </Sheet>
  );
};
