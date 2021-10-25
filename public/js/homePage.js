// HOME PAGE

const mainHomePageLatestdishes = document.querySelector('.mainHomePage__latestdishes');
const mainHomePageArticles = document.querySelector('.mainHomePage__articles');
const headerHomePageSlick = document.querySelector('.headerHomePage__slick');

const mediaQuery = window.matchMedia('(min-width: 992px)');

const changeContent = function (size) {
  if (size.matches) {
    const html = `
    <h2 class="mainHomePage__title">Artykuły</h2>
        <ul class="mainHomePage__list">
          <li class="mainHomePage__item">
            <a href="" class="mainHomePage__link">Nazwa artykułu</a>
          </li>
          <li class="mainHomePage__item">
            <a href="" class="mainHomePage__link">Nazwa artykułu</a>
          </li>
          <li class="mainHomePage__item">
            <a href="" class="mainHomePage__link">Nazwa artykułu</a>
          </li>
          <li class="mainHomePage__item">
            <a href="" class="mainHomePage__link">Nazwa artykułu</a>
          </li>
          <li class="mainHomePage__item">
            <a href="" class="mainHomePage__link">Nazwa artykułu</a>
          </li>
          <li class="mainHomePage__item">
            <a href="" class="mainHomePage__link">Nazwa artykułu</a>
          </li>
          <li class="mainHomePage__item">
            <a href="" class="mainHomePage__link">Nazwa artykułu</a>
          </li>
        </ul>
        <img src="/public/img/homePage-cook.svg" alt="" class="mainHomePage__illustration" />
    `;
    mainHomePageArticles.innerHTML = html;
  } else {
    return;
  }
};

changeContent(mediaQuery);

mediaQuery.addEventListener('change', changeContent);

const getLatestDishes = async function () {
  try {
    const res = await fetch(
      `http://127.0.0.1:4000/api/v1/recipes?fields=name,_id,image&page=0&limit=8&sort=-date`
    );
    const { data } = await res.json();

    mainHomePageLatestdishes.innerHTML = '';

    data.recipes.forEach((recipe) => {
      const cardHtml = `
     <div class="dishCard mainHomePage__dishCard">
            <img
              src="${recipe.image}"
              alt="${recipe.name}"
              class="dishCard__img mainHomePage__dishCard-img"
            />
  
            <button class="favouriteBtn">
              <span class="fas fa-heart favouriteBtn__icon"></span>
            </button>
            <h3 class="dishCard__title mainHomePage__dishCard-title">${recipe.name}</h3>
            <button class="btn btn--orange"><a href="${recipe._id}" class="btn__link">Sprawdź</a></button>
          </div>
    `;
      mainHomePageLatestdishes.innerHTML += cardHtml;
      // mainHomePageLatestdishes.insertAdjacentHTML('afterbegin', cardHtml);
    });
  } catch (err) {
    console.log(err.message);
  }

  mainHomePageLatestdishes.innerHTML += ` <button class="btn btn--orange mainHomePage__btn">
          <a class="btn__link" href="">Sprawdź więcej przepisów</a>
        </button>`;
};
getLatestDishes();

// CAROUSEL
const getCarousel = async function () {
  try {
    const res = await fetch(
      `http://127.0.0.1:4000/api/v1/recipes?fields=_id,image&page=0&limit=5&sort=date`
    );
    const { data } = await res.json();

    data.recipes.forEach((recipe) => {
      const html = `
      <div class="slide headerHomePage__slide">
        <img src="${recipe.image}" alt="${recipe.name}" class="slide__img" />
      </div>
      `;

      headerHomePageSlick.innerHTML += html;
    });
  } catch (err) {
    err.message;
  }
};

getCarousel();
