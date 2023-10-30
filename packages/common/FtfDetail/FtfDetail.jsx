import {
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  VStack,
} from '@chakra-ui/react';

import { getBlob } from '../utils/firebase';

const FtfDetail = function ({ data }) {
  return (
    <HStack justifyContent="space-between" alignItems="flex-start" gap="4">
      <VStack flex={3} alignItems="start">
        <Heading as="h3" fontSize="xl">
          진료 심사 관련 서류
        </Heading>
        <Image
          src={getBlob(`${data.uid}/nftf.png`)}
          alt="비대면 진료 서류"
          width="full"
        />
      </VStack>

      <VStack flex={2} alignItems="start">
        <Heading as="h3" fontSize="xl">
          초진대상
        </Heading>
        <RadioGroup colorScheme="primary" value={data.NFTFId}>
          <VStack align="start">
            <Radio value="f1" borderColor="primary.300">
              섬벽지 거주자
            </Radio>
            <Radio value="f2" borderColor="primary.300">
              만 65세 이상 이용자
            </Radio>
            <Radio value="f3" borderColor="primary.300">
              장애인 이용자
            </Radio>
            <Radio value="f4" borderColor="primary.300">
              만 18세 미만의 소아 환자
            </Radio>
          </VStack>
        </RadioGroup>
      </VStack>

      <VStack flex={2} alignItems="start">
        <Heading as="h3" fontSize="xl">
          재진대상
        </Heading>
        <RadioGroup colorScheme="primary" value={data.NFTFId}>
          <VStack align="start">
            <Radio value="s1" borderColor="primary.300">
              30일 이내 대면 진료 이력
            </Radio>
            <Radio value="s2" borderColor="primary.300">
              1년 이내 대면 진료 이력
            </Radio>
          </VStack>
        </RadioGroup>
      </VStack>
    </HStack>
  );
};

export default FtfDetail;
