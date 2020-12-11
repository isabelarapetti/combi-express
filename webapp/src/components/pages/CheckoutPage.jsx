import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout, NewRouteFormTemplate } from '../template';
import { SnackbarVisitor } from '../../lib/snackbar/SnackbarVisitor';
import { API } from '../../lib/xhr';

class CheckoutPageComponent extends PureComponent {
  constructor(props) {
    super(props);
    const routeId = this.props.match.params.id;

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      routeId,
      route: null,
      nombre: '',
      apellido: '',
      tarjeta: '',
      codigo: '',
      dni: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.routeId === this.state.routeId) return;

    this.refreshRoute();
  }

  refreshRoute = () => {
    this.api.request
      .get(`routes/${this.state.routeId}`)
      .success((res) => this.setState({ route: res.body }))
      .go();
  };

  onCreationCompleted = () => {
    const { routeId } = this.state;
    const body = { routeId };

    this.api.request
      .post('reservation/create', body)
      .preventDefaultSuccess()
      .success(() => {
        this.notifier.success('ruta creada exitosamente');
        this.props.history.push('./routes');
      })
      .go();
  };

  onInputChange = (event) => this.setState({ [event.target.name]: event.target.value });

  render() {
    const { route, nombre, apellido, tarjeta, codigo, dni } = this.state;
    return (
      <PageLayout>
        <NewRouteFormTemplate
          route={route}
          nombre={nombre}
          apellido={apellido}
          tarjeta={tarjeta}
          codigo={codigo}
          dni={dni}
          onCreationCompleted={this.onCreationCompleted}
          onInputChange={this.onInputChange}
        />
      </PageLayout>
    );
  }
}

export const CheckoutPage = withSnackbar(CheckoutPageComponent);
