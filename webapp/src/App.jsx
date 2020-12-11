/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PermissionsMediator } from './lib/storageMediators/PermissionsMediator';
import { deleteCookie } from './lib/operators/deleteCookie';
import {
  HomePage,
  NewRoutePage,
  TripSearchPage,
  SignInPage,
  RoutesViewPage,
  RegisterPage,
  CheckoutPage,
} from './components/pages';
import { ProtectedRoute } from './components/atoms';
import NotFound from './components/pages/Errors/404';
import { GlobalState } from './GlobalState';
import { theme } from './assets/styles/theme';
import { SnackbarVisitor } from './lib/snackbar/SnackbarVisitor';
import { API } from './lib/xhr';

export class App extends PureComponent {
  constructor(props) {
    super(props);

    GlobalState.AppComponent = this;
    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);
  }

  performSignOut = () => {
    PermissionsMediator.clearData();
    deleteCookie('auth');
    window.location.href = `http://${window.location.hostname}:${window.location.port}/#/sign-in`;
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <HashRouter>
            <Container component="main" maxWidth="xl">
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route path="/home" component={HomePage} />
                <Route path="/sign-in" component={SignInPage} />
                <Route path="/register" component={RegisterPage} />
                <ProtectedRoute exact path="/routes" permission="ADMIN" component={RoutesViewPage} />
                <ProtectedRoute path="/searchroutes" permission="PASSENGER" component={TripSearchPage} />
                <ProtectedRoute exact path="/chekout/:id" permission="PASSENGER" component={CheckoutPage} />
                <ProtectedRoute exact path="/route/:id" permission="ADMIN" component={NewRoutePage} />
                <ProtectedRoute exact path="/createnewroute" permission="ADMIN" component={NewRoutePage} />

                <Route component={NotFound} />
              </Switch>
            </Container>
          </HashRouter>
        </SnackbarProvider>
      </ThemeProvider>
    );
  }
}
