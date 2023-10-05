import { Drawer, Grid, IconButton } from '@mui/joy';
import { icons } from 'lucide-react';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

export type CategoryIconSelectorProps = {
  open: boolean,
  onClose: () => void,
  field: ControllerRenderProps<any, any>
}

export const CategoryIconSelector = ({
  open,
  onClose,
  field,
}: CategoryIconSelectorProps) => {
  return (
    <Drawer
      open={open}
      anchor="bottom"
      onClose={onClose}
    >
      <Grid
        container
        justifyContent="center"
        maxWidth="md"
        mx="auto"
        p={2}
        gap={2}
      >
        {
          Object.values(icons)
            .map((Icon, index) => {
              const selected = Icon.displayName === field.value;
              return (
                <Grid key={index}>
                  <IconButton
                    variant={
                      selected ? 'soft' : 'plain'
                    }
                    color={
                      selected ? 'primary' : 'neutral'
                    }
                    onClick={() => field.onChange(
                      selected ? '' : Icon.displayName
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
