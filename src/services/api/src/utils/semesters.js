const { taajilService, reentryService, tabdiliService, studentListService } = require('../services');

const getStatsBySemesterId = async (semesterId, gender) => {
  const taajilsCount = await taajilService.findTaajilBySemesterId(semesterId, { count: true, gender });

  const reentryTaajilsCount = await reentryService.findReentryBySemesterIdAndType(semesterId, {
    type: 'taajil',
    gender,
    count: true,
  });
  const reentrySpecialTaajilsCount = await reentryService.findReentryBySemesterIdAndType(semesterId, {
    type: 'special_taajil',
    gender,
    count: true,
  });

  const tabdiliCount = await tabdiliService.findTabdiliBySemesterId(semesterId, { count: true, gender });

  const totalCount = await studentListService.getAllStudentsCountBySemesterId(semesterId, { count: true, gender });

  const presentStudentsCount = totalCount - (tabdiliCount + taajilsCount);

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

module.exports = {
  getStatsBySemesterId,
};
