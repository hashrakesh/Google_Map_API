$(window).load(function() {

    var markers = new Array();

    var iconSrc = {};

    iconSrc['Dial-a-Ride'] = 'http://labs.google.com/ridefinder/images/mm_20_red.png';
    iconSrc['American Legion'] = 'http://labs.google.com/ridefinder/images/mm_20_green.png';
    iconSrc['Veterans of Foreign Wars'] = 'http://labs.google.com/ridefinder/images/mm_20_yellow.png';
    iconSrc['Nutrition'] = 'http://labs.google.com/ridefinder/images/mm_20_blue.png';

    //Further down, in new google.maps.Marker, the icon line becomes:
    // icon: iconSrc[locations[i][2]]


    var locations = [
        ['Boonton Town', '973-402-9410, ext. 631', 'Dial-a-Ride', 40.902, -74.407, 1],
        ['Boonton Township', '973-331-3336', 'Dial-a-Ride', 40.933, -74.425, 2],
        ['Butler Borough', '973-835-8885', 'Dial-a-Ride', 40.999497, -74.346326, 3],
        ['Chatham Boro and Chatham Township', '973-635-4565', 'Dial-a-Ride', 40.7372, -74.4253, 4],
        ['Chester Borough and Chester Township', '908-876-9496', 'Dial-a-Ride', 40.785999, -74.692904, 5],
        ['Denville Township', '973-625-7799', 'Dial-a-Ride', 40.892222, -74.4775, 6],
        ['Dover', '973-366-2200, ext. 126', 'Dial-a-Ride', 40.885899, -74.558241, 7],
        ['East Hanover', '973-428-3029', 'Dial-a-Ride', 40.82, -74.365, 8],
        ['Hanover Township', '973-428-2498', 'Dial-a-Ride', 40.816, -74.425, 9],
        ['Jefferson Township', '973-208-6123', 'Dial-a-Ride', 40.958, -74.591, 10],
        ['Kinnelon', '973-835-8885', 'Dial-a-Ride', 40.984, -74.386, 11],
        ['Lincoln Park', '973-835-8885', 'Dial-a-Ride', 40.924, -74.302, 12],
        ['Long Hill', '908-626-1101', 'Dial-a-Ride', 40.691, -74.475, 13],
        ['Madison', '973-593-3094', 'Dial-a-Ride', 40.759, -74.417, 14],
        ['Mendham Borough and Mendham Township', '973-543-2666', 'Dial-a-Ride', 40.779400, -74.598099, 15],
        ['Mine Hill', '973-366-2491, ext. 62', 'Dial-a-Ride', 40.8768878122, -74.602913445, 16],
        ['Montville', '973-331-3336', 'Dial-a-Ride', 40.9054189580323, -74.3525718707342, 17],
        ['Morris Township and Morristown', '973-267-1116', 'Dial-a-Ride', 40.8239279710449, -74.5057456930609, 18],
        ['Morristown', '973-267-2733', 'Dial-a-Ride', 40.7989, -74.478526, 19],
        ['Mt. Arlington', '973-398-2413', 'Dial-a-Ride', 40.914398, -74.639865, 20],
        ['Mt. Olive', '973-691-0900, ext. 7365 / 7331', 'Dial-a-Ride', 40.851, -74.733, 21],
        ['Netcong', '973-347-7307, ext. 116', 'Dial-a-Ride', 40.898, -74.706, 22],
        ['Parsippany-Troy Hills', '973-263-7161 / 7093', 'Dial-a-Ride', 40.852, -74.392, 23],
        ['Pequannock', '973-835-8885', 'Dial-a-Ride', 40.952, -74.299, 24],
        ['Randolph', '973-989-7084', 'Dial-a-Ride', 40.85, -74.566, 25],
        ['Riverdale', '973-835-8885', 'Dial-a-Ride', 40.9931, -74.3088, 26],
        ['Rockaway Borough', '973-627-2000', 'Dial-a-Ride', 40.901, -74.514, 27],
        ['Rockaway Township', '973-893-2839', 'Dial-a-Ride', 40.95, -74.466, 28],
        ['Roxbury Township', '973-448-2029', 'Dial-a-Ride', 40.858, -74.658, 29],
        ['Washington Township', '908-876-9496', 'Dial-a-Ride', 40.791, -74.8, 30],
        ['Wharton', '973-659-9111', 'Dial-a-Ride', 40.893, -74.582, 31],

        ['Boonton Post', '210 Main St.<br>Boonton, NJ 07005', 'American Legion',40.902857, -74.407712,32 ],
        ['John A. Dean Post', '15 Kiel Ave.<br>Butler, NJ 07403', 'American Legion',41.00276744260799, -74.35810804367065,33 ],
        ['Chatham Post', 'Box 11<br>Chatham, NJ 07928', 'American Legion',40.73794, -74.38449,34 ],
        ['Bernays Apgar Post', 'P.O. Box 342<br>Chester, NJ 07930', 'American Legion',40.78721, -74.68885,35 ],
        ['Denville Memorial Post', 'Legion Place<br>Denville, NJ 07834', 'American Legion',40.894537669741894, -74.48481559753418,36 ],
        ['William H. Baker Post', '2 Legion Place<br>Dover, NJ 07801', 'American Legion',40.88243629753742, -74.56002473831177,37 ],
        ['James P. Collins Post', '96 Mt. Pleasant Ave.<br>East Hanover, NJ 07936', 'American Legion',40.8038371384793, -74.36926603317261,38 ],
        ['Frank Patterson Post', '20 Ridgedale Ave.<br>Florham Park, NJ 07932', 'American Legion',40.77305062967737, -74.40246105194092,39 ],
        ['Roxbury Memorial Post', '6 Johnson Ave.<br>Hopatcong, NJ 07843', 'American Legion',40.92226838897989, -74.65842962265015,40 ],
        ['Parsippanong Post', 'P.O. Box 196<br>Lake Hiawatha, NJ 07034', 'American Legion',40.88249, -74.38228,41 ],
        ['William H. Flatt, Jr., Post', 'Espanong Rd.<br>Lake Hopatcong, NJ 07849', 'American Legion',40.95903013727964, -74.61338996887207,42 ],
        ['Lincoln Park Post', '133 Main St.<br>Lincoln Park, NJ 07035', 'American Legion',40.92304662732747, -74.3101716041565,43 ],
        ['Mendham Post', 'Garaband Center<br>Mendham, NJ 07945', 'American Legion',40.77742172100596, -74.59407806396484,44 ],
        ['Mine Hill Memorial Post', '1 Legion Place<br>Mine Hill, NJ 07803', 'American Legion',40.88482105936521, -74.5718264579773, 45],
        ['Creighton Mayes Post',  '78 Abbett Ave.<br>Morristown, NJ 07960', 'American Legion',40.79992260158943, -74.47011709213257,46],
        ['Morristown Post', 'P.O. Box 2013<br>Morristown, NJ 07962', 'American Legion',40.7968, -74.4816, 47],
        ['Pequannock Memorial Post','11 Oak Ave.<br>Pequannock, NJ 07440', 'American Legion', 40.94745920109184, -74.29062366485596,47 ],
        ['John H. Lookoff Post', '700 Turnpike<br>Pompton Plains, NJ 07444', 'American Legion',40.97189515529728, -74.29656744003296,48 ],
        ['Rock-Den Post', '76 Franklin Ave.<br>Rockaway, NJ 07886', 'American Legion',40.89787894557802, -74.51290369033813,49 ],
        ['Rockaway Twsp Post', '210 Chestnut Terrace<br>Rockaway, NJ 07886', 'American Legion',40.905452960502174, -74.51665878295898,50 ],
        ['William J. Hocking Post', '99 No. Main St.<br>Wharton, NJ 07885', 'American Legion',40.902420214960486, -74.57998037338257,51 ],
        ['Whippanong Post', '12-32 Legion Pl.<br>Whippany, NJ 07981', 'American Legion',40.824445559459136, -74.42361831665039,52 ],

        ['Boonton Post #242', '221 Main St.<br>Boonton, NJ 07005', 'Veterans of Foreign Wars',40.903020287948806, -74.40771818161011,53 ],
        ['Denville Post #2519', '71 Ford Rd.<br>Denville, NJ 07834', 'Veterans of Foreign Wars',40.91534490699327, -74.48998689651489,54 ],
        ['Hanover Post #5351', '750 State Route 10<br>Hanover Twp., NJ 07981', 'Veterans of Foreign Wars',40.82603680244624, -74.42166566848755,55 ],
        ['Kenvil Post #2833', '16 High St.<br>Kenvil, NJ 07847', 'Veterans of Foreign Wars',40.87683907004174, -74.63418245315552,56 ],
        ['Montville Post #5481', '132 Change Bridge Rd.<br>Montville, NJ 07045', 'Veterans of Foreign Wars',40.88654063021766, -74.36521053314209,57 ],
        ['Mt. Freedom Post #7333', 'Carrell Rd.<br>Mt. Freedom, NJ 07970', 'Veterans of Foreign Wars',40.83861926691208, -74.58420753479004,58 ],
        ['Mt. Tabor Post #3410', '45 Tabor Rd.<br>Mt. Tabor, NJ', 'Veterans of Foreign Wars',40.86945, -74.47908,59 ],
        ['Netcong Post #2347', 'No Street Address listed<br>Netcong, NJ 07857', 'Veterans of Foreign Wars',40.89881, -74.70577,60 ],
        ['Jewish War Veterans of Morris-Sussex Post #689', '41 Mountain Way<br>Parsippany NJ 07054', 'Veterans of Foreign Wars',40.82446179682527, -74.48324918746948,61 ],
        ['Parsippany Post #10184', '240 Troy Rd.<br>Parsippany, NJ 07054', 'Veterans of Foreign Wars',40.85915196608244, -74.39651727676392,63 ],
        ['Rockaway Post #9328', '23 Pawnee Ave.<br>Rockaway, NJ 07886', 'Veterans of Foreign Wars', 40.920517319192335, -74.51099395751953,64],
        ['Butler Borough', 'Firehouse, Carey Avenue<br>(973) 838-4472; open Monday through Friday', 'Nutrition',40.99879, -74.33522,65 ],
        ['Chatham Borough','Church of Christ, 382 Fairmount Avenue<br>(973) 635-1508; open Tuesday and Thursday', 'Nutrition', 40.7227380172141, 74.40338373184204,66 ],
        ['Chester Township', 'Community Presbyterian Church, 220 Main St.<br>(908) 879-6837; open Tuesday and Thursday', 'Nutrition',40.7873490421004, -74.69098091125488,67 ],
        ['Denville', 'Cooks Pond Senior Housing, 455 Diamond Spring Rd.<br>(973) 983-1142; open Monday, Wednesday, Friday', 'Nutrition',40.9132855581483, -74.45492506027222,68 ],
        ['Dover', 'St Johns Episcopal Church, 11 So. Bergen St.<br>(973) 361-9376; open Monday and Thursday', 'Nutrition',40.88496706239981, -74.5555830001831,69 ],
        ['Jefferson Township', 'Senior Citizens Services, 54 Schoolhouse Rd.<br>(973) 208-0788; open Monday, Tuesday, Thursday', 'Nutrition',41.028607409403065, -74.52790260314941,70 ],
        ['Long Hill Township',  'The Senior Citizens Club, 769 Valley Rd.<br>(908) 626-1606; open Monday and Friday', 'Nutrition',40.67377066571321, -74.46979522705078,71],
        ['Madison', 'Rexford S. Tucker Apts., 15 Chateau Thierry Ave.<br>(973) 822-3129; open Monday, Wednesday, Friday', 'Nutrition',40.77118185975647, -74.4194769859314,72 ],
        ['Montville', 'Montville Senior House, 356 Main Rd.<br>(973) 316-8560; open Tuesday and Thursday', 'Nutrition',40.91600972245032, -74.36658382415771,73 ],
        ['Morris Mews', 'Dean Gallo Congregate Housing, 99 Ketch Rd.<br>(973) 540-8063; open Monday through Friday', 'Nutrition',40.83020957464309, -74.5130968093872,74 ],
        ['Morristown', 'Wetmore Towers, 31 Early St.<br>(973) 644-0343; open Monday through Friday', 'Nutrition',40.80247276179082, -74.48412895202637,75 ],
        ['Mt. Olive Township', 'Mt. Olive Senior Center, 204 Flanders-Drakestown Rd.<br>(973) 448-7474; open Monday, Wednesday, Friday', 'Nutrition',40.896905775860006, -74.69329833984375,76 ],
        ['Parsippany', 'Parsippany Community Center, 1130 Knoll Rd.<br>(973) 884-1868; open Monday through Friday', 'Nutrition',40.87304242027383, -74.39115285873413,77 ],
        ['Rockaway', 'Pleasant View Village, 221 Mt. Pleasant Ave.<br>(973) 361-9376; open Tuesday, Wednesday, Friday', 'Nutrition',40.901593078403536, -74.52371835708618,78 ],
        ['Roxbury Township', 'Roxbury Senior Center, 72 Eyland Avenue<br>(973) 361-5231; open Wednesday and Friday', 'Nutrition', 40.8563177, -74.637607,79 ]

    ];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(40.7967667, -74.4815438),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][3], locations[i][4]),
            map: map,
            icon: iconSrc[locations[i][2]]
        });

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0] + "<br />" + locations[i][2] + "<br />" + locations[i][1]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    // == shows all markers of a particular category, and ensures the checkbox is checked ==

    function show(category) {
        for (var i = 0; i < locations.length; i++) {
            if (locations[i][2] == category) {
                markers[i].setVisible(true);
            }
        }
    }

    // == hides all markers of a particular category, and ensures the checkbox is cleared ==
    function hide(category) {
        for (var i = 0; i < locations.length; i++) {
            if (locations[i][2] == category) {
                markers[i].setVisible(false);
            }
        }
    }

    // == show or hide the categories initially ==
    hide("Dial-a-Ride");
    hide("American Legion");
    hide("Veterans of Foreign Wars");
    hide("Nutrition");

    $(".checkbox").click(function() {
        var cat = $(this).attr("value");
        // If checked
        if ($(this).is(":checked")) {
            show(cat);
        } else {
            hide(cat);
        }
    });

}); //]]>



// var map;
// var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
// var school = 'https://cdn2.iconfinder.com/data/icons/app-types-in-grey/512/app_type_university_512px_GREY.png';
// var myLatLng = {lat: -25.363, lng: 131.044};
// var bangalore = { lat: 12.97, lng: 77.59 };
//
// function initMap() {
//
//     map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 12,
//         center: bangalore,
//         zoomControl: true,
//         scaleControl: true,
//         disableDefaultUI: false,
//         rotateControl: true,
//         fullscreenControl: true
//     });
//
//     // Create the DIV to hold the control and call the CenterControl()
//     // constructor passing in this DIV.
//     var centerControlDiv = document.createElement('div');
//     var centerControl = new CenterControl(centerControlDiv, map);
//
//     centerControlDiv.index = 1;
//     map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
//
//
//     // var marker = new google.maps.Marker({
//     //     position: bangalore,
//     //     map: map,
//     //     title: 'Hello World!',
//     //     icon: image
//     // });
// }
// infowindow = new google.maps.InfoWindow();
// var service = new google.maps.places.PlacesService(map);
// service.nearbySearch({
//     location: bangalore,
//     radius: 20000,
//     type: ['school']
// }, callback);
//
// function callback(results, status) {
//   if (status === google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//     }
//   }
// }
//
// function createMarker(place) {
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location,
//     icon: {
//       url: school,
//       anchor: new google.maps.Point(10, 10),
//       scaledSize: new google.maps.Size(30, 30)
//     }
//   });
//
//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent(place.name);
//     infowindow.open(map, this);
//   });
// }
//
//
// function CenterControl(controlDiv, map) {
//
//   // Set CSS for the control border.
//   var controlUI = document.createElement('div');
//   controlUI.style.backgroundColor = '#fff';
//   controlUI.style.border = '2px solid #fff';
//   controlUI.style.borderRadius = '3px';
//   controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
//   controlUI.style.cursor = 'pointer';
//   controlUI.style.marginBottom = '22px';
//   controlUI.style.textAlign = 'center';
//   controlUI.title = 'Click to recenter the map';
//   controlDiv.appendChild(controlUI);
//
//   // Set CSS for the control interior.
//   var controlText = document.createElement('div');
//   controlText.style.color = 'rgb(25,25,25)';
//   controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
//   controlText.style.fontSize = '16px';
//   controlText.style.lineHeight = '38px';
//   controlText.style.paddingLeft = '5px';
//   controlText.style.paddingRight = '5px';
//   controlText.innerHTML = 'Center Map';
//   controlUI.appendChild(controlText);
//
//   // Setup the click event listeners: simply set the map to Chicago.
//   controlUI.addEventListener('click', function() {
//     map.setCenter(bangalore);
//   });
//
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // var map;
// // var infowindow;
// //
// // function initMap() {
// //   var melbourne = {
// //     lat: -37.832534,
// //     lng: 144.240009
// //   };
// //
// //   map = new google.maps.Map(document.getElementById('map'), {
// //     center: melbourne,
// //     zoom: 9,
// //     mapTypeId: google.maps.MapTypeId.ROADMAP
// //   });
// //
// //   infowindow = new google.maps.InfoWindow();
// //   var service = new google.maps.places.PlacesService(map);
// //   service.nearbySearch({
// //     location: melbourne,
// //     radius: 1000000,
// //     type: ['school']
// //   }, callback);
// // }
// //
// // function callback(results, status) {
// //   if (status === google.maps.places.PlacesServiceStatus.OK) {
// //     for (var i = 0; i < results.length; i++) {
// //       createMarker(results[i]);
// //     }
// //   }
// // }
// //
// // function createMarker(place) {
// //   var placeLoc = place.geometry.location;
// //   var marker = new google.maps.Marker({
// //     map: map,
// //     position: place.geometry.location,
// //     icon: {
// //       url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/96745-200.png',
// //       anchor: new google.maps.Point(10, 10),
// //       scaledSize: new google.maps.Size(30, 30)
// //     }
// //   });
// //
// //   google.maps.event.addListener(marker, 'click', function() {
// //     infowindow.setContent(place.name);
// //     infowindow.open(map, this);
// //   });
// // }
