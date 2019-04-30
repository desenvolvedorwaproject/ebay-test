import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import logo from 'assets/logo.png';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import { ISearchDefinition } from 'interfaces/searchDefinition';
import React, { Fragment, PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import searchDefinitionService from 'services/searchDefinition';
import { API_ENDPOINT } from 'settings';

import SearchDefinitionFormDialog from './Form';
import ListItem from './ListItem';
import styles from './styles';

interface IState {
  loading: boolean;
  error?: any;
  networkError?: boolean;
  items: ISearchDefinition[];
  current?: ISearchDefinition;
  formOpened?: boolean;
}

interface IProps extends IStyledProps { }

@WithStyles(styles)
export default class HomePage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { loading: true, items: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({ loading: true, error: null });

    searchDefinitionService.list().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(items => {
      this.setState({ items, networkError: false, loading: false });
    }, error => {
      if (error.message === 'Network Error') {
        setTimeout(this.loadData, 3000);
        this.setState({ networkError: true });
        return;
      }

      this.setState({ error, networkError: false, loading: false });
    });
  }

  handleCreate = () => {
    this.setState({ formOpened: true, current: null });
  }

  handleEdit = (current: ISearchDefinition) => {
    this.setState({ formOpened: true, current });
  }

  formCallback = () => {
    this.setState({ formOpened: false });
    this.loadData();
  }

  formCancel = () => {
    this.setState({ formOpened: false });
  }

  render() {
    const { items, formOpened, current, loading, error, networkError } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.container}>

        <SearchDefinitionFormDialog
          opened={formOpened || false}
          data={current}
          onComplete={this.formCallback}
          onCancel={this.formCancel}
        />

        <Grid container justify='flex-end'>
          <Button href={`${API_ENDPOINT}/swagger`} target='_blank'>
            Show API Docs
          </Button>
        </Grid>

        <div className={classes.logo}>
          <img src={logo} />
          <Typography component='h1'>Monitor</Typography>
        </div>

        <div className={classes.gridContainer}>

          <Grid container spacing={16}>

            {loading &&
              <Grid item xs={12} className={classes.loader}>
                <CircularProgress size={60} />
                {networkError &&
                  <Typography component='p'>
                    Não conseguimos nos comunicar com o servidor,
                    mas estamos tentando novamente...
                  </Typography>
                }
              </Grid>
            }

            {!loading && !!error &&
              <Grid item xs={12}>
                <ErrorMessage error={error} tryAgain={this.loadData} />
              </Grid>
            }

            {!loading && !error &&
              <Fragment>
                <Grid item xs={12} className={classes.buttonAdd}>
                  <Button variant='contained' color='secondary' onClick={this.handleCreate}>
                    Add New
                  </Button>
                </Grid>

                {items.map(item =>
                  <Grid item xs={12} key={item._id}>
                    <ListItem
                      data={item}
                      onEdit={this.handleEdit}
                      onDeleteComplete={this.loadData}
                    />
                  </Grid>
                )}
              </Fragment>
            }
          </Grid>
        </div>

      </div>
    );
  }
}