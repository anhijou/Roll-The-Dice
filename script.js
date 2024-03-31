'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let activePlayer = 0;
let currentScore = 0;
score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  currentScore = dice;
  console.log(dice, currentScore);

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  const current = document.querySelector(`#current--${activePlayer}`);
  if (dice !== 1) {
    current.textContent = Number(current.textContent) + currentScore;
  } else {
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    current.textContent = '0';
  }
});

btnHold.addEventListener('click', function () {
  const current = document.querySelector(`#current--${activePlayer}`);
  const score = document.querySelector(`#score--${activePlayer}`);
  score.textContent = Number(score.textContent) + Number(current.textContent);
  console.log(Number(score.textContent));
  if (Number(score.textContent) >= 50) {
    score.textContent = '50';
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    btnHold.disabled = true;
    btnRoll.disabled = true;
  } else {
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    current.textContent = '0';
  }
});

btnNew.addEventListener('click', function () {
  activePlayer = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  current0.textContent = '0';
  current1.textContent = '0';
  score0El.textContent = '0';
  score1El.textContent = '0';
  btnHold.disabled = false;
  btnRoll.disabled = false;
});
