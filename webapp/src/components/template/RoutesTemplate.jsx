import React, { PureComponent } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const styles = (theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    marginBottom: theme.spacing(4),
  },
  root: {
    width: '100%',
  },
});

class RoutesTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.setupStatics();
  }

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();

    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  onRowSelection = (evt) => {
    const selected = evt.api.getSelectedRows();
    const routeId = selected[0].id;
    this.props.onRouteSelection(routeId);
  };

  setupStatics = () => {
    this.columnDefinitions = [
      { headerName: 'Origen', field: 'origin', sortable: true, width: 80 },
      { headerName: 'Destino', field: 'destination', sortable: true, width: 80 },
      { headerName: 'Hora', field: 'time', filter: true, sortable: true, width: 80 },
      { headerName: 'Precio', field: 'price', filter: true, sortable: true, width: 80 },
      { headerName: 'Capacidad max.', field: 'passenger_capacity', filter: true, sortable: true, width: 80 },
      { headerName: 'Capacidad disp.', field: 'available_capacity', filter: true, sortable: true, width: 80 },
    ];
  };

  render() {
    const { classes, data } = this.props;
    return (
      <>
        <div className={classes.root}>
          <div className={classes.paper}>
            <div className="ag-theme-alpine" style={{ height: 520, width: '100%' }}>
              {data && (
                <AgGridReact
                  ref={(c) => (this.dataGrid = c)}
                  paginationAutoPageSize
                  rowData={data}
                  columnDefs={this.columnDefinitions}
                  content={{ componentParent: this }}
                  rowSelection="single"
                  pagination
                  rowHeight={38}
                  headerHeight={40}
                  onFirstDataRendered={this.onFirstDataRendered}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export const RoutesTemplate = withStyles(styles)(withTheme(RoutesTemplateComponent));
