const axios = require('axios');
const fs = require('fs');

// array of API endpoints
const apiEndpoints = [
  'http://localhost:4000/attendanceList',
  'http://localhost:4000/attendance',
  'http://localhost:4000/attendance/{attendanceId}',
  'http://localhost:4000//attendance/subject/{subjectId}',
  'http://localhost:4000/auth/register',
  'http://localhost:4000/auth/login',
  'http://localhost:4000/auth/logout',
  'http://localhost:4000/auth/refresh-tokens',
  'http://localhost:4000/auth/change-password',
  'http://localhost:4000/auth/updateProfile',
  'http://localhost:4000/auth/checkPassword',
  'http://localhost:4000/auth/token',
  'http://localhost:4000/departments',
  'http://localhost:4000/departments/{id}',
  'http://localhost:4000/years/years/setCurrentYear',
  'http://localhost:4000/years/{id}',
  'http://localhost:4000/years/value/{year}',
  'http://localhost:4000/reentries',
  'http://localhost:4000/reentries/{id}',
  'http://localhost:4000/semesters',
  'http://localhost:4000/semesters/{id}',
  'http://localhost:4000/shokaList',
  'http://localhost:4000/shokaList/{id}',
  'http://localhost:4000/shokaList/students/{studentId}',
  'http://localhost:4000/shoka',
  'http://localhost:4000/shoka/{shokaId}',
  'http://localhost:4000/shoka/subject/{subjectId}',
  'http://localhost:4000/studentList',
  'http://localhost:4000/studentList/promote',
  'http://localhost:4000/studentList/{studentListId}',
  'http://localhost:4000/students',
  'http://localhost:4000/students/{id}',
  'http://localhost:4000/students/kankor/{kankorId}',
  'http://localhost:4000/students/students/{token}',
  'http://localhost:4000/subjects',
  'http://localhost:4000/subjects/{id}',
  'http://localhost:4000/subjects/assign',
  'http://localhost:4000/subjects/take',
  'http://localhost:4000/subjects/teachers/{teacherId}',
  'http://localhost:4000/subjects/students/{subjectId}',
  'http://localhost:4000/taajils',
  'http://localhost:4000/taajils/{studentId}',
  'http://localhost:4000/taajils/{taajilId}',
  'http://localhost:4000/tabdili',
  'http://localhost:4000/tabdili/{tabdiliId}',
  'http://localhost:4000/teachers',
  'http://localhost:4000/users',
  'http://localhost:4000/users/{id}',
  'http://localhost:4000/storage/images/{imageName}',
  
  // Add more endpoints as needed
];

// Function to fetch and save API details
async function fetchAPIs() {
  for (const endpoint of apiEndpoints) {
    try {
      const response = await axios.get(endpoint);
      const data = response.data;

      //string with request and response details
      const apiDetails = `
        API Endpoint: ${endpoint}
        Request Body: ${JSON.stringify(response.config.data)}
        Response Body: ${JSON.stringify(data)}
        Headers: ${JSON.stringify(response.headers)}
        --------------------------------------------
      `;

      // Appending the API details to a text file
      fs.appendFileSync('api_details.txt', apiDetails);
    } catch (error) {
      console.error(`Error fetching ${endpoint}: ${error.message}`);
    }
  }

  console.log('APIs fetched and details saved successfully.');
}

// Call the function to fetch and save API details
fetchAPIs();
