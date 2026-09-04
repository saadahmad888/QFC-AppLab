// Home page resource center and About us page useful links slider js starts here

const swiper = new Swiper('.cardSwiper', {
    slidesPerView: 'auto',
    centeredSlides: false,
    spaceBetween: 20,
    loop: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
});

// Home page resource center About us page useful links slider js ends here

// About us page Awards and recoginition slider js starts here

var imageswiper = new Swiper('.imageSwiper', {
    slidesPerView: 'auto',
    centeredSlides: false,
    spaceBetween: 20,
    loop: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

// About us page Awards and recoginition slider js ends here


// About us page Explore slider js starts here

var exploreswiper = new Swiper("#explore-slider", {
    slidesPerView: 1,
    loop: true,
    effect: "cards",
    grabCursor: true,
    speed: 700,
    // allowTouchMove: false,
    direction: "vertical",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    cardsEffect: {
        rotate: 0,
        perSlideRotate: 0,
        perSlideOffset: 10,
    }
});
// About us page Explore slider js ends here


//Generalized slick initializer function for all slick sliders
function initSlickSlider(selector, options = {}, hasStackEffect = false) {
    const defaultOptions = {
        rtl: $("html").attr("dir") === "rtl",
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        speed: 600,
    };

    const finalOptions = { ...defaultOptions, ...options };

    const $slider = $(selector).slick(finalOptions);

    if (hasStackEffect) {
        $slider.on('beforeChange', () => {
            removeSlickClasses($slider);
            setTimeout(() => addSlickClasses($slider), 10);
        });

        $(document).ready(() => addSlickClasses($slider));
    }

    return $slider;
}

function removeSlickClasses($slider) {
    $slider.find('.slick-slide').removeClass('slick-slide-prev slick-slide-next');
}

function addSlickClasses($slider) {
    const $current = $slider.find('.slick-current');
    $current.nextAll().addClass('slick-slide-next');
    $current.prevAll().addClass('slick-slide-prev');
}

// Home page Sectors slider js starts here

initSlickSlider('#sector-slider', {
    autoplay: false,
    dots: true,
    slidesToShow: 1
});

// Home page Sectors slider js ends here


// About us page Set up business slider js starts here

initSlickSlider('#setup-slider', {
    slidesToShow: 1,
    autoplay: true,
    arrows: false,
    speed: 500
});

// About us page Set up business slider js ends here

// Hide empty elements
document.querySelectorAll('.flex-auto').forEach(el => {
    if (!el.innerHTML.trim()) {
        el.style.display = 'none';
    }
});
// End hide empty elements

