'use strict';

const searchBtn = document.querySelector('.searchBar__btn');
const searchInput = document.querySelector('.headerRecipies__input');
const recipesContainer = document.querySelector('.mainRecipies__container');
let searchCharacters = [];

const resultsPerPage = 12;

const renderRecipes = function (img, name, id) {
  const html = `
  <div class="dishCard mainRecipies__dishCard" data-id="${id}">
          <img
            src="${img}"
            alt="${name}"
            class="dishCard__img mainRecipies__dishCard-img"
          />
          <button class="favouriteBtn">
            <span class="fas fa-heart favouriteBtn__icon"></span>
          </button>
          <h3 class="dishCard__title mainRecipies__dishCard-title">${name}</h3>
          <button class="btn btn--orange"><a href="/recipes/${id}" class="btn__link">Sprawdź</a></button>
        </div>
    `;

  recipesContainer.insertAdjacentHTML('afterbegin', html);
};

const partialSearch = async function (recipeName) {
  try {
    recipeName = recipeName.toLowerCase();
    const response = await fetch(`http://127.0.0.1:4000/api/v1/recipes?fields=image,name,_id`);
    const { data } = await response.json();
    searchCharacters = data.recipes;
    const filteredCharacters = searchCharacters.filter((character) => {
      return character.name.toLowerCase().includes(recipeName);
    });
    if (filteredCharacters.length === 0) {
      console.log('not found');
      recipesContainer.innerHTML = `
      <p id="errorRecipeNotFound">Nie znaleziono przepisu o takiej nazwie!</p>`;
      document.querySelector('.paginationBox__list').innerHTML = '';
      document.querySelector('#backToAllRecipesBtn').style.display = 'block';
      return;
    }

    filteredCharacters.forEach((recipe) => {
      renderRecipes(recipe.image, recipe.name, recipe._id);
    });

    document.querySelector('.paginationBox__list').innerHTML = '';
    document.querySelector('#backToAllRecipesBtn').style.display = 'block';
  } catch (err) {
    console.log(err.message);
  }
};

const searchRecipes = async function () {
  try {
    let recipeName = searchInput.value;

    if (!recipeName) return;
    recipesContainer.textContent = '';

    partialSearch(recipeName);

    searchInput.value = '';
  } catch (err) {
    console.error(err.message);
  }
};

searchBtn.addEventListener('click', searchRecipes);
searchInput.addEventListener('keydown', (e) => {
  if (searchInput.value === '') return;
  if (e.key === 'Enter') {
    searchRecipes();
  }
});

const fetchRecipes = async function (page = '0') {
  try {
    recipesContainer.textContent = '';
    const res = await fetch(
      `http://127.0.0.1:4000/api/v1/recipes?page=${page}&limit=${resultsPerPage}`
    );
    const { data } = await res.json();

    data.recipes.forEach((recipe) => {
      renderRecipes(recipe.image, recipe.name, recipe._id);
    });
    recipesContainer.addEventListener('click', function (e) {
      console.log(e.target);
      const card = e.target.closest('.mainRecipies__dishCard');
      console.log(card);
      if (card) {
        console.log(card.dataset.id);
        window.location.pathname = `recipes/${card.dataset.id}`;
      } else {
        return;
      }
    });
  } catch (err) {
    console.error(err);
  }
};

fetchRecipes();

const renderPaginationBox = async function () {
  try {
    const res = await fetch(`http://127.0.0.1:4000/api/v1/recipes?fields=results`);
    const data = await res.json();
    const results = data.results;
    const pages = Math.ceil(results / resultsPerPage);

    let html = '';
    for (let i = 1; i < pages; i++) {
      html += `
      <li class="paginationBox__item paginationBox__pageNum">
      <a href="#" class="paginationBox__link" data-num="${i}">${i + 1}</a>
      </li>
      `;
    }

    const content = `
    <li class="paginationBox__item" id="prevBtn" >
    <a href="" class="paginationBox__link paginationBox__prev" 
    ><span class="fas fa-chevron-circle-left"></span
    ></a>
    </li>
    <li class="paginationBox__item paginationBox__pageNum active" id="pageNumFirst">
    <a href="" class="paginationBox__link" data-num="0">1</a>
    </li>
    
    ${html}
    <li class="paginationBox__item" id="nextBtn">
    <a href="" class="paginationBox__link paginationBox__next" 
    ><span class="fas fa-chevron-circle-right"></span
    ></a>
    </li>`;

    document.querySelector('.paginationBox__list').insertAdjacentHTML('afterbegin', content);

    for (let i = 0; i < pageNumBoxes.length; i++) {
      pageNumBoxes[i].addEventListener('click', function (e) {
        e.preventDefault();

        const pageNum = changeActivePage(this);
        console.log(pageNum);
        fetchRecipes(pageNum);
      });
    }

    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const activePage = document.querySelector('.paginationBox__pageNum.active');
      const prevPage = activePage.previousElementSibling;
      if (!prevPage.classList.contains('paginationBox__pageNum')) return;

      const pageNum = changeActivePage(prevPage);

      fetchRecipes(pageNum);
    });

    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const activePage = document.querySelector('.paginationBox__pageNum.active');
      const nextPage = activePage.nextElementSibling;
      if (!nextPage.classList.contains('paginationBox__pageNum')) return;

      const pageNum = changeActivePage(nextPage);

      fetchRecipes(pageNum);
    });
  } catch (err) {
    err.message;
  }
};

renderPaginationBox();

const pageNumBoxes = document.getElementsByClassName('paginationBox__pageNum');

const changeActivePage = function (element) {
  for (let i = 0; i < pageNumBoxes.length; i++) {
    pageNumBoxes[i].classList.remove('active');
  }
  element.classList.add('active');
  const pageNum = element.firstElementChild.dataset.num;
  return pageNum;
};
