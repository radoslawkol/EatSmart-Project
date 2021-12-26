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

    // Put data to the HTML
    document.title = `${article.title} - Smakuj Zdrowo`;
    document
      .querySelector('meta[property="og:title"]')
      .setAttribute('content', `${article.title} - Smakuj Zdrowo`);
    headerImg.setAttribute('src', article.headerImg);
    headerImg.setAttribute('alt', article.headerImgAlt);
    headerHeading.textContent = article.title;
    date.textContent = ` ${new Date(article.date).getDate()}.${
      new Date(article.date).getMonth() + 1
    }.${new Date(article.date).getFullYear()}`;
    author.textContent += article.author;

    textContainer.innerHTML = article.descriptionHTML;
  } catch (err) {
    console.error(err.message);
  }
};
fetchData();
