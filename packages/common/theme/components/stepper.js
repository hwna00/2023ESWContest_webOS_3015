const stepper = {
  baseStyle: {
    indicator: {
      '&[data-status=incomplete]': {
        borderColor: 'primary.200',
        color: 'primary.200',
      },
    },
    separator: {
      '&[data-status=incomplete]': {
        bgColor: 'primary.200',
      },
      '&[data-status=active]': {
        bgColor: 'primary.200',
      },
    },
  },
};

export default stepper;
