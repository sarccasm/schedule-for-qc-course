import {
  setValueToTeacherForSiteHandler,
  setValueToSubjectForSiteHandler
} from './reduxFormHelper';

describe('reduxFormHelper', () => {

  describe('setValueToTeacherForSiteHandler', () => {

    test('calls setValue when teacher is found', () => {
      const setValue = jest.fn();
      const teachers = [{ id: 1, name: 'John' }];
      setValueToTeacherForSiteHandler(teachers, 1, setValue);
      expect(setValue).toHaveBeenCalledWith('teacherForSite', expect.anything());
    });

    test('does NOT call setValue when teachers is not array', () => {
      const setValue = jest.fn();
      setValueToTeacherForSiteHandler(null, 1, setValue);
      expect(setValue).not.toHaveBeenCalled();
    });

    test('does NOT call setValue when teachers is undefined', () => {
      const setValue = jest.fn();
      setValueToTeacherForSiteHandler(undefined, 1, setValue);
      expect(setValue).not.toHaveBeenCalled();
    });

    test('calls setValue with empty string when teacher not found', () => {
      const setValue = jest.fn();
      const teachers = [{ id: 1, name: 'John' }];
      setValueToTeacherForSiteHandler(teachers, 2, setValue);
      expect(setValue).toHaveBeenCalledWith('teacherForSite', '');
    });

    test('works when id is string', () => {
      const setValue = jest.fn();
      const teachers = [{ id: 1, name: 'John' }];
      setValueToTeacherForSiteHandler(teachers, '1', setValue);
      expect(setValue).toHaveBeenCalled();
    });

    test('handles empty array', () => {
      const setValue = jest.fn();
      setValueToTeacherForSiteHandler([], 1, setValue);
      expect(setValue).toHaveBeenCalledWith('teacherForSite', '');
    });

    test('calls setValue only once', () => {
      const setValue = jest.fn();
      const teachers = [{ id: 1 }];
      setValueToTeacherForSiteHandler(teachers, 1, setValue);
      expect(setValue).toHaveBeenCalledTimes(1);
    });

    test('finds correct teacher when multiple teachers exist', () => {
      const setValue = jest.fn();
      const teachers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
      setValueToTeacherForSiteHandler(teachers, 2, setValue);
      expect(setValue).toHaveBeenCalledWith('teacherForSite', { id: 2, name: 'Jane' });
    });

    test('does NOT find teacher when id does not match any', () => {
      const setValue = jest.fn();
      const teachers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
      setValueToTeacherForSiteHandler(teachers, 99, setValue);
      expect(setValue).toHaveBeenCalledWith('teacherForSite', '');
    });

  });

  describe('setValueToSubjectForSiteHandler', () => {

    test('calls setValue when subject is found', () => {
      const setValue = jest.fn();
      const subjects = [{ id: 1, name: 'Math' }];
      setValueToSubjectForSiteHandler(subjects, 1, setValue);
      expect(setValue).toHaveBeenCalledWith('subjectForSite', 'Math');
    });

    test('does NOT call setValue when subjects is not array', () => {
      const setValue = jest.fn();
      setValueToSubjectForSiteHandler(null, 1, setValue);
      expect(setValue).not.toHaveBeenCalled();
    });

    test('does NOT call setValue when subjects is undefined', () => {
      const setValue = jest.fn();
      setValueToSubjectForSiteHandler(undefined, 1, setValue);
      expect(setValue).not.toHaveBeenCalled();
    });

    test('calls empty string when subject not found', () => {
      const setValue = jest.fn();
      const subjects = [{ id: 1, name: 'Math' }];
      setValueToSubjectForSiteHandler(subjects, 2, setValue);
      expect(setValue).toHaveBeenCalledWith('subjectForSite', '');
    });

    test('works with string id', () => {
      const setValue = jest.fn();
      const subjects = [{ id: 1, name: 'Math' }];
      setValueToSubjectForSiteHandler(subjects, '1', setValue);
      expect(setValue).toHaveBeenCalled();
    });

    test('handles empty array', () => {
      const setValue = jest.fn();
      setValueToSubjectForSiteHandler([], 1, setValue);
      expect(setValue).toHaveBeenCalledWith('subjectForSite', '');
    });

    test('calls setValue only once', () => {
      const setValue = jest.fn();
      const subjects = [{ id: 1, name: 'Math' }];
      setValueToSubjectForSiteHandler(subjects, 1, setValue);
      expect(setValue).toHaveBeenCalledTimes(1);
    });

    test('finds correct subject when multiple subjects exist', () => {
      const setValue = jest.fn();
      const subjects = [{ id: 1, name: 'Math' }, { id: 2, name: 'Physics' }];
      setValueToSubjectForSiteHandler(subjects, 2, setValue);
      expect(setValue).toHaveBeenCalledWith('subjectForSite', 'Physics');
    });

    test('does NOT find subject when id does not match any', () => {
      const setValue = jest.fn();
      const subjects = [{ id: 1, name: 'Math' }, { id: 2, name: 'Physics' }];
      setValueToSubjectForSiteHandler(subjects, 99, setValue);
      expect(setValue).toHaveBeenCalledWith('subjectForSite', '');
    });

  });

});