// News slider js starts here

const newsSwiperEl = document.querySelector('#newsSwiper');
if (newsSwiperEl) {
    const newsSwiper = new Swiper('#newsSwiper', {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 0,
        loop: false,
        pagination: {
            el: newsSwiperEl.querySelector('.swiper-pagination'),
            clickable: true
        },
    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 0
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 0
        },
        524: {
            slidesPerView: 1,
            spaceBetween: 0
        },
    }
    });
}

// News slider js ends here

// events slider js starts here

const eventSwiperEl = document.querySelector('#eventsSwiper');
if (eventSwiperEl) {
    const eventSwiper = new Swiper('#eventsSwiper', {
        slidesPerView: 4,
        centeredSlides: false,
        spaceBetween: 0,
        loop: false,
        pagination: {
            el: eventSwiperEl.querySelector('.swiper-pagination'),
            clickable: true
        },
    breakpoints: {
        1200: {
            slidesPerView: 4,
            spaceBetween: 0
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        524: {
            slidesPerView: 1,
            spaceBetween: 0
        },
    }
    });
}

// events slider js ends here

// newsletter slider js starts here

const newsletterSwiperEl = document.querySelector('#newsLetterSwiper');
if (newsletterSwiperEl) {
    const newsletterSwiper = new Swiper('#newsLetterSwiper', {
        slidesPerView: 4,
        centeredSlides: false,
        spaceBetween: 24,
        loop: false,
        pagination: {
            el: newsletterSwiperEl.querySelector('.swiper-pagination'),
            clickable: true
        },
    breakpoints: {
        1200: {
            slidesPerView: 4,
            spaceBetween: 24
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        524: {
            slidesPerView: 1,
            spaceBetween: 0
        },
    }
    });
}

// newsletter slider js ends here

// Blog slider js starts here

const blogSwiperEl = document.querySelector('#blogSwiper');
if (blogSwiperEl) {
    const blogSwiper = new Swiper('#blogSwiper', {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 24,
        loop: false,
        pagination: {
            el: blogSwiperEl.querySelector('.swiper-pagination'),
            clickable: true
        },
    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 24
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        524: {
            slidesPerView: 1,
            spaceBetween: 0
        },
    }
    });
}

// Blog slider js ends here
