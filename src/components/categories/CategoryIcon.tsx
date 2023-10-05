import { icons } from 'lucide-react';
import React from 'react';

import { useContrastColor } from '../../hooks/color';
import { DEFAULT_CATEGORY_ICON } from './constants';
import { CategoryIconName } from './types';

export type CategoryIconProps = {
  color?: string,
  children?: string,
}

export const CategoryIcon = ({
  color,
  children,
}: CategoryIconProps) => {
  const adjustColor = useContrastColor();

  const iconName = children && Object.hasOwn(icons, children) ?
    children as CategoryIconName : DEFAULT_CATEGORY_ICON;

  const Icon = icons[iconName];

  return <Icon color={adjustColor(color)} />;
};
