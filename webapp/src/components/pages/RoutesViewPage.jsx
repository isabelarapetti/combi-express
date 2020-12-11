import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { Poll as PollIcon } from '@material-ui/icons';
import { PageLayout, RoutesTemplate } from '../template';
import { SnackbarVisitor } from '../../lib/snackbar/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { PageTitle } from '../molecules';

class RoutesViewPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.performRefresh();
  }

  performRefresh = () => {
    // this.setState({
    //   data: [
    //     { id: 1, origin: 'abc', destination: 'abc', price: '123.6', hora: '30:20', passenger_capacity: 20 },
    //     { id: 2, origin: 'sdfgdsg', destination: 'afsdfsdbc', price: '123.6', hora: '30:20', passenger_capacity: 20 },
    //     { id: 3, origin: 'abc', destination: 'abc', price: '123.6', hora: '30:20', passenger_capacity: 20 },
    //   ],
    // });
    this.api.request
      .get('routes/getall')
      .success((res) => this.setState({ data: res.body }))
      .go();
  };

  onGoToRouteDetail = (routeId) => {
    this.props.history.push(`/route/${routeId}`);
  };

  render() {
    const { data } = this.state;
    const dataIsReady = !!(data && data.length);

    return (
      <PageLayout>
        <PageTitle title="Routes">
          <PollIcon fontSize="large" />
        </PageTitle>
        {dataIsReady && <RoutesTemplate onRouteSelection={this.onGoToRouteDetail} data={data} />}
      </PageLayout>
    );
  }
}
export const RoutesViewPage = withSnackbar(RoutesViewPageComponent);
