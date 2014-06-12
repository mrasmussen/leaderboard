/**
 * Created by mrasmussen on 5/8/14.
 */
    var sdk = new Cocoafish('bOO1LysryiIJgFHih9VrHxXWWg7eAxUF');  // app key
//var courseid = '5124032f46b942088401f22c';//falcon ridge
//var courseid = '5123a03946b9420884018c08'; // sky mountain
//var courseid = '511fe20ef52d95083500093c'; // coral canyon
var courseid = '50f0e82ae8be470626046775'; // riversidecountry club
var golfCourseCenter = new google.maps.LatLng(40.268155,-111.65917); // riverside country club
//var golfCourseCenter = new google.maps.LatLng(37.15652,-113.447313);// coral canyon
//var golfCourseCenter = new google.maps.LatLng(37.191224,-113.337552);// sky mountain
//var golfCourseCenter = new google.maps.LatLng(36.808348,-114.103317);// falcon ridge

var markerFlag;
var mapLabel;
var map;
var allHoleData;
var flagAndOneTeeSet = false;

getHoleYardageData();

function initialize() {

    var mapOptions = {
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        center: golfCourseCenter
    };

    map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);
    google.maps.event.addListener(map, 'click', function(e) {
        addMarkerLocation(e.latLng, map);
    });

    // Create the DIV to hold the control and
    // call the HomeControl() constructor passing
    // in this DIV.
    var homeControlDiv = document.createElement('div');
    var homeControl = new HomeControl(homeControlDiv, map);

    homeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);

    // Create the DIV to hold the control and
    // call the HomeControl() constructor passing
    // in this DIV.
    var homeControl2Div = document.createElement('div');
    var homeControl2 = new HomeControlYardage(homeControl2Div, map);

    homeControl2Div.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControl2Div);

    // Google Search Box
    var markers = [];


    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(
        document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));

    // [START region_getplaces]
    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }

        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            markers.push(marker);

            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
    });
    // [END region_getplaces]

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
}


function updateYards(teeNumber) {
    var yards;
    if (!flagAndOneTeeSet)
        return;
    if (teeNumber == 1) {
        yards = google.maps.geometry.spherical.computeDistanceBetween(markerFlag.getPosition(), markerTeeBlack.getPosition()) * 1.0936133;
        mapLabel.set('text', Math.round(yards));
    } else if(teeNumber == 2) {
        yards = google.maps.geometry.spherical.computeDistanceBetween(markerFlag.getPosition(), markerTeeBlue.getPosition()) * 1.0936133;
        mapLabel.set('text', Math.round(yards));
    } else if(teeNumber == 3) {
        yards = google.maps.geometry.spherical.computeDistanceBetween(markerFlag.getPosition(), markerTeeWhite.getPosition()) * 1.0936133;
        mapLabel.set('text', Math.round(yards));
    } else if(teeNumber == 4) {
        yards = google.maps.geometry.spherical.computeDistanceBetween(markerFlag.getPosition(), markerTeeWhiteLady.getPosition()) * 1.0936133;
        mapLabel.set('text', Math.round(yards));
    } else if(teeNumber == 5) {
        yards = google.maps.geometry.spherical.computeDistanceBetween(markerFlag.getPosition(), markerTeeRed.getPosition()) * 1.0936133;
        mapLabel.set('text', Math.round(yards));
    } else {
        yards = google.maps.geometry.spherical.computeDistanceBetween(markerFlag.getPosition(), markerTeeBlack.getPosition()) * 1.0936133;
        mapLabel.set('text', Math.round(yards));
    }
}



function updateMarkerLocation(position, map) {
    alert(position);
    //alert(markerT.getPosition());
    //var yards = google.maps.geometry.spherical.computeDistanceBetween(markerFlag.getPosition(), markerTee.getPosition()) * 1.0936133;
    //mapLabel.set('text', Math.round(yards));
    //google.maps.geometry.spherical.computeDistanceBetween
}

function toggleBounce() {

    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}
/****************************** Database Stuff ***********************************/
/****************************** Course Data **************************************/
function getCourseData()
{
    var whereCourseData =  '{"id": "' + courseid + '"}';
    //alert(whereCourseData);
    var dataCourse = {
        id: '50f0e82ae8be470626046775',
        limit: 1000,
        response_json_depth: 1
    };
    //alert(data.id);
    sdk.sendRequest('objects/courses/show.json', 'GET', dataCourse, courseCallback);
}

function courseCallback(data) {
    if(data) {
        var myJSONText = JSON.stringify(data);
        console.log(myJSONText);
        //alert(myJSONText);
        if(data.meta) {
            var meta = data.meta;
            if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'showObjects') {
                //alert(data.response);
                //createCourseData(data.response.courses)
            }
        }
    }
}
//getCourseData();

/****************************** Store Course Data *************************************/
function createCourseData(course)
{
    //UOCa9r785zth4gyMfdmmKGBfgDniXcpA
    var sdk = new Cocoafish('UOCa9r785zth4gyMfdmmKGBfgDniXcpA');  // app key
    console.log(course[0].id);
    delete course[0].id;
    delete course[0].created_at;
    delete course[0].updated_at;
    var myJSONText = JSON.stringify(course[0]);
    console.log(myJSONText);
    var data = {
        fields: myJSONText
    };
    console.log(data.fields);
    //sdk.sendRequest('objects/courses/create.json', 'POST', data, createCourseCallback);
}
//SDK Callback:
function createCourseCallback(data) {
    if(data) {
        var myJSONText = JSON.stringify(data);
        console.log(myJSONText);
        if(data.meta) {
            var meta = data.meta;
            if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createObject') {
                console.log('Who is your Daddy');
            }
        }
    }
}

/****************************** Hole Data ********************************************/
function getHoleData()
{
    var whereCourseData =  '{"Course": "' + courseid + '"}';
    //alert(whereCourseData);
    var data = {
        where: whereCourseData,
        response_json_depth: 1,
        limit: 1000
    };
    //alert(data.where);
    sdk.sendRequest('objects/holedata/query.json', 'GET', data, holeCallback);
}

function holeCallback(data) {
    if(data) {
        var myJSONText = JSON.stringify(data);
        //console.log(myJSONText);
        if(data.meta) {
            var meta = data.meta;
            if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'queryCustomObjects') {
                for (var i in data.response.holedata)
                {
                    delete data.response.holedata[i].id;
                    delete data.response.holedata[i].created_at;
                    delete data.response.holedata[i].updated_at;
                    delete data.response.holedata[i].Course;
                }
                var myJSONText2 = JSON.stringify(data.response.holedata);
                //console.log(myJSONText2);
                //storeHoleData(data.response.holedata);
                //storeHoleDataInCourse(data.response.holedata);
            }
        }
    }
}
//getHoleData();

/****************************** Store Hole Data *************************************/
function storeHoleData(holeData)
{
    //UOCa9r785zth4gyMfdmmKGBfgDniXcpA
    var sdk = new Cocoafish('UOCa9r785zth4gyMfdmmKGBfgDniXcpA');  // app key
    var myJSONText = JSON.stringify(holeData);
    var data = {
        fields: '{"courseholedata":' + myJSONText + '}'
    };
    //console.log(data.fields);
    sdk.sendRequest('objects/holedata/create.json', 'POST', data, storeHoleDataCallback);
}
//SDK Callback:
function storeHoleDataCallback(data) {
    if(data) {
        var myJSONText = JSON.stringify(data);
        console.log(myJSONText);
        if(data.meta) {
            var meta = data.meta;
            if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createObject') {
                console.log('Who is your Daddy');
            }
        }
    }
}

/****************************** Store Hole Data in Course *************************************/
function storeHoleDataInCourse(holeData)
{
    //UOCa9r785zth4gyMfdmmKGBfgDniXcpA
    var sdk = new Cocoafish('UOCa9r785zth4gyMfdmmKGBfgDniXcpA');  // app key
    var myJSONText = JSON.stringify(holeData);
    var data = {
        id: '5148bd0dacab5e15fa06a0f0',
        fields: '{"holedata":' + myJSONText + '}'
    };
    //console.log(data.fields);
    sdk.sendRequest('objects/courses/update.json', 'POST', data, storeHoleDataInCourseCallback);
}
//SDK Callback:
function storeHoleDataInCourseCallback(data) {
    if(data) {
        var myJSONText = JSON.stringify(data);
        console.log(myJSONText);
        if(data.meta) {
            var meta = data.meta;
            if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createObject') {
                console.log('Who is your Daddy');
            }
        }
    }
}

var whereData =  '{"Course": "' + courseid + '" , "HoleNumber":' + currentHoleNumber + '}';
//alert(whereData);
var data = {
    where: whereData,
    limit: 1000
};
//alert(data.where);
sdk.sendRequest('objects/holedata/query.json', 'GET', data, callback);
// SDK Callback:
function callback(data) {
    if(data) {
        var myJSONText = JSON.stringify(data);
        //alert(myJSONText);
        if(data.meta) {
            var meta = data.meta;
            if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'queryCustomObjects') {
                allHoleData = data.response.holedata;
                //alert(data.response.holedata.length);
                if (data.response.holedata.length == 0)
                    return;
                for (var i in data.response.holedata)
                {
                    var coordinates = data.response.holedata[i].coordinates[0];
                    var position = new google.maps.LatLng(coordinates[1], coordinates[0]);

                    if(data.response.holedata[i].type == 'teebox')
                    {
                        placeMarkerTeeBox(position, map, data.response.holedata[i].TeeNumber);
                    } else if (data.response.holedata[i].type == 'green_center'){
                        placeMarker(position, map, data.response.holedata[i].HoleNumber);

                    }
                }
            }

            if (data.response.holedata.length < 2){
                mapLabel = new MapLabel({
                    text: "Not Set",
                    position: markerFlag.getPosition(),
                    map: map,
                    fontSize: 35,
                    align: 'center'
                });
                map.panTo(markerFlag.getPosition());
                return;
            }
            flagAndOneTeeSet = true;
            // find halfway and position map
            var half_lat = (markerFlag.getPosition().lat() + markerTeeBlack.getPosition().lat()) / 2;
            var half_lng = (markerFlag.getPosition().lng() + markerTeeBlack.getPosition().lng()) / 2;
            var half_position = new google.maps.LatLng(half_lat, half_lng);
            map.panTo(half_position);
            mapLabel = new MapLabel({
                text: Math.round(google.maps.geometry.spherical.computeDistanceBetween(markerFlag.getPosition(), markerTeeBlack.getPosition()) * 1.0936133),
                position: half_position,
                map: map,
                fontSize: 35,
                align: 'center'
            });
            //halfCoordinate.latitude = (lowerCoordinate.latitude + upperCoordinate.latitude) / 2.0;
            //halfCoordinate.longitude = (lowerCoordinate.longitude + upperCoordinate.longitude) / 2.0;
        }
    }
}
