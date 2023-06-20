'use strict';
//////////////////////////////////////////////

const input = document.querySelector('.input');
const name = document.querySelector('.name');
const nameValue = document.querySelector('.name-value');
const fatherName = document.querySelector('.f-name');
const fatherNameValue = document.querySelector('.f-name-value');
const grandFName = document.querySelector('.grand-f-name');
const grandFNameValue = document.querySelector('.grand-f-name-value');
const kankorInput = document.querySelector('.kankor-input');
const kankorInputvalue = document.querySelector('.kankor-input-value');
const profile = document.querySelector('.profile');
// console.log(profile);

//////////////////////////////////////////////
const mohammad = {
  name: 'Mohammad Agha',
  father: 'Ibrahim Shah Agha',
  grandFatherName: 'Sultan Shah Agha',
  id: 'CF000345',
  score: 195,
};

const ahmad = {
  name: 'Ahmad Rohani',
  father: 'Baaz Mohammad',
  grandFatherName: 'Toor jan',
  id: 'CF000346',
  score: 198,
};

const malik = {
  name: 'Abdul Malik',
  father: 'Asadullah',
  grandFatherName: 'Abdullah',
  id: 'CF000347',
  score: 190,
};

const qasim = {
  name: 'Mohammad Qasim',
  father: 'Ibrahim Jan',
  grandFatherName: 'Ahmad Jan',
  id: 'CF000348',
  score: 199,
};

const students = [mohammad, ahmad, malik, qasim];

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    let inputValue = input.value;
    console.log(inputValue);
    input.value = '';

    setTimeout(() => {
      students.forEach(std => {
        if (inputValue === std.id) {
          nameValue.textContent = std.name;
          fatherNameValue.textContent = std.father;
          grandFNameValue.textContent = std.grandFatherName;
          kankorInputvalue.textContent = std.id;
        }
      });
    }, 3000);
  }
});

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// const getApiFun = id => {
//   fetch(`http://localhost:4000/students/kankor/${id}`)
//     .then(response => {
//       if (!response.ok) throw new Error(response.status);

//       return response.json();
//     })
//     .then(data => {
//       if (data.kankorId) {
//         console.log('hey');
//       } else {
//         console.log('bay');
//       }
//     })
//     .catch(err => alert(`${err} Name Not Found`));
// };

// getApiFun('butezhvss');
