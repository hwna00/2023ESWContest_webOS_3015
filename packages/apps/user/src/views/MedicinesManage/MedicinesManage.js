import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  ListItem,
  Textarea,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';

const MedicinesManage = function () {
  return (
    <HStack
      height="full"
      justifyContent="center"
      alignItems="flex-start"
      gap="4"
    >
      <VStack
        width="full"
        height="full"
        flex={1}
        justifyContent="space-between"
      >
        <HStack width="full" justifyContent="space-between">
          <Heading fontSize="3xl">복용 약</Heading>
          <Button colorScheme="primary" variant="outline">
            약 추가
          </Button>
        </HStack>
        <UnorderedList
          listStyleType="none"
          width="full"
          height="96"
          overflowY="scroll"
          mx={0}
          my="4"
          spacing="4"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <ListItem
              padding="4"
              bgColor="primary.100"
              borderRadius="md"
              textAlign="center"
            >
              hi
            </ListItem>
          ))}
        </UnorderedList>
        <Button width="full" size="lg" colorScheme="primary" variant="outline">
          부작용 관리
        </Button>
      </VStack>
      <VStack
        width="full"
        height="full"
        flex={1}
        justifyContent="space-between"
      >
        <Input type="date" size="lg" />
        <UnorderedList
          listStyleType="none"
          width="full"
          height="80"
          overflowY="scroll"
          mx={0}
          my="4"
          spacing="4"
        >
          {[1, 2, 3, 4, 5].map(() => (
            <ListItem padding="4" bgColor="primary.100" borderRadius="md">
              hi
            </ListItem>
          ))}
        </UnorderedList>
        <Box width="full">
          <Heading as="h3" fontSize="2xl">
            메모
          </Heading>
          <Textarea width="full" />
        </Box>
      </VStack>
    </HStack>
  );
};

export default MedicinesManage;
