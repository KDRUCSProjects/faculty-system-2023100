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
const loader = document.querySelector('.spinner');
const resultContainer = document.querySelector('.result-container');
const bubbleIcon = document.querySelector('.bubble-icon');
const iconTheme = document.querySelector('.icon__theme');
const iconSwap = document.querySelector('.swap-icon');
const theme = document.querySelector('link');

console.log(document.documentElement);

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
  errorDiv.classList.remove('hidden');
});

// input.addEventListener('keydown', submitFun);
bubbleIcon.addEventListener('click', submitFun);

///////////////////////////////////////////////////////

function submitFun(e) {
  let inputValue = input.value;
  if (inputValue) {
    input.value = '';
    loader.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    bubbleIcon.classList.add('hidden');

    setTimeout(() => {
      getApiFun(inputValue);
      loader.classList.add('hidden');
      bubbleIcon.classList.remove('hidden');
      // resultContainer.classList.remove('hidden');

      setTimeout(() => {
        errorDiv.style.display = 'none';
        errorDiv.classList.remove('hidden');
      }, 3000);
    }, 3000);
  }
}

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
        const date = new Date(data.createdAt);
        idID.textContent = data.id;
        kankorId.textContent = kankorInputvalue.textContent = data.kankorId;
        nameValue.textContent = fullName.textContent = data.fullName;
        fatherNameP.textContent = fatherNameValue.textContent = data.fatherName;
        grandFNameValue.textContent = grandFatherName.textContent =
          data.grandFatherName;
        eYear.textContent = data.educationalYearId;
        admDate.textContent = date.getFullYear();
        resultContainer.classList.remove('hidden');
      } else {
      }
    })
    .catch(err => {
      resultContainer.classList.add('hidden');
      errorDiv.style.display = 'flex';
    });
};

// //////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///   Dark Theme functionalty
////////////////////////////////

const iconSun = 'image/icon-moon.svg';
const iconMoon = 'image/icon-sun.svg';
const lightTheme = 'css/style.css';
const lightProfile = 'css/profileCard.css';
const darkTheme = 'css/styleDark.css';
const darkProfile = 'css/darkProfileCard.css';

//////////////////////////////////////////////////////////
//////////  Theme Toggler ////////////////////////////////
iconSwap.addEventListener('click', function (e) {
  if (iconSwap.getAttribute('src') === iconSun) {
    iconSwap.src = iconMoon;
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (iconSwap.getAttribute('src') === iconMoon) {
    iconSwap.src = iconSun;
    document.documentElement.setAttribute('data-theme', 'light');
  }
});
