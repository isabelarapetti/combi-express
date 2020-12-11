import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { HomeTemplate } from '../template';
import { SnackbarVisitor } from '../../lib/snackbar/SnackbarVisitor';
import { API } from '../../lib/xhr';

class HomePageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      items: [],
    };
  }

  render() {
    const { items } = this.state;

    return <HomeTemplate items={items} />;
  }
}

export const HomePage = withSnackbar(HomePageComponent);
