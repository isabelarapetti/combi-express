import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: '15px',
    backgroundColor: '#f9f3d9fa',
  },
  paper: {
    padding: '5px',
    textAlign: 'center',
  },
});
function TripSearchGridTemplate(props) {
  const { data, onRouteSelection } = props;
  const classes = useStyles();

  return (
    <div>
      {data.map((item) => (
        <Card className={classes.root} key={item.id}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h5">
                {item.origin}-{item.destination}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper}>
                    <div>
                      <b>Origen</b>
                    </div>
                    <div>{item.origin}</div>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper}>
                    {' '}
                    <div>
                      <b>Destino</b>
                    </div>
                    <div>{item.destination}</div>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper}>
                    {' '}
                    <div>
                      <b>Hora</b>
                    </div>
                    <div>{item.time}</div>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper}>
                    {' '}
                    <div>
                      <b>Precio</b>
                    </div>
                    <div>${item.price}</div>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
          <CardActions style={{ textalign: 'right' }}>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => onRouteSelection(item.id)}
              value={item.id}
            >
              Reservar
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
export { TripSearchGridTemplate };
