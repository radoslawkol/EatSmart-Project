// HOME PAGE

const mainHomePageArticles = document.querySelector('.mainHomePage__articles');

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
        <img src="/img/homePage-cook.svg" alt="" class="mainHomePage__illustration" />
    `;
    mainHomePageArticles.innerHTML = html;
  } else {
    return;
  }
};

changeContent(mediaQuery);

mediaQuery.addEventListener('change', changeContent);
