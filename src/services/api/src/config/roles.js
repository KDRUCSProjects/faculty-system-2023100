const allRoles = {
  user: [],
  teacher: ['takeAttendance'],
  admin: ['getUsers', 'manageUsers', 'manageDepartments'],
  execManager: ['manageDepartments'],
  teachingManager: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
