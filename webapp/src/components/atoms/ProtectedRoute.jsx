import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { SnackbarVisitor } from '../../lib/snackbar/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { PermissionsMediator } from '../../lib/storageMediators/PermissionsMediator';
// import { withAuthToken } from '../../contexts/withAuthToken';
import { getCookie } from '../../lib/operators/getCookie';
// import { deletecookie } from '../../lib/operators/deletecookie';

class ProtectedRouteComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);
  }

  render() {
    const { component: Component, ...props } = this.props;
    const { permission = '', hasOnePermissions = [] } = this.props;
    const authCookie = getCookie('auth');

    const isAuthorized =
      PermissionsMediator.isLoggedIn() &&
      (PermissionsMediator.has(permission) || PermissionsMediator.hasOne(hasOnePermissions));

    const isAuthenticated = !!authCookie;

    const renderComp = (componentProps) => {
      if (isAuthorized && isAuthenticated) return <Component {...componentProps} />;
      if (!isAuthorized && isAuthenticated) return <Redirect to="/" />;
      if (!isAuthenticated) this.notifier.error('La sesion ha expirado');

      return <Redirect to="/sign-in" />;
    };
    return <Route exact {...props} render={(componentProps) => renderComp(componentProps)} />;
  }
}
export const ProtectedRoute = withSnackbar(ProtectedRouteComponent);
