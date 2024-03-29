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
const loader = document.querySelector('.loader');

const fetchData = async function () {
  try {
    const url = location.pathname.split('/');
    const slug = url[url.length - 1];
    const res = await fetch(`/api/v1/recipes/${slug}`);
    const { data } = await res.json();

    const { recipe } = data;

    document.title = `${recipe.name} - Przepis | Smakuj Zdrowo`;
    document
      .querySelector('meta[property="og:title"]')
      .setAttribute('content', `${recipe.name} - Przepis | Smakuj Zdrowo`);
    dishTitle.textContent = recipe.name;
    dishImg.style.display = 'block';
    dishImg.style.margin = '0 auto';
    loader.style.display = 'none';
    dishImg.setAttribute('src', `${recipe.image}`);
    dishImg.setAttribute('alt', `${recipe.name}`);
    dishTime.innerHTML = `<span class="far fa-clock headerDish__time-icon"></span> ${recipe.time} min`;
    dishDifficulty.innerHTML = `<i class="far fa-star headerDish__difficulty-icon"></i> ${recipe.difficulty}`;
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
