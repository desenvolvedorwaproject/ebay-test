import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import FormFieldsContext from '@react-form-fields/material-ui/components/Context';
import ConfigBuilder from '@react-form-fields/material-ui/config/builder';
import lang from '@react-form-fields/material-ui/lang/en-us';
import { theme } from 'assets/theme';
import HomePage from 'components/Home';
import Alert from 'components/Shared/Alert';
import Toast from 'components/Shared/Toast';
import React, { Fragment, PureComponent } from 'react';

const fieldConfig = new ConfigBuilder()
  .fromLang(lang)
  .setValidationOn('onBlur')
  .build();

export default class App extends PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <FormFieldsContext config={fieldConfig}>
          <Fragment>
            <CssBaseline />

            <Toast.Global />
            <Alert.Global />

            <HomePage />
          </Fragment>
        </FormFieldsContext>
      </MuiThemeProvider>
    );
  }
}