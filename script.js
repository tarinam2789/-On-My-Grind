const drinks = [
  { 
    name: "almond mocha blended cold brew",
    temperature: "cold",
    flavor: "mocha",
    milk: "almond",
    blended: "yes"
  },
  { 
    name: "vanilla latte",
    temperature: "hot",
    flavor: "vanilla",
    milk: "cow",
    blended: "no"
  }
  // Add more drinks if you'd like
];

// DOM elements
const drinkName = document.getElementById('drink-name');
const temperature = document.getElementById('temperature');
const flavor = document.getElementById('flavor');
const milk = document.getElementById('milk');
const blended = document.getElementById('blended');
const checkBtn = document.getElementById('checkBtn');
const refreshBtn = document.getElementById('refreshBtn');

let currentDrink = null;

function clearStyles() {
  [temperature, flavor, milk, blended].forEach(input => {
    input.classList.remove('red', 'purple');
  });
}

function clearInputs() {
  [temperature, flavor, milk, blended].forEach(input => {
    input.value = '';
  });
}

function loadNewDrink(){
  let newDrink;
  do {
    newDrink = drinks[Math.floor(Math.random() * drinks.length)];
  } while (newDrink === currentDrink);

  currentDrink = newDrink;
  drinkName.textContent = currentDrink.name;

  clearInputs();
  clearStyles();

  checkBtn.textContent = 'Check Answer';
}

document.querySelectorAll('.option').forEach(optionDiv => {
  const input = optionDiv.querySelector('input');
  optionDiv.querySelectorAll('.suggestion div').forEach(suggestionDiv => {
    suggestionDiv.addEventListener('click', () => {
      input.value = suggestionDiv.textContent;
      clearStyles();
    });
  });
});

// Check answers or load a new drink
checkBtn.addEventListener('click', () => {
  if (checkBtn.textContent === 'Check Answer') {
    let allCorrect = true;
    [temperature, flavor, milk, blended].forEach(input => {
      const correctAnswer = currentDrink[input.id].toLowerCase();
      const userAnswer = input.value.trim().toLowerCase();

      if (userAnswer === correctAnswer) {
        input.classList.add('purple'); // correct
        input.classList.remove('red');
      } else {
        input.classList.add('red'); // incorrect
        input.classList.remove('purple');
        allCorrect = false;
      }
    });

    if (allCorrect) {
      alert('Great job! All answers are correct!');
    }
    // Change button to "New Drink" after checking
    checkBtn.textContent = 'New Drink';

  } else {
    // If button says "New Drink", then we start a new drink
    loadNewDrink();
  }
});

// Refresh button to refresh the current drink
refreshBtn.addEventListener('click', loadNewDrink);

// Initialize first drink on page load
loadNewDrink();
