import { Box, Drawer, Grid, IconButton } from '@mui/joy';
import { icons, X } from 'lucide-react';
import React from 'react';

export type CategoryIconSelectorProps = {
  open: boolean,
  onClose: () => void,
  selectedValue?: string,
  onSelect: (value: string) => void,
}

export const CategoryIconSelector = ({
  open,
  onClose,
  selectedValue,
  onSelect,
}: CategoryIconSelectorProps) => {
  return (
    <Drawer
      open={open}
      anchor="bottom"
      onClose={onClose}
    >
      <Box
        position="sticky"
        top={0}
        display="flex"
        justifyContent="flex-end"
      >
        <IconButton size="sm" onClick={onClose}>
          <X />
        </IconButton>
      </Box>
      <Grid
        container
        justifyContent="center"
        maxWidth="md"
        mx="auto"
        px={3}
        pb={2}
        gap={2}
      >
        {
          open && Object.values(icons)
            .map((Icon, index) => {
              const selected = Icon.displayName === selectedValue;
              return (
                <Grid key={index}>
                  <IconButton
                    variant={
                      selected ? 'soft' : 'plain'
                    }
                    color={
                      selected ? 'primary' : 'neutral'
                    }
                    onClick={() => onSelect(
                      !selected && Icon.displayName || ''
                    )}
                  >
                    <Icon />
                  </IconButton>
                </Grid>
              );
            })
        }
      </Grid>
    </Drawer>
  );
};
