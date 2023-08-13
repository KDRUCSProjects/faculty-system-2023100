'use strict';

const codes = document.querySelectorAll('.code');
const mainDiv = document.querySelector('.main-div');
const registerBtn = document.querySelector('.register-btn');
const otp = document.querySelector('.otp-hidden-div');
const overlay = document.querySelector('.overlay');
const iconClose = document.querySelector('.opt-icon');
const otpBtn = document.querySelector('.otp-button');
const verify = document.querySelector('.span-2');
const spinnerDiv = document.querySelector('.spinner-2-div');
const errorDiv = document.querySelector('.error-message-div');
const errorClose = document.querySelector('.error-close');
const inputs = document.querySelectorAll('.input');
const profileImg = document.querySelector('.profile-Img');
const inputFile = document.getElementById('input-file');
const photoHeadin = document.querySelector('.photo-heading');

////////////////////////////////////////////////////////////
//////////  Closing Window Functions  /////////////////////
function closeWindow(e) {
  e.preventDefault();
  otp.classList.add('hidden');
  overlay.classList.add('hidden');
}

iconClose.addEventListener('click', closeWindow);
overlay.addEventListener('click', closeWindow);

////////////////////////////////////////

inputFile.onchange = function (e) {
  e.preventDefault();
  profileImg.src = URL.createObjectURL(inputFile.files[0]);
  profileImg.classList.remove('hidden');
  photoHeadin.classList.add('hidden');
};

//////////////////////////////////////////////////////////

const pin = [];
let finalValue;
let data;

codes.forEach((input, index1) => {
  input.addEventListener('keyup', e => {
    const currentInput = input;
    const nextInput = input.nextElementSibling;
    const pervInput = input.previousElementSibling;
    const currentInputValue = currentInput.value;

    if (pin.length < 6) {
      pin.push(currentInputValue);
      pin.forEach(n => {
        if (n === '') {
          pin.pop();
        }
      });
    }

    const arr = pin.join('');

    finalValue = arr;

    if (currentInput.value.length > 1) {
      currentInput.value = '';
      return;
    }

    if (
      nextInput &&
      nextInput.hasAttribute('disabled') &&
      currentInput.value !== ''
    ) {
      nextInput.removeAttribute('disabled');
      nextInput.focus();
    }

    if (e.key === 'Backspace') {
      codes.forEach((input, index2) => {
        if (index1 <= index2 && pervInput) {
          input.setAttribute('disabled', true);
          currentInput.value = '';
          pervInput.focus();
          pin.pop();
        }
      });
    }
  });
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

const form = document.querySelector('form');
let formData;

form.addEventListener('submit', e => {
  e.preventDefault();

  formData = new FormData(form);
  // const file = document.querySelector('#input-file').files[0];
  // const data = Object.fromEntries(formData);
  // console.log(data);
  // formData.append('photo', file);

  overlay.classList.remove('hidden');
  otp.classList.remove('hidden');
  /////////////////////////////////////////////////////////////////
});

function registerationFun() {
  fetch(`http://localhost:4000/students/students/${finalValue}`, {
    method: 'POST',
    body: formData,
  })
    .then(res => {
      console.log(res);
      if (!res.ok) {
        codes.forEach((input, index) => {
          pin.pop();
          input.value = '';
          if (index > 0) {
            input.setAttribute('disabled', true);
          }
        });
        throw new Error(res.status);
      }

      if (res.ok) {
        codes.forEach((input, index) => {
          pin.pop();
          input.value = '';
          if (index > 0) {
            input.setAttribute('disabled', true);
          }
        });
        overlay.classList.add('hidden');
        otp.classList.add('hidden');
        inputs.forEach(input => {
          input.value = '';
        });
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      errorDiv.style.display = 'flex';
      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 3000);
    });
}

errorClose.addEventListener('click', function (e) {
  e.preventDefault();
  errorDiv.style.display = 'none';
});

otpBtn.addEventListener('click', function (e) {
  e.preventDefault();
  spinnerDiv.classList.remove('hidden');
  verify.classList.add('hidden');
  setTimeout(() => {
    spinnerDiv.classList.add('hidden');
    verify.classList.remove('hidden');
    registerationFun();
  }, 2000);
});

/////////////////////////////////////////////////////////////////
