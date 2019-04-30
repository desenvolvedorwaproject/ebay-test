import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@react-form-fields/material-ui/decorators/withStyles';
import Alert from 'components/Shared/Alert';
import Toast from 'components/Shared/Toast';
import { IStyledProps } from 'decorators/withStyles';
import { ISearchDefinition } from 'interfaces/searchDefinition';
import React, { PureComponent } from 'react';
import * as RxOp from 'rxjs-operators';
import searchDefinitionService from 'services/searchDefinition';

interface IState {
  deleted?: boolean;
  loading: boolean;
  error?: any;
}

interface IProps extends IStyledProps {
  data: ISearchDefinition;
  onEdit: (data: ISearchDefinition) => void;
  onDeleteComplete: () => void;
}

@WithStyles({
  label: {
    fontSize: 12,
    opacity: 0.6
  }
})
export default class ListItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { loading: false };
  }

  handleEdit = () => {
    const { data, onEdit } = this.props;
    onEdit(data);
  }

  handleDelete = async () => {
    const { data, onDeleteComplete } = this.props;

    const ok = await Alert.confirm('Do you really want to delete this item?');
    if (!ok) return;

    this.setState({ loading: true });

    searchDefinitionService.delete(data._id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(() => {
      Toast.show(`${data.email} deleted`);
      this.setState({ loading: false, deleted: true });
      onDeleteComplete();
    }, error => {
      Toast.error(error);
      this.setState({ loading: false });
    });
  }

  render(): JSX.Element {
    const { deleted, loading } = this.state;
    const { data, classes } = this.props;

    if (deleted) {
      return null;
    }

    return (
      <Card>
        {loading &&
          <LinearProgress />
        }

        <CardContent>
          <Typography>Search Phrase</Typography>
          <Typography gutterBottom variant='h6'>{data.phrase}</Typography>

          <Grid container spacing={8}>
            <Grid item xs={true}>
              <Typography className={classes.label}>Email</Typography>
              <Typography>{data.email}</Typography>
            </Grid>

            <Grid item xs={'auto'}>
              <Typography className={classes.label}>Interval</Typography>
              <Typography>{data.interval} minutes</Typography>
            </Grid>

          </Grid>
        </CardContent>
        <CardActions>
          <Grid container spacing={8} justify='flex-end'>
            <Button onClick={this.handleDelete} disabled={loading}>Delete</Button>
            <Button color='secondary' onClick={this.handleEdit} disabled={loading}>Edit</Button>
          </Grid>
        </CardActions>
      </Card>
    );
  }
}