export const getYearfromDate = date => {
  const dateString = new Date(date);
  const year = dateString.getFullYear().toString();
  return year;
};

const getMonthfromDate = date => {
  const month = date.toLocaleString('en-US', {month: '2-digit'});
  return month;
};

const getHourMinutes = date => {
  const str = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  return str;
};

const getTimestamp = date => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
};

const getYearMonthDate = date => {
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  return formattedDate;
};

const getYearMonth = date => {
  const formattedDate = `${date.toLocaleDateString('en-US', {
    month: 'long',
  })} ${date.getFullYear()}`;
  return formattedDate;
};

const getMonthDateTime = date => {
  const options = {
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

export const getDateFormat = (dateString, format) => {
  const date = new Date(dateString);
  let resultString = '';

  switch (format) {
    case 'MMM DD, LT':
      resultString = getMonthDateTime(date);
      break;
    case 'YYYY-MM-DD':
      resultString = getYearMonthDate(date);
      break;
    case 'HH:mm':
      resultString = getHourMinutes(date);
      break;
    case 'MMMM YYYY':
      resultString = getYearMonth(date);
      break;
    case 'LL':
      resultString = getTimestamp(date);
      break;
    case 'MM':
      resultString = getMonthfromDate(date);
      break;
    case 'YYYY':
      resultString = getYearfromDate(date);
      break;

    default:
      break;
  }

  return resultString;
};
