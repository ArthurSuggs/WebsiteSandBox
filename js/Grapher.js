google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['line']});
google.charts.load('current', {'packages':['table']});
google.charts.load('current', {'packages':['timeline']});
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
var UsageBarStruct = [
  ['string', 'userid'],
  ['number', 'autowanrxmb'],
  ['number', 'autowantxmb'],
  ['number', 'paidwanrxmb'],
  ['number', 'paidwantxmb'],
  ['number', 'logpurchase']
]
var FleetHealthStruct = [
    ['string', 'TailId'],
    ['number', 'Internetstatus10k'],
    ['number', 'Intranetstatus10k'],
    ['number', 'Flights'],
    ['number', 'RebootsInAir']
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
var ScoreLineGraphStruct = [
    ['datetime', 'takeoff'],
    ['number', 'internetstatus10k'],
    ['number', 'intranetstatus10k'],
    ['number', 'kamustatescore'],
    ['number', 'portalscore'],
    ['number', 'wap1score'],
    ['number', 'wap2score'],
    ['number', 'wap3score']
]
var AAUGraphSESStruct = {'aaugraphses': [
  ['datetime', 'time'],
  ['number', 'beamid'],
  ['number', 'terminalstatecode'],
  ['number', 'linkstate'],
  ['number', 'flsignalqual'],
  ['number', 'bytesrxair'],
  ['number', 'altitude'],
]}
var el = document.getElementById("Refresh")
if(el){
    el.addEventListener("click", CreateChartsAndTables);
}
function CreateChartsAndTables(){
  var th = document.getElementById("TailHealth")
  var sfa = document.getElementById("singleFlightAnalysis")
  console.log(th)
  var UrlParamaters = "poopie"
  if(th){
      TailHealth(UrlParamaters);
  }else if(sfa) {
      DeepDive(UrlParamaters)
  }
}
function TailHealth(UrlParamaters) {
  var InfoForTailHealthFPMfastSES = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    date: document.getElementById("Date").value,
    tail: document.getElementById("Tail").value,
    flightId: '.*'
  }
  InfoForTailHealthFPMfastSES.parser = "FPMfastSES"
  getTailHealthFPMfastSES(InfoForTailHealthFPMfastSES)
}
function DeepDive(UrlParamaters){
  var InfoForDeepDive = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    date: '.*',//document.getElementById("Date").value,
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value
  }
  var InfoForGetFlightIds = {
    url: "FlightIDs",
    airline: document.getElementById("Airline").value,
    date: document.getElementById("Date").value,
    tail: document.getElementById("Tail").value,
    ConType: "SES"
  }
  var InfoForDeepDiveUsage = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    date: '.*',//document.getElementById("Date").value,
    tail: document.getElementById("Tail").value,
    parser: "UsageSummary",
    flightId: document.getElementById("FlightId").value
  }
  getFlightIds(InfoForGetFlightIds)
  getDeepDiveDataUsageSummary(InfoForDeepDiveUsage)
  InfoForDeepDive.parser = "AAUGraphSES"
  getDeepDiveDataSpecificParser(InfoForDeepDive)
}
function getFlightIds(QueryInfo) {
  fetch('http://localhost:8080/'+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      var flightIds = new Set();
      if(info){
        for (var flightid of info) {
          flightIds.add(flightid)
        }
      }
      addOptionsToSelect(flightIds, 'FlightId')
    });
}
function getDeepDiveDataSpecificParser(QueryInfo) {
  fetch('http://localhost:8080/'+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      QueryInfo.options = {chart: { title: QueryInfo.parser,subtitle: QueryInfo.flightId},width: '100%'};
      QueryInfo.options.explorer = {
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomIn: 4.0
      }
      drawLineChartFromArrayInOneDeepJson(QueryInfo.parser,AAUGraphSESStruct,'aau_graph',QueryInfo,info)
    });
}
function getTailHealthFPMfastSES(QueryInfo) {
  fetch('http://localhost:8080/'+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
        drawTableGeneric(QueryInfo.parser,FPMFastStruct,'fpm_table',QueryInfo,info)
        drawtimelineChartSES(QueryInfo.parser,FPMFastStruct,'time_line',QueryInfo,info)
        QueryInfo.options = { chart: { title: 'Scores over 10k per flight',
         subtitle: 'over the date range provided'}, width: '100%', height: '100%'
        }
        drawLineChartFromArrayOfFlatJSON(QueryInfo.parser,ScoreLineGraphStruct,'score_line',QueryInfo,info)
    });
}
function getDeepDiveDataUsageSummary(QueryInfo) {
  fetch('http://localhost:8080/'+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
        drawTableGeneric(QueryInfo.parser,UsageSummaryStruct,'usage_table',QueryInfo,info)
        QueryInfo.options = {'title':'Usage Bar Graph', showTextEvery:1, width: '100%',
            bar: {groupWidth: "95%"}}
        drawBarChartGeneric(QueryInfo.parser,UsageBarStruct,'usage_bar',QueryInfo,info)
    });
}

function drawTableGeneric(parser,genStruct,ElementId,QueryInfo,info) {
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
          data.addRows(rows);
          table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
          console.log("No data in")
        }
      }
}
function drawLineChartFromArrayOfFlatJSON(parser,genStruct,ElementId,QueryInfo,info) {
      var chart = new google.charts.Line(document.getElementById(ElementId));
      var data = new google.visualization.DataTable();
      var rows = new Array();
      var flights = 0
      var columnLength = 0
      //var OneMegM = 1000000
      for (index in genStruct) {
        data.addColumn(genStruct[index][0],genStruct[index][1])
        columnLength++
      }
      if(info){
        for (var key of info) {
          if (parser === "FPMfastSES") {
            if (key['above10k'] && key['timeabove10k'] > 0) {
              rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
            }
          }
        }
      }
      if (rows.length > 0) {
        rows.sort(sortFunction);
        data.addRows(rows);
        QueryInfo.options.height = columnLength*60;
        chart.draw(data, google.charts.Line.convertOptions(QueryInfo.options));
      } else {
        console.log("No data in")
      }
}
function drawLineChartFromArrayInOneDeepJson(parser,genStruct,ElementId,QueryInfo,info) {
  var chart = new google.charts.Line(document.getElementById(ElementId));
  var data = new google.visualization.DataTable();
  var rows = new Array();
  var columnLength = 0
  //Populate columns
  for (key of Object.keys(genStruct)) {
      for (index in genStruct[key]) {
        columnLength++
        data.addColumn(genStruct[key][index][0],genStruct[key][index][1])
      }
  }
  if(info){
    for (var root of info) {
      for (key of Object.keys(root)) {
        for (index in root[key]) {
          rows.push(AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, root[key][index]))
        }
      }
    }
    data.addRows(rows);
  }
  if (rows.length > 0) {
    QueryInfo.options.height = columnLength*60
    QueryInfo.options.series = CreateSeriesFromGenStruct(genStruct)
    chart.draw(data, google.charts.Line.convertOptions(QueryInfo.options));
  } else {
    console.log("No data in")
  }
}
function drawBarChartGeneric(parser,genStruct,ElementId,QueryInfo,info) {
    var chartBar = new google.visualization.BarChart(document.getElementById(ElementId));
    var data = new google.visualization.DataTable();
    var rows = new Array();
    for (index in genStruct) {
      data.addColumn(genStruct[index][0],genStruct[index][1])
    }
    if(info){
      for (var key of info) {
        //Hate to hard code this.
        //Maybe I can add it to a class which holds the gen sturct
        if (parser === "FPMfastSES") {
          if (key['above10k'] && key['timeabove10k'] > 30) {
            flightIds.add(key['flightid'])
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        } else if (parser === "UsageSummary") {

          if ((key['logpurchase'] > 1) || (key['autowanrxmb'] > 10)) {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        }
      }
    }
    if (rows.length > 0) {
      rows.sort(sortFunction);
      data.addRows(rows);
      QueryInfo.options.height = rows.length*50,
      chartBar.draw(data, QueryInfo.options);
    } else {
      console.log("No data in")
    }
}
function drawtimelineChartSES(parser,genStruct,ElementId,QueryInfo,info) {
    var container = document.getElementById('time_line');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    var rows = new Array();
    var timelineCnt = 0
    dataTable.addColumn({ type: 'string', id: 'TailId' });
    dataTable.addColumn({ type: 'string', id: 'FlightId' });
    dataTable.addColumn({ type: 'datetime', id: 'Start' });
    dataTable.addColumn({ type: 'datetime', id: 'End' });
    if(info){
      for (var key of info) {
        if (parser === "FPMfastSES") {
          if (key['above10k'] && key['timeabove10k'] > 0) {
            var startDate = new Date(key['takeoff'])
            var endDate = new Date(key['landing'])
            if (startDate > endDate){
            } else{
              rows.push([key['tailid'],key['flightid'],startDate,endDate])
              dataTable.addRows(rows)
              timelineCnt++
            }
          rows = new Array();
        }
      }
    }
    if (timelineCnt>0){
        var options = {
            timeline: { colorByRowLabel: true },
            width: '100%', height: '100%',
            backgroundColor: '#ffd'
          };
      chart.draw(dataTable, options);
    } else {
        console.log("No data in")
    }
  }
}
function AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, MapOfArraysJson) {
  //Get the only key in the map to get the array
  //Iterate through the struct and convert the data based on
  //the required type at that position
  var row = new Array();
  for (key of Object.keys(genStruct)) {
    for (index in genStruct[key]) {
      if (genStruct[key][index][0] === 'datetime') {
        row.push(new Date(MapOfArraysJson[genStruct[key][index][1]]))
      } else if (genStruct[key][index][0] === 'number') {
        row.push(Number(MapOfArraysJson[genStruct[key][index][1]]))
      } else {
        row.push(MapOfArraysJson[genStruct[key][index][1]])
      }
    }
  }
  return row
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
function CreateSeriesFromGenStruct(genStruct){
  var newSer = {}
  for (key of Object.keys(genStruct)) {
      for (index in genStruct[key]) {
        if(index > 0){
          newSer[index] = {targetAxisIndex: index}
        }
      }
  }
  return newSer
}
function CreateVaxesFromGenStruct(genStruct){
  var newVaxes = {}
  for (key of Object.keys(genStruct)) {
      for (index in genStruct[key]) {
        if(index > 0){
          newVaxes[index] =  {title: genStruct[key][index][1]}
        }
      }
  }
  return newVaxes
}
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
