<!--Load the AJAX API-->DeepDive
var webserver = 'http://MLB-M4244:8080/'
//var webserver = 'http://localhost:8080/'
var el = document.getElementById("Refresh")
var dd = document.getElementById("DeepDive")
if(el){
    //el.addEventListener("click", drawTableForDeepDive);
    el.addEventListener("click", drawTableForFleetHealth);
}
if(dd){
    //el.addEventListener("click", drawTableForDeepDive);
    dd.addEventListener("click", drawTableForDeepDive);
}
//The generic table sturct but be and array of 2d arrays
//index 0 is type
//index 1 is the name of the key to look up the data from the flat json
var UsageSummaryStruct = [
  ['datetime', 'registrationrec'],
  ['string', 'flightid'],
  ['string', 'userid'],
  ['number', 'autowanrxmb'],
  ['number', 'autowantxmb'],
  ['number', 'paidwanrxmb'],
  ['number', 'paidwantxmb'],
  ['number', 'wholesordrqt'],
  ['number', 'wholesordresp'],
  ['number', 'authrec'],
  ['number', 'logpurchase'],
  ['number', 'wlchange'],
  ['number', 'deviceadd'],
  ['number', 'servicetput'],
  ['string', 'producttype']
]
var FleetHealthStruct = [
    ['string', 'TailId'],
    ['number', 'Internetstatus10k'],
    ['number', 'Intranetstatus10k'],
    ['number', 'Flights'],
    ['number', 'RebootsInAir'],
    ['number', 'Users']
]

var SWVersionsStruct = [
	['string', 'TailId'],
	['datetime', 'Landing'],
    ['string', 'ConnVMSWVersion'],
    ['string', 'ConnVMSWVKaConfig'],
    ['string', 'ModemSWVer'],
    ['string', 'WAP1SoftwareVersion']
]
var FPMFastStruct = [
  ['datetime', 'startof10k'],
  ['datetime', 'endof10k'],
  ['number', 'timeabove10k'],
  ['string', 'departure'],
  ['string', 'destination'],
  ['string', 'flightid'],
  ['number', 'internetstatus10k'],
  ['number', 'intranetstatus10k'],
  ['number', 'rxtotal'],
  ['number', 'txtotal'],
  ['number', 'rebootsinair']
]

google.charts.load('current', {'packages':['table']});
//google.charts.setOnLoadCallback(drawTable);

function drawTableForDeepDive() {
  var InfoForDeepDive = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    date: document.getElementById("Date").value,
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value
  }
  var InfoForFleetHealth = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    date: document.getElementById("Date").value,
    tail: document.getElementById("Tail").value,
    flightId: ".*"
  }
  drawTableGeneric('FPMfastSES',FPMFastStruct,'fpm_table',InfoForFleetHealth)
  drawTableGeneric('UsageSummary',UsageSummaryStruct,'usage_table',InfoForDeepDive)
}

function drawTableForFleetHealth() {
  var InfoForFleetHealth = {
    url: "FleetHealth",
    airline: document.getElementById("Airline").value,
    date: document.getElementById("Date").value,
    tail: ".*",
    flightId: ".*"
  }
   var InfoForSWVersionsSES = {
    url: "SWVersionsSES",
    airline: document.getElementById("Airline").value,
    date: document.getElementById("Date").value,
    tail: ".*",
    flightId: ".*"
  }
  drawTableGeneric('FleetHealth',FleetHealthStruct,'fpm_table',InfoForFleetHealth)
  drawTableGeneric('SWVersionsSES',SWVersionsStruct,'software_table',InfoForSWVersionsSES)

}

function drawTableGeneric(parser,genStruct,ElementId,QueryInfo) {
  /*document.getElementById(ElementId).remove();
  addElement('div1',ElementId)*/
    fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+parser+
    '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
      .then(response => response.json())
    .then(info => {
      var table = new google.visualization.Table(document.getElementById(ElementId));
      var data = new google.visualization.DataTable();
      var rows = new Array();
      var flightIds = new Set();
      var links = new Set();
      for (index in genStruct) {
        data.addColumn(genStruct[index][0],genStruct[index][1])
      }
      if(info){
        for (var key of info) {
          //Hate to hard code this.
          //Maybe I can add it to a class which holds the gen sturct
          //console.log(key)
          if (parser === "FPMfastSES") {
            if (key['above10k'] && key['timeabove10k'] > 0) {
              flightIds.add(key['flightid'])
              rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
            }
          } else if (parser === "FleetHealth"){
              //links.add(key['TailId'])
              rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          } else {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        }
        /*if (parser === "FPMfastSES") {
          addOptionsToSelect(flightIds, 'FlightId')
        } else if (parser === "FleetHealth"){
          var arrayOfOptions = [... links]
          for(index in arrayOfOptions) {
            addAnchor('deep', arrayOfOptions[index], 'deep?Airline=' + QueryInfo.airline + '&Tail=' + arrayOfOptions[index])
          }
        }*/
        if (rows.length > 0) {
          rows.sort(sortFunction);
          data.addRows(rows);
          table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
        } else {
          console.log("No data in")
        }

      }
  });
}
function addOptionsToSelect(setOfOptions, selectId) {
  var select = document.getElementById(selectId);
  var currentSelection = select.value
  var length = select.options.length;
  for (i = length-1; i >= 0; i--) {
    select.remove(i)
    //select.options[i] = null;
  }
  var arrayOfOptions = [... setOfOptions]
  for(index in arrayOfOptions) {
      select.options[select.options.length] = new Option(arrayOfOptions[index], arrayOfOptions[index]);
  }
  //console.log(currentSelection)
  if (arrayOfOptions.includes(currentSelection)) {
    select.options[select.options.length] = new Option(currentSelection, currentSelection);
  }
}
/*function addOptionsToSelect(setOfOptions, selectId) {
  var select = document.getElementById(selectId);
  var arrayOfOptions = [... setOfOptions]
  for(index in arrayOfOptions) {
      select.options[select.options.length] = new Option(arrayOfOptions[index], arrayOfOptions[index]);
  }
}*/
function AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, flatJson) {
  //Iterate through the sturct and convert the data based on
  //the required type at that position
  var row = new Array();
  for (index in genStruct) {
    if (genStruct[index][0] === 'datetime') {
      //var newData = new Date(flatJson[genStruct[index][1]])
      //var utcDate = new Data(newData.getFullYear(),newData.getMonth(),newData.getDate(),newData.getHours(),newData.getMinutes(),newData.getSeconds(),newData.getMilliseconds())
      row.push(new Date(flatJson[genStruct[index][1]]))
    } else if (genStruct[index][0] === 'number') {
      row.push(Number(flatJson[genStruct[index][1]]))
    } else {
      row.push(flatJson[genStruct[index][1]])
    }

  }
  return row
}
function addAnchor(parentId, idName, link) {
  addElement (parentId, idName,"a", link)
}
function addElement (parentId, idName,typeOfElement, link) {
  // create a new div element
  const newElement = document.createElement(typeOfElement);
  newElement.setAttribute("id", idName);

  if(link){
    newElement.setAttribute("href", link);
  }

  // and give it some content
  const newContent = document.createTextNode(idName);

  // add the text node to the newly created div
  newElement.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentElement = document.getElementById(parentId);
  document.body.insertBefore(newElement, currentElement);
}
