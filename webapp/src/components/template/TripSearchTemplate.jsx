import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, TextField, Typography, Grid, Divider } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import { ChipsRow } from '../molecules';
import { SearchTextField } from '../atoms';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 'auto',
    overflow: 'hidden',
  },
  root: {
    width: '100%',
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
    margin: 'auto 0 auto auto',
  },
  details: {
    alignItems: 'center',
  },
  searchForm: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: 250,
    },
  },
  actions: {
    marginRight: theme.spacing(10),
  },
  subtitle: {
    flex: 'none',
  },
  column: {
    flexBasis: '33.33%',
  },
}));

function TripSearchTemplateComponent(props) {
  const { origin, destination, chips, onInputChange, onSearch, onSearchCriteriaDelete, limit, children } = props;
  const classes = useStyles();
  const panelName = 'panel1';
  const [expanded, setExpanded] = React.useState(panelName);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleSearch = () => {
    setExpanded(false);
    onSearch();
  };
  const handleRefresh = (event) => {
    event.stopPropagation();
    onSearch();
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === panelName} onChange={handleChange(panelName)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Typography variant="overline" className={classes.subtitle}>
                  Busqueda
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <ChipsRow chips={chips} onDelete={onSearchCriteriaDelete} />
              </Grid>
            </Grid>
            {!expanded && (
              <IconButton className={classes.icon} onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            )}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  helperText="Num maximo de resultados"
                  type="number"
                  size="small"
                  name="limit"
                  value={limit}
                  onChange={onInputChange}
                />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={9} className={classes.searchForm}>
                <div>
                  <SearchTextField label="Origen" name="origin" onChange={onInputChange} value={origin} />
                  <SearchTextField label="Destino" name="destination" onChange={onInputChange} value={destination} />
                </div>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <ExpansionPanelActions className={classes.actions}>
            <Button color="secondary" variant="outlined" onClick={handleSearch}>
              Buscar
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
        {children}
      </div>
    </Paper>
  );
}

export const TripSearchTemplate = TripSearchTemplateComponent;
