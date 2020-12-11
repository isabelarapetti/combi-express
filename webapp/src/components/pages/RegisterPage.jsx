import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { RegisterTemplate } from '../template';
import { SnackbarVisitor } from '../../lib/snackbar/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { md5 } from '../../lib/crypto/md5';

class RegisterPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      username: '',
      password: '',
      confirmpassword: '',
    };
  }

  onRegistrationCompleted = () => {
    const { username, password, confirmpassword } = this.state;

    if (!username) {
      this.notifier.error('Ingresar Email.');
      return;
    }

    if (!password) {
      this.notifier.error('Ingresar contraseña');
      return;
    }
    console.log('pkfldkglñfd');
    if (password !== confirmpassword) {
      console.log('aaaaaaaaaaa');
      this.notifier.error('Las contraseñas no coinciden.');
      return;
    }

    const body = { username, password: md5(password) };
    this.api.request
      .post('authentication/register', body)
      .preventDefaultSuccess()
      .success(() => {
        this.notifier.success('Bienvenido a Combi Express');
        this.props.history.push('./sign-in');
      })
      .go();
  };

  onInputChange = (event) => this.setState({ [event.target.name]: event.target.value });

  render() {
    const { username, password, confirmpassword } = this.state;

    return (
      <RegisterTemplate
        username={username}
        password={password}
        confirmpassword={confirmpassword}
        onRegistrationCompleted={this.onRegistrationCompleted}
        onInputChange={this.onInputChange}
      />
    );
  }
}

export const RegisterPage = withSnackbar(RegisterPageComponent);
