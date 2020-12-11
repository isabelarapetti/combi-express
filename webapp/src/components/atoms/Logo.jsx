import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import pngLogo from '../../assets/images/brand/logo.png';

const useStyles = makeStyles((theme) => ({
  content: {
    marginBottom: theme.spacing(1),
    width: '100%',
  },
}));

const Logo = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.content}>
      <img src={pngLogo} alt="Logo" {...props} />
    </Box>
  );
};

export { Logo };
