const marksFormatter = (arr) => {
  // semesters array
  const semesters = {
    1: { semesterSubject: [] },
    2: { semesterSubject: [] },
    3: { semesterSubject: [] },
    4: { semesterSubject: [] },
    5: { semesterSubject: [] },
    6: { semesterSubject: [] },
    7: { semesterSubject: [] },
    8: { semesterSubject: [] },
  };

  // total percentage
  let totalPercentage = 0;
  let semesterNumbers = 0;

  const newArr = arr.map((element) => {
    const midtermMarks = element.midtermMarks ? element.midtermMarks : 0;
    const assignmentOrProjectMarks = element.assignmentOrProjectMarks ? element.assignmentOrProjectMarks : 0;
    const finalMarks = element.finalMarks ? element.finalMarks : 0;
    const totalMarks = midtermMarks + assignmentOrProjectMarks + finalMarks;
    const totalWithCredit = totalMarks * element.subjectCredit;
    return {
      ...element,
      totalMarks,
      totalWithCredit,
    };
  });

  newArr.forEach((element) => {
    semesters[element.semesterTitle]?.semesterSubject.push(element);
  });

  for (const key in semesters) {
    if (semesters[key].semesterSubject.length > 0) {
      let semesterMarks = 0;
      let semesterCredits = 0;
      let semesterPoints = 0;

      semesters[key].semesterSubject.forEach((element) => {
        semesterMarks += element.totalWithCredit;
        semesterCredits += element.subjectCredit;
        semesterPoints += element.totalMarks;
      });

      if (semesters[key].semesterSubject.length > 0) {
        semesterNumbers++;
        totalPercentage += Number(semesterMarks / semesterCredits);
        newArr.push({
          semester: Number(key),
          semesterCredits,
          semesterMarks: Number(semesterMarks.toFixed(3)),
          percentage: String(Number((semesterMarks / semesterCredits).toFixed(3))) + '%',
          GPA: Number((semesterMarks / semesterPoints).toFixed(1)),
        });
      }
    }
  }

  if (totalPercentage !== 0) {
    newArr.push({
      totalPercentage: String(Number((totalPercentage / semesterNumbers).toFixed(3)) + '%')
    })
  }

  return newArr;
};

module.exports = {
  marksFormatter,
};
