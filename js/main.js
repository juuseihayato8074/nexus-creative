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

const contactForm = document.getElementById(`contactForm`);

contactForm.addEventListener(`submit`, function (e) {
  e.preventDefault();

  const name = contactForm.querySelector(`input[name="name"]`);
  const email = contactForm.querySelector(`input[name="email"]`);
  const message = contactForm.querySelector(`textarea[name="message"]`);

  const nameError = document.getElementById(`nameError`);
  const emailError = document.getElementById(`emailError`);
  const messageError = document.getElementById(`messageError`);

  [nameError, emailError, messageError].forEach((el) => {
    el.textContent = ``;
    el.style.display = `none`;
  });

  let isValid = true;

  if (name.value.trim() === ``) {
    nameError.textContent = `お名前を入力してください`;
    nameError.style.display = `block`;
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === ``) {
    emailError.textContent = `メールアドレスを入力してください`;
    emailError.style.display = `block`;
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = `正しいメールアドレスを入力してください`;
    emailError.style.display = `block`;
    isValid = false;
  }

  if (message.value.trim() === ``) {
    messageError.textContent = `お問い合わせ内容を入力してください`;
    messageError.style.display = `block`;
    isValid = false;
  }

  if (isValid) {
    alert(`送信が完了しました。お問い合わせありがとうございます。`);
    contactForm.reset();
  }
});
