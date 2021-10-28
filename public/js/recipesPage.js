'use strict';

const searchBtn = document.querySelector('.searchBar__btn');
const searchInput = document.querySelector('.headerRecipies__input');
const recipesContainer = document.querySelector('.mainRecipies__container');

const renderRecipes = function (img, name, id) {
  const html = `
  <div class="dishCard mainRecipies__dishCard">
          <img
            src="${img}"
            alt="${name}"
            class="dishCard__img mainRecipies__dishCard-img"
          />
          <button class="favouriteBtn">
            <span class="fas fa-heart favouriteBtn__icon"></span>
          </button>
          <h3 class="dishCard__title mainRecipies__dishCard-title">${name}</h3>
          <button class="btn btn--orange"><a href="${id}" class="btn__link">Sprawdź</a></button>
        </div>
    `;

  recipesContainer.insertAdjacentHTML('afterbegin', html);
};

const searchRecipes = async function () {
  try {
    let recipeName = searchInput.value;

    if (!recipeName) return;

    recipeName = recipeName[0].toUpperCase() + recipeName.slice(1);

    console.log(recipeName);

    const res = await fetch(`http://127.0.0.1:4000/api/v1/recipes?name=${recipeName}`);
    const { data } = await res.json();

    const recipe = data.recipes[0];

    console.log(recipe);

    renderRecipes(recipe.image, recipe.name, recipe._id);

    searchInput.value = '';
  } catch (err) {
    console.log(err.message);
  }
};

searchBtn.addEventListener('click', searchRecipes);
