$('#testimonial-slider-2').slick({
    rtl: $("html").attr("dir") == "rtl",
    slidesToScroll: 1,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    speed: 700,
    fade: true,
  });
  
  $("#testimonial-slider-2").on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      slick.$slides.removeClass('currentNext0');
      slick.$slides.removeClass('currentSlideout0');
      if (nextSlide < currentSlide) {
        $(slick.$slides[nextSlide]).addClass('currentNext0');
        $(slick.$slides[currentSlide]).addClass('currentSlideout0');
      }
    }
  )

  // Number counter js - moved to custom.js

  // inner banner image slider js starts here

  const newsSwiper = new Swiper('#success-slider', {
  slidesPerView: 5,
  centeredSlides: true,
  loop: true,
  spaceBetween: 20,
  speed: 800,
  grabCursor: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
    breakpoints: {
      1200: {
        slidesPerView: 5,
        spaceBetween: 10
      },
      768: {
          slidesPerView: 2,
          spaceBetween: 10
      },
      524: {
          slidesPerView: 2,
          spaceBetween: 10
      },
      320: {
          slidesPerView: 1,
          spaceBetween: 10
      },
    },
    on: {
      init() {
        updateSlideClasses(this);
      },
      slideChange() {
        updateSlideClasses(this);
      }
    }
  });

  function updateSlideClasses(swiper) {
    const slides = swiper.slides;
    const activeIndex = swiper.activeIndex;
  
    // Remove all prev/next/middle classes
    slides.forEach(slide => {
      slide.className = slide.className
        .replace(/\b(prevSlide|nextSlide)\d+\b/g, '')
        .replace(/\bmiddle\b/g, '');
    });
  
    // Add middle class
    slides[activeIndex].classList.add('middle');
  
    // Loop through all slides and assign distance-based classes
    slides.forEach((slide, index) => {
      if (index === activeIndex) return;
  
      let diff = index - activeIndex;
  
      // Handle loop wrapping
      const total = slides.length;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
  
      if (diff > 0) {
        slide.classList.add(`nextSlide${diff}`);
      } else if (diff < 0) {
        slide.classList.add(`prevSlide${Math.abs(diff)}`);
      }

      // slide.style.transition = `all 0.5s ease`;
    });
  }
  // inner banner image slider js ends here

  // // Global map tabs functionality
  // $(document).ready(function() {
  //   $('.ecosystem-map .tabs-wrapper .btn-tab').on('click', function(e) {
  //     e.preventDefault();
      
  //     const targetId = $(this).attr('href');
      
  //     // Remove active class from all tabs and panes
  //     $('.ecosystem-map .tabs-wrapper .btn-tab').removeClass('active');
  //     $('.ecosystem-map .tab-content .tab-pane').removeClass('active');
      
  //     // Add active class to clicked tab
  //     $(this).addClass('active');
      
  //     // Show corresponding tab pane
  //     $(targetId).addClass('active');
  //   });
  // });
  