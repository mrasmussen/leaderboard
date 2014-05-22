var data1 = '{"Course": "5124032f46b942088401f22c", "TeeNumber":1, "HoleNumber": 18, "Par":4 , "Yardage": 420, "Handicap":5 }'
var data2 = '{"Course": "5124032f46b942088401f22c", "TeeNumber":2, "HoleNumber": 18, "Par":4 , "Yardage": 404, "Handicap":5 }'
var data3 = '{"Course": "5124032f46b942088401f22c", "TeeNumber":3, "HoleNumber": 18, "Par":4 , "Yardage": 353, "Handicap":5 }'

var currentHoleNumber = 1;
      
function saveHoleYardage()
{
    for (var i=1; i<4; i++)
    {
        var theData = window['data' + i];
        //alert(theData);
        var holeYardageData = {
          fields: theData
        };
        
        //alert(data.where);
        sdk.sendRequest('objects/holes/create.json', 'POST', holeYardageData, createHoleYardageCallBack);
    }
}

function createHoleYardageCallBack(data) {
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

/**
 * The HomeControl adds a control to the map that
 * saves the gps data. This constructor takes
 * the control DIV as an argument.
 */

function HomeControlYardage(controlDiv, map) {

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
  controlText.innerHTML = '<b>Save Hole Tee Yardage</b>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to
  // Chicago
  google.maps.event.addDomListener(controlUI, 'click', saveHoleYardage);
}