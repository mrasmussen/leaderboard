var markerFlagFound = markerTeeBlackFound = markerTeeBlueFound = markerTeeRedFound = markerTeeWhiteFound = markerTeeGreenFound = markerTeeWhiteLadyFound = false;
var markerTeeBlack, markerTeeBlue, markerTeeRed, markerTeeWhite, markerTeeGreen, markerTeeWhiteLady;

function addMarkerLocation(position, map)
{
    if (!markerFlagFound) {
        placeMarker(position, map, 1);
    } else if (!markerTeeBlackFound) {
        flagAndOneTeeSet = true;
        placeMarkerTeeBox(position, map, 1);
    } else if (!markerTeeBlueFound) {
        placeMarkerTeeBox(position, map, 2);
    } else if (!markerTeeWhiteFound) {
        placeMarkerTeeBox(position, map, 3);
    } else if (!markerTeeWhiteLadyFound) {
        placeMarkerTeeBox(position, map, 4);
    } else if (!markerTeeRedFound) {
        placeMarkerTeeBox(position, map, 5);
    }
}

function placeMarkerTeeBox(position, map, TeeNumber)
{
    var imageName;
 
    if (TeeNumber == 1) {
        imageName = '/images/ball_black.png';
        markerTeeBlackFound = true;
    } else if (TeeNumber == 2) {
        imageName = '/images/ball_black.png';
        markerTeeBlueFound = true;
    } else if (TeeNumber == 3) {
        imageName = '/images/ball_black.png';
        markerTeeWhiteFound = true;
    } else if (TeeNumber == 4) {
        imageName = '/images/ball_black.png';
        markerTeeWhiteLadyFound = true;
    } else if (TeeNumber == 5) {
        imageName = '/images/ball_black.png';
        markerTeeRedFound = true;
    }
    var image = new google.maps.MarkerImage(imageName,
        // This marker is 20 pixels wide by 32 pixels tall.
        new google.maps.Size(32, 64),
        // The origin for this image is 0,0.
        new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        new google.maps.Point(16,32));
      
    if (TeeNumber == 1) {
        markerTeeBlack = new google.maps.Marker({
            position: position,
            map: map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            icon:image
          });
        google.maps.event.addListener(markerTeeBlack, 'position_changed', function() {updateYards(TeeNumber);});
    } else if (TeeNumber == 2) {
        markerTeeBlue = new google.maps.Marker({
            position: position,
            map: map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            icon:image
          });
        google.maps.event.addListener(markerTeeBlue, 'position_changed', function() {updateYards(TeeNumber);});
    } else if (TeeNumber == 3) {
        markerTeeWhite = new google.maps.Marker({
            position: position,
            map: map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            icon:image
          });
        google.maps.event.addListener(markerTeeWhite, 'position_changed', function() {updateYards(TeeNumber);});
    } else if (TeeNumber == 4) {
        markerTeeWhiteLady = new google.maps.Marker({
            position: position,
            map: map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            icon:image
          });
        google.maps.event.addListener(markerTeeWhiteLady, 'position_changed', function() {updateYards(TeeNumber);});
    } else if (TeeNumber == 5) {
        markerTeeRed = new google.maps.Marker({
            position: position,
            map: map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            icon:image
          });
        google.maps.event.addListener(markerTeeRed, 'position_changed', function() {updateYards(TeeNumber);});
    }   
    
    //google.maps.event.addListener(markerTee, 'dragend', function(e) {
    //  updateMarkerLocation(e.latLng, map);
    //});
    //google.maps.event.addListener(markerTee, 'position_changed', function(e) {
    //  updateMarkerLocation(e.latLng, map);
    //});
    //map.panTo(position);
}

function placeMarker(position, map, holeNumber) {
        var image = new google.maps.MarkerImage('/images/32/flag' + holeNumber + '.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            new google.maps.Size(40, 72),
            // The origin for this image is 0,0.
            new google.maps.Point(0,0),
            // The anchor for this image is the base of the flagpole at 0,32.
            new google.maps.Point(20, 36));
          markerFlag = new google.maps.Marker({
          position: position,
          map: map,
          draggable:true,
          animation: google.maps.Animation.DROP,
          icon:image
        });
        markerFlagFound = true; 
        //google.maps.event.addListener(markerFlag, 'dragend', function(e) {
        //  updateMarkerLocation(e.latLng, map);
        //});
        //google.maps.event.addListener(markerFlag, 'position_changed', function(e) {
        // updateMarkerLocation(e.latLng, map);
        //});
        google.maps.event.addListener(markerFlag, 'position_changed', updateYards);
        //map.panTo(position);
      }