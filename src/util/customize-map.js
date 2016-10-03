/* global d3, google */

export function customizeMap(map) {
  var styledMapType = new google.maps.StyledMapType(
    [{
      'featureType': 'landscape',
      'stylers': [{'saturation': -100}, {'lightness': 65}, {'visibility': 'on'}]
    }, {
      'featureType': 'poi',
      'stylers': [{'saturation': -100}, {'lightness': 51}, {'visibility': 'simplified'}]
    }, {
      'featureType': 'road.highway',
      'stylers': [{'saturation': -100}, {'visibility': 'simplified'}]
    }, {
      'featureType': 'road.arterial',
      'stylers': [{'saturation': -100}, {'lightness': 30}, {'visibility': 'on'}]
    }, {
      'featureType': 'road.local',
      'stylers': [{'saturation': -100}, {'lightness': 40}, {'visibility': 'on'}]
    }, {
      'featureType': 'transit',
      'stylers': [{'saturation': -100}, {'visibility': 'simplified'}]
    }, {'featureType': 'administrative.province', 'stylers': [{'visibility': 'off'}]}, {
      'featureType': 'water',
      'elementType': 'labels',
      'stylers': [{'visibility': 'on'}, {'lightness': -25}, {'saturation': -100}]
    }, {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [{'hue': '#ffff00'}, {'lightness': -25}, {'saturation': -97}]
    }],
    {name: 'Styled Map'});

  var nightStyledMapType = new google.maps.StyledMapType(
    [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  );
  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('night', nightStyledMapType);
  map.mapTypes.set('day', styledMapType);
  map.setMapTypeId('day');
}
