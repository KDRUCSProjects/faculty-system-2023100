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
    const assignment = element.assignment ? element.assignment : 0;
    const practicalWork = element.practicalWork ? element.practicalWork : 0;
    const finalMarks = element.finalMarks ? element.finalMarks : 0;
    const totalMarks = (midtermMarks + assignment + finalMarks + practicalWork);
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

const subjectsFormatter = (arr) => {
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


  const newArr = [];

  arr.forEach((element) => {
    semesters[element.Semester.title].semesterSubject.push(element);
  });

  for (const key in semesters) {
    if (semesters[key].semesterSubject.length > 0) {

      const semesterId = semesters[key].semesterSubject[0].Semester.id;
      const title = semesters[key].semesterSubject[0].Semester.title;
      const year = semesters[key].semesterSubject[0].Semester.EducationalYear.year;
      const subjects = [];

      semesters[key].semesterSubject.forEach((element) => {
        subjects.push({
          subjectId: element.id,
          subjectName: element.name,
          subjectTitle: element.credit,
        });
      });
      newArr.push({
        semesterId,
        title,
        year,
        subjects
      });
    }
  }

  return newArr;
};


module.exports = {
  marksFormatter,
  subjectsFormatter,
};
