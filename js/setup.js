var container = document.querySelector('.container');
var buttonStart = document.querySelector('.button-start');
var cards = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','20',
'21','22','23','24','25','26','27'];
var card;
var page1 = document.querySelector('.page1');
var gameZone = document.querySelector('.game-zone');

buttonStart.addEventListener('click',function() {
    var page2 = document.querySelector('.page2');
    page2.classList.remove('visually-hidden');
    page1.remove();
    gameZone.appendChild(page2);
});

var replay = document.querySelector('.replay');

var page3 = document.querySelector('.page3');
var page2 = document.querySelector('.page2');
var buttonReplay = document.querySelector('.button-replay');
var contrast = [];
var stop = false;
var count = 9;
var pointsHTML = document.querySelector('.points');
var points = 0;
var playingField = document.querySelector('.playing-field');
var newCards = preparingCards(cards);
var musicC = 0;
var ok = 1;
var musicok = new Audio();

addCards(newCards, playingField);

var cardsArr = document.querySelectorAll('.card');

screening(cardsArr); /*демонстрируем лицо карт на 5 секунд*/

for (i = 0; i < cardsArr.length; i++) { cardsArr[i].addEventListener('click', action) } /*добавляем картам обработчик */

replay.addEventListener('click', function () {  /*обработчик кнопки "повторить" */
    var oldCards = document.querySelectorAll('.card');
        for (i = 0; i < oldCards.length; i++) {
            oldCards[i].remove();
        }
    var newCards = preparingCards(cards);
    contrast = [];
    stop = false;
    count = 9;
    points = 0;
    pointsHTML.innerText = points;
    addCards(newCards, playingField);

    var cardsArr = document.querySelectorAll('.card');

    screening(cardsArr);

    for (i = 0; i < cardsArr.length; i++) cardsArr[i].addEventListener('click', action);
});

function preparingCards(arr) {   /* перемешиваем и подготавливаем карты */
    arr.sort(shuffle);
    arr = arr.slice(0, -17);
    var clone = arr.slice(0);
    arr = arr.concat(clone);
    arr.sort(shuffle);
    return arr;
}

function shuffle(a, b){
    return Math.random() - 0.5;
}

function addCards (arr, place) {                /* добавляем карты на экран лицом вверх */
    for (var i = 0; i < arr.length; i++) {
        card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(arr[i]);
        card.dataset.tid = 'Card';
        card.style.cssText = "background-size: contain; \
        background-image: url(img/cards/" + card.classList[1] + ".jpg" + ")";
        place.appendChild(card);
    }
}

function screening (arr) {                     /* демонстрируем карты и переворачиваем рубашкой вверх */
    (setTimeout(function() {
        for (var i = 0; i < arr.length; i++) {
            arr[i].dataset.condition = 'shirt';
            arr[i].removeAttribute('style');
        }
    }, 5000));
}

function action() {  /* обработчик для карт */
    if ((this.dataset.condition == 'shirt') && (stop == false)) {

        var audio = new Audio();
        audio.src = 'click.mp3';
        audio.autoplay = true;


        this.style.cssText = "background-size: contain; \
            background-image: url(img/cards/" + this.classList[1] + ".jpg" + ")";
        this.dataset.condition = 'face';
        this.dataset.tid = 'Card-flipped'

        contrast.push(this);

        if (contrast.length == 2) {
            buttonReplay = check(contrast);
            contrast = [];
        }
    }
}

function check (arr) {   /* проверяем пару открытых карт */
    stop = true;
    setTimeout(function () {
        var cardClass1 = arr[0].classList[1];
        var cardClass2 = arr[1].classList[1];
        if (cardClass1 == cardClass2) {
            arr[0].classList.add('pair');
            arr[1].classList.add('pair');
            count -= 1;
            points += count * 42;
            pointsHTML.innerText = points;

            if (ok == 1) {
                musicok.src = 'ok1.mp3';
                musicok.autoplay = true;
            }

            if (ok == 2) {
                musicok.src = 'ok2.mp3';
                musicok.autoplay = true;
                ok = 1;
            }

            ok++;

            if (count == 0) {
                page3.classList.remove('visually-hidden');
                page2.classList.add('visually-hidden');
                gameZone.appendChild(page3);
                var result = document.querySelector('.result');
                result.innerHTML = points;
            }
        } else {
            arr[0].style.cssText = 'background-image: url("img/back.jpg")';
            arr[1].style.cssText = 'background-image: url("img/back.jpg")';
            arr[0].dataset.condition = 'shirt';
            arr[1].dataset.condition = 'shirt';

            if (musicC == 0) {
                var music1 = new Audio();
                music1.src = '0.mp3';
                music1.autoplay = true;

            }

            if (musicC == 1) {
                music1 = new Audio();
                music1.src = '1.mp3';
                music1.autoplay = true;

            }

            if (musicC == 2) {
                music1 = new Audio();
                music1.src = '2.mp3';
                music1.autoplay = true;

            }

            if (musicC == 3) {
                music1 = new Audio();
                music1.src = '3.mp3';
                music1.autoplay = true;

            }

            if (musicC == 4) {
                var music1 = new Audio();
                music1.src = '4.mp3';
                music1.autoplay = true;

            }

            if (musicC == 5) {
                musicC = 0;
            } else {
                musicC++;
            }



        }
        stop = false;
    }, 600);
}



buttonReplay.addEventListener('click', function () {  /*обработчик кнопки "повторить" */
    page3.classList.add('visually-hidden');
    page2.classList.remove('visually-hidden');
    var oldCards = document.querySelectorAll('.card');
    for (i = 0; i < oldCards.length; i++) {
        oldCards[i].remove();
    }
    var newCards = preparingCards(cards);
    contrast = [];
    stop = false;
    count = 9;
    points = 0;
    pointsHTML.innerText = points;
    addCards(newCards, playingField);

    var cardsArr = document.querySelectorAll('.card');

    screening(cardsArr);

    for (i = 0; i < cardsArr.length; i++) cardsArr[i].addEventListener('click', action);
});






