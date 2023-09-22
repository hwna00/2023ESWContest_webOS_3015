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

const BASE_URL = `https://apis.data.go.kr/B551182/hospInfoServicev2`;

const SignUp = function () {
  const [hospitalName, setHospitalName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchResults = async () => {
    const res = await axios.get(
      `${BASE_URL}/getHospBasisList?serviceKey=${process.env.REACT_APP_API_KEY}&numOfRows=999&yadmNm=${hospitalName}`,
    );

    if (res.data.response.body.items) {
      const { item } = res.data.response.body.items;
      setSearchResults(Array.isArray(item) ? item : [item]);
    } else {
      setSearchResults([]);
    }
  };

  const onChange = useCallback(e => {
    const valueWithoutSpaces = e.target.value.replace(/\s/g, '');
    setHospitalName(valueWithoutSpaces);
  }, []);

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
        <Box
          border="solid 1px"
          borderColor="black"
          w="500px"
          maxHeight="700px"
          overflowY="auto"
        >
          {searchResults.map(result => (
            <HStack key={result.ykiho}>
              <Text>{result.yadmNm}</Text>
              <Text>{result.addr}</Text>
              <Button>선택</Button>
            </HStack>
          ))}
        </Box>
      </VStack>
    </FormControl>
  );
};
export default SignUp;
