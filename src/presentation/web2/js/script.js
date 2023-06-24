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
const iconClose = document.querySelector('.icon-close');
const overlay = document.querySelector('.overlay');
const profileCard = document.querySelector('.profile-card');
const idID = document.querySelector('.id');
const kankorId = document.querySelector('.kankor-id');
const fullName = document.querySelector('.full-name');
const nickName = document.querySelector('.nick-name');
const fatherNameP = document.querySelector('.father-name');
const grandFatherName = document.querySelector('.grand-father-name');
const eYear = document.querySelector('.e-year');
const admDate = document.querySelector('.adm-date');
const updateDate = document.querySelector('.update-date');

// console.log(profile);

//////////////////////////////////////////////

iconClose.addEventListener('click', function () {
  profileCard.classList.add('hidden');
  overlay.classList.add('hidden');
});

profile.addEventListener('click', function () {
  profileCard.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

/////////////////////////////////////////////
// const mohammad = {
//   name: 'Mohammad Agha',
//   father: 'Ibrahim Shah Agha',
//   grandFatherName: 'Sultan Shah Agha',
//   id: 'CF000345',
//   score: 195,
// };

// const ahmad = {
//   name: 'Ahmad Rohani',
//   father: 'Baaz Mohammad',
//   grandFatherName: 'Toor jan',
//   id: 'CF000346',
//   score: 198,
// };

// const malik = {
//   name: 'Abdul Malik',
//   father: 'Asadullah',
//   grandFatherName: 'Abdullah',
//   id: 'CF000347',
//   score: 190,
// };

// const qasim = {
//   name: 'Mohammad Qasim',
//   father: 'Ibrahim Jan',
//   grandFatherName: 'Ahmad Jan',
//   id: 'CF000348',
//   score: 199,
// };

// const students = [mohammad, ahmad, malik, qasim];

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    let inputValue = input.value;
    input.value = '';

    setTimeout(() => {
      getApiFun(inputValue);
    }, 3000);
  }
});

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const getApiFun = id => {
  fetch(`http://localhost:4000/students/kankor/${id}`)
    .then(response => {
      if (!response.ok) throw new Error(response.status);

      return response.json();
    })
    .then(data => {
      if (data.kankorId) {
        idID.textContent = data.id;
        kankorId.textContent = kankorInputvalue.textContent = data.kankorId;
        nameValue.textContent = fullName.textContent = data.fullName;
        fatherNameP.textContent = fatherNameValue.textContent = data.fatherName;
        grandFNameValue.textContent = grandFatherName.textContent =
          data.grandFatherName;
        eYear.textContent = data.educationalYearId;
        admDate.textContent = data.createdAt;
        updateDate.textContent = data.updatedAt;
      } else {
      }
    })
    .catch(err => alert(`${err} This Name is Not In The List Of Kankor`));
};
