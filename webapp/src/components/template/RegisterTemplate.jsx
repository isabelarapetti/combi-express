import React, { PureComponent } from 'react';
import { TextField, Link, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { SubmitButton, Logo } from '../atoms';

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

class RegisterTemplateComponent extends PureComponent {
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
      onKeyPress={(evt) => this.onKeyPress(evt, this.props.onRegistrationCompleted)}
      value={value}
    />
  );

  render() {
    const { username, password, confirmpassword, onRegistrationCompleted, classes } = this.props;

    return (
      <Container component="main" className={classes.main} maxWidth="xs">
        <div className={classes.paper}>
          <Logo className={classes.logo} />
          <form className={classes.form} noValidate>
            {this.buildTextField(username, 'username', 'E-mail', classes, { autoFocus: true })}
            {this.buildTextField(password, 'password', 'Contraseña', classes, { type: 'password' })}
            {this.buildTextField(confirmpassword, 'confirmpassword', 'Confirmar contraseña', classes, {
              type: 'confirmpassword',
            })}
            <SubmitButton onClick={onRegistrationCompleted}>Registrarse</SubmitButton>
            <Link className={classes.link} href="#/sign-in" variant="caption">
              Volver
            </Link>
          </form>
        </div>
      </Container>
    );
  }
}

export const RegisterTemplate = withStyles(styles)(RegisterTemplateComponent);
