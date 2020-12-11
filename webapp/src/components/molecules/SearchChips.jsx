import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function SearchChips(props) {
  const { chipData } = props;
  const classes = useStyles();
  const [chipDataState, setChipData] = React.useState(chipData);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Box component="ul" className={classes.root}>
      {chipDataState.map((data) => {
        let icon;

        return (
          <li key={data.key}>
            <Chip icon={icon} label={data.label} onDelete={handleDelete(data)} className={classes.chip} />
          </li>
        );
      })}
    </Box>
  );
}

export { SearchChips };
