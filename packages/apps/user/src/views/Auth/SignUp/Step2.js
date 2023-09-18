import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { DaumPostcodeEmbed } from 'react-daum-postcode';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { setAddress } from '../../../store';

const Step2 = function () {
  const dispatch = useDispatch();
  const address = useSelector(state => state.signUp.address);

  const { register } = useOutletContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const errors = useSelector(state => state.signUp.errors);

  const handleComplete = data => {
    onClose();
    dispatch(setAddress(data.address));
  };

  return (
    <VStack width={'full'} gap={'4'}>
      <FormControl width="full" isRequired isInvalid={errors.birthDate}>
        <FormLabel>생년월일</FormLabel>
        <Input
          required
          type="date"
          placeholder="생년월일을 선택해주세요."
          {...register('birthDate', {
            required: '이 항목은 필수입니다.',
          })}
        />
        <FormErrorMessage>{errors.birthDate?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        width="full"
        isRequired
        isInvalid={errors.address || errors.addressDetail}
      >
        <FormLabel margin={0}>주소</FormLabel>

        <Input
          required
          placeholder="주소"
          mb={'2'}
          value={address}
          {...register('address', {
            required: '이 항목은 필수입니다.',
          })}
          onClick={onOpen}
          readOnly
        />
        <Input
          required
          placeholder="상세 주소"
          {...register('addressDetail', {
            required: '이 항목은 필수입니다.',
          })}
        />

        <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
      </FormControl>

      <FormControl width="full" isRequired isInvalid={errors.phoneNumber}>
        <FormLabel>전화번호</FormLabel>
        <InputGroup colorScheme="primary">
          <InputLeftAddon>010</InputLeftAddon>
          <Input
            required
            type="tel"
            maxLength="8"
            placeholder="필수 요소입니다."
            {...register('phoneNumber', {
              required: '이 항목은 필수입니다.',
              pattern: {
                value: /^[0-9]{8}$/i,
                message: '전화번호는 8자리의 숫자로만 이루어져야 합니다.',
              },
            })}
          />
        </InputGroup>
        <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
      </FormControl>

      <FormControl width="full" isInvalid={errors.secondPhoneNumber}>
        <FormLabel>비상 시 연락처</FormLabel>
        <InputGroup>
          <InputLeftAddon>010</InputLeftAddon>
          <Input
            type="tel"
            maxLength="8"
            placeholder="옵션 요소입니다."
            {...register('secondPhoneNumber', {
              pattern: {
                value: /^[0-9]{8}$/i,
                message: '전화번호는 8자리의 숫자로만 이루어져야 합니다.',
              },
            })}
          />
        </InputGroup>
        <FormErrorMessage>{errors.secondPhoneNumber?.message}</FormErrorMessage>
      </FormControl>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Step2;
