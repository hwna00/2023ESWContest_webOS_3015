import React from 'react';

import { FaStar } from '@react-icons/all-files/fa/FaStar';
import { Box, Icon, Stack } from '@chakra-ui/react';

const Rating = React.forwardRef(
  ({ size, scale, fillColor, strokeColor, rating, onRatingChange }, ref) => {
    const buttons = [];

    const onClick = idx => {
      if (!isNaN(idx)) {
        if (rating === 1 && idx === 1) {
          onRatingChange(0);
        } else {
          onRatingChange(idx);
        }
      }
    };

    const RatingIcon = ({ fill }) => {
      return (
        <Icon
          as={FaStar}
          boxSize={`${size}px`}
          color={fillColor}
          stroke={strokeColor}
          onClick={onClick}
          fillOpacity={fill ? '100%' : '30%'}
        />
      );
    };

    const RatingButton = ({ idx, fill }) => {
      return (
        <Box
          as="button"
          aria-label={`rate-${idx}`}
          variant="unstyled"
          onClick={() => onClick(idx)}
          _focus={{ outline: 0 }}
          width={`${size}px`}
          height={`${size}px`}
        >
          <RatingIcon fill={fill} />
        </Box>
      );
    };

    for (let i = 1; i <= scale; i++) {
      buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
    }

    return (
      <Stack isInline justify="center">
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
      </Stack>
    );
  },
);

Rating.displayName = 'Rating';

export default Rating;
