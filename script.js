'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btnNew');
const btnRoll = document.querySelector('.btnRoll');
const btnHold = document.querySelector('.btnHold');

const updateCurrent = function (newCurrent, playerId) {
  document.getElementById(`current--${playerId}`).textContent = newCurrent;
};

const switchPlayer = function () {
  current = 0;
  updateCurrent(current, activePlayer);
  activePlayer ^= 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scoreArray, current, activePlayer;
//Starting conditions
const init = function () {
  scoreArray = [0, 0];
  current = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
};
init();

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  const dice = Math.ceil(Math.random() * 6);
  diceEl.src = `asset/dice-${dice}.png`;
  diceEl.classList.remove('hidden');
  if (dice !== 1) {
    current += dice;
    updateCurrent(current, activePlayer);
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  scoreArray[activePlayer] += current;
  document.getElementById(`score--${activePlayer}`).textContent =
    scoreArray[activePlayer];
  if (scoreArray[activePlayer] >= 100) {
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
    diceEl.classList.add('hidden');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
