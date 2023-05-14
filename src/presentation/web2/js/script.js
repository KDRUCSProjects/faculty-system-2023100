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
  Name: 'Mohammad Agha',
  Father: 'Ibrahim Shah Agha',
  GrandFatherName: 'Sultan Shah Agha',
  Id: 'CF000345',
  Score: 195,
};

const ahmad = {
  Name: 'Ahmad Rohani',
  Father: 'Baaz Mohammad',
  GrandFatherName: 'Toor jan',
  Id: 'CF000346',
  Score: 198,
};

const malik = {
  Name: 'Abdul Malik',
  Father: 'Asadullah',
  GrandFatherName: 'Abdullah',
  Id: 'CF000347',
  Score: 190,
};

const qasim = {
  Name: 'Mohammad Qasim',
  Father: 'Ibrahim Jan',
  GrandFatherName: 'Ahmad Jan',
  Id: 'CF000348',
  Score: 199,
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
