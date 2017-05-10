google.maps.visualRefresh = true;
var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
var school = 'https://cdn2.iconfinder.com/data/icons/app-types-in-grey/512/app_type_university_512px_GREY.png';
var bangalore = { lat: 12.97, lng: 77.59 };
var markersAll = new Array();
var map;

var searchBox;
var markers = [];
var showPrimary = false;
var showSecondary = true;
var markerInfoWin;
var globalStrokeWeight = window.innerWidth < 400 ? 1 : 2;
var gender = 'BOYS';
var selectedSchool;
var selectedPoly;
var prevSelectedPoly;

// function initMap() {
//
//   var mapOptions = {
//       center: bangalore,
//       zoom: 12,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//   };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var drawingManager = new google.maps.drawing.DrawingManager({
      drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT,
          drawingModes: [
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.RECTANGLE,
          google.maps.drawing.OverlayType.POLYGON]
      }
  });

  google.maps.event.addListener(drawingManager, 'markercomplete', function (marker) {
      var position = marker.getPosition().toUrlValue(2);
      $('#marker-position').append(position + '<br>');
  });


  google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle) {
      var position = circle.getCenter();
      var rad = circle.getRadius();
      $('#marker-position').append('Centre => '+position +'<br>Radius =>' + rad+'<br>');
  });

  google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
      var position = polygon.getPath();
      $('#marker-position').append('Polygon => '+position.getArray());
  });

  google.maps.event.addListener(drawingManager, 'polylinecomplete', function (polyline) {
      var position = polyline.getPath();
      $('#marker-position').append('polyline => '+position.getArray());
  });

  google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
      var position = rectangle.getBounds();
      $('#marker-position').append('rectangle => '+position);
  });

  drawingManager.setMap(map);

  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: bangalore,
    radius: 10000,
    type: ['school']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: school,
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(30, 30)
    }
  });

  markersAll.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });

  function show(category) {
      for (var i = 0; i < markersAll.length; i++) {
          markersAll[i].setVisible(true);
      }
  }
  function hide(category) {
      for (var i = 0; i < markersAll.length; i++) {
          markersAll[i].setVisible(false);
      }
  }

  hide();

  $(".checkbox").click(function() {
    //   var cat = $(this).attr("value");
      // If checked
      if ($(this).is(":checked")) {
          show();
      } else {
          hide();
      }
  });
}
