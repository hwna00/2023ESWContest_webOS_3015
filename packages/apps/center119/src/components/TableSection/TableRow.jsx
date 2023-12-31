import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { Box, HStack, Button } from '@chakra-ui/react';

function TableRow({ data, buttonType }) {
  const navigate = useNavigate();

  const moveToDetail = useCallback(() => {
    navigate(`/view-emergencies/emergency-detail/${data.id}`);
  }, [navigate, data.id]);

  const detailButtons = (
    <Button h="10" onClick={moveToDetail} colorScheme="primary">
      상세정보
    </Button>
  );

  const renderButtons = () => {
    if (buttonType === 'detail') {
      return detailButtons;
    }

    return null;
  };
  return (
    <HStack
      bg="primary.100"
      py="4"
      mb="2"
      borderRadius="10"
      justifyContent="space-evenly"
      h="14"
    >
      <Box flex={1} textAlign="center">
        {data.name}
      </Box>

      <Box flex={1} textAlign="center">
        {data.phoneNumber}
      </Box>

      <Box flex={1} textAlign="center">
        {data.birthDate}
      </Box>

      <Box
        flex={1}
        alignContent="center"
        display="flex"
        justifyContent="center"
      >
        {renderButtons()}
      </Box>
    </HStack>
  );
}

export default TableRow;
