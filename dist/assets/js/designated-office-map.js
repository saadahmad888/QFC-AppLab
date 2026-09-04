(function () {
    'use strict';

  
    const locations = [
        {
            id: 1,
            title: 'HNBK Square 1',
            address: 'Building Number 7, Al Sulaimi Street, Number 920, Fareej Abdel Aziz, Zone 14',
            lat: 25.2854,
            lng: 51.5314
        },
        {
            id: 2,
            title: 'Al Emadi Financial Square',
            address: 'Building Number 7, Al Sulaimi Street, Number 920, Fareej Abdel Aziz, Zone 14',
            lat: 25.2860,
            lng: 51.5320
        },
        {
            id: 3,
            title: 'Al Baraha Tower',
            address: 'Building Number 7, Al Sulaimi Street, Number 920, Fareej Abdel Aziz, Zone 14',
            lat: 25.2848,
            lng: 51.5308
        },
        {
            id: 4,
            title: 'Al Baraha Tower',
            address: 'Building Number 7, Al Sulaimi Street, Number 920, Fareej Abdel Aziz, Zone 14',
            lat: 25.2842,
            lng: 51.5302
        },
        {
            id: 5,
            title: 'Al Baraha Tower',
            address: 'Building Number 7, Al Sulaimi Street, Number 920, Fareej Abdel Aziz, Zone 14',
            lat: 25.2850,
            lng: 51.5310
        },
        {
            id: 6,
            title: 'Al Baraha Tower',
            address: 'Building Number 7, Al Sulaimi Street, Number 920, Fareej Abdel Aziz, Zone 14',
            lat: 25.2856,
            lng: 51.5316
        }
    ];

    let map;
    let markers = [];

    // Custom marker icon
    function createCustomIcon() {
        return L.divIcon({
            className: 'custom-marker',
            html: `
                <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_f_17972_12107)">
<ellipse cx="14.1199" cy="34.1186" rx="4.70588" ry="2.35294" fill="black" fill-opacity="0.12"/>
</g>
<mask id="path-2-outside-1_17972_12107" maskUnits="userSpaceOnUse" x="1.32812" y="1.23438" width="37" height="46" fill="black">
<rect fill="white" x="1.32812" y="1.23438" width="37" height="46"/>
<path d="M19.9951 3.23438C29.1997 3.23455 36.6611 10.4772 36.6611 19.4111C36.661 24.7031 34.0429 29.4013 29.9951 32.3525H30C26.8621 34.6367 22.3334 38.2676 21.291 44.1611C21.1855 44.7568 20.7099 45.227 20.1191 45.2832L20 45.2891C19.3549 45.2891 18.8215 44.7963 18.709 44.1611C17.6864 38.3794 13.3081 34.7757 10.1797 32.4844C6.02708 29.5424 3.32822 24.7832 3.32812 19.4111C3.32812 10.4771 10.7904 3.23438 19.9951 3.23438Z"/>
</mask>
<path d="M19.9951 3.23438C29.1997 3.23455 36.6611 10.4772 36.6611 19.4111C36.661 24.7031 34.0429 29.4013 29.9951 32.3525H30C26.8621 34.6367 22.3334 38.2676 21.291 44.1611C21.1855 44.7568 20.7099 45.227 20.1191 45.2832L20 45.2891C19.3549 45.2891 18.8215 44.7963 18.709 44.1611C17.6864 38.3794 13.3081 34.7757 10.1797 32.4844C6.02708 29.5424 3.32822 24.7832 3.32812 19.4111C3.32812 10.4771 10.7904 3.23438 19.9951 3.23438Z" fill="#EA352B"/>
<path d="M19.9951 3.23438L19.9951 2.0579H19.9951V3.23438ZM36.6611 19.4111L37.8376 19.4112V19.4111H36.6611ZM29.9951 32.3525L29.302 31.4019L26.3846 33.529H29.9951V32.3525ZM30 32.3525L30.6924 33.3037L33.6152 31.1761H30V32.3525ZM21.291 44.1611L22.4495 44.3663L22.4495 44.366L21.291 44.1611ZM20.1191 45.2832L20.1769 46.4583L20.2038 46.4569L20.2306 46.4544L20.1191 45.2832ZM20 45.2891V46.4655H20.0289L20.0578 46.4641L20 45.2891ZM18.709 44.1611L17.5505 44.366L17.5505 44.3663L18.709 44.1611ZM10.1797 32.4844L10.8748 31.5352L10.8674 31.5298L10.8598 31.5244L10.1797 32.4844ZM3.32812 19.4111H2.15165V19.4112L3.32812 19.4111ZM19.9951 3.23438L19.9951 4.41085C28.5832 4.41101 35.4847 11.1598 35.4847 19.4111H36.6611H37.8376C37.8376 9.79468 29.8162 2.05809 19.9951 2.0579L19.9951 3.23438ZM36.6611 19.4111L35.4847 19.4111C35.4846 24.3028 33.0663 28.6573 29.302 31.4019L29.9951 32.3525L30.6882 33.3032C35.0194 30.1453 37.8375 25.1035 37.8376 19.4112L36.6611 19.4111ZM29.9951 32.3525V33.529H30V32.3525V31.1761H29.9951V32.3525ZM30 32.3525L29.3076 31.4014C26.167 33.6876 21.2638 37.5601 20.1325 43.9562L21.291 44.1611L22.4495 44.366C23.403 38.9752 27.5573 35.5858 30.6924 33.3037L30 32.3525ZM21.291 44.1611L20.1326 43.9559C20.1234 44.0078 20.0984 44.0505 20.0695 44.0785C20.0419 44.1052 20.0197 44.1109 20.0077 44.112L20.1191 45.2832L20.2306 46.4544C21.3926 46.3438 22.2598 45.4371 22.4495 44.3663L21.291 44.1611ZM20.1191 45.2832L20.0614 44.1082L19.9422 44.114L20 45.2891L20.0578 46.4641L20.1769 46.4583L20.1191 45.2832ZM20 45.2891V44.1126C19.9853 44.1126 19.9642 44.1087 19.9361 44.0838C19.9052 44.0563 19.8773 44.0116 19.8674 43.9559L18.709 44.1611L17.5505 44.3663C17.7522 45.5048 18.7268 46.4655 20 46.4655V45.2891ZM18.709 44.1611L19.8675 43.9562C18.7573 37.6794 14.0159 33.8358 10.8748 31.5352L10.1797 32.4844L9.48453 33.4335C12.6002 35.7155 16.6154 39.0793 17.5505 44.366L18.709 44.1611ZM10.1797 32.4844L10.8598 31.5244C6.99736 28.788 4.50468 24.3764 4.5046 19.4111L3.32812 19.4111L2.15165 19.4112C2.15176 25.1899 5.05679 30.2968 9.49959 33.4443L10.1797 32.4844ZM3.32812 19.4111H4.5046C4.5046 11.1597 11.4068 4.41085 19.9951 4.41085V3.23438V2.0579C10.174 2.0579 2.15165 9.79451 2.15165 19.4111H3.32812Z" fill="url(#paint0_linear_17972_12107)" mask="url(#path-2-outside-1_17972_12107)"/>
<ellipse cx="19.9948" cy="19.412" rx="6.66667" ry="6.47059" fill="white"/>
<defs>
<filter id="filter0_f_17972_12107" x="7.06112" y="29.4127" width="14.118" height="9.41096" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="1.17647" result="effect1_foregroundBlur_17972_12107"/>
</filter>
<linearGradient id="paint0_linear_17972_12107" x1="19.9946" y1="3.23437" x2="19.9946" y2="45.2891" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0.35"/>
</linearGradient>
</defs>
</svg>

            `,
            iconSize: [30, 40],
            iconAnchor: [20, 50],
            popupAnchor: [0, -50]
        });
    }

    function initMap() {
        const mapContainer = document.getElementById('designated-office-map');
        if (!mapContainer) return;

        // Default center (Qatar/Doha area) - average of all locations
        const avgLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
        const avgLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;
        const defaultCenter = [avgLat, avgLng];

        // Initialize map with a reasonable zoom level
        map = L.map('designated-office-map', {
            zoomControl: true,
            attributionControl: true,
            zoom: 15,
            center: defaultCenter
        });

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Invalidate map size to ensure proper rendering
        setTimeout(function () {
            map.invalidateSize();
        }, 100);

        // Wait for map to be ready
        map.whenReady(function () {
            // Invalidate size again after tiles load
            map.invalidateSize();

            // Create custom icon
            const customIcon = createCustomIcon();

            // Create markers for each location
            locations.forEach((location) => {
                const marker = L.marker([location.lat, location.lng], {
                    icon: customIcon,
                    title: location.title,
                    zIndexOffset: 1000,
                    riseOnHover: true
                }).addTo(map);

                // Create popup content matching the card design
                const popupContent = `
                    <div class="leaflet-popup-card">
                        <h3 class="leaflet-popup-card__title">${location.title}</h3>
                        <div class="leaflet-popup-card__address">
                            <i class="bi bi-geo-alt-fill leaflet-popup-card__icon"></i>
                            <span class="leaflet-popup-card__text">${location.address}</span>
                        </div>
                        <button class="leaflet-popup-card__button" type="button" data-bs-toggle="offcanvas" data-bs-target="#leadershipModal" aria-controls="leadershipModal">Contact Us</button>
                    </div>
                `;

                marker.bindPopup(popupContent, {
                    className: 'custom-popup',
                    maxWidth: 430
                });

                // Add click event to marker
                marker.on('click', function () {
                    updateMarkerCard(location);
                });

                marker.on('popupopen', function() {
                    setTimeout(function() {
                        const popupButton = document.querySelector('.leaflet-popup-card__button');
                        if (popupButton) {
                            popupButton.addEventListener('click', function(e) {
                                map.closePopup();
                            });
                        }
                    }, 50);
                });

                markers.push(marker);
            });

            setTimeout(function () {
                if (markers.length > 0) {
                    const group = new L.featureGroup(markers);
                    const bounds = group.getBounds();

                    if (bounds.isValid()) {
                        const ne = bounds.getNorthEast();
                        const sw = bounds.getSouthWest();
                        const latDiff = ne.lat - sw.lat;
                        const lngDiff = ne.lng - sw.lng;

                        if (latDiff < 0.01 && lngDiff < 0.01) {
                            map.setView([avgLat, avgLng], 15);
                        } else {
                            map.fitBounds(bounds, {
                                padding: [50, 50],
                                maxZoom: 16
                            });
                        }
                    } else {
                        // Fallback: set view to first marker
                        map.setView([locations[0].lat, locations[0].lng], 15);
                    }

                    // Invalidate size one more time after fitting bounds
                    map.invalidateSize();
                }
            }, 200);

            // Show first location by default
            if (locations.length > 0) {
                updateMarkerCard(locations[0]);
            }
        });
    }

    function updateMarkerCard(location) {
        const markerCard = document.querySelector('.map-marker');
        if (markerCard) {
            const titleEl = markerCard.querySelector('.map-marker__title');
            const addressEl = markerCard.querySelector('.map-marker__text');

            if (titleEl) titleEl.textContent = location.title;
            if (addressEl) addressEl.textContent = location.address;
        }
    }

    // Initialize map when DOM and Leaflet are ready
    function initializeMapScript() {
        const mapContainer = document.getElementById('designated-office-map');
        if (!mapContainer) return;

        // Check if the tab is active (map container is visible)
        const tabPane = mapContainer.closest('.tab-pane');
        const isTabActive = tabPane && tabPane.classList.contains('active') && tabPane.classList.contains('show');

        // If tab is not active, wait for it to become active
        if (!isTabActive && tabPane) {
            // Listen for tab show event
            const tabButton = document.querySelector('[data-bs-target="#board"], [href="#board"]');
            if (tabButton) {
                tabButton.addEventListener('shown.bs.tab', function () {
                    setTimeout(initializeMapScript, 100);
                });
            }
            return;
        }

        // Check if Leaflet is loaded
        if (typeof L === 'undefined') {
            // Load Leaflet CSS
            if (!document.querySelector('link[href*="leaflet"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
                link.crossOrigin = '';
                document.head.appendChild(link);
            }

            // Load Leaflet JS
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
            script.crossOrigin = '';
            script.onload = function () {
                // Add custom marker styles
                addMarkerStyles();
                // Wait a bit for CSS to load
                setTimeout(function () {
                    initMap();
                }, 100);
            };
            script.onerror = function () {
                mapContainer.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f5f5; color: #d32f2f; padding: 20px; text-align: center;">
                        <div>
                            <p style="margin: 0; font-size: 14px;">Failed to load map library. Please check your internet connection.</p>
                        </div>
                    </div>
                `;
            };
            document.head.appendChild(script);
        } else {
            // If map already exists, don't reinitialize
            if (map) return;

            addMarkerStyles();
            // Wait a bit to ensure container is visible
            setTimeout(function () {
                initMap();
            }, 100);
        }
    }

    function addMarkerStyles() {
        // Add custom styles for markers if not already added
        if (!document.getElementById('leaflet-custom-marker-styles')) {
            const style = document.createElement('style');
            style.id = 'leaflet-custom-marker-styles';
            style.textContent = `
                .custom-marker {
                    background: transparent !important;
                    border: none !important;
                    cursor: pointer;
                }
                .custom-marker svg {
                    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
                    transition: transform 0.2s ease;
                }
                .custom-marker:hover svg {
                    transform: scale(1.1);
                }
                
                /* Custom Popup Styles */
                .custom-popup .leaflet-popup-content-wrapper {
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    padding: 0;
                    border: none;
                }
                
                .custom-popup .leaflet-popup-content {
                    margin: 0;
                    padding: 0;
                }
                
                .custom-popup .leaflet-popup-tip {
                    background: #ffffff;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
                
                .leaflet-popup-card {
                    background-color: #ffffff;
                    border-radius: 12px;
                    padding: 24px;
                    max-width: 430px;
                    min-width: 280px;
                }
                
                .leaflet-popup-card__title {
                    font-weight: 600;
                    color: #603F83;
                    margin: 0 0 16px 0;
                    line-height: 1.2;
                    font-size: 20px;
                }
                
                .leaflet-popup-card__address {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    margin-bottom: 20px;
                }
                
                .leaflet-popup-card__icon {
                    color: #000000;
                    font-size: 16px;
                    margin-top: 2px;
                    flex-shrink: 0;
                }
                
                .leaflet-popup-card__text {
                    font-size: 16px;
                    font-weight: 400;
                    color: #666666;
                    line-height: 1.5;
                }
                
                .leaflet-popup-card__button {
                    width: max-content;
                    padding: 12px 24px;
                    background-color: transparent;
                    border: 1px solid #603F83;
                    border-radius: 24px;
                    color: #603F83;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: inherit;
                }
                
                .leaflet-popup-card__button:hover {
                    background-color: #603F83;
                    color: #ffffff;
                }
                
                .leaflet-popup-card__button:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(96, 63, 131, 0.25);
                }
                
                #designated-office-map {
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }
                
                @media (max-width: 767.98px) {
                    .leaflet-popup-card {
                        min-width: 280px;
                        max-width: 100%;
                        padding: 20px;
                    }
                    
                    .leaflet-popup-card__title {
                        font-size: 18px;
                        margin-bottom: 12px;
                    }
                    
                    .leaflet-popup-card__text {
                        font-size: 14px;
                    }
                    
                    .leaflet-popup-card__button {
                        padding: 10px 20px;
                        font-size: 14px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMapScript);
    } else {
        initializeMapScript();
    }
})();
