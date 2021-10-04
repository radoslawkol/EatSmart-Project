const faqIcon = document.querySelectorAll('.faq__icon');
const accordions = document.querySelectorAll('.faq__accordion');

accordions.forEach((a) =>
  a.addEventListener('click', function (e) {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      this.lastElementChild.innerHTML = `<i class="fas fa-chevron-down"></i>`;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      this.lastElementChild.innerHTML = `<i class="fas fa-chevron-up"></i>`;
    }
  })
);
