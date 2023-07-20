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

////////////////////////////////////////////////////////////

function closeWindow() {
  otp.classList.add('hidden');
  overlay.classList.add('hidden');
}

iconClose.addEventListener('click', closeWindow);
overlay.addEventListener('click', closeWindow);

codes[0].focus();

////////////////////////////////////////
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
    console.log(arr);
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

window.addEventListener('load', () => codes[0].focus());

/////////////////////////////////////////////////
/////////////////////////////////////////////////

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);
  data = Object.fromEntries(formData);
  console.log(formData.get(Date));
  console.log(data);

  // mainDiv.classList.add('hidden');
  overlay.classList.remove('hidden');
  otp.classList.remove('hidden');

  /////////////////////////////////////////////////////////////////
});

function registerationFun(e) {
  // e.preventDefault();
  fetch(`http://localhost:4000/students/students/${finalValue}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (!res.ok) throw new Error(res.status);
      console.log(res.status);
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      errorDiv.style.display = 'flex';
      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 3000);
    });
}

errorClose.addEventListener('click', function () {
  errorDiv.style.display = 'none';
});

otpBtn.addEventListener('click', function () {
  spinnerDiv.classList.remove('hidden');
  verify.classList.add('hidden');
  setTimeout(() => {
    spinnerDiv.classList.add('hidden');
    verify.classList.remove('hidden');
    registerationFun();
  }, 2000);
});

/////////////////////////////////////////////////////////////////
