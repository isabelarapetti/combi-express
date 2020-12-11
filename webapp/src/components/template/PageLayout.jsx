import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavigationDrawer } from '../organisms/NavigationDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(2),
    marginLeft: '100px',
    maxWidth: '90%',
  },
  selected: {},
}));

function PageLayout(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavigationDrawer />
      <Container className={classes.main} maxWidth={false}>
        {children}
      </Container>
    </div>
  );
}

export { PageLayout };
