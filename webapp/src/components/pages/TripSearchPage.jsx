import React, { PureComponent } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Paper } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { PageLayout, TripSearchTemplate, TripSearchGridTemplate } from '../template';
import { PageTitle, EmptyDataPlaceholder } from '../molecules';
import { SnackbarVisitor } from '../../lib/snackbar/SnackbarVisitor';
import { API } from '../../lib/xhr';

class TripSearchPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    const urlSearchParams = new URLSearchParams(this.props.location.search);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    const initialState = {
      origin: '',
      destination: '',
      limit: 100,
      chips: [],
      filteredData: [],
      searchDidExecute: false,
    };

    const urlParams = [];
    urlSearchParams.forEach((value, key) => urlParams.push({ [key]: value }));

    this.state = Object.assign({}, initialState, ...urlParams);

    this.shouldSearchOnLoad = true;
    this.maxLimitValue = 2000;
    this.minLimitValue = 1;
  }

  componentDidMount() {
    this.setFilters(this.shouldSearchOnLoad);
  }

  onInputChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSearchCriteriaDelete = (key) => {
    this.setState((prevState) => ({ [key]: '', chips: prevState.chips.filter((x) => x.key !== key) }));
  };

  setFilters = (shouldSearchExecute) => {
    const fieldsToCheck = ['origin', 'destination'];
    const chips = [];
    fieldsToCheck.forEach((field) => {
      const value = this.state[field];
      if (value) {
        chips.push({ key: field, label: value });
      }
    });

    this.setState({ chips }, () => {
      const searchObj = Object.assign({}, ...chips.map((x) => ({ [x.key]: x.label })));
      searchObj.limit = this.state.limit.toString();

      let searchParams = new URLSearchParams(searchObj).toString();
      searchParams = searchParams ? `?${searchParams}` : '';

      this.props.history.push(`/searchroutes${searchParams}`);
      if (shouldSearchExecute) this.filterData(searchParams);
    });
  };

  onSearch = () => {
    const executeSearch = true;
    this.setState({ searchDidExecute: true });
    this.setFilters(executeSearch);
  };

  filterData = (searchParams) => {
    if (searchParams) {
      this.api.request
        .get(`routes/search${searchParams}`)
        .success((res) => this.setState({ filteredData: res.body }))
        .go();
    } else {
      this.api.request
        .get(`routes/getall`)
        .success((res) => this.setState({ filteredData: res.body }))
        .go();
    }
  };

  makeReservation = (routeId) => {
    this.props.history.push(`/chekout/${routeId}`);
  };

  render() {
    const { origin, destination, limit, chips, filteredData, searchDidExecute } = this.state;
    const dataIsReady = !!(filteredData && filteredData.length);
    return (
      <PageLayout>
        <PageTitle title="Find a route">
          <SearchIcon />
        </PageTitle>
        <TripSearchTemplate
          origin={origin}
          destination={destination}
          chips={chips}
          onSearchCriteriaDelete={this.onSearchCriteriaDelete}
          onInputChange={this.onInputChange}
          onSearch={this.onSearch}
          limit={limit}
        >
          {dataIsReady && <TripSearchGridTemplate onRouteSelection={this.makeReservation} data={filteredData} />}
          {!dataIsReady && searchDidExecute && (
            <Paper>
              <EmptyDataPlaceholder>No hay routas que coincidan con la busqueda</EmptyDataPlaceholder>
            </Paper>
          )}
        </TripSearchTemplate>
      </PageLayout>
    );
  }
}

export const TripSearchPage = withSnackbar(TripSearchPageComponent);
