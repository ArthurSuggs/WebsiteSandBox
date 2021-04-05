<!--Load the AJAX API-->
var el = document.getElementById("Refresh")
if(el){
    el.addEventListener("click", drawTable);
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

var FPMFastStruct = [
  ['datetime', 'startof10k'],
  ['datetime', 'endof10k'],
  ['number', 'timeabove10k'],
  ['string', 'departure'],
  ['string', 'departure'],
  ['string', 'flightid'],
  ['number', 'internetstatus10k'],
  ['number', 'intranetstatus10k'],
  ['number', 'rxtotal'],
  ['number', 'txtotal']
]

google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
  drawTableGeneric('FPMfastSES',FPMFastStruct,'fpm_table',false)
  drawTableGeneric('UsageSummary',UsageSummaryStruct,'usage_table',true)
}

function drawTableGeneric(parser,genStruct,ElementId,useFlightId) {

    var airline = document.getElementById("Airline").value
    //var parser = document.getElementById("Parser").value
    var date = document.getElementById("Date").value
    var tail = document.getElementById("Tail").value

    var flightId = ".*"
    if(useFlightId) {
      flightId = document.getElementById("FlightId").value
    }
    fetch('http://localhost:8080/mongoData?Airline='+airline+'&Parser='+parser+
    '&TailId='+tail+'&FlightId='+flightId+'&DateYYYYMMDD='+date)
      .then(response => response.json())
    .then(info => {
      var table = new google.visualization.Table(document.getElementById(ElementId));
      var data = new google.visualization.DataTable();
      var rows = new Array();
      var flightIds = new Set();
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
          } else {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        }
        if (parser === "FPMfastSES") {
          addOptionsToSelect(flightIds, 'FlightId')
        }
        if (rows.length > 0) {
          rows.sort(sortFunction);
          data.addRows(rows);
          table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
        } else {
          console.log("No data in",airline, date, tail, parser,genStruct,ElementId )
        }

      }
  });
}
function addOptionsToSelect(setOfOptions, selectId) {
  var select = document.getElementById(selectId);
  var arrayOfOptions = [... setOfOptions]
  for(index in arrayOfOptions) {
      select.options[select.options.length] = new Option(arrayOfOptions[index], arrayOfOptions[index]);
  }
}
function AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, flatJson) {
  //Iterate through the sturct and convert the data based on
  //the required type at that position
  var row = new Array();
  for (index in genStruct) {
    if (genStruct[index][0] === 'datetime') {
      row.push(new Date(flatJson[genStruct[index][1]]))
    } else if (genStruct[index][0] === 'number') {
      row.push(Number(flatJson[genStruct[index][1]]))
    } else {
      row.push(flatJson[genStruct[index][1]])
    }
  }
  return row
}
