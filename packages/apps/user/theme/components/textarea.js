import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const outline = defineStyle({
  fontSize: '18px',
  border: '1px solid',
  borderColor: 'primary.300',
  background: 'white',

  _dark: {
    borderColor: 'white',
    bgColor: 'primary.800',
    color: 'white',
  },
});

export const textareaTheme = defineStyleConfig({
  variants: { outline },
});
