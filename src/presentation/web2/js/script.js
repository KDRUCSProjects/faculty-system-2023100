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
const student = {
  Name: 'Mohammad Agha',
  Father: 'Ibrahim Shah Agha',
  GrandFatherName: 'Sultan Shah Agha',
  Id: 'CF000345',
  Score: 195,
};

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const inputValue = input.value;
    console.log(inputValue);

    if (inputValue === student.Id) {
      nameValue.textContent = 'hi';
      fatherNameValue.textContent = student.Father;
    }
  }
});
