import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout, NewRouteFormTemplate } from '../template';
import { SnackbarVisitor } from '../../lib/snackbar/SnackbarVisitor';
import { API } from '../../lib/xhr';

class NewRoutePageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      origin: '',
      destination: '',
      time: '',
      price: '',
      capacity: '',
    };
  }

  onCreationCompleted = () => {
    const { origin, destination, time, price, capacity } = this.state;
    const body = { origin, destination, time, price, capacity };

    this.api.request
      .post('routes/create', body)
      .preventDefaultSuccess()
      .success(() => {
        this.notifier.success('ruta creada exitosamente');
        this.props.history.push('./routes');
      })
      .go();
  };

  onInputChange = (event) => this.setState({ [event.target.name]: event.target.value });

  render() {
    const { origin, destination, time, price, capacity } = this.state;
    return (
      <PageLayout>
        <NewRouteFormTemplate
          origin={origin}
          destination={destination}
          time={time}
          price={price}
          capacity={capacity}
          onCreationCompleted={this.onCreationCompleted}
          onInputChange={this.onInputChange}
        />
      </PageLayout>
    );
  }
}

export const NewRoutePage = withSnackbar(NewRoutePageComponent);
