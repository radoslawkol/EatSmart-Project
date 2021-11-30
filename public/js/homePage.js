// HOME PAGE

const mainHomePageLatestdishes = document.querySelector('.mainHomePage__latestdishes');
const mainHomePageArticles = document.querySelector('.mainHomePage__articles');
const headerHomePageSlick = document.querySelector('.headerHomePage__slick');
const mainHomePageSlick = document.querySelector('.mainHomePage__slick');

const mediaQueryNav = window.matchMedia('(min-width: 992px)');

const fetchArticles = async (isCarousel) => {
  try {
    const res = await fetch(
      `https://guarded-reaches-99642.herokuapp.com/api/v1/articles?sort=-date&&fields=title,_id`
    );
    const { data } = await res.json();

    // if (isCarousel) return data;
    let articlesElementsHtml = '';
    data.articles.forEach((article) => {
      const articleHtml = ` <li class="mainHomePage__item">
              <a href="/artykuly/${article._id}" class="mainHomePage__link">${article.title}</a>
            </li>`;
      articlesElementsHtml += articleHtml;
    });

    return articlesElementsHtml;
  } catch (err) {
    console.log(err.message);
  }
};

const changeContent = async function (size) {
  try {
    if (size.matches) {
      const elements = await fetchArticles();
      const html = `
        <h2 class="mainHomePage__title">Najnowsze artykuły</h2>
            <ul class="mainHomePage__list">
              ${elements}
            </ul>
            <img src="/public/img/homePage-cook.svg" alt="Ilustracja przedstawiająca kucharza" class="mainHomePage__illustration" />
        `;
      mainHomePageArticles.innerHTML = html;
    } else {
      return;
    }
  } catch (err) {
    console.log(err.message);
  }
};

changeContent(mediaQueryNav);

mediaQueryNav.addEventListener('change', changeContent);

const getLatestDishes = async function () {
  try {
    const res = await fetch(
      `https://guarded-reaches-99642.herokuapp.com/api/v1/recipes?fields=name,_id,image&page=0&limit=8&sort=-date`
    );
    const { data } = await res.json();

    mainHomePageLatestdishes.innerHTML = '';

    data.recipes.forEach((recipe) => {
      const cardHtml = `
     <div class="dishCard mainHomePage__dishCard" data-id="${recipe._id}">
            <img
              src="${recipe.image}"
              alt="${recipe.name}"
              class="dishCard__img mainHomePage__dishCard-img"
            />
  
            <button class="favouriteBtn">
              <span class="fas fa-heart favouriteBtn__icon"></span>
            </button>
            <h3 class="dishCard__title mainHomePage__dishCard-title">${recipe.name}</h3>
            <button class="btn btn--orange"><a href="przepisy/${recipe._id}" class="btn__link">Sprawdź</a></button>
          </div>
    `;
      mainHomePageLatestdishes.innerHTML += cardHtml;
    });
  } catch (err) {
    console.log(err.message);
  }

  mainHomePageLatestdishes.innerHTML += ` <button class="btn btn--orange mainHomePage__btn">
          <a class="btn__link" href="/przepisy">Sprawdź więcej przepisów</a>
        </button>`;
};
getLatestDishes();
listenToEvent();

// CAROUSEL
const getCarousel = async function () {
  try {
    const res = await fetch(
      `https://guarded-reaches-99642.herokuapp.com/api/v1/recipes?fields=_id,image&page=0&limit=5&sort=date`
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

function listenToEvent() {
  mainHomePageLatestdishes.addEventListener('click', function (e) {
    const card = e.target.closest('.mainHomePage__dishCard');
    if (card) {
      window.location.pathname = `przepisy/${card.dataset.id}`;
    } else {
      return;
    }
  });
}
