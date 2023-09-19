import React, { useState } from 'react';
import { Box, Icon, Stack, Text } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa6';

const Rating = React.forwardRef(
  ({ size, scale, fillColor, strokeColor }, ref) => {
    const [rating, setRating] = useState(0);
    const buttons = [];

    const onClick = idx => {
      if (!isNaN(idx)) {
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && idx === 1) {
          setRating(0);
        } else {
          setRating(idx);
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
      <Stack isInline mt={8} justify="center">
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
      </Stack>
    );
  },
);

Rating.displayName = 'Rating';

export default Rating;
