// Home page resource center and About us page useful links slider js starts here

// const swiper = new Swiper('.cardSwiper', {
//   slidesPerView: '4.5',
//   centeredSlides: false,
//   spaceBetween: 20,
//   loop: false,
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true
//   }
// });
if (typeof Swiper !== 'undefined' && document.querySelector('.cardSwiper')) {
  const swiper = new Swiper('.cardSwiper', {
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 20,
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
}


// Home page resource center About us page useful links slider js ends here

// About us page Awards and recoginition slider js starts here

// var imageswiper = new Swiper('.imageSwiper', {
//     centeredSlides: false,
//     spaceBetween: 20,
//     loop: false,
//    pagination: {
//     el: '.imageSwiper .swiper-pagination',
//     clickable: true
//   },
//     navigation: {
//         nextEl: '.imageSwiper .swiper-button-next',
//         prevEl: '.imageSwiper .swiper-button-prev',
//     },
//      slidesPerView: 3,

//   breakpoints: {
//     576: {
//       slidesPerView: 1.2
//     },
//     768: {
//       slidesPerView: 2
//     },
//     1200: {
//       slidesPerView: 2.5
//     },
//     1400: {
//       slidesPerView: 3
//     }
//   },
// });
// Select all imageSwiper sliders (in case you have multiple)
if (typeof Swiper !== 'undefined') document.querySelectorAll('.imageSwiper').forEach(function (slider) {
  const swiperEl = slider;
  const totalSlides = swiperEl.querySelectorAll('.swiper-slide').length;

  // Swiper breakpoints
  const breakpoints = {
    576: { slidesPerView: 1.2 },
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 2.5 },
    1400: { slidesPerView: 3 }
  };

  // Function to get slidesPerView based on viewport
  function getCurrentSlides() {
    const width = window.innerWidth;
    let slides = 1.35; // default for mobile
    Object.keys(breakpoints).forEach(bp => {
      if (width >= Number(bp)) slides = breakpoints[bp].slidesPerView;
    });
    return slides;
  }

  const currentSlides = getCurrentSlides();

  // Only show pagination if total slides > slidesPerView
  const showPagination = totalSlides > currentSlides;

  const swiper = new Swiper(swiperEl, {
    slidesPerView: currentSlides,
    spaceBetween: 20,
    loop: false,
    centeredSlides: false,
    navigation: {
      nextEl: swiperEl.querySelector('.swiper-button-next'),
      prevEl: swiperEl.querySelector('.swiper-button-prev')
    },
    pagination: {
      el: swiperEl.querySelector('.swiper-pagination'),
      clickable: true,
      enabled: showPagination
    },
    observer: true,
    observeParents: true,
    on: {
      resize: function () {
        const updatedSlides = getCurrentSlides();
        // hide pagination if slides not enough
        if (swiperEl.querySelector('.swiper-pagination')) {
          swiperEl.querySelector('.swiper-pagination').style.display = (totalSlides > updatedSlides) ? 'flex' : 'none';
        }
        this.params.slidesPerView = updatedSlides;
        this.update();
      }
    }
  });

  // Initial hide if needed
  if (swiperEl.querySelector('.swiper-pagination')) {
    swiperEl.querySelector('.swiper-pagination').style.display = showPagination ? 'flex' : 'none';
  }
});


// About us page Awards and recoginition slider js ends here


// About us page Explore slider js starts here

var exploreswiper;
if (typeof Swiper !== 'undefined' && document.getElementById('explore-slider')) {
  exploreswiper = new Swiper("#explore-slider", {
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
}
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

if ($.fn.slick && $('#sector-slider').length) {
  initSlickSlider('#sector-slider', {
    autoplay: false,
    dots: true,
    slidesToShow: 1
  });
}

// Home page Sectors slider js ends here

// Echoes testimonial slider js starts here
$(document).ready(function () {
  if ($.fn.slick && $('#testimonial-slider-2').length) {
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
    );
  }
});
// Echoes testimonial slider js ends here

// About us page Set up business slider js starts here

if ($.fn.slick && $('#setup-slider').length) {
  initSlickSlider('#setup-slider', {
    slidesToShow: 1,
    autoplay: true,
    arrows: false,
    speed: 500,
  });
}

// About us page Set up business slider js ends here

// Hide empty elements
document.querySelectorAll('.flex-auto').forEach(el => {
  if (!el.innerHTML.trim()) {
    el.style.display = 'none';
  }
});
// End hide empty elements


// Tabs click → change slide
if ($.fn.slick && $('#discover-slider').length) {
  $('#discover-slider').slick({
    rtl: $('html').attr('dir') === 'rtl',
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    swipe: false,
    touchMove: false,
    draggable: false
  });
  $('.discover-tabs .btn-tab').each(function (index) {
    $(this).on('click', function (e) {
      e.preventDefault();

      $('#discover-slider').slick('slickGoTo', index);

      $('.discover-tabs .btn-tab').removeClass('active');
      $(this).addClass('active');
    });
  });

  // Slide change → highlight corresponding tab
  $('#discover-slider').on('afterChange', function (event, slick, currentSlide) {
    $('.discover-tabs .btn-tab').removeClass('active');
    $('.discover-tabs .btn-tab').eq(currentSlide).addClass('active');
  });
}

// Read more button expand/collapse
$(document).on('click', '.read-more', function () {
  const $wrap = $(this).closest('.read-more-wrapper');

  $wrap.find('.read-more-content').removeClass('collapsed');
  $(this).addClass('d-none');
  $wrap.find('.read-less').removeClass('d-none');
});

$(document).on('click', '.read-less', function () {
  const $wrap = $(this).closest('.read-more-wrapper');

  $wrap.find('.read-more-content').addClass('collapsed');
  $(this).addClass('d-none');
  $wrap.find('.read-more').removeClass('d-none');
});



// $('.show-more').on('click', function (e) {
//     e.preventDefault();
//     $(this).toggleClass('collapsed');
//     $(this).next('.read-more-content').toggleClass('collapsed');
// });

// $('.show-more').click(function () {
//     $(this).toggleClass('collapsed');
//     $('.read-more-content').toggleClass('collapsed');
//     if ($(this).text() == "Read more") {
//         $(this).text("Read less")

//     } else {
//         $(this).text("Read more")
//     }
// });

// Sector Show More/Show Less functionality
function checkSectorContentHeight() {
  $('.single-slider .p-content').each(function () {
    const $content = $(this);
    const $showMoreBtn = $content.find('.sector-show-more');

    // Store if it was expanded before measurement
    const wasExpanded = $content.hasClass('expanded');

    // Temporarily remove line-clamp to measure full height
    const originalStyle = $content.attr('style') || '';
    const originalClasses = $content.attr('class') || '';

    // Remove expanded class temporarily and add a temporary class to override styles
    $content.removeClass('expanded').addClass('measuring-height');
    $content.css({
      '-webkit-line-clamp': 'none',
      'display': 'block',
      'overflow': 'visible',
      'max-height': 'none'
    });

    // Force reflow
    $content[0].offsetHeight;

    // Get the computed line height from the first paragraph or use default
    const firstP = $content.find('p').first();
    const lineHeight = firstP.length ? parseFloat(window.getComputedStyle(firstP[0]).lineHeight) : parseFloat(window.getComputedStyle($content[0]).lineHeight) || 24;
    const maxHeight = lineHeight * 18; // 18 lines
    const actualHeight = $content[0].scrollHeight;

    // Restore original state
    $content.removeClass('measuring-height').attr('class', originalClasses);
    if (wasExpanded) {
      $content.addClass('expanded');
    }
    if (originalStyle) {
      $content.attr('style', originalStyle);
    } else {
      $content.removeAttr('style');
    }

    // Show/hide the button based on content height
    if (actualHeight > maxHeight) {
      $showMoreBtn.show();
      // Update button text based on expanded state
      if (wasExpanded) {
        $showMoreBtn.text('Show Less');
      } else {
        $showMoreBtn.text('Show More');
      }
    } else {
      $showMoreBtn.hide();
    }
  });
}

// Initialize on page load and after slider changes
$(document).ready(function () {
  // Wait for slider to be initialized
  setTimeout(function () {
    checkSectorContentHeight();
  }, 100);

  // Re-check when slider changes (for all slides)
  $('#sector-slider').on('afterChange', function (event, slick, currentSlide) {
    setTimeout(function () {
      checkSectorContentHeight();
    }, 50);
  });

  // Also check on init
  $('#sector-slider').on('init', function () {
    setTimeout(function () {
      checkSectorContentHeight();
    }, 100);
  });
});

// Toggle Show More/Show Less
$(document).on('click', '.sector-show-more', function (e) {
  e.preventDefault();
  const $btn = $(this);
  const $content = $btn.closest('.p-content');

  if ($content.hasClass('expanded')) {
    // Collapse
    $content.removeClass('expanded');
    $btn.text('Show More');
  } else {
    // Expand
    $content.addClass('expanded');
    $btn.text('Show Less');
  }
});

// video play/pause function starts here

const video = document.getElementById('overviewVideo');
const btn = document.getElementById('videoToggle');
const wrapper = document.querySelector('.video-container');
if (btn) {
  btn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      btn.innerHTML = '<img src="assets/images/icons/pause-icon.png" alt="pause icon">';
      // btn.innerHTML = '<img src="assets/images/icons/pause-icon.png" alt="pause icon">';
      wrapper.classList.add('playing');
    } else {
      video.pause();
      btn.innerHTML = '<img src="assets/images/icons/play-icon.png" alt="play icon">';
      // btn.innerHTML = '<img src="assets/images/icons/play-icon.png" alt="play icon">';
      wrapper.classList.remove('playing');
    }
  });
}
if (video) {
  video.addEventListener('click', () => {
    btn.click();
  });
}

// video play/pause function ends here

// video play/pause class-base function starts here
(() => {
  'use strict';

  const containers = document.querySelectorAll('.video-container');
  if (!containers.length) return;

  const PLAY_ICON =
    '<img src="assets/images/icons/play-icon.png" alt="play icon">';
  const PAUSE_ICON =
    '<img src="assets/images/icons/pause-icon.png" alt="pause icon">';

  containers.forEach((wrapper) => {
    const video = wrapper.querySelector('.overview-video');
    const btn = wrapper.querySelector('.video-toggle');

    if (!video || !btn) return;

    const pauseOtherVideos = () => {
      containers.forEach((otherWrapper) => {
        if (otherWrapper === wrapper) return;

        const otherVideo = otherWrapper.querySelector('.overview-video');
        const otherBtn = otherWrapper.querySelector('.video-toggle');

        if (otherVideo && !otherVideo.paused) {
          otherVideo.pause();
          otherWrapper.classList.remove('playing');
          if (otherBtn) otherBtn.innerHTML = PLAY_ICON;
        }
      });
    };

    const toggleVideo = () => {
      if (video.paused) {
        pauseOtherVideos();
        video.play();
        btn.innerHTML = PAUSE_ICON;
        wrapper.classList.add('playing');
      } else {
        video.pause();
        btn.innerHTML = PLAY_ICON;
        wrapper.classList.remove('playing');
      }
    };

    btn.addEventListener('click', toggleVideo);
    video.addEventListener('click', toggleVideo);
  });
})();

// video play/pause class-base function ends here

// letter hover active class enable here

document.querySelectorAll('.qfca-letters .letter').forEach(letter => {
  letter.addEventListener('mouseenter', () => {
    const key = letter.dataset.key;
    document
      .querySelector(`.qfca-content .item[data-key="${key}"]`)
      ?.classList.add('active');
  });

  letter.addEventListener('mouseleave', () => {
    const key = letter.dataset.key;
    document
      .querySelector(`.qfca-content .item[data-key="${key}"]`)
      ?.classList.remove('active');
  });
});

// letter hover active class enable here

$(document).ready(function () {
  if ($('.select2').length) {
    $('.select2').select2({
      width: '100%',
      minimumResultsForSearch: Infinity,
      dropdownAutoWidth: true
    });
  }
  $('.open-panel').on('click', function () {
    $('.overlay').addClass('active');
    $('.side-panel').addClass('active');
    $('body').css('overflow', 'hidden');
  });

  $('.close-panel, .overlay').on('click', function () {
    $('.overlay').removeClass('active');
    $('.side-panel').removeClass('active');
    $('body').css('overflow', '');
  });
  if ($('.datepicker').length) {
    $('.datepicker').datepicker({
      dateFormat: 'dd M yy',
      changeMonth: true,
      changeYear: true
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     SUBMENU TOGGLE
  ========================== */
  document.querySelectorAll(".menu-toggle").forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentElement.classList.toggle("open");
    });
  });

  /* =========================
     SUBMENU → TAB SWITCHING
  ========================== */
  const submenuLinks = document.querySelectorAll(".submenu-link");
  const tabs = document.querySelectorAll(".faq-tab");

  submenuLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // active submenu
      submenuLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");

      // switch tab
      tabs.forEach(tab => tab.classList.remove("active"));

      const targetId = this.getAttribute("data-tab");
      const targetTab = document.getElementById(targetId);

      if (targetTab) {
        targetTab.classList.add("active");
      }
    });
  });

  /* =========================
     DEFAULT ACTIVE SUBMENU ON PAGE LOAD
  ========================== */
  const defaultSubmenu = document.querySelector('.submenu-link[data-tab="tab-1"]');
  if (defaultSubmenu) {
    // Make submenu-1 active
    submenuLinks.forEach(l => l.classList.remove("active"));
    defaultSubmenu.classList.add("active");

    // Show tab-1
    tabs.forEach(tab => tab.classList.remove("active"));
    const defaultTab = document.getElementById("tab-1");
    if (defaultTab) defaultTab.classList.add("active");

    // Ensure parent menu is open
    const parentMenu = defaultSubmenu.closest(".has-submenu");
    if (parentMenu) parentMenu.classList.add("open");
  }

});


// Global map tabs functionality
$(document).ready(function () {
  $('.ecosystem-map .tabs-wrapper .btn-tab').on('click', function (e) {
    e.preventDefault();

    const targetId = $(this).attr('href');

    // Remove active class from all tabs and panes
    $('.ecosystem-map .tabs-wrapper .btn-tab').removeClass('active');
    $('.ecosystem-map .tab-content .tab-pane').removeClass('active');

    // Add active class to clicked tab
    $(this).addClass('active');

    // Show corresponding tab pane
    $(targetId).addClass('active');
  });
});


// CMS Counter JS starts here

// Function to fetch CMS counter value
async function fetchCMSCounterValue() {
  try {
    // Check if CMS value is available via data attribute or API
    // Option 1: Check for data attribute from server-side rendering
    const counterElement = document.getElementById('continuous-counter');
    if (counterElement && counterElement.dataset.cmsValue) {
      return parseInt(counterElement.dataset.cmsValue);
    }

    // Option 2: Fetch from CMS API (uncomment and update endpoint as needed)
    // const response = await fetch('/api/cms/discover-section');
    // const data = await response.json();
    // return parseInt(data.continuousCounter || data.counter || 0);

    // Option 3: Check window object for CMS data
    if (window.CMSData && window.CMSData.continuousCounter) {
      return parseInt(window.CMSData.continuousCounter);
    }

    // Fallback to data-target if CMS value not available
    return null;
  } catch (error) {
    console.warn('Failed to fetch CMS counter value:', error);
    return null;
  }
}

function animateCounter(counterElement) {
  const targetNumber = parseInt(counterElement.getAttribute('data-target'));

  // Validate target number
  if (isNaN(targetNumber) || targetNumber <= 0) {
    console.warn('Invalid counter target:', targetNumber);
    return;
  }

  const numberStr = String(targetNumber);
  const digitWrappers = counterElement.querySelectorAll('.digit-wrapper:not(:last-child)'); // Exclude the "+" wrapper

  // Pad number string with leading zeros if needed to match digit wrappers
  const paddedNumberStr = numberStr.padStart(digitWrappers.length, '0');

  digitWrappers.forEach((wrapper, index) => {
    const targetDigit = parseInt(paddedNumberStr.charAt(index));

    var transformValue = -1.2 * targetDigit;
    if (isNaN(targetDigit)) {
      transformValue = '-1.2';
    }

    // Slower animation: 350ms delay per digit instead of 200ms
    setTimeout(() => {
      wrapper.querySelector('.digits').style.transform = `translateY(${transformValue}em)`;
    }, index * 350);
  });
}

// Initialize counter with CMS value
async function initializeCounter(counterElement) {
  if (!counterElement) return;

  // Fetch CMS value (only for the main continuous-counter)
  if (counterElement.id === 'continuous-counter') {
    const cmsValue = await fetchCMSCounterValue();

    // Update data-target if CMS value is available
    if (cmsValue !== null && !isNaN(cmsValue) && cmsValue > 0) {
      counterElement.setAttribute('data-target', cmsValue);
    }
  }

  // Ensure we have a valid target value
  const currentTarget = parseInt(counterElement.getAttribute('data-target'));
  if (isNaN(currentTarget) || currentTarget <= 0) {
    console.warn('Counter target value is invalid, using default');
    return;
  }

  // Set up intersection observer for animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Only animate once when it comes into view
        animateCounter(entry.target);
        // Stop observing after animation to prevent re-triggering on scroll
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(counterElement);
}

// Initialize all continuous counters when DOM is ready
function initializeAllContinuousCounters() {
  // Initialize main continuous-counter
  const mainCounter = document.getElementById('continuous-counter');
  if (mainCounter) {
    initializeCounter(mainCounter);
  }

  // Initialize global-map continuous-counter
  const globalMapCounter = document.getElementById('continuous-counter-global-map');
  if (globalMapCounter) {
    initializeCounter(globalMapCounter);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAllContinuousCounters);
} else {
  initializeAllContinuousCounters();
}

// Also observe other counters (non-continuous-counter) with the original logic
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.id !== 'continuous-counter' && entry.target.id !== 'continuous-counter-global-map') {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.counter:not(#continuous-counter):not(#continuous-counter-global-map)').forEach(counter => {
  counterObserver.observe(counter);
});

// ✅ Ensure ALL .counter elements animate (even without ID)
document.querySelectorAll('.counter').forEach(counter => {
  if (
    counter.id !== 'continuous-counter' &&
    counter.id !== 'continuous-counter-global-map'
  ) {
    initializeCounter(counter);
  }
});


var counterSwiper;
if (typeof Swiper !== 'undefined' && document.querySelector('.counterSwiper')) {
  counterSwiper = new Swiper('.counterSwiper', {
    direction: 'vertical',
    slidesPerView: 1,
    loop: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    autoplay: {
      delay: 3000,
    },
    allowTouchMove: false,
    speed: 800
  });
}

if (counterSwiper?.on) {
    counterSwiper.on("slideChangeTransitionStart", function () {
        try {
            const activeCounter = document.querySelector(
                ".counterSwiper .swiper-slide-active .counter"
            );

            if (!activeCounter) return;

            const targetAttr = activeCounter.getAttribute("data-target");
            if (targetAttr == null) return;

            const targetStr = String(targetAttr).replace(/\D/g, ""); // keep digits only
            if (!targetStr.length) return;

            // Clear existing content safely
            activeCounter.innerHTML = "";

            [...targetStr].forEach((digitChar, index) => {
                const digit = Number(digitChar);

                const wrapper = document.createElement("div");
                wrapper.classList.add("digit-wrapper");

                const digits = document.createElement("div");
                digits.classList.add("digits");

                for (let i = 0; i <= 9; i++) {
                    const span = document.createElement("span");
                    span.textContent = i;
                    digits.appendChild(span);
                }

                wrapper.appendChild(digits);
                activeCounter.appendChild(wrapper);

                // animate safely
                setTimeout(() => {
                    if (!isNaN(digit)) {
                        digits.style.transform = `translateY(-${digit * 1.2}em)`;
                    }
                }, 200);
            });

            // Add "+"
            const plusWrapper = document.createElement("div");
            plusWrapper.classList.add("digit-wrapper");

            const plusDigits = document.createElement("div");
            plusDigits.classList.add("digits");
            plusDigits.innerHTML = "<span>+</span>";

            plusWrapper.appendChild(plusDigits);
            activeCounter.appendChild(plusWrapper);
        } catch (err) {
            console.error("Counter swiper error:", err);
        }
    });
}

// CMS Counter JS ends here

// File upload dropzone - show uploaded files list with delete button
(function initFileDropzone() {
  function getFileIcon(filename) {
    const ext = (filename || '').split('.').pop().toLowerCase();
    return ext === 'pdf' ? 'pdf' : 'doc';
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function renderFileList(container, files) {
    const list = container.querySelector('.selected-files-list');
    const labelEl = container.querySelector('.selected-files-label');
    if (!list || !labelEl) return;

    labelEl.textContent = files.length > 1 ? 'Selected files' : 'Selected file';
    list.innerHTML = '';

    const iconPath = 'assets/images/icons/default_file_icon.svg';

    files.forEach(function (file, index) {
      const li = document.createElement('li');
      li.className = 'selected-file-item';

      li.innerHTML =
        '<span class="selected-file-icon" style="background-image:url(' +
        iconPath +
        ')"></span>' +
        '<span class="selected-file-name">' +
        escapeHtml(file.name) +
        '</span>' +
        '<button type="button" class="remove-file-btn" data-index="' +
        index +
        '" aria-label="Remove file">&times;</button>';

      list.appendChild(li);
    });
  }

  function syncInputFiles(container) {
    const stored = container._uploadedFiles || [];
    const dt = new DataTransfer();
    stored.forEach(function (f) {
      dt.items.add(f);
    });

    const fileInput = container.querySelector('.default-file-input');
    if (fileInput) fileInput.files = dt.files;

    renderFileList(container, stored);

    if (stored.length === 0) {
      container.classList.remove('has-files');
    }
  }

  function handleFiles(container, files, replace) {
    if (!files || files.length === 0) return;

    let stored = container._uploadedFiles || [];
    if (replace) stored = [];

    Array.from(files).forEach(function (file) {
      stored.push(file);
    });

    container._uploadedFiles = stored;
    syncInputFiles(container);
    container.classList.add('has-files');
  }

  function resetDropzone(container) {
    container._uploadedFiles = [];
    const fileInput = container.querySelector('.default-file-input');
    if (fileInput) fileInput.value = '';
    container.classList.remove('has-files');

    const list = container.querySelector('.selected-files-list');
    if (list) list.innerHTML = '';
  }

  // Setup each dropzone
  document.querySelectorAll('[data-file-dropzone]').forEach(function (container) {
    const fileInput = container.querySelector('.default-file-input');
    const dropzone = container.querySelector('.dropzone-area');
    const changeLink = container.querySelector('.change-file-link');

    if (!fileInput || !dropzone) return;

    fileInput.addEventListener('change', function () {
      if (this.files && this.files.length) {
        handleFiles(container, this.files, container._isReplacing);
        container._isReplacing = false;
      }
    });

    if (changeLink) {
      changeLink.addEventListener('click', function (e) {
        e.preventDefault();
        container._isReplacing = true;
        fileInput.click();
      });
    }

    dropzone.addEventListener('click', function (e) {
      if (!e.target.closest('.browse-files')) {
        fileInput.click();
      }
    });

    dropzone.addEventListener('dragover', function (e) {
      e.preventDefault();
      container.classList.add('drag-over');
    });

    dropzone.addEventListener('dragleave', function (e) {
      e.preventDefault();
      container.classList.remove('drag-over');
    });

    dropzone.addEventListener('drop', function (e) {
      e.preventDefault();
      container.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      if (files && files.length) {
        handleFiles(container, files, false);
      }
    });
  });

  // Delete single file (✕ button)
  document.addEventListener('click', function (e) {
    const removeBtn = e.target.closest('.remove-file-btn');
    if (!removeBtn) return;

    const container = removeBtn.closest('[data-file-dropzone]');
    if (!container) return;

    const index = parseInt(removeBtn.getAttribute('data-index'), 10);
    const stored = container._uploadedFiles || [];

    stored.splice(index, 1);
    container._uploadedFiles = stored;

    syncInputFiles(container);
  });
})();
``



// PDF Viewer Component
document.querySelectorAll(".pdf-section").forEach(function (section) {

  const viewer = section.querySelector(".pdf-viewer");
  const url = viewer.getAttribute("data-pdf-url");
  const container = section.querySelector(".pdf-container");
  const downloadBtn = section.querySelector(".download-btn");

  let pdfDoc = null;
  let resizeTimeout;

  // ----------------------------
  // Render all pages
  // ----------------------------
  function renderAllPages() {
    container.innerHTML = "";

    const maxWidth = 900;
    const dpr = window.devicePixelRatio || 1;

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      pdfDoc.getPage(pageNum).then(function (page) {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let containerWidth = container.clientWidth;
        const finalWidth = Math.min(containerWidth, maxWidth);

        const viewport = page.getViewport({ scale: 1 });
        const scale = finalWidth / viewport.width;

        const scaledViewport = page.getViewport({ scale: scale * dpr });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        canvas.style.width = finalWidth + "px";
        canvas.style.height = (scaledViewport.height / dpr) + "px";

        container.appendChild(canvas);

        page.render({
          canvasContext: ctx,
          viewport: scaledViewport
        });
      });
    }
  }

  // ----------------------------
  // Load PDF
  // ----------------------------
  pdfjsLib.getDocument(url).promise.then(function (pdf) {
    pdfDoc = pdf;
    renderAllPages();
  });

  // ----------------------------
  // Resize (scoped debounce)
  // ----------------------------
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(function () {
      if (pdfDoc) renderAllPages();
    }, 300);
  });

  // ----------------------------
  // Download button
  // ----------------------------
  if (downloadBtn && url) {
    downloadBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // safer download approach
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", url.split('/').pop());
      // link.setAttribute("target", "_blank");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

});

// // Marquee Slider for Our Trusted Partner
// $(document).ready(function () {
//   $('.financial-partners-slick').slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     variableWidth: true,
//     infinite: true,

//     autoplay: true,
//     autoplaySpeed: 0,     // ✅ NEVER pause
//     speed: 8000,         // ✅ marquee velocity
//     cssEase: 'linear',

//     arrows: false,
//     dots: false,
//     pauseOnHover: true,  // ✅ NO stop → no gap
//     pauseOnFocus: false,
//     swipe: false,
//     draggable: false,
//     touchMove: false,
//     waitForAnimate: false // ✅ MOST IMPORTANT
//   });
// });
(function () {
  const marquee = document.querySelector('.financial-partners-marquee__track');
  if (!marquee) return;

  // Duplicate content once for seamless loop
  marquee.innerHTML += marquee.innerHTML;

})();




(() => {
  'use strict';

  const wrappers = document.querySelectorAll('.tabs-wrapper');
  if (!wrappers.length) return;

  wrappers.forEach((wrapper) => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    const onMouseDown = (e) => {
      isDown = true;
      isDragging = false;
      wrapper.classList.add('dragging');
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    };

    const onMouseLeaveOrUp = () => {
      isDown = false;
      wrapper.classList.remove('dragging');
    };

    const onMouseMove = (e) => {
      if (!isDown) return;

      e.preventDefault();
      isDragging = true;

      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 1.2;
      wrapper.scrollLeft = scrollLeft - walk;
    };

    const onTouchStart = (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = wrapper.scrollLeft;
    };

    const onTouchMove = (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 1.2;
      wrapper.scrollLeft = scrollLeft - walk;
    };

    // Prevent accidental link clicks while dragging
    const onClick = (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        isDragging = false;
      }
    };

    wrapper.addEventListener('mousedown', onMouseDown);
    wrapper.addEventListener('mouseleave', onMouseLeaveOrUp);
    wrapper.addEventListener('mouseup', onMouseLeaveOrUp);
    wrapper.addEventListener('mousemove', onMouseMove);

    wrapper.addEventListener('touchstart', onTouchStart, { passive: true });
    wrapper.addEventListener('touchmove', onTouchMove, { passive: true });

    wrapper.addEventListener('click', onClick, true);
  });
})();


// Policy page — scrollspy + active-tab scroll-into-view
(() => {
  const tabsWrapper = document.querySelector('.media-centre-tabs.policy .tabs-wrapper');
  if (!tabsWrapper) return;

  const stickyBar = document.querySelector('.media-centre-tabs.policy.sticky-tabs');
  const tabs      = Array.from(tabsWrapper.querySelectorAll('a.btn-tab[href^="#"]'));

  // Resolve each tab href to its target section element (null if not found)
  const sections = tabs.map(tab => document.getElementById(tab.getAttribute('href').slice(1)));

  // Scroll the active tab into the horizontal center of the strip
  const bringTabIntoView = (tab) => {
    const wRect = tabsWrapper.getBoundingClientRect();
    const tRect = tab.getBoundingClientRect();
    const offset = tRect.left - wRect.left - wRect.width / 2 + tRect.width / 2;
    tabsWrapper.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Activate tab at given index, deactivate all others
  let currentActive = -1;
  const setActive = (index) => {
    if (index === currentActive) return; // no-op if unchanged
    currentActive = index;
    tabs.forEach((t, i) => t.classList.toggle('active', i === index));
    if (tabs[index]) bringTabIntoView(tabs[index]);
  };

  // Scrollspy: track which section the viewport is currently inside
  const onScroll = () => {
    const offset = (stickyBar ? stickyBar.offsetHeight : 0) + 16;
    let active = 0;
    sections.forEach((section, i) => {
      if (section && section.getBoundingClientRect().top <= offset) {
        active = i;
      }
    });
    setActive(active);
  };

  // Tab click: smooth-scroll page to section, compensating for sticky bar
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', (e) => {
      if (e.defaultPrevented) return; // drag handler already cancelled it
      e.preventDefault();
      const section = sections[i];
      if (!section) return;
      setActive(i);
      const stickyOffset = stickyBar ? stickyBar.offsetHeight : 0;
      const top = section.getBoundingClientRect().top + window.scrollY - stickyOffset - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  setActive(0); // initialise first tab as active
})();


// Primary button animation
(() => {
  const buttons = document.querySelectorAll(".updated-primary-btn");

  buttons.forEach((btn) => {
    let animation;

    btn.addEventListener("mouseenter", () => {
      if (animation) animation.cancel();

      animation = btn.animate(
        { "--gradient-angle": ["90deg", "265.6deg"] },
        {
          duration: 900,
          easing: "cubic-bezier(.4,0,.2,1)",
          fill: "forwards"
        }
      );
    });

    btn.addEventListener("mouseleave", () => {
      if (animation) animation.cancel();

      animation = btn.animate(
        { "--gradient-angle": ["265.6deg", "90deg"] },
        {
          duration: 700,
          easing: "cubic-bezier(.4,0,.2,1)",
          fill: "forwards"
        }
      );
    });
  });
})();
// Primary button end here


// // Mega menu and search modal
// (() => {
//   const body = document.body;
//   const backdrop = document.querySelector(".search-backdrop");
//   const searchCollapse = document.getElementById("searchCollapse");
//   const megaMenus = document.querySelectorAll(".mega-menu");

//   if (!backdrop) return;

//   const allCollapses = [];

//   if (searchCollapse) allCollapses.push(searchCollapse);
//   megaMenus.forEach(m => allCollapses.push(m));

//   const closeAll = () => {
//     allCollapses.forEach(el => {
//       const instance = bootstrap.Collapse.getInstance(el);
//       if (instance) instance.hide();
//     });
//   };

//   // ✅ Search logic (UNCHANGED from working version)
//   if (searchCollapse) {
//     searchCollapse.addEventListener("shown.bs.collapse", () => {
//       closeAll();
//       new bootstrap.Collapse(searchCollapse, { toggle: false }).show();
//       body.classList.add("search-open");
//     });

//     searchCollapse.addEventListener("hidden.bs.collapse", () => {
//       body.classList.remove("search-open");
//     });
//   }

//   // ✅ Mega menu logic (same pattern as search)
//   megaMenus.forEach(menu => {
//     menu.addEventListener("shown.bs.collapse", () => {
//       closeAll();
//       new bootstrap.Collapse(menu, { toggle: false }).show();
//       body.classList.add("search-open");
//     });

//     menu.addEventListener("hidden.bs.collapse", () => {
//       body.classList.remove("search-open");
//     });
//   });

//   // ✅ Backdrop closes EVERYTHING
//   backdrop.addEventListener("click", () => {
//     closeAll();
//     body.classList.remove("search-open");
//   });

//   // ✅ Active nav link handling
//   document
//     .querySelectorAll(".nav-link[data-bs-target]")
//     .forEach(link => {
//       const target = document.querySelector(link.dataset.bsTarget);
//       if (!target) return;

//       target.addEventListener("shown.bs.collapse", () => {
//         link.classList.add("active");
//       });

//       target.addEventListener("hidden.bs.collapse", () => {
//         link.classList.remove("active");
//       });
//     });
// })();




// (() => {
//   const body = document.body;
//   const searchCollapse = document.getElementById("searchCollapse");
//   const backdrop = document.querySelector(".search-backdrop");

//   if (!searchCollapse || !backdrop) return;

//   // When search opens
//   searchCollapse.addEventListener("shown.bs.collapse", () => {
//     body.classList.add("search-open");
//   });

//   // When search closes
//   searchCollapse.addEventListener("hidden.bs.collapse", () => {
//     body.classList.remove("search-open");
//   });

//   // Click on backdrop closes search
//   backdrop.addEventListener("click", () => {
//     const bsCollapse = bootstrap.Collapse.getInstance(searchCollapse);
//     if (bsCollapse) bsCollapse.hide();
//   });
// })();


// (() => {
//   const body = document.body;
//   const backdrop = document.querySelector(".search-backdrop");

//   if (!backdrop) {
//     console.log("❌ Backdrop not found");
//     return;
//   }

//   // 👉 TEMP: click ANYWHERE to toggle backdrop
//   document.addEventListener("click", () => {
//     body.classList.toggle("search-open");
//     console.log("TOGGLED", body.className);
//   });

// })();



// ==============================================================
// - (Start) New Updated Header and Hero Banner CSS
// ==============================================================

// (() => {
//   document.addEventListener("DOMContentLoaded", () => {
//     const header = document.querySelector(".site-header");
//     const searchBtns = document.querySelectorAll(".search-trigger");
//     const searchBox = document.getElementById("searchBox");
//     const closeSearchBtn = searchBox?.querySelector(".close");

//     const megaTriggers = document.querySelectorAll("[data-mega-menu-trigger]");
//     const megaMenus = document.querySelectorAll(".mega-menu");
//     const navLinks = document.querySelectorAll(
//       ".nav-link[data-mega-menu-trigger]"
//     );
//     const backdrop = document.querySelector(".search-backdrop");

//     /* ---------------- HEADER SHOW / HIDE ON SCROLL ---------------- */

//     let lastScrollY = window.scrollY;

//     window.addEventListener("scroll", () => {
//       const currentScrollY = window.scrollY;

//       const isMenuOpen =
//         document.querySelector(".is-open") !== null ||
//         document.body.classList.contains("search-open");

//       // Always apply base scroll class
//       if (currentScrollY > 50) {
//         header.classList.add("is-scrolled");
//       } else {
//         header.classList.remove("is-scrolled");
//         header.classList.remove("is-hidden");
//       }

//       // ✅ STOP HIDING when menu is open
//       if (isMenuOpen) {
//         header.classList.remove("is-hidden");
//       } else {
//         if (currentScrollY > lastScrollY && currentScrollY > 80) {
//           // scroll down
//           header.classList.add("is-hidden");
//         } else {
//           // scroll up
//           header.classList.remove("is-hidden");
//         }
//       }

//       lastScrollY = currentScrollY;
//     });

//     /* ---------------- HELPERS ---------------- */

//     const clearActiveLinks = () => {
//       navLinks.forEach(link => link.classList.remove("active"));
//     };

//     const openWithHeight = (el) => {
//       if (!el) return;

//       el.style.display = "block";
//       el.style.height = "0px";
//       el.offsetHeight;

//       const height = el.scrollHeight;
//       el.style.height = `${height}px`;
//       el.classList.add("is-open");

//       el.addEventListener(
//         "transitionend",
//         () => {
//           el.style.height = "auto";
//         },
//         { once: true }
//       );
//     };

//     const closeWithHeight = (el) => {
//       if (!el || !el.classList.contains("is-open")) return;

//       el.style.height = `${el.scrollHeight}px`;
//       el.offsetHeight;
//       el.style.height = "0px";
//       el.classList.remove("is-open");
//     };

//     const closeAll = () => {
//       closeWithHeight(searchBox);
//       megaMenus.forEach(menu => closeWithHeight(menu));
//       document.body.classList.remove("search-open");
//       clearActiveLinks();
//     };

//     /* ---------------- SEARCH TOGGLE ---------------- */

//     searchBtns.forEach(btn => {
//       btn.addEventListener("click", (e) => {
//         e.stopPropagation();

//         const isOpen = searchBox.classList.contains("is-open");
//         closeAll();

//         if (!isOpen) {
//           openWithHeight(searchBox);
//           document.body.classList.add("search-open");
//         }
//       });
//     });

//     closeSearchBtn?.addEventListener("click", closeAll);

//     /* ---------------- MEGA MENU TOGGLE ---------------- */

//     megaTriggers.forEach(trigger => {
//       trigger.addEventListener("click", (e) => {
//         e.preventDefault();
//         e.stopPropagation();

//         const targetMenu = document.getElementById(
//           trigger.dataset.megaMenuTrigger
//         );

//         const isOpen = targetMenu.classList.contains("is-open");
//         closeAll();

//         if (!isOpen) {
//           openWithHeight(targetMenu);
//           trigger.classList.add("active");
//           document.body.classList.add("search-open");
//         }
//       });
//     });

//     /* ---------------- PREVENT INSIDE CLICKS ---------------- */

//     [searchBox, ...megaMenus].forEach(el => {
//       el?.addEventListener("click", e => e.stopPropagation());
//     });

//     /* ---------------- CLICK OUTSIDE HEADER ---------------- */

//     document.addEventListener("click", (e) => {
//       if (!header.contains(e.target)) {
//         closeAll();
//       }
//     });

//     /* ---------------- BACKDROP CLICK ---------------- */

//     backdrop?.addEventListener("click", closeAll);

//     /* ---------------- ESC KEY ---------------- */

//     document.addEventListener("keydown", (e) => {
//       if (e.key === "Escape") closeAll();
//     });
//   });
// })();

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const header         = document.querySelector(".site-header");
    const searchBtns     = document.querySelectorAll(".search-trigger");
    const searchBox      = document.getElementById("searchBox");
    const closeSearchBtn = searchBox?.querySelector(".close");
    const megaTriggers   = document.querySelectorAll("[data-mega-menu-trigger]");
    const megaWrapper    = document.getElementById("megaMenuWrapper");
    const megaPanels     = document.querySelectorAll(".mega-menu-panel");
    const navLinks       = document.querySelectorAll(".nav-link[data-mega-menu-trigger]");
    const backdrop       = document.querySelector(".search-backdrop");

    let currentPanel  = null;
    let switchTimeout = null;

    /* ---------------- HEADER SHOW / HIDE ON SCROLL ---------------- */

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      const menuOpen = megaWrapper?.classList.contains("is-open") ||
                       document.body.classList.contains("search-open");

      if (y > 50) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled", "is-hidden");
      }

      if (menuOpen) {
        header.classList.remove("is-hidden");
      } else {
        if (y > lastScrollY && y > 80) {
          header.classList.add("is-hidden");
        } else {
          header.classList.remove("is-hidden");
        }
      }

      lastScrollY = y;
    });

    /* ---------------- HELPERS ---------------- */

    const clearActiveLinks = () => navLinks.forEach(l => l.classList.remove("active"));
    const openBackdrop     = () => { backdrop?.classList.add("active");    document.body.classList.add("search-open"); };
    const closeBackdrop    = () => { backdrop?.classList.remove("active"); document.body.classList.remove("search-open"); };

    /* ---------------- WRAPPER HELPERS ---------------- */

    const openWrapper = (panel) => {
      if (!megaWrapper || !panel) return;
      megaWrapper.style.height = `${panel.scrollHeight}px`;
      megaWrapper.classList.add("is-open");
    };

    const closeWrapper = () => {
      if (!megaWrapper) return;
      megaWrapper.style.height = "0px";
      megaWrapper.classList.remove("is-open");
    };

    const adjustWrapperHeight = (panel) => {
      if (!megaWrapper || !panel) return;
      megaWrapper.style.height = `${panel.scrollHeight}px`;
    };

    /* ---------------- SEARCH HELPERS ---------------- */

    const openSearchBox = () => {
      if (!searchBox) return;
      searchBox.style.height = `${searchBox.scrollHeight}px`;
      searchBox.classList.add("is-open");
      const onEnd = (e) => {
        if (e.propertyName !== "height") return;
        searchBox.removeEventListener("transitionend", onEnd);
        if (searchBox.classList.contains("is-open")) searchBox.style.height = "auto";
      };
      searchBox.addEventListener("transitionend", onEnd);
    };

    const closeSearchBox = () => {
      if (!searchBox || !searchBox.classList.contains("is-open")) return;
      if (searchBox.style.height === "auto" || !searchBox.style.height) {
        searchBox.style.height = `${searchBox.scrollHeight}px`;
        searchBox.offsetHeight;
      }
      searchBox.style.height = "0px";
      searchBox.classList.remove("is-open");
    };

    /* ---------------- CLOSE ALL ---------------- */

    const closeAll = () => {
      if (switchTimeout) { clearTimeout(switchTimeout); switchTimeout = null; }
      megaPanels.forEach(p => p.classList.remove("is-active"));
      closeWrapper();
      closeSearchBox();
      currentPanel = null;
      clearActiveLinks();
      closeBackdrop();
    };

    /* ---------------- SEARCH TOGGLE ---------------- */

    searchBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const wasOpen = searchBox?.classList.contains("is-open");
        closeAll();
        if (!wasOpen) { openSearchBox(); openBackdrop(); }
      });
    });

    closeSearchBtn?.addEventListener("click", closeAll);

    /* ---------------- MEGA MENU TOGGLE ---------------- */

    megaTriggers.forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const targetPanel = document.getElementById(trigger.dataset.megaMenuTrigger);
        if (!targetPanel || !megaWrapper) return;

        // Clicking the same trigger closes everything
        if (currentPanel === targetPanel) {
          closeAll();
          return;
        }

        // Always close search box before opening any mega menu
        closeSearchBox();

        if (!currentPanel) {
          // ── First open: slide wrapper down, fade panel in simultaneously ──
          currentPanel = targetPanel;
          targetPanel.classList.add("is-active");
          openWrapper(targetPanel);
          trigger.classList.add("active");
          openBackdrop();

        } else {
          // ── Switch: fade out old panel, fade in new panel ──
          if (switchTimeout) { clearTimeout(switchTimeout); switchTimeout = null; }

          const prevPanel = currentPanel;
          currentPanel    = targetPanel;
          clearActiveLinks();

          // Fade out old panel (CSS: opacity 0.3s, visibility hides after 0.3s)
          prevPanel.classList.remove("is-active");

          // Animate wrapper height to new panel (no-op if same height)
          adjustWrapperHeight(targetPanel);

          // After old panel finishes fading (0.3s), fade in new panel
          switchTimeout = setTimeout(() => {
            targetPanel.classList.add("is-active");
            trigger.classList.add("active");
            switchTimeout = null;
          }, 320);
        }
      });
    });

    /* ---------------- PREVENT INSIDE CLICKS ---------------- */

    [searchBox, megaWrapper].forEach(el => el?.addEventListener("click", e => e.stopPropagation()));

    /* ---------------- CLICK OUTSIDE ---------------- */

    document.addEventListener("click", (e) => {
      const inside = e.target.closest("#megaMenuWrapper") ||
                     e.target.closest("[data-mega-menu-trigger]") ||
                     e.target.closest("#searchBox");
      if (!inside) closeAll();
    });

    /* ---------------- BACKDROP / ESC ---------------- */

    backdrop?.addEventListener("click", closeAll);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
  });
})();

// ==============================================================
// - (End) New Updated Header and Hero Banner CSS
// ==============================================================




// ==============================================================
// - (Start) Ecosystem Mini Slider Popup Video 
// ==============================================================

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    // ✅ Scope to ONLY this section
    const section = document.querySelector('.ecosystem-success');
    if (!section) return;

    const modal = section.querySelector('#videoModal');
    if (!modal) return;

    // ✅ Ensure video NEVER plays on load
    const videoInit = modal.querySelector('video');
    if (videoInit) {
      videoInit.pause();
      videoInit.currentTime = 0;
    }

    // ✅ Modal OPEN → play + unmute
    modal.addEventListener('shown.bs.modal', function () {
      const video = modal.querySelector('video');
      if (!video) return;

      video.currentTime = 0;
      video.muted = false;
      video.volume = 1;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log('Autoplay blocked');
        });
      }
    });

    // ✅ Modal CLOSE → pause + reset
    modal.addEventListener('hidden.bs.modal', function () {
      const video = modal.querySelector('video');
      if (!video) return;

      video.pause();
      video.currentTime = 0;
    });

  });
})();

// ==============================================================
// - (End) Ecosystem Mini Slider Popup Video 
// ==============================================================




// ==============================================================
// - (Start) Your QFC Wizard Section Select disabled color 
// ==============================================================

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    // ✅ Scope only inside wizard
    const section = document.querySelector('.qfc-wizard-inner');
    if (!section) return;

    const selects = section.querySelectorAll('.form-select');

    selects.forEach(function (select) {

      // ✅ Set initial color
      const selectedOption = select.options[select.selectedIndex];
      select.style.color = selectedOption.disabled ? '#A6A6A6' : '#000';

      // ✅ On change
      select.addEventListener('change', function () {
        const option = this.options[this.selectedIndex];
        this.style.color = option.disabled ? '#A6A6A6' : '#000';
      });

    });

  });
})();

// ==============================================================
// - (End) Your QFC Wizard Section Select disabled color 
// ==============================================================





(function () {
  document.addEventListener('DOMContentLoaded', function () {

    const section = document.querySelector('.chat-box-section');
    if (!section) return;

    const mainBtn = section.querySelector('.main-chat-btn');
    const tooltip = section.querySelector('.tooltip-box');
    const chatBox = section.querySelector('.chat-box');
    const whatsappBtn = section.querySelector('.whatsApp-button');
    const btnImg = mainBtn ? mainBtn.querySelector('img') : null;

    if (!mainBtn || !tooltip || !chatBox || !whatsappBtn || !btnImg) return;

    const gifSrc = 'assets/images/chat.gif';
    const closeSrc = 'assets/images/icons/times.svg'; 

    let isOpen = false;

    mainBtn.addEventListener('click', function (e) {
      e.stopPropagation();

      isOpen = !isOpen;

      // ✅ Toggle chat
      chatBox.classList.toggle('active', isOpen);
      tooltip.classList.toggle('hide', isOpen);
      whatsappBtn.classList.toggle('active', isOpen);

      // ✅ Switch image + class
      if (isOpen) {
        btnImg.src = closeSrc;
        btnImg.classList.add('is-close-icon');  
      } else {
        btnImg.src = gifSrc;
        btnImg.classList.remove('is-close-icon'); 
      }
    });

    // ✅ Click outside → close
    document.addEventListener('click', function (e) {
      if (!section.contains(e.target)) {
        isOpen = false;

        chatBox.classList.remove('active');
        tooltip.classList.remove('hide');
        whatsappBtn.classList.remove('active');

        btnImg.src = gifSrc;
        btnImg.classList.remove('is-close-icon');
      }
    });

  });
})();

// ==============================================================
// - (Start) Expandable Search Bar
// ==============================================================

(() => {
  document.querySelectorAll('.expandable-search').forEach((wrapper) => {
    const input = wrapper.querySelector('input');
    if (!input) return;

    input.addEventListener('focus', () => {
      wrapper.style.width = '100%';
    });

    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        wrapper.style.width = '136px';
      }
    });
  });
})();

// ==============================================================
// - (End) Expandable Search Bar
// ==============================================================


// ==============================================================
// - (Start) Non-Regulated Activities - Nav list link scroll
// ==============================================================

(function () {
  const section = document.querySelector('.ng-activities-section');
  if (!section) return;

  const links = section.querySelectorAll('.ng-activities-nav .nav-link ul a[href^="#"]');
  const targets = [];

  links.forEach(function (link) {
    const id = link.getAttribute('href');
    const el = id && id !== '#' ? document.querySelector(id) : null;
    if (el) targets.push({ link: link, el: el });
  });

  // Uses the CSS `top` of the sticky main-heading — set by the developer to sit below ALL
  // sticky elements above (header + any secondary nav), so it's the correct full offset.
  function getStickyOffset() {
    const mainHeading = section.querySelector('.tab-content .main-heading');
    if (!mainHeading) return 0;
    const computedTop = parseFloat(window.getComputedStyle(mainHeading).top) || 0;
    return computedTop + mainHeading.offsetHeight + 16;
  }

  // Flag to stop the scroll listener from overriding the active class during smooth scroll
  let isProgrammaticScroll = false;
  let scrollEndTimer = null;

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      // Set active immediately on click
      links.forEach(function (l) { l.classList.remove('active'); });
      this.classList.add('active');

      // Block scroll listener until smooth scroll finishes (~600ms)
      isProgrammaticScroll = true;
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(function () {
        isProgrammaticScroll = false;
      }, 700);

      const offset = getStickyOffset();
      const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // Update active link based on scroll position (suppressed during programmatic scroll)
  function updateActiveLinks() {
    if (isProgrammaticScroll) return;
    const offset = getStickyOffset();
    let activeLink = null;

    targets.forEach(function (t) {
      if (t.el.getBoundingClientRect().top <= offset) {
        activeLink = t.link;
      }
    });

    links.forEach(function (l) { l.classList.remove('active'); });
    if (activeLink) activeLink.classList.add('active');
  }

  window.addEventListener('scroll', updateActiveLinks, { passive: true });
  updateActiveLinks();
})();

// ==============================================================
// - (End) Non-Regulated Activities - Nav list link scroll
// ==============================================================




// ==============================================================
// - (Start) All-in-One Text Media Block
// ==============================================================

(function () {
  'use strict';

  var PLAY_ICON  = '<img src="assets/images/icons/play-icon.png" alt="play icon">';
  var PAUSE_ICON = '<img src="assets/images/icons/pause-icon.png" alt="pause icon">';
  var DURATION   = 420;
  var EASE       = 'cubic-bezier(0.4, 0, 0.2, 1)';

  // ── Read more / read less with measured-height transition ─────────
  // Intercepts clicks inside .text-media-block so the global jQuery
  // handler (document-level) does not double-fire.
  function initReadMore(block) {
    block.querySelectorAll('.read-more-wrapper').forEach(function (wrapper) {
      var content     = wrapper.querySelector('.read-more-content');
      var btnMore     = wrapper.querySelector('.read-more');
      var btnLess     = wrapper.querySelector('.read-less');

      if (!content || !btnMore || !btnLess) return;

      // Collapsed height is measured lazily on the first expand so that
      // display:none wrappers (e.g. .content-read-more-wrap before
      // .with-read-more is applied) return a real value.
      var collapsedH = null;

      function getCollapsedH() {
        if (collapsedH === null) {
          collapsedH = content.getBoundingClientRect().height;
        }
        return collapsedH;
      }

      function animateTo(fromH, toH, afterFn) {
        content.style.overflow   = 'hidden';
        content.style.transition = 'none';
        content.style.maxHeight  = fromH + 'px';
        content.offsetHeight; // force reflow

        content.style.transition = 'max-height ' + DURATION + 'ms ' + EASE;
        content.style.maxHeight  = toH + 'px';

        function onEnd() {
          content.removeEventListener('transitionend', onEnd);
          content.style.transition = '';
          content.style.maxHeight  = '';
          content.style.overflow   = '';
          if (afterFn) afterFn();
        }
        content.addEventListener('transitionend', onEnd);
      }

      btnMore.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation(); // block global jQuery handler

        var fromH = getCollapsedH();

        // Remove collapsed BEFORE measuring full height so line-clamp
        // and CSS max-height are both lifted, revealing true scrollHeight.
        content.classList.remove('collapsed');
        content.offsetHeight;
        var toH = content.scrollHeight;

        animateTo(fromH, toH);

        btnMore.classList.add('d-none');
        btnLess.classList.remove('d-none');
      });

      btnLess.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var fromH = content.scrollHeight;
        var toH   = getCollapsedH();

        // Animate collapse, then restore collapsed class so CSS
        // re-applies line-clamp / max-height for the resting state.
        animateTo(fromH, toH, function () {
          content.classList.add('collapsed');
        });

        btnMore.classList.remove('d-none');
        btnLess.classList.add('d-none');
      });
    });
  }

  // ── Video no-controls ─────────────────────────────────────────────
  function initVideo(block) {
    if (!block.classList.contains('video-no-controls')) return;

    var video = block.querySelector('.tmb-video');
    var btn   = block.querySelector('.tmb-play-btn');
    if (!video || !btn) return;

    video.removeAttribute('controls');

    function setPlaying(playing) {
      btn.innerHTML = playing ? PAUSE_ICON : PLAY_ICON;
      block.classList.toggle('tmb-playing', playing);
    }

    function toggle() {
      if (video.paused) { video.play();  setPlaying(true);  }
      else              { video.pause(); setPlaying(false); }
    }

    btn.addEventListener('click', toggle);
    video.addEventListener('click', toggle);
    video.addEventListener('ended', function () { setPlaying(false); });
  }

  // ── Init all blocks ───────────────────────────────────────────────
  function init() {
    var blocks = document.querySelectorAll('.text-media-block');
    if (!blocks.length) return;
    blocks.forEach(function (block) {
      initReadMore(block);
      initVideo(block);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ==============================================================
// - (End) All-in-One Text Media Block
// ==============================================================

// ==============================================================
// Taxation Table – mobile filter toggle (equalizer icon)
// ==============================================================
(function () {
  var section   = document.querySelector('.taxation-table-section');
  if (!section) return;

  var toggleBtn = section.querySelector('.filter-toggle-btn');
  var filerBox  = section.querySelector('.filer-box');
  if (!toggleBtn || !filerBox) return;

  toggleBtn.addEventListener('click', function () {
    var isOpen = filerBox.classList.toggle('open');
    toggleBtn.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
})();

// ==============================================================
// Taxation Table – sticky-header height + mobile mirror-thead sync
// ==============================================================
(function () {
  var section      = document.querySelector('.taxation-table-section');
  var stickyHdr    = section && section.querySelector('.sticky-header');
  var mirrorTable  = section && section.querySelector('.table-thead-mirror table');
  var tableWrap    = section && section.querySelector('.table-responsive');
  var bodyTable    = tableWrap && tableWrap.querySelector('table');

  if (!section || !stickyHdr) return;

  // 1. Keep --tax-sticky-height accurate so desktop thead top is always correct
  function updateHeight() {
    requestAnimationFrame(function () {
      section.style.setProperty('--tax-sticky-height', stickyHdr.offsetHeight + 'px');
    });
  }

  window.addEventListener('resize', updateHeight);
  if (window.ResizeObserver) {
    new ResizeObserver(updateHeight).observe(stickyHdr);
  }

  // 2. On mobile: stamp the body table's actual rendered column widths onto the mirror thead.
  //    CSS percentages on two separate tables can resolve to different pixels, so we measure
  //    and apply exact pixel values from the source of truth (the body table).
  function syncColWidths() {
    if (!mirrorTable || !bodyTable) return;
    if (window.innerWidth >= 768) {
      // Desktop: clear any inline widths set by a previous mobile pass
      var ths = mirrorTable.querySelectorAll('thead th');
      for (var i = 0; i < ths.length; i++) {
        ths[i].style.width = '';
      }
      mirrorTable.style.minWidth = '';
      return;
    }
    // Mobile: real thead is hidden; sync mirror thead column widths from tbody td widths.
    // Double-rAF ensures the browser has finished laying out the body table before we measure.
    var firstRow = bodyTable.querySelector('tbody tr');
    if (!firstRow) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var tds = firstRow.querySelectorAll('td');
        var ths = mirrorTable.querySelectorAll('thead th');
        for (var i = 0; i < Math.min(tds.length, ths.length); i++) {
          ths[i].style.width = tds[i].offsetWidth + 'px';
        }
        mirrorTable.style.minWidth = bodyTable.offsetWidth + 'px';
      });
    });
  }

  // 3. On mobile: sync mirror thead horizontal position with table scroll
  function syncScroll() {
    if (mirrorTable && tableWrap) {
      if (window.innerWidth < 768) {
        mirrorTable.style.transform = 'translateX(-' + tableWrap.scrollLeft + 'px)';
      } else {
        mirrorTable.style.transform = '';
      }
    }
  }

  if (tableWrap) {
    tableWrap.addEventListener('scroll', syncScroll, { passive: true });
  }

  window.addEventListener('resize', function () {
    syncColWidths();
    syncScroll();
  });

  function init() {
    updateHeight();
    syncColWidths();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
