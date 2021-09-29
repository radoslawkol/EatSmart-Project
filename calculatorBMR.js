// calculator BMR

// const { default: Big } = require('big.js');

const maleInput = document.querySelector('#male');
const femaleInput = document.querySelector('#female');
const ageInput = document.querySelector('#age');
const weightInput = document.querySelector('#weight');
const heightInput = document.querySelector('#height');
const selectBMR = document.querySelector('#selectBMR');

const submitBtn = document.querySelector('.calculatorBMR__submit');

submitBtn.addEventListener('click', (e) => {
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);
  const age = parseInt(ageInput.value);
  e.preventDefault();

  let bmr = null;

  if (maleInput.checked) {
    //prettier-ignore
    bmr = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)
  } else if (femaleInput.checked) {
    //prettier-ignore
    bmr = 655.1 +( 9.563 * weight) + (1.850 * height) - (4.676 * age);
  } else {
    console.log('Wybierz płeć');
  }
  console.log(height);
  console.log(weight);
  console.log(age);
  console.log(Math.round(bmr * 100) / 100.0);

  let activityLevelIndex = null;

  const activityLevel = selectBMR.value;
  console.log(activityLevel);
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
      console.log('Wybierz poziom aktywności');
      break;
  }
  const result = bmr * activityLevelIndex;
  console.log(
    `Twoja podstawowa przemiana materii wynosi: ${bmr.toFixed(
      0
    )} kcal, zapotrzebowanie kaloryczne: ${result.toFixed(0)} kcal`
  );
});
