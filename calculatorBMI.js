// BMI CALCULATOR

const weightInput = document.querySelector('#weight');
const heightInput = document.querySelector('#height');
const submitBtn = document.querySelector('.calculatorBMI__submit');

const calcBMI = function (e) {
  e.preventDefault();
  const weight = +weightInput.value;
  const height = +heightInput.value / 100;
  if (!weight || !height) return console.log('Uzupełnij wszystkie pola!');

  const result = weight / Math.pow(height, 2);
  console.log(result.toFixed(2));

  let assessment = '';

  if (result > 40) {
    assessment = 'III stopień otyłości(otyłość skrajna)';
    console.log('otyłość skrajna - III stopień otyłości');
  } else if (result >= 35 && result <= 39.99) {
    assessment = 'II stopień otyłości';
    console.log('II stopień otyłości');
  } else if (result >= 30 && result <= 34.99) {
    assessment = 'I stopień otyłości';
    console.log('I stopień otyłości');
  } else if (result >= 25 && result <= 29.99) {
    assessment = 'nadwaga';
    console.log('nadwaga');
  } else if (result >= 18.5 && result <= 24.99) {
    assessment = 'wartość prawidłowa';
    console.log('wartość prawidłowa');
  } else if (result >= 17 && result <= 18.49) {
    assessment = 'niedowaga';
    console.log('niedowaga');
  } else if (result >= 16 && result <= 16.99) {
    assessment = 'wychudzenie';
    console.log('wychudzenie');
  } else {
    assessment = 'wygłodzenie';
    console.log('wygłodzenie');
  }

  console.log(`Twój wynik to: ${result.toFixed(2)}: ${assessment}`);
};

submitBtn.addEventListener('click', calcBMI);
