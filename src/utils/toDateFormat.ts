export const toDateFormat = (dt: Date) => {
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const sMonth = month >= 10 ? month : '0' + month;
  const date = dt.getDate();
  const sDate = date >= 10 ? date : '0' + date;
  const newDate = year + '-' + sMonth + '-' + sDate;
  return newDate;
};
