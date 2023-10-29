import { FaStar } from '@react-icons/all-files/fa/FaStar';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import { HStack, Icon, ListItem, Text, UnorderedList } from '@chakra-ui/react';

const ReviewList = function ({ reviews = [], height = '' }) {
  return (
    <div className={styles.hideScrollBar}>
      <UnorderedList styleType="none" spacing="6" margin={0} height={height}>
        {reviews.length === 0 && (
          <ListItem textAlign="center">리뷰가 없습니다.</ListItem>
        )}
        {reviews?.map(review => (
          <ListItem
            key={review.id}
            bgColor="primary.100"
            borderRadius="md"
            padding="4"
          >
            <HStack justifyContent="space-between" alignItems="center" mb="4">
              <Text fontWeight="bold">
                {review.reviewer} (담당의사: {review.reviewee})
              </Text>
              <HStack gap="2" alignItems="center" fontWeight="bold">
                <Icon as={FaStar} color="yellow.400" />
                <Text>{review.rate}</Text>
              </HStack>
            </HStack>
            <Text>{review.content}</Text>
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  );
};

export default ReviewList;
