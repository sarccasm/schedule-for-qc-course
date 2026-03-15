import { reset } from 'redux-form';

export const resetFormHandler = (formName) => {
  const store = require('../store').default;
  store.dispatch(reset(formName));
};