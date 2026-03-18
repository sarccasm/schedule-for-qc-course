export const setValueToTeacherForSiteHandler = (teachers, id, setValue) => {
  if (!Array.isArray(teachers)) return;

  const teacher = teachers.find((teacherItem) => teacherItem.id === +id);

  if (!teacher) setValue('teacherForSite', '');
  else setValue('teacherForSite', teacher);
};

export const setValueToSubjectForSiteHandler = (subjects, subjectId, setValue) => {
  if (!Array.isArray(subjects)) return;

  const subject = subjects.find((subjectItem) => subjectItem.id === +subjectId);

  if (!subject) return setValue('subjectForSite', '');
  return setValue('subjectForSite', subject.name);
};