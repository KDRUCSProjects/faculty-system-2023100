'use strict';

const codes = document.querySelectorAll('.code');
const mainDiv = document.querySelector('.main-div');
const registerBtn = document.querySelector('.register-btn');
const otp = document.querySelector('.otp-hidden-div');

////////////////////////////////////////////////////////////

registerBtn.addEventListener('click', function (e) {
  mainDiv.classList.add('hidden');
  otp.classList.remove('hidden');
});

codes[0].focus();

codes.forEach((code, idx) => {
  code.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <= 9) {
      codes[idx].value = '';
      setTimeout(() => codes[idx + 1].focus(), 10);
    } else if (e.key === 'Backspace') {
      setTimeout(() => codes[idx - 1].focus(), 10);
    }
  });
});
