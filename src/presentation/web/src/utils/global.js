function rankSemester(number, appLanguage = 'en') {
  if (!number) return number;
  number = parseInt(number);

  if (appLanguage === 'pa') {
    if (number === 1) return 'لومړی';
    if (number === 2) return 'دوهم';
    if (number === 3) return 'دریم';
    if (number === 4) return 'څلورم';
    if (number === 5) return 'پنځم';
    if (number === 6) return 'شيږم';
    if (number === 7) return 'اووم';
    if (number === 8) return 'اتم';
  }

  if (number === 1) {
    return `${number}st`;
  } else if (number === 2) {
    return `${number}nd`;
  } else if (number === 3) {
    return `${number}rd`;
  } else {
    return `${number}th`;
  }
}

export { rankSemester };
