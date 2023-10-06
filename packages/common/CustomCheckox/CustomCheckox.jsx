import { Box, useCheckbox } from '@chakra-ui/react';

function CustomCheckbox({ ...checkboxProps }) {
  const { getInputProps, getCheckboxProps } = useCheckbox(checkboxProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        bgColor="primary.100"
        color="black"
        _checked={{
          bgColor: 'primary.500',
          color: 'white',
        }}
        _disabled={{
          bgColor: 'black',
          opacity: '0.2',
          color: 'white',
        }}
        px={4}
        py={2}
      >
        {checkboxProps.children}
      </Box>
    </Box>
  );
}

export default CustomCheckbox;
