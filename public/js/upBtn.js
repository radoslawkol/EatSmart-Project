'use strict';

const aboutMain = document.querySelector('main');
const upBtn = document.querySelector('.goUpBtn');

const observeUpBtn = function (entries) {
  let shown = false;
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      shown = !shown;
      upBtn.style.display = 'block';
    }

    if (!shown) {
      upBtn.style.display = 'none';
    }
  });
};
const options = {
  root: null,
  threshold: 0.05,
};
let observer = new IntersectionObserver(observeUpBtn, options);

observer.observe(aboutMain);
