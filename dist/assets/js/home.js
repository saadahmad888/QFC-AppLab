

// Home page testimonial slider js starts here

$('#testimonial-slider').slick({
  rtl: $("html").attr("dir") == "rtl",
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  slidesToShow: 1,
  speed: 700,
  fade: true,
});

$("#testimonial-slider").on(
  "beforeChange",
  function (event, slick, currentSlide, nextSlide) {
    slick.$slides.removeClass('currentNext');
    slick.$slides.removeClass('currentSlideout');
    if (nextSlide < currentSlide) {
      $(slick.$slides[nextSlide]).addClass('currentNext');
      $(slick.$slides[currentSlide]).addClass('currentSlideout');
    }
  }
)

// Home page testimonial slider js ends here

// Home page number counter js - moved to custom.js


// Home page start journey slider js starts here

const largeMedia = window.matchMedia("(min-width: 1200px)");

const swiperEls = document.querySelectorAll(".card-slider");
var swipertimedelay = 5000;

if (largeMedia.matches) {
  setTimeout(() => {
    swiperEls.forEach(el => {
      el.classList.remove("pre-init");
      el.classList.remove("collapsed");
      el.classList.add("expanded");
    });
  }, 3000);

  setTimeout(() => {
    swiperEls.forEach(el => el.classList.remove("expanded"));
  }, 5000);

}
else {
  swipertimedelay = 10;
}

// setTimeout(() => {
//   swiperEl.classList.add("zoom-right");
//   slideSwiper = new Swiper("#card-slider", {
//     slidesPerView: "auto",
//     spaceBetween: 20,
//     centeredSlides: true,
//     loop: false,
//     autoplay: false,
//     direction: "horizontal",
//     rtl: true,

//     speed: 600,                 // animation duration in ms
//     slideToClickedSlide: true,  // click a slide to center it
//     simulateTouch: true,
//     grabCursor: true,
//     touchRatio: 1,
//     touchAngle: 45,
//     resistanceRatio: 0.85,      // reduce rubber-band effect
//     watchSlidesProgress: true,
//     watchSlidesVisibility: true,
//     centeredSlidesBounds: true,
//     observer: true,
//     observeParents: true,
//     updateOnWindowResize: true,

//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },

//     breakpoints: {
//       320: {
//         slidesPerView: 1,
//         spaceBetween: 20,
//       },
//       640: {
//         slidesPerView: 1,
//         spaceBetween: 20,
//       },
//       768: {
//         slidesPerView: 2,
//         spaceBetween: 20,
//       },
//       1024: {
//         slidesPerView: 3,
//         spaceBetween: 20,
//       },
//       1400: {
//         slidesPerView: 3,
//         spaceBetween: 20,
//       },
//     },
//   });
// }, swipertimedelay);


// setTimeout(() => {
//   swiperEl.classList.add("zoom-right");

//   slideSwiper = new Swiper("#card-slider", {
//     slidesPerView: "auto",
//     spaceBetween: 20,
//     centeredSlides: true,
//     centerInsufficientSlides: true, // center even if slides < container
//     loop: false,
//     autoplay: false,
//     direction: "horizontal",
//     rtl: true,

//     /* Smoothness and transition controls */
//     speed: 600,
//     slideToClickedSlide: true,
//     simulateTouch: true,
//     grabCursor: true,
//     touchRatio: 1,
//     touchAngle: 45,
//     resistanceRatio: 0.85,
//     watchSlidesProgress: true,
//     watchSlidesVisibility: true,
//     observer: true,
//     observeParents: true,
//     updateOnWindowResize: true,

//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },

//     breakpoints: {
//       320: { slidesPerView: 1, spaceBetween: 20 },
//       640: { slidesPerView: 1, spaceBetween: 20 },
//       768: { slidesPerView: 2, spaceBetween: 20 },
//       1024: { slidesPerView: 3, spaceBetween: 20 },
//       1400: { slidesPerView: 3, spaceBetween: 20 },
//     },

//     on: {
//       init() {
//         // Force a layout recalculation and ensure the centered slide is correct
//         this.update();
//         // If you want to explicitly center the middle slide on init:
//         const total = this.slides.length;
//         if (total) {
//           const middle = Math.floor((total - 1) / 2);
//           this.slideTo(middle, 0); // instant reposition to middle
//         }
//       },
//       resize() {
//         // keep centering correct on resize
//         this.update();
//       },
//       slideChangeTransitionEnd() {
//         // ensure visibility/watchers are up to date after transitions
//         this.update();
//       }
//     }
//   });
// }, swipertimedelay);

setTimeout(() => {
  swiperEls.forEach(el => {
    el.classList.add("zoom-right");

    new Swiper(el, {
      initialSlide: 1,
      slidesPerView: "auto",
      spaceBetween: 20,
      centeredSlides: true,
      centerInsufficientSlides: true,
      loop: false,
      autoplay: false,
      direction: "horizontal",
      rtl: true,

      speed: 600,
      slideToClickedSlide: true,
      simulateTouch: true,
      grabCursor: true,
      touchRatio: 1,
      touchAngle: 45,
      resistanceRatio: 0.85,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      observer: true,
      observeParents: true,
      updateOnWindowResize: true,

      pagination: {
        el: el.querySelector(".swiper-pagination"),
        clickable: true,
      },

      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3.5, spaceBetween: 20 },
        1400: { slidesPerView: 3.5, spaceBetween: 20 },
      },

      on: {
        init() {
          this.update();
          setTimeout(() => {
            this.slideTo(1, 0);
          }, 50);
        },
        resize() {
          this.update();
        }
      }
    });
  });
}, swipertimedelay);

setTimeout(() => {
  swiperEls.forEach(el => el.classList.remove("zoom-right"));
}, 8200);

// Home page start journey slider js ends here


// Home page banner slider starts here
let mediaQuery;
let slides;
let images;
let index = 0;
let isTransitioning = false;
let animationInterval;

// Initialize slider - CSS handles responsive variables via media queries
function initializeSlider() {
  if (!slides || !images || images.length === 0) return;

  // Temporarily disable transitions for instant initial setup
  if (slides) {
    slides.classList.add('no-transition');
  }

  // Set initial state without animation on first load
  index = -1; // Reset to allow showSlide to set up properly
  showSlide(0, true); // Skip animation for initial setup

  // Re-enable transitions after a brief moment
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (slides) {
        slides.classList.remove('no-transition');
      }
    });
  });
}

function showSlide(i, skipAnimation = false) {
  if (!slides || !images || images.length === 0) return;

  // Prevent same slide transition (unless it's initial setup)
  if (i === index && !skipAnimation) return;

  if (!skipAnimation) {
    if (isTransitioning) return;
    isTransitioning = true;
  }

  const previousIndex = index;
  index = i;

  // For seamless loop: handle class transitions smoothly
  // Remove 'active' from previous slide first (triggers minimize transition)
  if (previousIndex >= 0 && previousIndex < images.length && previousIndex !== index) {
    images[previousIndex].classList.remove('active');
    images[previousIndex].classList.add('cloned');
  }

  // Add 'active' to new slide (triggers expand transition simultaneously)
  // Remove 'cloned' first if it exists to ensure clean transition
  if (images[index]) {
    images[index].classList.remove('cloned');
    images[index].classList.add('active');
  }

  // Ensure all other slides are marked as cloned
  images.forEach((img, idx) => {
    if (idx !== index && idx !== previousIndex) {
      img.classList.remove('active');
      img.classList.add('cloned');
    }
  });

  // Remove transform-based movement - use CSS classes only for seamless animation
  // This prevents jarring resets when looping from card 4 → card 1
  if (mediaQuery && !mediaQuery.matches) {
    // Desktop: no transform needed, width-based transitions handle it seamlessly
    slides.style.transform = 'translateX(0)';
  } else if (mediaQuery && mediaQuery.matches) {
    // Mobile: use transform for swipe effect
    slides.style.transform = `translateX(${-index * 100}%)`;
  }

  // Reset transition lock after animation completes (skip for initial setup)
  if (!skipAnimation) {
    setTimeout(() => {
      isTransitioning = false;
    }, 1100); // Slightly longer than CSS transition duration (1s)
  }
}

function nextSlide() {
  if (!images || images.length === 0) return;

  // Seamless loop: 0 → 1 → 2 → 3 → 0 → 1 → 2 → 3...
  const nextIndex = (index + 1) % images.length;
  showSlide(nextIndex);
}

// Initialize when DOM is ready
function initBannerSlider() {
  mediaQuery = window.matchMedia("(max-width: 768px)");
  slides = document.querySelector(".slide-track");
  images = document.querySelectorAll(".slide");

  if (images.length === 0) return;

  // Initialize slider (sets index to 0)
  initializeSlider();

  // Handle resize events
  window.addEventListener('resize', () => {
    mediaQuery = window.matchMedia("(max-width: 768px)");
    // Refresh current state with new responsive values
    if (index >= 0 && index < images.length) {
      const currentIndex = index;
      index = -1; // Reset to force update
      showSlide(currentIndex);
    }
  });

  // Start the animation loop after a short delay to allow initial render
  setTimeout(() => {
    animationInterval = setInterval(nextSlide, 3000); // 3 seconds per slide for smoother experience
  }, 500);
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBannerSlider);
} else {
  initBannerSlider();
}

// Home page banner slider ends here



// Home page hero slick slider js starts here
$(document).ready(function () {
  const $heroSlider = $('.js-hero-slider');

  // Prevent double initialization
  if (!$heroSlider.length || $heroSlider.hasClass('slick-initialized')) return;

  $heroSlider.slick({
    rtl: $('html').attr('dir') === 'rtl',

    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,

    autoplay: true,

    fade: true,              // ✅ fade instead of slide
    speed: 700,              // ✅ fade duration
    cssEase: 'ease-in-out',  // ✅ smooth fade curve

    arrows: false,           // ✅ no arrows
    dots: true,              // ✅ pagination dots

    adaptiveHeight: false    // ✅ IMPORTANT: must be false for fade
  });
});
// Home page hero slick slider js ends here