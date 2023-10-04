import { useEffect, useState } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import {
  HStack,
  VStack,
  Text,
  Link as ChakraLink,
  UnorderedList,
  ListItem,
  Tag,
  AspectRatio,
  Image,
  Icon,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const AppointmentViewList = function ({ type, list }) {
  //TODO: isOpen을 통해 영업 여부를 판단해야 함
  const [nameOfView, setNameOfView] = useState('');
  useEffect(() => {
    if (type === 'hospital') {
      setNameOfView('병원별 보기');
    } else if (type === 'doctor') {
      setNameOfView('의사별 보기');
    }
  }, [type]);

  return (
    <VStack w="full" h="80">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="flex-end"
        pl="2"
        pr="6"
      >
        <Text fontSize="xl" fontWeight="bold">
          {nameOfView}
        </Text>
        <ChakraLink as={ReactRouterLink} to={`/appointment/${type}s`}>
          +더보기
        </ChakraLink>
      </HStack>

      <UnorderedList
        w="full"
        overflowY="auto"
        listStyleType={'none'}
        spacing={'4'}
        margin={0}
      >
        {list?.map(item => (
          <ListItem w="full" px="2" key={item.id}>
            <ChakraLink
              as={ReactRouterLink}
              to={`/appointment/${type}s/${item.id}`}
              width={'full'}
            >
              <HStack
                justifyContent={'flex-start'}
                gap={'6'}
                padding={'2'}
                borderY="2px"
                borderColor={'primary.300'}
              >
                <AspectRatio width={'20'} ratio={1}>
                  <Image src={item.profileImg} borderRadius={'md'} />
                </AspectRatio>
                <VStack pl="2" gap="0" alignItems="flex-start">
                  <HStack gap="4">
                    <Text>{item.name}</Text>
                    <HStack gap={'2'}>
                      <Icon as={FaStar} color="yellow.400" />
                      <Text>
                        {item.rate} {item?.numberOfRatings}
                      </Text>
                    </HStack>
                  </HStack>
                  {item.isOpen ? (
                    <Text fontSize="md" color="primary.400">
                      진료중
                    </Text>
                  ) : (
                    <Text fontSize="md" color="red">
                      영업종료
                    </Text>
                  )}

                  <HStack my="2" flexWrap="wrap" rowGap="0" columnGap="3">
                    {item.fields.map(field => (
                      <Tag
                        size="md"
                        key={field}
                        variant="outline"
                        colorScheme="gray"
                      >
                        {field}
                      </Tag>
                    ))}
                  </HStack>
                </VStack>
              </HStack>
            </ChakraLink>
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
};

export default AppointmentViewList;
