'use strict';

const dishTitle = document.querySelector('.headerDish__title');
const dishImg = document.querySelector('.headerDish__img');
const dishTime = document.querySelector('.headerDish__time');
const dishDifficulty = document.querySelector('.headerDish__difficulty');
const dishText = document.querySelector('.preparation__text');
const dishCarbohydratesQuantity = document.querySelector('.nutrition__carbohydrates-quantity');
const dishProteinQuantity = document.querySelector('.nutrition__protein-quantity');
const dishFatQuantity = document.querySelector('.nutrition__fat-quantity');
const dishCalories = document.querySelector('.nutrition__kcal');
const ingredientsTable = document.querySelector('.ingredientsTable');

const fetchData = async function () {
  try {
    const url = location.pathname.split('/');
    const id = url[url.length - 1];
    const res = await fetch(`http://127.0.0.1:4000/api/v1/recipes/${id}`);
    const { data } = await res.json();

    const { recipe } = data;

    // Put data to the HTML
    document.title = `${recipe.name} | EatSmart`;
    dishTitle.textContent = recipe.name;
    dishImg.setAttribute('src', `${recipe.image}`);
    dishTime.innerHTML = `<span class="far fa-clock headerDish__time-icon"></span> ${recipe.time} min`;
    dishDifficulty.textContent = recipe.difficulty;
    dishText.innerHTML = recipe.preparation;
    dishCarbohydratesQuantity.textContent = recipe.carbohydrates + 'g';
    dishProteinQuantity.textContent = recipe.protein + 'g';
    dishFatQuantity.textContent = recipe.fat + 'g';
    dishCalories.textContent = recipe.calories + ' ' + 'kcal';

    // generate and fill ingredients table
    recipe.ingredients.forEach((i) => {
      const html = ` <tr class="ingredientsTable__row">
            <td class="ingredientsTable__cell">${i.ingredient}</td>
            <td class="ingredientsTable__cell">${i.quantity} ${i.quantityType}</td>
          </tr>`;

      ingredientsTable.innerHTML += html;
    });
  } catch (err) {
    console.error(err.message);
  }
};
fetchData();
