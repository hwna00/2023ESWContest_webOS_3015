import React from 'react';

import { Box, Divider, HStack } from '@chakra-ui/react';

function TableHeader({ tableHeaders }) {
  return (
    <Box w="100%">
      <HStack mt="7" justifyContent="space-evenly">
        {tableHeaders.map(header => (
          <Box key={header} flex={1} textAlign="center" fontWeight="bold">
            {header}
          </Box>
        ))}
      </HStack>
      <Divider h="0.5" mb="1" bgColor="black" />
    </Box>
  );
}

export default TableHeader;
