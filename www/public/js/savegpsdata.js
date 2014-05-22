var flagnew = blacknew = bluenew = whitenew = whiteladynew = rednew = true;
function saveHoleGPSData() {
  for (var i in allHoleData)
  {
    if (allHoleData[i].TeeNumber == 1 && allHoleData[i].type == 'green_center') {
        flagnew = false;
        //updateGPSData(markerFlag.getPosition(), allHoleData[i].id);
    } else if (allHoleData[i].TeeNumber == 1 && allHoleData[i].type == 'teebox') {
        blacknew = false;
        //updateGPSData(markerTeeBlack.getPosition(), allHoleData[i].id);
    } else if (allHoleData[i].TeeNumber == 2 && allHoleData[i].type == 'teebox') {
        bluenew = false;
        //updateGPSData(markerTeeBlue.getPosition(), allHoleData[i].id);
    } else if (allHoleData[i].TeeNumber == 3 && allHoleData[i].type == 'teebox') {
        whitenew = false;
        //updateGPSData(markerTeeWhite.getPosition(), allHoleData[i].id);
    } else if (allHoleData[i].TeeNumber == 4 && allHoleData[i].type == 'teebox') {
        whiteladynew = false;
        //updateGPSData(markerTeeWhiteLady.getPosition(), allHoleData[i].id);
    } else if (allHoleData[i].TeeNumber == 5 && allHoleData[i].type == 'teebox') {
        rednew = false;
        //updateGPSData(markerTeeRed.getPosition(), allHoleData[i].id);
    }
  }
  
  for (var i=0; i < 6; i++) {
    var type, coordinates;
    var needToUpdate = false;
    if (i == 0 && flagnew) {
        needToUpdate = true;
        coordinates = markerFlag.getPosition();
        type = 'green_center';
    } else if (i==1 && blacknew) {
        needToUpdate = true;
        coordinates = markerTeeBlack.getPosition();
        type = 'teebox';
    } else if (i==2 && bluenew) {
        needToUpdate = true;
        coordinates = markerTeeBlue.getPosition();
        type = 'teebox';
    } else if (i==3 && whitenew) {
        needToUpdate = true;
        coordinates = markerTeeWhite.getPosition();
        type = 'teebox';
    } else if (i==4 && whiteladynew) {
        needToUpdate = true;
        coordinates = markerTeeWhiteLady.getPosition();
        type = 'teebox';
    } else if (i==5 && rednew) {
        needToUpdate = true;
        coordinates = markerTeeRed.getPosition();
        type = 'teebox';
    }
    if (needToUpdate)
    {
        if (i==0) i=1;
        //var fieldString = "{ \"Course\": \"50f0e82ae8be470626046775\", \"TeeNumber\":" + i + ", \"HoleNumber\":" + currentHoleNumber +", \"type\":\"" +  type + "\", \"coordinates\": [" + coordinates.lng() +"," + coordinates.lat() + "] }";
        var fieldString = "{ \"Course\": \"" + courseid +"\", \"TeeNumber\":" + i + ", \"HoleNumber\":" + currentHoleNumber +", \"type\":\"" +  type + "\", \"coordinates\": [" + coordinates.lng() +"," + coordinates.lat() + "] }";
        var holeGPSdata = {
          fields: fieldString
        };
      
        sdk.sendRequest('objects/holedata/create.json', 'POST', holeGPSdata, createGPSDataCallBack);
    }
  }
}

function updateGPSData(coordinates, objectId)
{
    //alert(objectId);
    var fieldString = "'{ \"coordinates\": [" + coordinates.lng() +"," + coordinates.lat() + "] }'";
    //alert(fieldString);
    //var fieldString = "'[" + coordinates.lng() +"," + coordinates.lat() + "]'";
    var theId = "'" + objectId + "'";
    
    //alert(theId);
    /*
    var holeGPSdata = {
        id: theId,
        fields: fieldString
    };
    */
    var holeGPSdata = {
        id: theId
    };
    sdk.sendRequest('objects/holedata/update.json', 'PUT', holeGPSdata, updateGPSDataCallBack);
}

function updateGPSDataCallBack(data) {
  if(data) {
    var myJSONText = JSON.stringify(data);
    alert(myJSONText);
    if(data.meta) {
      var meta = data.meta;
      if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'updateObject') {
        
      }
    }
  }
}

/// SDK Callback:
function createGPSDataCallBack(data) {
  if(data) {
    var myJSONText = JSON.stringify(data);
    alert(myJSONText);
    if(data.meta) {
      var meta = data.meta;
      if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createObject') {
        //alert("ok!!!");
        //var cars = data.response.car;
        //...
      }
    }
  }
}



/**
 * The HomeControl adds a control to the map that
 * saves the gps data. This constructor takes
 * the control DIV as an argument.
 */

function HomeControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to Save Hole GPS Data';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Save Hole GPS Data</b>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to
  // Chicago
  google.maps.event.addDomListener(controlUI, 'click', saveHoleGPSData);
}