import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Skeleton,
  Text,
  Textarea,
  useDisclosure,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import useCamera from '../../../hooks/useCamera';
import { uploadNftfBlob } from '../../../../firebase';
import { useSelector } from 'react-redux';

function RadioCard({ remainingSeats, ...radioProps }) {
  const { getInputProps, getRadioProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        bgColor="primary.100"
        color="black"
        aria-disabled={remainingSeats === 0}
        _checked={{
          bgColor: 'primary.500',
          color: 'white',
          fontWeight: 'bold',
        }}
        _disabled={{
          bgColor: 'black',
          opacity: '0.2',
          color: 'white',
        }}
        px={4}
        py={2}
      >
        {radioProps.children}
      </Box>
    </Box>
  );
}

function CameraModal({ onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isCaptureComplete, setisCaptureComplete] = useState(false);

  const uid = useSelector(state => state.me.uid);
  const { isLoading, stream } = useCamera();

  const captureCam = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const width = videoRef.current?.offsetWidth;
    const height = videoRef.current?.offsetHeight;

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    context.drawImage(video, 0, 0, width, height);

    setisCaptureComplete(true);
  }, []);

  const saveBlob = useCallback(() => {
    const canvas = canvasRef.current;

    canvas.toBlob(async blob => {
      uploadNftfBlob(blob, uid);
    });

    onClose();
  }, [uid, onClose]);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.srcObject = stream;
    }

    return () => {
      console.log('clean up', stream?.getTracks());

      stream?.getTracks().forEach(track => {
        track.stop();
      });
    };
  }, [stream]);

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>비대면 진료 서류 제출</ModalHeader>
        <ModalBody>
          {!isCaptureComplete && (
            <Skeleton isLoaded={!isLoading}>
              <video autoPlay ref={videoRef} />
            </Skeleton>
          )}
          <canvas ref={canvasRef} height={0} width={0} />
        </ModalBody>

        <ModalFooter>
          {!isCaptureComplete ? (
            <Button colorScheme="primary" onClick={captureCam}>
              촬영하기
            </Button>
          ) : (
            <>
              <Button colorScheme="primary" mr={3} onClick={saveBlob}>
                저장하기
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </>
  );
}

const AppointForm = function ({
  reservationOfDay,
  register,
  errors,
  setAppointTime,
}) {
  const [isNftf, setIsNftf] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onTimeChange = value => {
    setAppointTime(value);
  };

  const onTypeChange = useCallback(value => {
    if (value === 'nftf') {
      setIsNftf(true);
    } else if (value === 'ftf') {
      setIsNftf(false);
    }
  }, []);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'time',
    onChange: onTimeChange,
  });
  const group = getRootProps();

  return (
    <>
      <FormControl isRequired isInvalid={errors.date}>
        <Input
          placeholder="예약하실 날짜를 선택하세요"
          size="lg"
          type="date"
          py={'2'}
          {...register('date', { required: '이 항목은 필수입니다.' })}
        />
        <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
      </FormControl>

      <Box width="full">
        <Grid
          width="full"
          maxH="64"
          overflowY="scroll"
          bgColor="primary.200"
          padding="4"
          templateColumns="repeat(4, 1fr)"
          placeItems="center"
          gap={4}
          borderRadius="md"
          {...group}
        >
          {Object.keys(reservationOfDay).map(key => {
            const radio = getRadioProps({ value: key });
            const remainingSeats = reservationOfDay[key];
            return (
              <GridItem key={key} width="full" textAlign="center">
                <RadioCard remainingSeats={remainingSeats} {...radio}>
                  {key}
                </RadioCard>
              </GridItem>
            );
          })}
        </Grid>
        <Text mt="2">병원 상황에 따라 대기 시간이 발생할 수 있습니다.</Text>
      </Box>

      <FormControl isRequired isInvalid={errors.type}>
        <RadioGroup
          display={'flex'}
          justifyContent={'space-around'}
          bgColor={'primary.200'}
          py={'4'}
          borderRadius={'md'}
          onChange={onTypeChange}
        >
          <Radio
            colorScheme="primary"
            value="ftf"
            size={'lg'}
            {...register('type', { required: '이 항목은 필수입니다.' })}
          >
            대면 진료
          </Radio>
          <Radio
            colorScheme="primary"
            value="nftf"
            size={'lg'}
            {...register('type', { required: '이 항목은 필수입니다.' })}
          >
            비대면 진료
          </Radio>
        </RadioGroup>
        <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
      </FormControl>

      {isNftf && (
        <>
          <Box>
            <FormControl
              bgColor={'primary.200'}
              padding={'4'}
              borderRadius={'md'}
              isInvalid={errors.nftfType}
            >
              <RadioGroup>
                <Box display={'flex'} flexDirection={'column'} gap={'4'}>
                  <Text>초진 대상자인 경우</Text>
                  <Radio
                    colorScheme="primary"
                    value="nftf1"
                    size={'lg'}
                    {...register('nftfType')}
                  >
                    섬벽지 거주자
                  </Radio>
                  <Radio
                    colorScheme="primary"
                    value="nftf2"
                    size={'lg'}
                    {...register('nftfType')}
                  >
                    만 65세 이상 이용자
                  </Radio>
                  <Radio
                    colorScheme="primary"
                    value="nftf3"
                    size={'lg'}
                    {...register('nftfType')}
                  >
                    장애인 이용자
                  </Radio>
                  <Radio
                    colorScheme="primary"
                    value="nftf4"
                    size={'lg'}
                    {...register('nftfType')}
                  >
                    만 18세 미만 이용자
                  </Radio>
                </Box>

                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  gap={'4'}
                  mt={'6'}
                >
                  <Text>재진 대상자인 경우</Text>
                  <Radio
                    colorScheme="primary"
                    value="nftf5"
                    size={'lg'}
                    {...register('nftfType')}
                  >
                    30일 이내 대면 진료 이력
                  </Radio>
                  <Radio
                    colorScheme="primary"
                    value="nftf6"
                    size={'lg'}
                    {...register('nftfType')}
                  >
                    1년 이내 대면 진료 이력
                  </Radio>
                </Box>
              </RadioGroup>
              <FormErrorMessage>{errors.nftfType?.message}</FormErrorMessage>
            </FormControl>

            <Button
              variant={'outline'}
              width={'full'}
              colorScheme="primary"
              onClick={onOpen}
              mt={'4'}
            >
              진료 서류 제출
            </Button>
            <Text fontWeight={'bold'} color={'red.500'}>
              * 서류 미제출 시 진료를 거부당할 수 있습니다.
            </Text>
          </Box>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'lg'}
            motionPreset="slideInBottom"
          >
            <CameraModal onClose={onClose} />
          </Modal>
        </>
      )}
      <Textarea
        placeholder="의사선생님이 알아야 할 내용이 있다면 작성해주세요"
        {...register('memo')}
      />

      <Button type="submit" width="full" colorScheme="primary" py="4" size="lg">
        예약하기
      </Button>
    </>
  );
};

export default AppointForm;
