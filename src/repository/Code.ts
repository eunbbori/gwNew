const WorkingType = new Map([
  ['WORK', '출근'],
  ['FULL_DAYOFF', '연차'],
  ['HALF_DAYOFF', '반차'],
  ['SICK', '병가'],
  ['MILITARY', '훈련'],
]);

export const getWorkingTypeName = (cd: string | undefined | null) => (cd ? WorkingType.get(cd) : '');
