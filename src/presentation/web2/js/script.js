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
const errorClose = document.querySelector('.error-close');
const errorDiv = document.querySelector('.error-message-div');

// console.log(profile);

//////////////////////////////////////////////

/////////////////////////////////////////////
iconClose.addEventListener('click', function () {
  profileCard.classList.add('hidden');
  overlay.classList.add('hidden');
});

profile.addEventListener('click', function () {
  profileCard.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

errorClose.addEventListener('click', function () {
  errorDiv.style.display = 'none';
});

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
      // console.log(data);
      if (data.kankorId) {
        idID.textContent = data.id;
        kankorId.textContent = kankorInputvalue.textContent = data.kankorId;
        nameValue.textContent = fullName.textContent = data.fullName;
        fatherNameP.textContent = fatherNameValue.textContent = data.fatherName;
        grandFNameValue.textContent = grandFatherName.textContent =
          data.grandFatherName;
        eYear.textContent = data.educationalYearId;
        admDate.textContent = data.createdAt;
      } else {
      }
    })
    .catch(err => {
      errorDiv.style.display = 'flex';
    });
};
