
var google;

function init() {
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.warn('Google Maps API not loaded');
        return;
    }

    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
    var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
    // 39.399872
    // -8.224454
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 7,

        // The latitude and longitude to center the map (always required)
        center: myLatlng,

        // How you would like to style the map. 
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Only create map if element exists
    if (mapElement) {
        try {
            // Create the Google Map using out element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);
            
            var addresses = ['New York'];

            for (var x = 0; x < addresses.length; x++) {
                $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x]+'&sensor=false', null, function (data) {
                    var p = data.results[0].geometry.location
                    var latlng = new google.maps.LatLng(p.lat, p.lng);
                    new google.maps.Marker({
                        position: latlng,
                        map: map,
                        icon: 'images/loc.png'
                    });

                });
            }
        } catch (error) {
            console.warn('Google Maps initialization failed:', error);
        }
    }
}

// Only add event listener if Google Maps is available
if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
    google.maps.event.addDomListener(window, 'load', init);
} else {
    // Fallback: try to initialize after DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(init, 1000); // Give some time for Google Maps to load
    });
}