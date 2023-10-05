import { useColorScheme } from '@mui/joy';
import chroma from 'chroma-js';
import { icons } from 'lucide-react';
import React from 'react';

import { DEFAULT_CATEGORY_ICON } from './constants';
import { CategoryIconName } from './types';

export type CategoryIconProps = {
  name?: string,
  color?: string,
}

export const CategoryIcon = ({
  name,
  color,
}: CategoryIconProps) => {
  const { mode, systemMode } = useColorScheme();
  const isDarkTheme = (systemMode ?? mode) === 'dark';

  const iconColor = color && chroma(color).luminance(
    isDarkTheme ? 0.35 : 0.2
  ).hex();

  const iconName = name && Object.hasOwn(icons, name) ?
    name as CategoryIconName : DEFAULT_CATEGORY_ICON;

  const Icon = icons[iconName];

  return <Icon color={iconColor} />;
};
