import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

const backgroundPattern =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23525252' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    paddingBottom: 5,
    paddingTop: 5,
    color: theme.palette.primary.light,
    fontSize: 18,
    letterSpacing: '0.1rem',
    backgroundColor: '#1e1e1e',
    backgroundImage: `url("${backgroundPattern}")`,
    '&:hover': {
      backgroundColor: 'E63B0E',
      boxShadow: `inset 0 0 0 100vw ${theme.palette.primary.dark}"`,
    },
  },
}));

const SubmitButton = (props) => {
  const classes = useStyles();
  return (
    <Button fullWidth variant="contained" className={classes.submitButton} {...props}>
      {props.children}
    </Button>
  );
};
export { SubmitButton };
