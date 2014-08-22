/**
 * Created by mrasmussen on 8/19/14.
 */


var sdk = new Cocoafish('UOCa9r785zth4gyMfdmmKGBfgDniXcpA');  // app key

function initialize() {
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        mapTypeId: google.maps.MapTypeId.HYBRID

    });

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(40.392540, -124.401032),
        new google.maps.LatLng(35.866752, -75.665680));
    map.fitBounds(defaultBounds);

    var input = /** @type {HTMLInputElement} */(
        document.getElementById('pac-input'));

    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -4)
    });
    var myLatlng = new google.maps.LatLng(40.271137, -111.66328699999997);
    marker.setPosition(myLatlng);
    marker.setVisible(true);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }

        marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(1, 1),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(1, 1)
        }));

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + 'a realy realy realy long long long name</strong><br>' + address + '<br>' + place.geometry.location);
        infowindow.open(map, marker);
        isCourseCreated();
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    /*
     function setupClickListener(id, types) {
     var radioButton = document.getElementById(id);
     google.maps.event.addDomListener(radioButton, 'click', function() {
     autocomplete.setTypes(types);
     });
     }

     setupClickListener('changetype-all', []);
     */
}
google.maps.event.addDomListener(window, 'load', initialize);
