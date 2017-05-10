// google.maps.visualRefresh = true;
var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
var school = 'https://cdn2.iconfinder.com/data/icons/app-types-in-grey/512/app_type_university_512px_GREY.png';
var bangalore = { lat: 12.97, lng: 77.59 };
var sydney = { lat: -33.898147, lng: 151.221058 };
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

function initMap() {

    var mapOptions = {
        center: sydney,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
            drawingModes: [
                google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.RECTANGLE,
                google.maps.drawing.OverlayType.POLYGON
            ]
        }
    });

    google.maps.event.addListener(drawingManager, 'markercomplete', function(marker) {
        var position = marker.getPosition().toUrlValue(2);
        $('#marker-position').append(position + '<br>');
    });


    google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
        var position = circle.getCenter();
        var rad = circle.getRadius();
        $('#marker-position').append('Centre => ' + position + '<br>Radius =>' + rad + '<br>');
    });

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
        var position = polygon.getPath();
        $('#marker-position').append('Polygon => ' + position.getArray());
    });

    google.maps.event.addListener(drawingManager, 'polylinecomplete', function(polyline) {
        var position = polyline.getPath();
        $('#marker-position').append('polyline => ' + position.getArray());
    });

    google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(rectangle) {
        var position = rectangle.getBounds();
        $('#marker-position').append('rectangle => ' + position);
    });

    drawingManager.setMap(map);

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: sydney,
        radius: 10000,
        type: ['school']
    }, callback);

    extendData();

    // Load GeoJSON.
     map.data.loadGeoJson(
         'https://storage.googleapis.com/mapsdevsite/json/google.json');

     // Set the stroke width, and fill color for each polygon
     map.data.setStyle({
       fillColor: 'green',
       strokeWeight: 1
     });
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

    // hide();

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

function extendData() {
	for (var i=0; i < data.schools.length; i++) {
		var school = data.schools[i];
		school.latlng = new google.maps.LatLng(school.lat, school.lng);
		var selected = school.id == selectedSchool;
		var primaryColor = 'black';
		var secondaryColor = 'blue';
		var strokeWeight = globalStrokeWeight;
		if (selected) {
			map.setCenter(school.latlng);
			if (school.gender == 'GIRLS') {
				gender = 'GIRLS';
			}
		}

		var color = primaryColor;
		if (school.type == 'PRIMARY') {
			school.marker = new google.maps.Marker({
				position : school.latlng,
				icon : 'http://schoolzones.net.au/marker.png',
				title : school.name,
				clickable : false
			});

			if (selected) {
				showPrimary = true;
				showSecondary = false;
			}
		} else if (school.type == 'SECONDARY') {
			school.marker = new google.maps.Marker({
				position : school.latlng,
				icon : 'http://schoolzones.net.au/markerBlue.png',
				title : school.name,
				clickable : false
			});
			color = secondaryColor;
		} else if (school.type == 'COMBINED') {
			school.marker = new google.maps.Marker({
				position : school.latlng,
				icon : 'http://schoolzones.net.au/markerGreen.png',
				title : school.name,
				clickable : false
			});
		}

		var points = [];
		for (var j=0; j < school.zone.length; j++) {
			var point = school.zone[j];
			points.push(new google.maps.LatLng(point.lat, point.lng));
		}

		var girlPoints = null;
		if (school.girlsZone != null) {
			girlPoints = [];
			for (var j=0; j < school.girlsZone.length; j++) {
				var point = school.girlsZone[j];
				girlPoints.push(new google.maps.LatLng(point.lat, point.lng));
			}
		}


		school.poly = new google.maps.Polygon({
			paths : points,
			clickable: true,
			strokeWeight: strokeWeight,
			strokeColor: color,
			fillOpacity: 0.0
		});
		addPolyListener(school.poly, school.id, school.name, school.marker);

		if (girlPoints != null) {
			if (school.type == 'COMBINED') {
				color = secondaryColor;
			}

			school.girlsPoly = new google.maps.Polygon({
				paths : girlPoints,
				clickable: true,
				strokeWeight: strokeWeight,
				strokeColor: color,
				fillOpacity: 0.0
			});
			addPolyListener(school.girlsPoly, school.id, school.name, school.marker);
		}

		if (school.secondaryZone != null) {
			points = [];
			for (var j=0; j < school.secondaryZone.length; j++) {
				var point = school.secondaryZone[j];
				points.push(new google.maps.LatLng(point.lat, point.lng));
			}

			school.secondaryPoly = new google.maps.Polygon({
				paths : points,
				clickable: true,
				strokeWeight: strokeWeight,
				strokeColor: secondaryColor,
				fillOpacity: 0.0
			});

			addPolyListener(school.secondaryPoly, school.id, school.name, school.marker);
		}
	}

	var selectedData = calcSchoolMarkers();
	if (selectedSchool != null) {
		selectSchool(selectedSchool, selectedData.poly, selectedData.name);
	}
}

function addPolyListener(poly, id, name, marker) {
	google.maps.event.addListener(poly, 'click', function() {
		if (markerInfoWin != null) {
			markerInfoWin.close();
		}

		markerInfoWin = new google.maps.InfoWindow({
			content: '<div><div>' + name + '</div></div>'
		});

		markerInfoWin.open(map, marker);
		selectSchool(id, poly, name);
	});
}

function calcSchoolMarkers() {
	var total = 0;
	var selectedData = {};
	for (var i=0; i < data.schools.length; i++) {
		var school = data.schools[i];
		var poly = null;
		if (school.type == 'PRIMARY') {
			if (showPrimary) {
				total++;
				school.marker.setMap(map);
				school.poly.setMap(map);
				poly = school.poly;
			} else {
				school.marker.setMap(null);
				school.poly.setMap(null);
			}
		}

		if (school.type == 'SECONDARY') {
			if (showSecondary && (school.gender == 'COED' || school.gender == gender)) {
				total++;
				school.marker.setMap(map);
				school.poly.setMap(map);
				poly = school.poly;
			} else {
				school.marker.setMap(null);
				school.poly.setMap(null);
			}
		}

		if (school.type == 'COMBINED') {
			if (school.gender == 'COED' || school.gender == gender) {
				total++;
				school.marker.setMap(map);
				if (showPrimary) {
					school.poly.setMap(map);
					poly = school.poly;
				} else {
					school.poly.setMap(null);
				}

				if (showSecondary) {
					if (gender == 'GIRLS') {
						if (school.girlsPoly != null) {
							school.girlsPoly.setMap(map);
							poly = school.girlsPoly;
							school.secondaryPoly.setMap(null);
						} else {
							showPoly(school.secondaryPoly, school.id);
						}
					} else {
						school.secondaryPoly.setMap(map);
						poly = school.secondaryPoly;
						if (school.girlsPoly != null) {
							school.girlsPoly.setMap(null);
						}
					}
				} else {
					school.secondaryPoly.setMap(null);
					if (school.girlsPoly != null) {
						school.girlsPoly.setMap(null);
					}
				}
			} else {
				school.marker.setMap(null);
				school.poly.setMap(null);
				school.secondaryPoly.setMap(null);
				if (school.girlsPoly != null) {
					school.girlsPoly.setMap(null);
				}
			}
		}

		if (school.id == selectedSchool) {
			selectedData.poly = poly;
			selectedData.name = school.name;
		}
	}

	$('#numSchools').text(total + ' schools');
	return selectedData;
}
