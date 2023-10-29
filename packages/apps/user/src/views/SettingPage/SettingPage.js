import { useState, useCallback, useEffect } from 'react';
import {
  Button,
  Heading,
  ListItem,
  UnorderedList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  List,
  useDisclosure,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';

import { fbLogOut } from '../../../firebase';
import closeApp from '../../../../../common/utils/closeApp';
import appinfo from '../../../webos-meta/appinfo.json';
import getNetworks from '../../utils/getNetworks';
import connectWifi from '../../utils/connectWifi';
import getStatus from '../../utils/getStatus';
import { CheckIcon } from '@chakra-ui/icons';

const SettingPage = function () {
  const [wifiList, setWifiList] = useState([]);
  const [wifiPassword, setWifiPassword] = useState('');
  const [connectedWifi, setConnectedWifi] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState('');

  const onLogoutClick = useCallback(() => {
    fbLogOut();
  }, []);

  const onClickCloseApp = useCallback(() => {
    const appId = appinfo.id;
    closeApp(appId);
  }, []);

  const onClickConnect = useCallback(() => {
    getNetworks()
      .then(networks => {
        setWifiList(networks);
        onOpen();
      })
      .catch(error => {
        console.error(error);
      });
  }, [onOpen]);

  const handlePasswordChange = useCallback(event => {
    setWifiPassword(event.target.value);
  }, []);

  const handleConnect = (ssid, availableSecurityTypes) => {
    connectWifi(ssid, wifiPassword, availableSecurityTypes);
    setWifiPassword('');
  };

  useEffect(() => {
    getStatus()
      .then(response => {
        setState(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, [onClickConnect]);

  return (
    <>
      <Heading>설정</Heading>
      <UnorderedList listStyleType="none" spacing="4" mt="8">
        <ListItem>
          <Button colorScheme="primary" size="lg" onClick={onClickConnect}>
            와이파이 연결
          </Button>
        </ListItem>
        <ListItem>
          <Button
            variant="outline"
            colorScheme="red"
            size="lg"
            onClick={onLogoutClick}
          >
            로그아웃
          </Button>
        </ListItem>

        <ListItem>
          <Button colorScheme="red" size="lg" onClick={onClickCloseApp}>
            앱 종료
          </Button>
        </ListItem>
      </UnorderedList>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onClick={onOpen}
        colorScheme="primary.100"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>와이파이 목록</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List>
              {wifiList.map((wifi, index) => (
                <ListItem
                  w="100%"
                  key={index}
                  p="2"
                  onClick={() => setConnectedWifi(wifi.networkInfo.ssid)}
                >
                  <VStack>
                    <HStack>
                      <Text>{wifi.networkInfo.displayName}</Text>
                      {wifi.networkInfo.displayName ===
                        state.networkInfo.ssid && <CheckIcon />}
                    </HStack>

                    {connectedWifi === wifi.networkInfo.ssid && (
                      <HStack>
                        <input
                          type="password"
                          value={wifiPassword}
                          onChange={handlePasswordChange}
                          placeholder="비밀번호를 입력하세요"
                        />
                        <Button
                          onClick={() =>
                            handleConnect(
                              wifi.networkInfo.ssid,
                              wifi.networkInfo.availableSecurityTypes[0],
                            )
                          }
                          outline="solid"
                          height="fit-content"
                        >
                          연결
                        </Button>
                      </HStack>
                    )}
                  </VStack>
                </ListItem>
              ))}
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingPage;
