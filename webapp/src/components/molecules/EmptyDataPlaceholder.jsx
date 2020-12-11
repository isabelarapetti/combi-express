import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { SmsOutlined as SmsOutlinedIcon } from '@material-ui/icons';

const styles = {
  emptyCard: {
    textAlign: 'center',
    padding: '40px 0 40px 0',
  },
};

const EmptyDataPlaceholder = (props) => {
  const { children } = props;
  return (
    <Box style={styles.emptyCard}>
      <SmsOutlinedIcon />
      <br />
      <Typography>{children}</Typography>
    </Box>
  );
};

export { EmptyDataPlaceholder };
