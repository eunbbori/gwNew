export const weekdaysKo = ['일', '월', '화', '수', '목', '금', '토'];

export const toDateFormat = (dt: Date) => {
  return `${toDateFormatWithoutDay(dt)} (${weekdaysKo[dt.getDay()]})`;
};

export const toDateFormatWithoutDay = (dt: Date) => {
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const sMonth = month >= 10 ? month : '0' + month;
  const date = dt.getDate();
  const sDate = date >= 10 ? date : '0' + date;
  return year + '-' + sMonth + '-' + sDate;
};

export const toDateFormatWithTime = (dt: Date) => {
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const sMonth = month >= 10 ? month : '0' + month;
  const date = dt.getDate();
  const sDate = date >= 10 ? date : '0' + date;
  const hour = dt.getHours();
  const min = dt.getMinutes();
  const sec = dt.getSeconds();
  return year + '-' + sMonth + '-' + sDate + ' ' + hour + '시 ' + min + '분 ' + sec + '초 ';
};

export const toDateTimeWithoutYear = (dt: Date) =>
  dt && dt.getMonth() + 1 + '월' + dt.getDate() + '일 ' + dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0');

export const calculateDateDiff = (startAt?: Date, endAt?: Date) =>
  startAt &&
  endAt &&
  Math.floor(((+endAt - +startAt) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) +
    '시간 ' +
    Math.floor(((+endAt - +startAt) % (1000 * 60 * 60)) / (1000 * 60)) +
    '분 ';
