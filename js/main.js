let slidesItem = document.querySelectorAll('.slide__item');
let indContainer = document.querySelector('.indicators');
let indItems = document.querySelectorAll('.indicator__item');
let btnPausePlay = document.querySelector('#pause-play');
let btnPrev = document.querySelector('#prev');
let btnNext = document.querySelector('#next');
let currentSlide = 0;
let playStatus = true;
let timerId = null;
let timerInterval = 2000;

const FA_PAUSE = '<i class="fas fa-pause"></i>';
const FA_PLAY = '<i class="fas fa-play"></i>';
const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';

let goToSlide = (n) => {
    slidesItem[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
    currentSlide = (n + slidesItem.length) % slidesItem.length;
    slidesItem[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
};

let goToNextSlide = () => {
    goToSlide(currentSlide + 1);
};

let goToPrevSlide = () => {
    goToSlide(currentSlide - 1);
};

let startSlider = () => { timerId = setInterval(goToNextSlide, timerInterval); };

let pauseSlideShow = () => {
    btnPausePlay.innerHTML = FA_PLAY;
    playStatus = false; 
    clearInterval(timerId);
};

let playSlideShow = () => {
    btnPausePlay.innerHTML = FA_PAUSE;
    playStatus = true;
    startSlider();
};

let pausePlaySlideShow = () => playStatus ? pauseSlideShow() : playSlideShow();

let clickPrevBtn = () => {
    pauseSlideShow();
    goToPrevSlide();
};

let clickNextBtn = () => {
    pauseSlideShow();
    goToNextSlide();
};

btnPausePlay.addEventListener('click', pausePlaySlideShow);
btnPrev.addEventListener('click', clickPrevBtn);
btnNext.addEventListener('click', clickNextBtn);

startSlider();

let clickIndicatorItem = (e) => {
    let target = e.target;

    if (target.classList.contains('indicator__item')) {
        pauseSlideShow();
        goToSlide(+target.getAttribute('data-slide-to'));
    }
};

indContainer.addEventListener('click', clickIndicatorItem);

let keyControlsBtn = (e) => {
    if (e.key === SPACE) pausePlaySlideShow();
    if (e.key === LEFT_ARROW) clickPrevBtn();
    if (e.key === RIGHT_ARROW) clickNextBtn();
};

document.addEventListener('keydown', keyControlsBtn);

let controls = document.querySelectorAll('.controls');
for(let i=0; i<controls.length; i++){
controls[i].style.display = 'block';
}
