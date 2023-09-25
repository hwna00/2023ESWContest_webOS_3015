import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { selectAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

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
});

export const selectTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    outline,
  },
});
