const articlesContainer = document.querySelector('.articlesPageMain__articlesSection-container');

const renderArticles = function (articles) {
  articles.forEach((article) => {
    const html = `
          <div class="articleCard">
          <a href="/artykuly/${article._id}" class="articleCard__link">
            <img src="${article.headerImg}" loading="lazy" alt="Obrazek o tytule: ${article.title}" class="articleCard__img" />
            <h3 class="articleCard__title">${article.title}</h3>
            <p class="articleCard__text">
            ${article.description}
            </p>
            <button class="articleCard__btn btn btn--orange">
              <a href="/articles/${article._id}" class="btn__link">Czytaj więcej</a>
            </button>
          </div>`;
    articlesContainer.insertAdjacentHTML('afterbegin', html);
  });
};

const fetchArticles = async function () {
  const res = await fetch(`https://guarded-reaches-99642.herokuapp.com/api/v1/articles?sort=date`);
  const { data } = await res.json();
  const { articles } = data;

  renderArticles(articles);
};

fetchArticles();
