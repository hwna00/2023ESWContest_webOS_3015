import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { inputAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    fontSize: '18px',
  },
});

const outline = definePartsStyle({
  field: {
    border: '1px solid',
    borderColor: 'primary.300',
    background: 'white',

    _dark: {
      borderColor: 'white',
      bgColor: 'primary.800',
      color: 'white',
    },
  },
  addon: {
    border: '1px solid',
    borderColor: 'primary.300',
    background: 'primary.100',
    fontWeight: 'bold',

    _dark: {
      borderColor: 'white',
      bgColor: 'primary.800',
      color: 'white',
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    outline,
  },
  defaultProps: {
    colorScheme: 'primary',
  },
});
