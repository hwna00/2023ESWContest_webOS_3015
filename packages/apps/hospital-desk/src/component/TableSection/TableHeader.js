import React from 'react';

import { Box, Divider, HStack } from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
function TableHeader({ tableHeaders }) {
  return (
    <Box>
      <HStack mt="7" justifyContent="space-evenly">
        {tableHeaders.map(header => (
          <Box key={header} w="20%" textAlign="center" fontWeight="bold">
            {header}
          </Box>
        ))}
      </HStack>
      <Divider h="0.5" mb="1" bgColor="black" />
    </Box>
  );
}

export default TableHeader;
