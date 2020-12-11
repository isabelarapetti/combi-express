import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Chip, Box } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
});

const ChipsRowComponent = ({ classes, onDelete, chips }) => (
  <Box component="ul" className={classes.root}>
    {chips.map((chip) => (
      <li key={chip.key}>
        <Chip label={chip.label} onDelete={() => onDelete(chip.key)} className={classes.chip} />
      </li>
    ))}
  </Box>
);

export const ChipsRow = withStyles(styles)(ChipsRowComponent);
