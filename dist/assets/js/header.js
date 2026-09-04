$(function(){
    // sticky header on scroll

    //  window.addEventListener('scroll', function () {
    //     const header = document.getElementById('main-header');

    //     if (window.scrollY > 50) {
    //         header.classList.add('sticky-header');
    //     } else {
    //         header.classList.remove('sticky-header');
    //     }
    // });
    let prevScrollPos = window.pageYOffset;
    const scrollThreshold = 10;

    window.addEventListener('scroll', function () {
        const header = document.getElementById('main-header');
        //if (!header) return;
        const tabs = document.getElementsByClassName('global-tabs');
        const currentScrollPos = window.pageYOffset;
        const scrollDifference = prevScrollPos - currentScrollPos;

        if (currentScrollPos <= 0) {
            header.classList.remove('sticky-header', 'scroll-down', 'scroll-up');
            if(tabs.length > 0) {
                tabs[0].classList.remove('sticky-tabs');
            }
            prevScrollPos = currentScrollPos;
            return;
        }

        // Always add sticky-header when scrolled
        header.classList.add('sticky-header');

        if (Math.abs(scrollDifference) > scrollThreshold) {
            if (scrollDifference > 0) {
                // Scrolling UP → show header
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
                
                if(tabs.length > 0) {
                    tabs[0].classList.remove('sticky-tabs');
                }
            } else {
                // Scrolling DOWN → hide header
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');

                if(tabs.length > 0) {
                    tabs[0].classList.add('sticky-tabs');
                }
            }

            prevScrollPos = currentScrollPos;
        }
    });

    // Smooth menu switching animation - Desktop only
    const menuItems = document.querySelectorAll('.header .navbar-nav li:has(.sub-menu)');
    let activeMenu = null;
    let menuTimeout = null;

    // Check if screen is desktop size
    const isDesktop = () => window.innerWidth >= 992;

    menuItems.forEach((menuItem) => {
        const subMenu = menuItem.querySelector('.sub-menu');
        const navLink = menuItem.querySelector('.nav-link');

        // Mouse enter on menu item - Desktop only
        menuItem.addEventListener('mouseenter', function() {
            // Only apply desktop hover effects on desktop screens
            if (!isDesktop()) {
                return;
            }

            // Clear any pending timeout
            if (menuTimeout) {
                clearTimeout(menuTimeout);
                menuTimeout = null;
            }

            if (activeMenu && activeMenu !== subMenu) {
                activeMenu.style.opacity = '0';
                activeMenu.style.visibility = 'hidden';
                activeMenu.style.transform = 'translateX(-50%) scaleY(0%) translateZ(100px)';
                activeMenu.style.pointerEvents = 'none';
                
                // Reset column animations
                const columns = activeMenu.querySelectorAll('.menu-column');
                columns.forEach(col => {
                    col.style.opacity = '0';
                    col.style.transform = 'translateY(-10px)';
                });

                setTimeout(() => {
                    showMenu(subMenu);
                }, 100);
            } else {
                showMenu(subMenu);
            }

            activeMenu = subMenu;
        });

        const hideMenu = () => {
            // Only apply desktop hover effects on desktop screens
            if (!isDesktop()) {
                return;
            }

            menuTimeout = setTimeout(() => {
                if (subMenu === activeMenu) {
                    subMenu.style.opacity = '0';
                    subMenu.style.visibility = 'hidden';
                    subMenu.style.transform = 'translateX(-50%) scaleY(0%) translateZ(100px)';
                    subMenu.style.pointerEvents = 'none';
                    
                    // Reset column animations
                    const columns = subMenu.querySelectorAll('.menu-column');
                    columns.forEach(col => {
                        col.style.opacity = '0';
                        col.style.transform = 'translateY(-10px)';
                    });
                    
                    activeMenu = null;
                }
            }, 150);
        };

        menuItem.addEventListener('mouseleave', hideMenu);
        if (subMenu) {
            subMenu.addEventListener('mouseleave', hideMenu);
        }
    });

    function showMenu(subMenu) {
        if (!subMenu) return;
        
        // Only apply desktop styles on desktop screens
        if (!isDesktop()) {
            return;
        }
        
        subMenu.style.opacity = '1';
        subMenu.style.visibility = 'visible';
        subMenu.style.transform = 'translateX(-50%) scaleY(1) translateZ(0)';
        subMenu.style.pointerEvents = 'auto';
        
        // Animate columns with staggered delay
        const columns = subMenu.querySelectorAll('.menu-column');
        columns.forEach((col, index) => {
            setTimeout(() => {
                col.style.opacity = '1';
                col.style.transform = 'translateY(0)';
            }, 50 + (index * 50));
        });
    }

    // Clear desktop inline styles on mobile
    const clearDesktopStyles = () => {
        if (!isDesktop()) {
            const subMenus = document.querySelectorAll('.sub-menu');
            subMenus.forEach(subMenu => {
                // Remove inline styles that interfere with mobile
                subMenu.style.opacity = '';
                subMenu.style.visibility = '';
                subMenu.style.transform = '';
                subMenu.style.pointerEvents = '';
                
                // Clear column styles
                const columns = subMenu.querySelectorAll('.menu-column');
                columns.forEach(col => {
                    col.style.opacity = '';
                    col.style.transform = '';
                });
            });
        }
    };

    // Clear styles on window resize
    window.addEventListener('resize', function() {
        clearDesktopStyles();
    });

    // Clear styles on initial load if mobile
    clearDesktopStyles();

    // Mobile menu accordion functionality
    const mobileMenuToggles = document.querySelectorAll('.mobile-menu-toggle');
    const mobileSubmenuToggles = document.querySelectorAll('.mobile-submenu-toggle');

    // Handle main menu toggles
    mobileMenuToggles.forEach((toggle) => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const li = this.closest('li');
            const subMenu = li.querySelector('.sub-menu');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const icon = this.querySelector('i');
            
            if (subMenu) {
                if (isExpanded) {
                    // Close accordion
                    subMenu.classList.remove('mobile-open');
                    this.setAttribute('aria-expanded', 'false');
                    if (icon) {
                        icon.classList.remove('bi-chevron-up');
                        icon.classList.add('bi-chevron-down');
                    }
                    
                    // Close all nested submenus
                    const nestedToggles = subMenu.querySelectorAll('.mobile-submenu-toggle');
                    nestedToggles.forEach(nestedToggle => {
                        const nestedSubmenu = nestedToggle.closest('li').querySelector('.sub-sub-menu');
                        if (nestedSubmenu) {
                            nestedSubmenu.classList.remove('mobile-open');
                            nestedToggle.setAttribute('aria-expanded', 'false');
                            const nestedIcon = nestedToggle.querySelector('i');
                            if (nestedIcon) {
                                nestedIcon.classList.remove('bi-chevron-up');
                                nestedIcon.classList.add('bi-chevron-down');
                            }
                        }
                    });
                } else {
                    // Open accordion
                    subMenu.classList.add('mobile-open');
                    this.setAttribute('aria-expanded', 'true');
                    if (icon) {
                        icon.classList.remove('bi-chevron-down');
                        icon.classList.add('bi-chevron-up');
                    }
                    // Scroll into view if needed
                    setTimeout(() => {
                        subMenu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            }
        });
    });

    // Handle nested submenu toggles
    mobileSubmenuToggles.forEach((toggle) => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const li = this.closest('li');
            const subSubMenu = li.querySelector('.sub-sub-menu');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const icon = this.querySelector('i');
            
            if (subSubMenu) {
                if (isExpanded) {
                    // Close accordion
                    subSubMenu.classList.remove('mobile-open');
                    this.setAttribute('aria-expanded', 'false');
                    if (icon) {
                        icon.classList.remove('bi-chevron-up');
                        icon.classList.add('bi-chevron-down');
                    }
                } else {
                    // Open accordion
                    subSubMenu.classList.add('mobile-open');
                    this.setAttribute('aria-expanded', 'true');
                    if (icon) {
                        icon.classList.remove('bi-chevron-down');
                        icon.classList.add('bi-chevron-up');
                    }
                }
            }
        });
    });

    // Close all mobile menus when clicking outside or closing main menu
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && !navbarCollapse.contains(e.target) && !e.target.closest('.navbar-toggler')) {
                // Close all accordions when menu is closed
                const allToggles = document.querySelectorAll('.mobile-menu-toggle, .mobile-submenu-toggle');
                allToggles.forEach(toggle => {
                    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                    if (isExpanded) {
                        toggle.click();
                    }
                });
            }
        }
    });

    // Search Overlay Toggle (Desktop >=1200px)
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchBackdrop = document.getElementById('search-backdrop');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const searchOverlayInput = document.getElementById('search-overlay-input');

    const isDesktopSearch = () => window.innerWidth >= 1200;

    function openSearchOverlay() {
        if (isDesktopSearch() && searchOverlay) {
            searchOverlay.classList.add('active');
            if (searchBtn) {
                searchBtn.classList.add('search-active');
            }
            document.body.style.overflow = 'hidden';
            // Focus on input after animation
            setTimeout(() => {
                if (searchOverlayInput) {
                    searchOverlayInput.focus();
                }
            }, 100);
        }
    }

    function closeSearchOverlay() {
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
            if (searchBtn) {
                searchBtn.classList.remove('search-active');
            }
            document.body.style.overflow = '';
        }
    }

    // Open overlay when search button is clicked (desktop only)
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (isDesktopSearch()) {
                openSearchOverlay();
            }
        });
    }

    // Close overlay when close button is clicked
    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeSearchOverlay();
        });
    }

    // Close overlay when backdrop is clicked
    if (searchBackdrop) {
        searchBackdrop.addEventListener('click', function() {
            closeSearchOverlay();
        });
    }

    // Close overlay on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
            closeSearchOverlay();
        }
    });

    // Handle form submission in overlay
    const searchOverlayForm = document.querySelector('.search-overlay-form');
    if (searchOverlayForm) {
        searchOverlayForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your search logic here
            const searchTerm = searchOverlayInput ? searchOverlayInput.value : '';
            console.log('Searching for:', searchTerm);
            // You can add actual search functionality here
        });
    }

})