document.addEventListener('DOMContentLoaded', () => {
  const map = new google.maps.Map(document.querySelector(".location__map-content"), {
    center: { lat: 50.4624399, lng: 30.4996779 },
    zoom: 16,
    disableDefaultUI: true,
    styles: [
      {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#686868"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "lightness": "-22"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "saturation": "-51"
          },
          {
            "lightness": "11"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
          {
            "saturation": "3"
          },
          {
            "lightness": "-56"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "lightness": "-52"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "weight": "6.13"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
          {
            "weight": "1.24"
          },
          {
            "saturation": "-100"
          },
          {
            "lightness": "-10"
          },
          {
            "gamma": "0.94"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "lightness": "-16"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "saturation": "-41"
          },
          {
            "lightness": "-41"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "weight": "5.46"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "lightness": "-16"
          },
          {
            "weight": "0.72"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "lightness": "-37"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#b7e4f4"
          },
          {
            "visibility": "on"
          }
        ]
      }
    ]
  });

  const markers = [
    {
      position: { lat: 50.4624399, lng: 30.4996779 },
      icon: "assets/images/maps/complex.svg",
      category: 'complex'
    },
    {
      position: { lat: 51.4624399, lng: 30.4996779 },
      icon: "assets/images/maps/pharmacy.svg",
      category: 'pharmacy'
    },
    {
      position: { lat: 52.4624399, lng: 31.4996779 },
      icon: "assets/images/maps/park.svg",
      category: 'park'
    },
    {
      position: { lat: 48.4624399, lng: 30.4996779 },
      icon: "assets/images/maps/shop.svg",
      category: 'shop'
    },
    {
      position: { lat: 49.4624399, lng: 29.4996779 },
      icon: "assets/images/maps/shop.svg",
      category: 'shop'
    },
    {
      position: { lat: 49.4544399, lng: 29.4996779 },
      icon: "assets/images/maps/sport.svg",
      category: 'sport'
    },
    {
      position: { lat: 50.5515581, lng: 30.2126756 },
      icon: "assets/images/maps/study.svg",
      category: 'study'
    },
    {
      position: { lat: 50.5507493, lng: 30.2064472 },
      icon: "assets/images/maps/restaraunt.svg",
      category: 'restaraunt'
    },
  ]

  const infrastructure = {
    pharmacy: [
      {
        position: { lat: 51.4624399, lng: 30.4996779 },
        icon: "assets/images/maps/pharmacy.svg",
        category: 'pharmacy'
      },
    ],
    shop: [
      {
        position: { lat: 48.4624399, lng: 30.4996779 },
        icon: "assets/images/maps/shop.svg",
        category: 'shop'
      },
      {
        position: { lat: 49.4624399, lng: 29.4996779 },
        icon: "assets/images/maps/shop.svg",
        category: 'shop'
      },
    ],
    park: [
      {
        position: { lat: 50.5480098, lng: 30.2170865 },
        icon: "assets/images/maps/park.svg",
        category: 'park'
      },
    ],
    study: [
      {
        position: { lat: 49.4544399, lng: 29.4996779 },
        icon: "assets/images/maps/study.svg",
        category: 'study'
      }
    ],
    complex: [
      {
        position: { lat: 50.4624399, lng: 30.4996779 },
        icon: "assets/images/maps/complex.svg",
        category: 'complex'
      }
    ],
    restaraunt: [
      {
        position: { lat: 50.5507493, lng: 30.2064472 },
        icon: "assets/images/maps/restaraunt.svg",
        category: 'restaraunt'
      },
    ]
  }

  const markersOnMap = [];
  const activeCategories = new Set();
  function setMapOnAll(map) {
    markers.forEach((newMark) => {
      const marker = new google.maps.Marker(newMark);
      marker.setMap(map);
      marker.category = newMark.category;
      console.log(marker)
      activeCategories.add(newMark.category)
      markersOnMap.push(marker);
    })
  }

  function clearMarkers() {
    setMapOnAll(null);
  }

  function deleteMarkers() {
    clearMarkers();
  }

  $("[data-map]").each(function () {
    $(this).on("click", (e) => {
      e.preventDefault();
      $(this).toggleClass('infrastructure__item--active')
  
      if ($(this).hasClass('infrastructure__item--active')) {
        markers[$(this).data('map')] = infrastructure[$(this).data('map')]
        activeCategories.add(this.dataset.map);
        // console.log(activeCategories)
        // setMapOnAll(map)
        // return
      } else {
        activeCategories.delete(this.dataset.map);
      }
      console.log(activeCategories)
  
      delete markers[$(this).data('map')]
      newFilterMarkers(markersOnMap, activeCategories)
      // deleteMarkers()
    })
  })

  function newFilterMarkers(markersArray, categoriesArray) {
    markersArray.forEach((mark) => {
      if (categoriesArray.has(mark.category)) {
        mark.setVisible(true)
      } else {
        mark.setVisible(false)
      }
    
      // if (!mark.category) mark.setVisible(true)
    })
  }

  $('.js-infrastructure__item').each(function () {
    $(this).addClass('infrastructure__item--active')
    markers[$(this).data('map')] = infrastructure[$(this).data('map')]
    setMapOnAll(map)
  })

  $('.js-location__btn-infra').click((e) => {
    e.preventDefault

    $('.js-location__map-info').addClass('active')
  })

  $('.js-location__close').click(() => {
    $('.js-location__map-info').removeClass('active')
  })
})
