import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Paper, Typography, makeStyles } from '@material-ui/core';
import Home from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `100%`,
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    margin: 0,
    height: `calc(100vh - 64px)`,
  },
  button: {
    marginTop: 20,
  },
}));

const PageNotFound = (props) => {
  const classes = useStyles();

  const back = () => props.history.push('/');

  return (
    <Paper className={classes.paper}>
      <div className={classes.container}>
        <Typography variant="h4">404</Typography>
        <Typography variant="subtitle1">Page not found.</Typography>
        <Button color="secondary" aria-label="home" onClick={back} className={classes.button} startIcon={<Home />}>
          Home
        </Button>
      </div>
    </Paper>
  );
};

export default withRouter(PageNotFound);
