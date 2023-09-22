import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const URL =
  'https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?serviceKey=ZaHh4wnwTtNPeakulxLVaI3LEUyfvtJkjgGLcbdfAGyC9eWlclqef0DXWWoeBOaxKBJKzbfWj0c9UTg%2F7Eyr%2Fw%3D%3D';

const SignUp = function () {
  const [hospitalName, setHospitalName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const fetchResults = async () => {
    const res = await axios.get(`${URL}&yadmNm=${hospitalName}`);

    if (res.data.response.body.items) {
      const { item } = res.data.response.body.items;
      setSearchResults(Array.isArray(item) ? item : [item]);
    } else {
      setSearchResults([]);
    }
  };

  const onChange = useCallback(e => setHospitalName(e.target.value), []);

  const handleSelect = (yadmNm, ykiho) => () =>
    console.log(`${yadmNm} : ${ykiho}`);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (hospitalName) {
        fetchResults();
      }
    }, 100);

    return () => clearTimeout(debounce);
  }, [hospitalName]);

  return (
    <FormControl>
      <VStack>
        <HStack w="400px">
          <Text>병원 검색 : </Text>
          <InputGroup w="-webkit-fit-content">
            <Input value={hospitalName} onChange={onChange} h="14" w="300px" />
            <InputRightElement>
              <Button onClick={fetchResults} h="full">
                <SearchIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
        </HStack>
        <Box border="solid 1px" borderColor="black" w="400px">
          {searchResults.map(result => (
            <HStack key={result.ykiho}>
              <Text>{result.yadmNm}</Text>
              <Button onClick={handleSelect(result.yadmNm, result.ykiho)}>
                선택
              </Button>
            </HStack>
          ))}
        </Box>
      </VStack>
    </FormControl>
  );
};
export default SignUp;
