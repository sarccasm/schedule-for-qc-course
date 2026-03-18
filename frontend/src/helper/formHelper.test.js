import { resetFormHandler } from './formHelper';
import { reset } from 'redux-form';
import store from '../store';

jest.mock('redux-form', () => ({
  reset: jest.fn(),
}));

jest.mock('../store', () => ({
  __esModule: true,
  default: {
    dispatch: jest.fn(),
  },
}));

describe('resetFormHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call reset with correct form name', () => {
    const formName = 'testForm';

    resetFormHandler(formName);

    expect(reset).toHaveBeenCalledWith(formName);
  });

  it('should dispatch reset action with correct payload', () => {
    const formName = 'anotherForm';

    resetFormHandler(formName);

    expect(store.dispatch).toHaveBeenCalledWith(reset(formName));
  });

  it('should call dispatch exactly once', () => {
    const formName = 'form123';

    resetFormHandler(formName);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});