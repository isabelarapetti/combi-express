import React from 'react';
import { Typography, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  titleTypography: {
    fontSize: '1.3rem',
    marginLeft: theme.spacing(1),
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    color: theme.palette.primary.contrastIcon,
    marginBottom: theme.spacing(1),
  },
}));

const PageTitle = (props) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <Box className={classes.content}>
      {children}
      <Typography component="h1" variant="overline" className={classes.titleTypography}>
        {props.title}
      </Typography>
    </Box>
  );
};

export { PageTitle };
