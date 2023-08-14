const { taajilService, reentryService, tabdiliService, studentListService } = require('../services');

const getStatsBySemesterId = async (semesterId, gender, count = true) => {
  const taajilsCount = await taajilService.findTaajilBySemesterId(semesterId, { count, gender });

  const reentryTaajilsCount = await reentryService.findReentryBySemesterIdAndType(semesterId, {
    type: 'taajil',
    gender,
    count,
  });
  const reentrySpecialTaajilsCount = await reentryService.findReentryBySemesterIdAndType(semesterId, {
    type: 'special_taajil',
    gender,
    count,
  });

  const tabdiliCount = await tabdiliService.findTabdiliBySemesterId(semesterId, { count, gender });

  const totalCount = await studentListService.getAllStudentsCountBySemesterId(semesterId, { count, gender });

  const presentStudentsCount = totalCount - (tabdiliCount + taajilsCount);

  if (!count) {
    // If no count (return real data)
    const presentStudents = totalCount.filter((student) => {
      let exists = false;

      // Remove taajil students
      taajilsCount.forEach((s) => {
        if (s.id === student.id) {
          exists = true;
        }
      });

      // Remove tabdili students
      tabdiliCount.forEach((s) => {
        if (s.id === student.id) {
          exists = true;
        }
      });
      if (!exists) return student;
    });
    const report = {
      present: presentStudents,
      taajil: taajilsCount,
      reentry: [...reentryTaajilsCount, ...reentrySpecialTaajilsCount],
      tabdili: tabdiliCount,
      // monfaq: 0
    };

    return report;
  }

  const statistics = {
    total: totalCount,
    present: presentStudentsCount,
    taajil: taajilsCount,
    reentry: {
      taajil: reentryTaajilsCount + reentrySpecialTaajilsCount,
      // Missing for now
      mahrom: 0,
      repeat_semester: 0,
      total: 0 + 0 + reentryTaajilsCount + reentrySpecialTaajilsCount,
    },
    tabdili: tabdiliCount,
    // Missing for now
    monfaq: 0,
  };

  return statistics;
};

const getSemesterTitleByPashto = (title) => {
  let className;
  let semesterName;
  switch (title) {
    case 1:
      className = 'لومړی';
      semesterName = 'اول';
      break;
    case 2:
      className = 'لومړی';
      semesterName = 'دوهم';
      break;
    case 3:
      className = 'دوهم';
      semesterName = 'دریم';
      break;
    case 4:
      className = 'دوهم';
      semesterName = 'څلورم';
      break;
    case 5:
      className = 'دریم';
      semesterName = 'پنځم';
      break;
    case 6:
      className = 'دریم';
      semesterName = 'ښپږم';
      break;
    case 7:
      className = 'څلورم';
      semesterName = 'اووم';
      break;
    case 8:
      className = 'څلورم';
      semesterName = 'اتم';
      break;
    default:
      className = 'لومړی';
      semesterName = 'اول';
      break;
  }

  return {
    className,
    semesterName,
  };
};

module.exports = {
  getStatsBySemesterId,
  getSemesterTitleByPashto,
};
