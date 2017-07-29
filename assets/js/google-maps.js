jQuery(function ($) {
    // Asynchronously Load the map API
    var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyAJEjA8fC6SzjQdJX4QLYMjKCBw4kw9rZg&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['Kostol v dedinke Michalová', 48.763030, 19.778749],
        ['Salaš Zbosjká', 48.745286, 19.857803],
        ['Chata Zbojská', 48.751666, 19.847245],
        ['V sedle u Falťanov', 48.745176, 19.855998]
    ];

    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Kostol v dedinke Michalová</h3>' +
        '<p>Tu sa bude konať svadobný obrad!</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Salaš Zbojská</h3>' +
        '<p>Tu budeme oslavovať aj spať po veselici :)</p>' +
        '<p>http://www.zbojska.sk/</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Chata Zbojská</h3>' +
        '<p>Tu budeme spať po veselici!</p>' +
        '<p>http://chatazbojska.sk</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>V sedle u Falťanov</h3>' +
        '<p>Tu budeme spať po veselici!</p>' +
        '<p>http://www.vsedleufaltanov.sk/</p>' +
        '</div>']
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });

}