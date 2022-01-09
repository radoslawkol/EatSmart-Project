'use strict';

const headerImg = document.querySelector('.headerArticle__img');
const headerHeading = document.querySelector('.headerArticle__heading');
const date = document.querySelector('.mainArticle__date');
const author = document.querySelector('.mainArticle__author');
const textContainer = document.querySelector('.mainArticle__container');

const fetchData = async function () {
  try {
    const url = location.pathname.split('/');
    const id = url[url.length - 1];
    const res = await fetch(`https://smakujzdrowo.pl/api/v1/articles/${id}`);
    const { data } = await res.json();

    const { article } = data;
    console.log(article)

    // Put data to the HTML
    document.title = `${article[0].title} - Smakuj Zdrowo`;
    document
      .querySelector('meta[property="og:title"]')
      .setAttribute('content', `${article[0].title} - Smakuj Zdrowo`);
    headerImg.setAttribute('src', article[0].headerImg);
    headerImg.setAttribute('alt', article[0].headerImgAlt);
    headerHeading.textContent = article[0].title;
    date.textContent = ` ${new Date(article[0].date).getDate()}.${
      new Date(article[0].date).getMonth() + 1
    }.${new Date(article[0].date).getFullYear()}`;
    author.textContent += article[0].author;

    textContainer.innerHTML = article[0].descriptionHTML;
  } catch (err) {
    console.error(err.message);
  }
};
fetchData();
