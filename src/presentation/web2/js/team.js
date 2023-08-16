'use strict';

const frontend = document.querySelectorAll('.frontend');
const backend = document.querySelectorAll('.backend');
const documentater = document.querySelectorAll('.document');
const testers = document.querySelectorAll('.test');
const frontendTab = document.querySelector('.frontend-tab');
const backendTab = document.querySelector('.backend-tab');
const testersTab = document.querySelector('.testers-tab');
const documentTab = document.querySelector('.document-tab');
const allTab = document.querySelector('.all-tab');
const databaseTab = document.querySelector('.database-tab');
const cards = document.querySelectorAll('.card');

// console.log(databaseTab);
// //////////////////////////////////////////////////////////////

allTab.addEventListener('click', function () {
  cards.forEach(card => {
    card.classList.remove('hidden');
  });
});

frontendTab.addEventListener('click', function () {
  cards.forEach(card => {
    if (!card.classList.contains('frontend')) {
      card.classList.add('hidden');
    } else if (card.classList.contains('frontend')) {
      card.classList.remove('hidden');
    }
  });
});

documentTab.addEventListener('click', function () {
  cards.forEach(card => {
    if (!card.classList.contains('document')) {
      card.classList.add('hidden');
    } else if (card.classList.contains('document')) {
      card.classList.remove('hidden');
    }
  });
});

testersTab.addEventListener('click', function () {
  cards.forEach(card => {
    if (!card.classList.contains('tester')) {
      card.classList.add('hidden');
    } else if (card.classList.contains('tester')) {
      card.classList.remove('hidden');
    }
  });
});

backendTab.addEventListener('click', function () {
  cards.forEach(card => {
    if (!card.classList.contains('backend')) {
      card.classList.add('hidden');
    } else if (card.classList.contains('backend')) {
      card.classList.remove('hidden');
    }
  });
});

databaseTab.addEventListener('click', function () {
  cards.forEach(card => {
    if (!card.classList.contains('database')) {
      card.classList.add('hidden');
    } else if (card.classList.contains('database')) {
      card.classList.remove('hidden');
    }
  });
});
