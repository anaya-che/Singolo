// MENU

const MENU = document.getElementById('header-menu');
const sections = document.querySelectorAll('main>section');
const links = document.querySelectorAll('a.nav-header__link');

document.addEventListener('scroll', onScroll);

function onScroll() {
    const curPos = window.scrollY;
    const pageEnd = document.documentElement.offsetHeight;
    const totalHeight = window.scrollY + window.innerHeight;
    const docWidth = document.body.clientWidth;
       
    sections.forEach((el) => {
        if (docWidth >= 768) {
            if (el.offsetTop <= curPos + 95 || totalHeight >= pageEnd) {
                links.forEach((a) => {
                    a.classList.remove('active');
                    if (el.getAttribute('id') === a.getAttribute("href").substring(1)) {
                    a.classList.add('active');
                    } 
                }) 
            } if (window.scrollY === 0 || el.getAttribute('id') === 'slider') {
                links[0].classList.add('active');
            }
        }

        if (docWidth < 768) {
            if (el.offsetTop <= curPos + 71 || totalHeight >= pageEnd) {
                links.forEach((a) => {
                    a.classList.remove('active');
                    if (el.getAttribute('id') === a.getAttribute("href").substring(1)) {
                    a.classList.add('active');
                    } 
                }) 
            } if (window.scrollY === 0 || el.getAttribute('id') === 'slider') {
                links[0].classList.add('active');
            }
        }
    });
}

const burger = document.getElementById('burger_btn');
const burger_label = document.querySelector('.burger');
burger_label.addEventListener("click", openMenu);
MENU.addEventListener("click", closeMenu);

function openMenu() {
    if (burger.hasAttribute('checked')) {
        burger.removeAttribute('checked');
    }
    else {burger.setAttribute('checked', '');}
    
}

function closeMenu() {
    if (burger.hasAttribute('checked')) {
        burger.removeAttribute('checked');
    }  
}

// SLIDER

const SLIDER = document.querySelector('.slider-container');
const PREV_PAGE = document.getElementById('prev_page');
const NEXT_PAGE = document.getElementById('next_page');
let items = document.querySelectorAll('.slider__page');
let currentItem = 0;
let isEnabled = true;

function changeCurrItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    })
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrItem(n - 1);
    showItem('from-left');
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrItem(n + 1);
    showItem('from-right');
}

document.getElementById('prev_page').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem);
    }
});

document.getElementById('next_page').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem);
    }
});

// PHONES

const PHONE_1 = document.getElementById('phone1');
const PHONE_2 = document.getElementById('phone2');
const DISPLAY_1 = document.getElementById('wallpaper1');
const DISPLAY_2 = document.getElementById('wallpaper2');

PHONE_1.addEventListener("click", turnOffPhone1);
PHONE_2.addEventListener("click", turnOffPhone2);

function turnOffPhone1() {
    if (DISPLAY_1.classList.contains('hidden')) {
        DISPLAY_1.classList.remove('hidden');
    }
    else {
        DISPLAY_1.classList.add('hidden');
    }
}

function turnOffPhone2() {
    if (DISPLAY_2.classList.contains('hidden')) {
        DISPLAY_2.classList.remove('hidden');
    }
    else {
        DISPLAY_2.classList.add('hidden');
    }
}

// PORTFOLIO

const PORTFOLIO = document.getElementById('portfolio-images');
const TAB = document.getElementById('portfolio-list');
const TAB_LINKS = document.querySelectorAll('a.nav-portfolio__link');
const ALL = document.getElementById('all');
const WEB = document.getElementById('web');
const GRAPHIC = document.getElementById('graphic');
const ARTWORK = document.getElementById('artwork');


TAB.addEventListener('click', (event) => {
    TAB_LINKS.forEach(el => el.classList.remove('active-tab'));
    event.target.classList.add('active-tab');
});

PORTFOLIO.addEventListener('click', (event) => {
    PORTFOLIO.querySelectorAll('img').forEach(el => el.classList.remove('active-img'));
    event.target.classList.add('active-img');
});

ALL.addEventListener('click', changeOrder);
WEB.addEventListener('click', changeOrder);
GRAPHIC.addEventListener('click', changeOrder);
ARTWORK.addEventListener('click', changeOrder);

let n = 1;
let IMAGES = [];
document.querySelectorAll('.images-portfolio__item').forEach((el) => IMAGES.push(el));

function changeOrder() {
    let IMAGES2 = IMAGES.map((el, i, arr) => el = arr[((i + n + arr.length) % arr.length)]);
    n++;
    PORTFOLIO.innerHTML = '';
    IMAGES2.forEach((el, i, arr) => PORTFOLIO.append(arr[i]));
}

// FORM

const BUTTON = document.getElementById('btn');
const CLOSE_BUTTON = document.getElementById('close-btn');

BUTTON.addEventListener('click', (event) => {
    const form = document.getElementById('form');
    if (form.checkValidity()) {
        event.preventDefault()
        const subject = document.getElementById('subject').value.toString();
        const description = document.getElementById('description').value.toString();
        if (subject !== '') {
            document.getElementById('subject-result').innerText = 'Subject: ' + subject;
        } else document.getElementById('subject-result').innerText = 'No subject';
        if (description !== '') {
            document.getElementById('description-result').innerText = 'Description: ' + description;
        } else document.getElementById('description-result').innerText = 'No description';
        document.getElementById('message-block').classList.remove('hidden');
        form.reset();
    }
});

CLOSE_BUTTON.addEventListener('click', () => {
    const subject = document.getElementById('subject').value.toString();
    document.getElementById('subject-result').innerText = '';
    document.getElementById('message-block').classList.add('hidden');
});
