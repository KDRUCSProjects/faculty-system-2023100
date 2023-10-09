const faker = require('faker');

const subjects = [
  { name: 'C Programming Language', pashtoName: 'سی پروګرامینګ', credit: 4, semesterId: 89, teacherId: 1 },
  { name: 'Introduction to CS', pashtoName: 'کمپیوتر ښودنه', credit: 4, semesterId: 89, teacherId: 1 },
  { name: 'English I', pashtoName: 'انګلیسی ۱', credit: 4, semesterId: 89, teacherId: 1 },
  { name: 'Islamic', pashtoName: 'اسلامی ۱', credit: 1, semesterId: 89, teacherId: 1 },
  { name: 'Math I', pashtoName: 'ریاضی ۱', credit: 4, semesterId: 89, teacherId: 1 },
  { name: 'Modern History', pashtoName: 'تاریخ', credit: 2, semesterId: 89, teacherId: 1 },
  { name: 'C++ Programming Language', credit: 4, semesterId: 90, teacherId: 2 },
  { name: 'Theoretical Computer Science', credit: 2, semesterId: 90, teacherId: 2 },
  { name: 'English II', credit: 4, semesterId: 90, teacherId: 2 },
  { name: 'Islamic', credit: 1, semesterId: 90, teacherId: 2 },
  { name: 'Math II', credit: 4, semesterId: 90, teacherId: 2 },
  { name: 'Digital Circuit', credit: 4, semesterId: 90, teacherId: 2 },
  { name: 'Java Programming Language', credit: 2, semesterId: 91, teacherId: 2 },
  { name: 'Data Structure', credit: 4, semesterId: 91, teacherId: 2 },
  { name: 'Database I', credit: 4, semesterId: 91, teacherId: 2 },
  { name: 'Islamic', credit: 1, semesterId: 91, teacherId: 2 },
  { name: 'Math III', credit: 4, semesterId: 91, teacherId: 2 },
  { name: 'Operating System', credit: 4, semesterId: 91, teacherId: 1 },
  { name: 'Algorithm', credit: 4, semesterId: 92, teacherId: 1 },
  { name: 'System Programming', credit: 4, semesterId: 92, teacherId: 1 },
  { name: 'Network I', credit: 4, semesterId: 92, teacherId: 1 },
  { name: 'Islamic', credit: 1, semesterId: 92, teacherId: 3 },
  { name: 'Math IV', credit: 4, semesterId: 92, teacherId: 3 },
  { name: 'Financial Accounting', credit: 2, semesterId: 92, teacherId: 3 },
  { name: 'Scientific Writing I', credit: 2, semesterId: 93, teacherId: 3 },
  { name: 'Database II', credit: 4, semesterId: 93, teacherId: 3 },
  { name: 'Network II', credit: 4, semesterId: 93, teacherId: 3 },
  { name: 'Islamic', credit: 1, semesterId: 93, teacherId: 3 },
  { name: 'Math V', credit: 4, semesterId: 93, teacherId: 3 },
  { name: 'Software Engineering', credit: 4, semesterId: 93, teacherId: 3 },
  { name: 'Scientific Writing II', credit: 2, semesterId: 94, teacherId: 3 },
  { name: 'Web Engineering I', credit: 4, semesterId: 94, teacherId: 1 },
  { name: 'Network III', credit: 4, semesterId: 94, teacherId: 1 },
  { name: 'Islamic', credit: 1, semesterId: 94, teacherId: 1 },
  { name: 'Advance Java', credit: 4, semesterId: 94, teacherId: 3 },
  { name: 'Artificial Intelligence', credit: 4, semesterId: 94, teacherId: 2 },
  { name: 'Data Warehouse ', credit: 4, semesterId: 95, teacherId: 2 },
  { name: 'Web Engineering II', credit: 4, semesterId: 95, teacherId: 2 },
  { name: 'Network Security', credit: 4, semesterId: 95, teacherId: 1 },
  { name: 'Islamic', credit: 1, semesterId: 95, teacherId: 1 },
  { name: 'Project Management', credit: 4, semesterId: 95, teacherId: 3 },
  { name: 'Information Society', credit: 2, semesterId: 95, teacherId: 3 },
  { name: 'Big Data', credit: 4, semesterId: 96, teacherId: 3 },
  { name: 'Software Engineering', credit: 4, semesterId: 96, teacherId: 1 },
  { name: 'Cloud Computing', credit: 4, semesterId: 96, teacherId: 1 },
  { name: 'Islamic', credit: 1, semesterId: 96, teacherId: 1 },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('subjects', subjects, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subjects', null, {});
  },
};
