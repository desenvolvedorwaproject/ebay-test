import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { IStyledProps } from '@react-form-fields/material-ui/decorators/withStyles';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
import { ISearchDefinition } from 'interfaces/searchDefinition';
import SearchIcon from 'mdi-react/SearchIcon';
import React from 'react';
import * as RxOp from 'rxjs-operators';
import searchDefinitionService from 'services/searchDefinition';

interface IState extends IStateForm<ISearchDefinition> {
  loading: boolean;
}

interface IProps extends IStyledProps {
  opened: boolean;
  data?: ISearchDefinition;
  onComplete: (data: ISearchDefinition) => void;
  onCancel: () => void;
}

@WithStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  },
  heading: {
    marginTop: 20,
    marginBottom: 10
  }
})
export default class SearchDefinitionFormDialog extends FormComponent<IProps, IState> {
  intervalOptions = [
    { label: '2 minutes', value: 2 },
    { label: '15 minutes', value: 15 },
    { label: '30 minutes', value: 30 },
  ];

  constructor(props: {}) {
    super(props);
    this.state = {
      ...this.state,
      loading: false
    };
  }

  get isEdit(): boolean {
    return !!this.state.model._id;
  }

  handleEnter = () => {
    const { data } = this.props;
    this.setState({ model: { ...(data || {}) } });
  }

  handleExit = () => {
    this.resetForm();
  }

  onSubmit = (isValid: boolean) => {
    if (!isValid) return;

    const { model } = this.state;
    const { onComplete } = this.props;

    this.setState({ loading: true });

    searchDefinitionService.save(model).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(data => {
      Toast.show('Success');
      this.setState({ loading: false });
      onComplete(data);
    }, err => {
      Toast.error(err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { model, loading } = this.state;
    const { opened, classes, onCancel } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onEnter={this.handleEnter}
        onExited={this.handleExit}
        TransitionComponent={Transition}
      >

        {loading && <LinearProgress color='secondary' />}

        <FormValidation onSubmit={this.onSubmit} ref={this.bindForm}>
          <DialogTitle>{this.isEdit ? 'Edit' : 'New'} Search</DialogTitle>
          <DialogContent className={classes.content}>

            <FieldText
              label='Phrase'
              disabled={loading}
              value={model.phrase}
              validation='required|min:3|max:100'
              InputProps={{
                startAdornment: <InputAdornment position='start'><SearchIcon /></InputAdornment>
              }}
              onChange={this.updateModel((model, v) => model.phrase = v)}
            />

            <FieldText
              label='E-mail'
              type='email'
              disabled={loading}
              value={model.email}
              validation='required|email|max:250'
              onChange={this.updateModel((model, v) => model.email = v)}
            />

            <FieldSelect
              label='Interval'
              disabled={loading}
              value={model.interval}
              emptyOption='Select...'
              options={this.intervalOptions}
              validation='required'
              onChange={this.updateModel((model, v) => model.interval = v)}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button color='secondary' variant='contained' type='submit' disabled={loading}>
              Save
            </Button>
          </DialogActions>
        </FormValidation>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}