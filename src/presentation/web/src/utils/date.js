import moment from 'moment';
import { numberToArabic } from 'number-to-arabic';

const toDateFormat = (date) => {
  return moment(date).format('YYYY-MM-DD');
};

const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

let dateArabic = (theDate = new Date()) => {
  let date = toDateFormat(theDate.toISOString());

  let splittedDate = date.split('-').reverse();

  let arabicDate = splittedDate.map((d) => numberToArabic(d)).join('-');

  return arabicDate;
};

let dynamicDateType = (language, theDate = new Date()) => {
  if (language === 'en') {
    return theDate;
  }

  let date = toDateFormat(theDate);

  let splittedDate = date.split('-').reverse();

  let arabicDate = splittedDate.map((d) => numberToArabic(d)).join(' - ');

  return arabicDate;
};

let dynamicNumberType = (language, number) => {
  if (language === 'en') return number;

  return numberToArabic(number);
};

export { toDateFormat, getAge, dateArabic, dynamicDateType, dynamicNumberType };
