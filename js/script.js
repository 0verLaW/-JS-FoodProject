window.addEventListener('DOMContentLoaded', () => {
    
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    
    const hideTabContent = () => {
        tabsContent.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    const showTabContent = (i = 0) => {
        tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('fade');
        tabs[i].classList.add('tabheader__item_active');
    };


    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', event => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    //Timer
    const deadline = '2022-09-16';
    //const deadline = new Date(2022, 05, 04, 14, 35);

    function getTimeRemaining(endTime) {
        const t = new Date(endTime) - new Date();

        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((t / (1000 * 60)) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    const addZero = (num) => {
        if (String(num).length == 1) return '0' + String(num);
        else return num;
    };

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            
            const t = getTimeRemaining(endtime);
            
            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                return;
            }
            

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            
        }
    }

    setClock('.timer', deadline);

    // //Modal
    // const modalOpenBtns = document.querySelectorAll('[data-modal-open]');
    // const modalCloseBtn = document.querySelector('[data-modal-close]');
    // const modal = document.querySelector('.modal');
    
    // function openModal() {
    //     modal.style.display = 'block';
    //     document.body.style.overflow = 'hidden';
    //     clearInterval(modalTimer);
    // }

    // const closeModal = () => { 
    //     modal.style.display = 'none';
    //     document.body.style.overflow = '';
    // };

    // modalOpenBtns.forEach(item => {
    //     item.addEventListener('click', openModal);
    // });

    // modalCloseBtn.addEventListener('click', closeModal);


    // modal.addEventListener('click', (event) => {
    //     if (event.target === modal) {
    //         closeModal();
    //     }
    // });

    // document.addEventListener('keydown', e => {
    //     if (e.code === 'Escape' && modal.style.display === 'block') {
    //         closeModal();
    //     }
    // });

    // const modalTimer = setTimeout(openModal, 3000);

    // const openModalByScroll = () => {
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    //         window.removeEventListener('scroll', openModalByScroll);
    //         openModal();
    //     }
    // };

    // window.addEventListener('scroll', openModalByScroll);

    
    //Card Class

    class Card {
        constructor(imgSrc, alt, subtitle, descr, price, parentSelector, ...classes) {
            this.imgSrc = imgSrc;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        
        render() {
            let element = document.createElement('div');

            if (this.classes.length) {
                this.classes.forEach(item => {
                    element.classList.add(item);
                });
            } else {
                element.classList.add('menu__item');
            }

            element.innerHTML = `
                    <img src="${this.imgSrc}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
            this.parent.append(element);
        }
    }

    new Card('img/tabs/vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229, '.menu .container').render();

    new Card('img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550, '.menu .container').render();

    new Card('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 430, '.menu .container').render();




});

