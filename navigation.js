// NAVIAGTION
const navItem = document.querySelectorAll('.nav__item--arrow');
const navIcon = document.querySelector('.nav__icon');
const navMenu = document.querySelector('.nav__menu');

navItem.forEach((item) =>
  item.addEventListener('click', function (e) {
    e.preventDefault();
    let clicked = e.target.closest('.nav__item--arrow');
    clicked.classList.toggle('show');

    if (clicked.classList.contains('show')) {
      clicked.children[1].style.transform = `rotate(180deg)`;
    } else {
      clicked.children[1].style.transform = `rotate(0deg)`;
    }
  })
);

navIcon.addEventListener('click', (e) => {
  if (navIcon.classList.contains('open')) {
    navMenu.classList.remove('open');
    navIcon.innerHTML = `<span class="fas fa-bars"></span>`;
  } else {
    navMenu.classList.add('open');
    navIcon.innerHTML = `<span class="fas fa-times"></span>`;
  }
  navIcon.classList.toggle('open');
});
