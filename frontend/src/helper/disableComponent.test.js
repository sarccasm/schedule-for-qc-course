import {getClearOrCancelTitle, setDisableButton, setDisabledSaveButtonSemester} from './disableComponent';
import {CANCEL_BUTTON_TITLE, CLEAR_BUTTON_LABEL} from '../constants/translationLabels/formElements';
import i18n from '../i18n';

const semester = {
    id: 47,
    description: '1 2021- 2022',
    year: 2021,
    startDay: '01/09/2021',
    endDay: '30/12/2021',
    currentSemester: true,
    defaultSemester: true,
    disable: false,
    semester_days: ['FRIDAY'],
    semester_classes: [],
    semester_groups: [{ id: 52, title: '21 (201-Б)' }],
};

const selectedGroups = [{ id: 52, label: '21 (201-Б)' }];

describe('setDisableButton function', () => {
    it('should return false if pristine equal false', () => {
        expect(setDisableButton(false, false, null)).toBeFalsy();
    });
    it('should return false if id equal 49', () => {
        expect(setDisableButton(true, false, 49)).toBeFalsy();
    });
    it('should return true if pristine, submitting equal true, and if the id is undefined or null', () => {
        expect(setDisableButton(true, true, null)).toBeTruthy();
        expect(setDisableButton(true, true, undefined)).toBeTruthy();
    });
});

describe('getClearOrCancelTitle function', () => {
    it('should return clear_button_label if id equal undefined', () => {
        expect(getClearOrCancelTitle(undefined, i18n.t)).toEqual(CLEAR_BUTTON_LABEL);
    });
    it('should return cancel_button_title if id equal 49', () => {
        expect(getClearOrCancelTitle(49, i18n.t)).toEqual(CANCEL_BUTTON_TITLE);
    });
});

describe('setDisabledSaveButtonSemester function', () => {
    describe('pristine or submitting equal true', () => {
        it('should return true if semester is empty', () => {
            expect(setDisabledSaveButtonSemester(true, false, {})).toBeTruthy();
            expect(setDisabledSaveButtonSemester(false, true, {})).toBeTruthy();
        });
        it('should return true if semester not empty and selectedGroups matches semester_groups', () => {
            expect(setDisabledSaveButtonSemester(true, false, semester, selectedGroups)).toBeTruthy();
            expect(setDisabledSaveButtonSemester(false, true, semester, selectedGroups)).toBeTruthy();
        });
    });

    describe('pristine and submitting equal false', () => {
        it('should return false if semester is empty', () => {
            expect(setDisabledSaveButtonSemester(false, false, {})).toBeFalsy();
        });
        it('should return false if selectedGroups has a new group', () => {
            expect(
                setDisabledSaveButtonSemester(false, false, semester, [
                    ...selectedGroups,
                    { id: 82, label: '22 (204-A)' },
                ])
            ).toBeFalsy();
        });
        it('should return false if selectedGroups matches semester_groups', () => {
            expect(setDisabledSaveButtonSemester(false, false, semester, selectedGroups)).toBeFalsy();
        });
    });
});

describe('setDisabledSaveButtonSemester mutation killers', () => {
    it('should use fallback when semester has no id', () => {
        const noId = { ...semester, id: undefined };
        expect(setDisabledSaveButtonSemester(true, false, noId, selectedGroups)).toBeTruthy();
        expect(setDisabledSaveButtonSemester(false, false, noId, selectedGroups)).toBeFalsy();
    });

    it('should use fallback when semester is empty object', () => {
        expect(setDisabledSaveButtonSemester(true, false, {}, selectedGroups)).toBeTruthy();
        expect(setDisabledSaveButtonSemester(false, false, {}, selectedGroups)).toBeFalsy();
    });

    it('should return false when new group added that is not in semester_groups', () => {
        const noGroups = { ...semester, semester_groups: [] };
        expect(setDisabledSaveButtonSemester(false, false, noGroups, [{ id: 99 }])).toBeFalsy();
    });

    it('should return false when group removed from selectedGroups', () => {
        const twoGroups = {
            ...semester,
            semester_groups: [{ id: 52 }, { id: 99 }],
        };
        expect(setDisabledSaveButtonSemester(false, false, twoGroups, [{ id: 52 }])).toBeFalsy();
    });

    it('should return false when all groups removed', () => {
        expect(setDisabledSaveButtonSemester(false, false, semester, [])).toBeFalsy();
    });

    it('should return false when semester_groups is empty and pristine is true', () => {
        const emptySemesterGroups = { ...semester, semester_groups: [] };
        expect(setDisabledSaveButtonSemester(true, false, emptySemesterGroups, [])).toBeFalsy();
    });

    it('should return false when semester_groups is empty and submitting is true', () => {
        const emptySemesterGroups = { ...semester, semester_groups: [] };
        expect(setDisabledSaveButtonSemester(false, true, emptySemesterGroups, [])).toBeFalsy();
    });

    it('should return false when only newGroups non-empty and pristine=false', () => {
        const noGroups = { ...semester, semester_groups: [] };
        expect(setDisabledSaveButtonSemester(false, false, noGroups, selectedGroups)).toBeFalsy();
    });

    it('should return false when only newGroups non-empty and pristine=true', () => {
        const noGroups = { ...semester, semester_groups: [] };
        expect(setDisabledSaveButtonSemester(true, false, noGroups, selectedGroups)).toBeFalsy();
    });

    it('should return false when only deleteGroups non-empty and pristine=false', () => {
        const twoGroups = {
            ...semester,
            semester_groups: [{ id: 52 }, { id: 99 }],
        };
        expect(setDisabledSaveButtonSemester(false, false, twoGroups, selectedGroups)).toBeFalsy();
    });

    it('should return false when only deleteGroups non-empty and pristine=true', () => {
        const twoGroups = {
            ...semester,
            semester_groups: [{ id: 52 }, { id: 99 }],
        };
        expect(setDisabledSaveButtonSemester(true, false, twoGroups, selectedGroups)).toBeFalsy();
    });

    it('should return false when isChosenGroup=false, pristine=false, submitting=false', () => {
        expect(setDisabledSaveButtonSemester(false, false, semester, selectedGroups)).toBeFalsy();
    });

    it('should return true when isChosenGroup=false and only pristine=true', () => {
        expect(setDisabledSaveButtonSemester(true, false, semester, selectedGroups)).toBeTruthy();
    });

    it('should return true when isChosenGroup=false and only submitting=true', () => {
        expect(setDisabledSaveButtonSemester(false, true, semester, selectedGroups)).toBeTruthy();
    });
});