import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { SignInTemplate } from '../template';
import { SnackbarVisitor } from '../../lib/snackbar/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { GlobalState } from '../../GlobalState';
import { md5 } from '../../lib/crypto/md5';

class SignInPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      username: '',
      password: '',
    };
  }

  onSignInConfirm = () => {
    const { username, password } = this.state;

    if (!username) {
      this.notifier.error('Ingresar e-mail.');
      return;
    }

    if (!password) {
      this.notifier.error('Ingresar.');
      return;
    }

    const body = { username, password: md5(password) };

    this.api.request
      .post('authentication', body)
      .preventDefaultSuccess()
      .success((res) => {
        const { permissions, token } = res.body;

        GlobalState.History = this.props.history;
        document.cookie = `auth=${token}`;

        GlobalState.PermissionsMediator.refreshData(permissions);

        this.notifier.success('Bienvenido a Combi Express');
        this.redirectAfterSignIn();
      })
      .go();
  };

  redirectAfterSignIn = () => {
    const mediator = GlobalState.PermissionsMediator;

    if (mediator.has('ADMIN')) {
      this.props.history.push('/routes');
      return;
    }

    this.props.history.push('./searchroutes');
  };

  onInputChange = (event) => this.setState({ [event.target.name]: event.target.value });

  render() {
    const { username, password } = this.state;

    return (
      <SignInTemplate
        username={username}
        password={password}
        onSignInConfirm={this.onSignInConfirm}
        onInputChange={this.onInputChange}
      />
    );
  }
}

export const SignInPage = withSnackbar(SignInPageComponent);
