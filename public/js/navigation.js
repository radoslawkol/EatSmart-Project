// window.addEventListener('DOMContentLoaded', () => {
//   const navItem = document.querySelectorAll('.nav__item--arrow');
//   const navIcon = document.querySelector('.nav__icon');
//   const navMenu = document.querySelector('.nav__menu');
//   const nav = document.querySelector('.nav');

//   let mediaQuery = window.matchMedia('(max-width: 840px)');

//   const matchFuntion = function (size) {
//     if (size.matches) {
//       navItem.forEach((item) =>
//         item.addEventListener('click', function (e) {
//           // e.preventDefault();
//           let clicked = e.target.closest('.nav__item--arrow');
//           clicked.classList.toggle('show');

//           if (clicked.classList.contains('show')) {
//             clicked.children[1].style.transform = `rotate(180deg)`;
//           } else {
//             clicked.children[1].style.transform = `rotate(0deg)`;
//           }
//         })
//       );

//       navIcon.addEventListener('click', (e) => {
//         if (navIcon.classList.contains('open')) {
//           navMenu.classList.remove('open');
//           nav.style.height = '5rem';
//           navIcon.innerHTML = `<span class="fas fa-bars"></span>`;
//         } else {
//           navMenu.classList.add('open');
//           nav.style.height = 'auto';
//           navIcon.innerHTML = `<span class="fas fa-times"></span>`;
//         }
//         navIcon.classList.toggle('open');
//       });
//     }
//   };

//   matchFuntion(mediaQuery);
//   mediaQuery.addEventListener('change', matchFuntion);
// });
