import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  colors: {
    black: '#16161D',
    primary: {
      main: '#09b2aa',
      dark: '#007a77',
      light: '#d0f4f2',
    },
    secondary: {
      main: '#109ebf',
      dark: '#086277',
      light: '#95e6fc',
    },
  },
  fonts,
  breakpoints,
});

export default theme;
