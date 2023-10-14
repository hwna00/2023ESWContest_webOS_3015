import { Button } from '@chakra-ui/react';
import convert from '@housepital/common/utils/convert';
import { useSelector } from 'react-redux';

function Test() {
  const hospital = useSelector(state => state.hospital);
  const ykiho =
    // hospital.ykiho;
    'JDQ4MTg4MSM1MSMkMSMkMCMkODkkMzgxMzUxIzExIyQyIyQ3IyQwMCQyNjEyMjIjNjEjJDEjJDgjJDgz';
  return (
    <Button onClick={() => convert(ykiho).then(console.log)}>
      Fetch Time Table
    </Button>
  );
}

export default Test;
