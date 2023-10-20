import { useInfiniteQuery } from '@tanstack/react-query';
import {
  Box,
  Heading,
  VStack,
  Text,
  Grid,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';

import { getPharmacies } from '../../../api';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Pharmacies = function () {
  const TOTAL_PAGE = 100;

  const [selectedPharmacy, setSelectedPharmacy] = useState();
  const [deliveryType, setDeliveryType] = useState();

  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    ['pharmacies'],
    ({ pageParam = 1 }) => getPharmacies({ pageNo: pageParam, numOfRows: 10 }),
    {
      getNextPageParam: lastPage => {
        return lastPage.pageNo !== TOTAL_PAGE ? lastPage.pageNo + 1 : undefined;
      },
    },
  );

  const onScroll = useCallback(
    event => {
      const scrollHeight = event.target.scrollHeight;
      const scrollTop = event.target.scrollTop;
      const offsetHeight = event.target.offsetHeight;
      if (scrollHeight <= scrollTop + offsetHeight) {
        fetchNextPage();
      }
    },
    [fetchNextPage],
  );

  const onPharmacyClick = useCallback(
    pharmacy => {
      setSelectedPharmacy(pharmacy);
      onOpen();
    },
    [onOpen],
  );

  const onCloseClick = useCallback(() => {
    onClose();
    // TODO: api 연결
    navigate(`/appointment/${id}/create-review`);
  }, [onClose, navigate, id]);

  return (
    <VStack width="full" height="full" gap="4">
      <Box width="100%">
        <Heading>약국 선택</Heading>
      </Box>

      <Box width="full" maxHeight="80vh" overflowY="scroll" onScroll={onScroll}>
        <Grid width="full" templateColumns="1fr 1fr" gap="4">
          {isLoading ? (
            'loading...'
          ) : (
            <>
              {isError && (
                <Text textAlign="center">데이터를 불러올 수 없습니다.</Text>
              )}
              {data?.pages.map(page =>
                page.pharmacies.map(pharmacy => (
                  <Box
                    key={pharmacy.ykiho}
                    padding="4"
                    bgColor="primary.100"
                    borderRadius="md"
                    cursor="pointer"
                    onClick={() => onPharmacyClick(pharmacy)}
                  >
                    <Text fontSize="lg" fontWeight="bold">
                      {pharmacy.name}
                    </Text>
                    <Text>주소: {pharmacy.address}</Text>
                    <Text>전화번호: {pharmacy.tel}</Text>
                  </Box>
                )),
              )}
            </>
          )}
        </Grid>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text as="u">{selectedPharmacy?.name}</Text>을 선택하셨습니다.
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              gap="4"
              value={deliveryType}
              onChange={setDeliveryType}
              colorScheme="primary"
            >
              <Radio borderColor="primary.300" value="nftf" size="lg">
                비대면으로 수령하기
              </Radio>
              <Radio borderColor="primary.300" value="ftf" size="lg">
                대면으로 수령하기
              </Radio>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="primary" onClick={onCloseClick}>
              선택하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Pharmacies;
