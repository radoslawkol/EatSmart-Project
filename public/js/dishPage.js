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
    // const id = url[url.length - 1];
    const slug = url[url.length - 1]
    const res = await fetch(`https://smakujzdrowo.pl/api/v1/recipes/${slug}`);
    const { data } = await res.json();

    const { recipe } = data;

    // Put data to the HTML
    document.title = `${recipe[0].name} - Przepis | Smakuj Zdrowo`;
    document
      .querySelector('meta[property="og:title"]')
      .setAttribute('content', `${recipe[0].name} - Przepis | Smakuj Zdrowo`);
    dishTitle.textContent = recipe[0].name;
    dishImg.style.display = 'block';
    dishImg.style.margin = '0 auto';
    loader.style.display = 'none';
    dishImg.setAttribute('src', `${recipe[0].image}`);
    dishImg.setAttribute('alt', `${recipe[0].name}`);
    dishTime.innerHTML = `<span class="far fa-clock headerDish__time-icon"></span> ${recipe[0].time} min`;
    dishDifficulty.innerHTML = `<i class="far fa-star headerDish__difficulty-icon"></i> ${recipe[0].difficulty}`;
    dishText.innerHTML = recipe[0].preparation;
    dishCarbohydratesQuantity.textContent = recipe[0].carbohydrates + 'g';
    dishProteinQuantity.textContent = recipe[0].protein + 'g';
    dishFatQuantity.textContent = recipe[0].fat + 'g';
    dishCalories.textContent = recipe[0].calories + ' ' + 'kcal';

    // generate and fill ingredients table
    recipe[0].ingredients.forEach((i) => {
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
