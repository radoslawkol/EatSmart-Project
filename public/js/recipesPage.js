'use strict';

const searchBtn = document.querySelector('.searchBar__btn');
const searchInput = document.querySelector('.headerRecipies__input');
const recipesContainer = document.querySelector('.mainRecipies__container');

const resultsPerPage = 12;

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
    recipesContainer.textContent = '';

    recipeName = recipeName[0].toUpperCase() + recipeName.slice(1);

    const res = await fetch(
      `http://127.0.0.1:4000/api/v1/recipes?name=${recipeName}&fields=image,name,_id`
    );
    const { data } = await res.json();

    const recipe = data.recipes[0];

    renderRecipes(recipe.image, recipe.name, recipe._id);

    searchInput.value = '';
  } catch (err) {
    console.log(err.message);
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
  } catch (err) {
    console.log(err.message);
  }
};

fetchRecipes();

const renderPaginationBox = async function () {
  try {
    const res = await fetch(`http://127.0.0.1:4000/api/v1/recipes?fields=results`);
    const data = await res.json();
    const results = data.results;
    console.log(results);
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
    console.log('wchodzi');

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