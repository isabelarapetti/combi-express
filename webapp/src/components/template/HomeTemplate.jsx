import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Logo, Copyright } from '../atoms';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  main: {
    padding: 0,
    '& .MuiContainer-root .MuiContainer-maxWidthXl': {
      paddingLeft: 0,
      paddingRight: 0,
      padding: 0,
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: { justifyContent: 'space-between' },
  toolbarTitle: {
    flexGrow: 1,
  },
  logo: {
    width: '300px',
    textAlign: 'center',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  content: {
    padding: theme.spacing(8, 0, 6),
    textAlign: 'center',
  },
  cardHeader: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'Rosario-CABA',
    price: '500',
    buttonVariant: 'outlined',
  },
  {
    title: 'La Plata-CABA',
    price: '420',
    buttonVariant: 'contained',
  },
  {
    title: 'Lanus-Retiro',
    price: '250',
    buttonVariant: 'outlined',
  },
];
const footers = [
  {
    title: 'Transporte del Oeste s.a.',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

function HomeTemplate() {
  const classes = useStyles();

  return (
    <div className={classes.main} component="main">
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
            Transportes del Oeste S.A.
          </Typography>

          <Button href="#/sign-in" color="primary" variant="outlined" className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" component="main" className={classes.content}>
        <Logo className={classes.logo} />
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Contamos con todo tipo de vehículos habilitados para viajes de corta, mediana en el area metropolitana,gran
          Buenos Aires y Rosario con choferes profesionales, capacitados en el traslado de pasajeros.
          <br />
          <b>Reservá tus pasajes!</b>
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button href="#/sign-in" fullWidth variant={tier.buttonVariant} color="primary">
                    Reservar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </div>
  );
}

export { HomeTemplate };
