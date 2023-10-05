import { icons } from 'lucide-react';
import React from 'react';

export type CategoryIconProps = {
  name: keyof typeof icons,
  color?: string,
}

export const CategoryIcon = ({
  name,
  color,
}: CategoryIconProps) => {
  const Icon = icons[name];
  return <Icon color={color} />;
};
