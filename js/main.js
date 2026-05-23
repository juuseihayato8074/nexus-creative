const hamburger = document.querySelector(`.hamburger`);
const nav = document.querySelector(`.header__nav`);

hamburger.addEventListener(`click`, function () {
  nav.classList.toggle(`active`);
});

const navLinks = document.querySelectorAll(`.nav__links a`);

navLinks.forEach(function (link) {
  link.addEventListener(`click`, function () {
    nav.classList.remove(`active`);
  });
});

const swiper = new Swiper(".hero__swiper", {
  loop: false,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const tabBtns = document.querySelectorAll(`.tab__btn`);
const tabContents = document.querySelectorAll(`.tab__content`);

tabBtns.forEach(function (btn) {
  btn.addEventListener(`click`, function () {
    const target = this.dataset.tab;

    tabBtns.forEach((b) => b.classList.remove(`active`));
    tabContents.forEach((c) => c.classList.remove(`active`));

    this.classList.add(`active`);
    document.getElementById(target).classList.add(`active`);
  });
});

const questions = document.querySelectorAll(`.faq__question`);

questions.forEach(function (question) {
  question.addEventListener(`click`, function () {
    const answer = this.nextElementSibling;
    answer.classList.toggle(`active`);
  });
});

const animateElements = document.querySelectorAll(`.animate`);

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add(`visible`);
        entry.target.addEventListener(
          `transitionend`,
          function () {
            entry.target.classList.remove(`animate`);
          },
          { once: true }
        );
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

animateElements.forEach(function (el) {
  observer.observe(el);
});
