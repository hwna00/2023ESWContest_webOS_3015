import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import styles from './styles';

const theme = extendTheme({
  styles,
  colors: {
    primary: {
      100: '#d7dcf2',
      200: '#afbae6',
      300: '#8797da',
      400: '#5f75ce',
      500: '#3853C2',
      600: '#2c429b',
      700: '#213174',
      800: '#16214d',
      900: '#0b1026',
    },
    black: '#050813',
    white: '#ebedf8',
  },
});

export default theme;
