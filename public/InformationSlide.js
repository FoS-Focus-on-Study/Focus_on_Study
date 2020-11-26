const slideButtonPrev = document.querySelector(
  '.siteInformationBox .slideBox button.prev',
);
slideButtonNext = document.querySelector(
  '.siteInformationBox .slideBox button.next',
);
firstSlide = document.querySelector(
  '.siteInformationBox .slideBox .slideImages img:first-child',
);
lastSlide = document.querySelector(
  '.siteInformationBox .slideBox .slideImages img:last-child',
);

const SHOWING_CLASS = 'showing';

function movePrevEvent() {
  // slideBox.style.backgroundImage = "url('./images/slideImage3.jpg')"
  const currentSlide = document.querySelector(
    '.siteInformationBox .slideImages img.showing',
  );

  if (currentSlide) {
    currentSlide.classList.remove(SHOWING_CLASS);
    const prevSlide = currentSlide.previousElementSibling;
    if (prevSlide) {
      prevSlide.classList.add(SHOWING_CLASS);
    } else {
      lastSlide.classList.add(SHOWING_CLASS);
    }
  }
}

function moveNextEvent() {
  // slideBox.style.backgroundImage = "url('./images/slideImage2.jpg')"
  const currentSlide = document.querySelector(
    '.siteInformationBox .slideImages img.showing',
  );
  if (currentSlide) {
    currentSlide.classList.remove(SHOWING_CLASS);
    const nextSlide = currentSlide.nextElementSibling;
    if (nextSlide) {
      nextSlide.classList.add(SHOWING_CLASS);
    } else {
      firstSlide.classList.add(SHOWING_CLASS);
    }
  } else {
    firstSlide.classList.add(SHOWING_CLASS);
  }
}

slideButtonPrev.onclick = movePrevEvent;
slideButtonNext.onclick = moveNextEvent;
