import { useColorScheme } from '@mui/joy';
import chroma from 'chroma-js';

export const useContrastColor = () => {
  const { mode, systemMode } = useColorScheme();
  const isDarkTheme = (systemMode ?? mode) === 'dark';

  return (color?: string) =>
    color && chroma(color).luminance(isDarkTheme ? 0.35 : 0.2).hex();
};
