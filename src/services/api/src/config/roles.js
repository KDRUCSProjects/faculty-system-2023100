const allRoles = {
  user: ['takeAttendance', 'viewUser'],
  admin: ['getUsers', 'manageUsers', 'manageDepartments', 'takeAttendance', 'viewUser'],
  execManager: ['manageDepartments', 'viewUser'],
  teachingManager: ['viewUser'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
