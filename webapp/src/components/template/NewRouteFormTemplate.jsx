import React, { PureComponent } from 'react';
import { TextField, Button, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  main: {
    marginTop: theme.spacing(18),
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  logo: {
    width: '100%',
  },
  link: {
    color: theme.palette.secondary.dark,
  },
  textbox: {
    color: theme.palette.primary.main,
    borderColor: `${theme.palette.primary.main} !important`,
  },
  label: {
    color: `${theme.palette.primary.main} !important`,
    '&.focused': {
      color: `${theme.palette.primary.main} !important`,
    },
  },
});

class NewRouteFormTemplateComponent extends PureComponent {
  onKeyPress = (evt, callback) => {
    if (evt.key === 'Enter') {
      callback();
    }
  };

  buildTextField = (value, name, label, style, props) => (
    <TextField
      {...props}
      variant="outlined"
      margin="dense"
      required
      fullWidth
      id={name}
      label={label}
      InputProps={{
        classes: {
          root: style.textbox,
          notchedOutline: style.textbox,
        },
      }}
      InputLabelProps={{
        classes: {
          root: style.label,
          focused: 'focused',
        },
      }}
      name={name}
      onChange={this.props.onInputChange}
      onKeyPress={(evt) => this.onKeyPress(evt, this.props.onCreationCompleted)}
      value={value}
    />
  );

  render() {
    const { origin, destination, time, price, capacity, classes, onCreationCompleted } = this.props;

    return (
      <Container component="main" className={classes.main} maxWidth="xs">
        <div className={classes.paper}>
          <h3>Crear nueva ruta</h3>
          <form className={classes.form} noValidate>
            {this.buildTextField(origin, 'origin', 'Origen', classes, { autoFocus: true })}
            {this.buildTextField(destination, 'destination', 'Destino', classes)}
            {this.buildTextField(time, 'time', 'Hora de partida', classes)}
            {this.buildTextField(price, 'price', 'Precio', classes)}
            {this.buildTextField(capacity, 'capacity', 'Capacidad maxima', classes)}
            <Button onClick={onCreationCompleted}>Crear</Button>
            <Button href="#/routes" variant="caption">
              Volver
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export const NewRouteFormTemplate = withStyles(styles)(NewRouteFormTemplateComponent);
