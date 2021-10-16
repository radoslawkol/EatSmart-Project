// BMI CALCULATOR

const weightInput = document.querySelector('#weight');
const heightInput = document.querySelector('#height');
const submitBtn = document.querySelector('.calculatorBMI__submit');
const resultsBMI = document.querySelector('.resultsBMI');
const assessmentBMI = document.querySelector('#assessmentBMI');
const resultsBMIOutput = document.querySelector('#resultsBMI__output');
const errorMessageBMI = document.querySelector('#errorMessageBMI');

const calcBMI = function (e) {
  e.preventDefault();
  errorMessageBMI.style.display = 'none';
  const weight = +weightInput.value;
  const height = +heightInput.value / 100;

  heightInput.value = '';
  weightInput.value = '';

  if (!weight || weight < 0 || weight > 1000 || !height || height > 5 || height <= 0) {
    errorMessageBMI.style.display = 'block';
    resultsBMI.style.display = 'none';
    return;
  }

  const result = weight / Math.pow(height, 2);

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

  resultsBMI.style.display = 'block';

  assessmentBMI.innerText = assessment;
  resultsBMIOutput.innerText = result.toFixed(2);
};

submitBtn.addEventListener('click', calcBMI);
