// calculator BMR

const maleInput = document.querySelector('#male');
const femaleInput = document.querySelector('#female');
const ageInput = document.querySelector('#age');
const weightInput = document.querySelector('#weight');
const heightInput = document.querySelector('#height');
const selectBMR = document.querySelector('#selectBMR');

const submitBtn = document.querySelector('.calculatorBMR__submit');
const resultsBMR = document.querySelector('.resultsBMR');
const metabolism = document.querySelector('.resultsBMR__metabolism-output');
const dailyIntake = document.querySelector('.resultsBMR__daily-output');
const errorMessageBMR = document.querySelector('#errorMessageBMR');

submitBtn.addEventListener('click', (e) => {
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);
  const age = parseInt(ageInput.value);
  e.preventDefault();

  heightInput.value = weightInput.value = ageInput.value = '';
  errorMessageBMR.style.display = 'none';
  resultsBMR.style.display = 'none';
  const options = selectBMR.options;

  if (!height || !weight || !age) {
    errorMessageBMR.style.display = 'block';
    return;
  }

  let bmr = null;

  if (maleInput.checked) {
    bmr = 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
  } else if (femaleInput.checked) {
    bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  } else {
    errorMessageBMR.style.display = 'block';
  }

  femaleInput.checked = false;
  maleInput.checked = false;

  let activityLevelIndex = null;

  const activityLevel = selectBMR.value;
  switch (+activityLevel) {
    case 0:
      activityLevelIndex = 1.2;
      break;
    case 1:
      activityLevelIndex = 1.375;
      break;
    case 2:
      activityLevelIndex = 1.55;
      break;
    case 3:
      activityLevelIndex = 1.725;
      break;
    case 4:
      activityLevelIndex = 1.9;
      break;
    default:
      break;
  }
  for (o of options) {
    o.selected = false;
  }

  const result = bmr * activityLevelIndex;

  metabolism.innerText = `${bmr.toFixed(0)} kcal`;
  dailyIntake.innerText = `${result.toFixed(0)} kcal`;

  resultsBMR.style.display = 'block';
});
