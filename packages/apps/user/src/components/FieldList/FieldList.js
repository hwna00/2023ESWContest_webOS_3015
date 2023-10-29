import { useQuery } from '@tanstack/react-query';
import { Tag } from '@chakra-ui/react';

import { getFields } from '../../api';

const FieldList = function ({ ykiho }) {
  const { data: fields = [] } = useQuery(['fields', ykiho], getFields, {
    enabled: !!ykiho,
  });

  return fields?.map(field => (
    <Tag size="md" key={field.dgsbjtCdNm} variant="outline" colorScheme="gray">
      {field.dgsbjtCdNm}
    </Tag>
  ));
};

export default FieldList;
