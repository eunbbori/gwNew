export const calculateDateDiff = (startAt?: Date, endAt?: Date) =>
  startAt &&
  endAt &&
  Math.floor(((+endAt - +startAt) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) +
    '시간 ' +
    Math.floor(((+endAt - +startAt) % (1000 * 60 * 60)) / (1000 * 60)) +
    '분 ';
