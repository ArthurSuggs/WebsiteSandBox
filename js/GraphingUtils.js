google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['line']});
google.charts.load('current', {'packages':['table']});
google.charts.load('current', {'packages':['timeline']});
google.charts.load('current', {'packages':['scatter']});

function drawPieChartGeneric(parser,pieStruct,ElementId,QueryInfo,info) {
    var chart = new google.visualization.PieChart(document.getElementById(ElementId));
    var rows = new Array();
    //pieStruct
    /*var UdpTraceSummaryPieStruct = [
     ['number', 'connected',"Connected"],
     ['number', 'disconnected',"Disconnected"]]*/
     var header = new Array();
     for (var row of pieStruct) {
       header.push(row[2])
     }
    if(info){
      for (var key of info) {
        rows.push(AddRowsToTableBasedOnPieStructAndFlatJson(pieStruct, key))
      }
    }
    if (rows.length > 0) {
    var rowsClean = new Array();
    rowsClean.push(header)
    for(misformed of rows) {
      for(row of misformed) {
        rowsClean.push(row)
      }
    }
      var data = google.visualization.arrayToDataTable(rowsClean)
      QueryInfo.options.width = "900px";
      QueryInfo.options.height =  "500px";
      chart.draw(data, QueryInfo.options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
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
        if (parser.includes("FPMfast")) {
          if (key['above10k'] && key['timeabove10k'] > 30) {
            //flightIds.add(key['flightid'])
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        } else if (parser === "UsageSummary") {
          if ((key['logpurchase'] > 1) || (key['autowanrxmb'] > 10)) {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        } else {
          rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
        }
      }
    }
    if (rows.length > 0) {
      rows.sort(sortFunction);
      data.addRows(rows);
      QueryInfo.options.height = rows.length*50,
      chartBar.draw(data, QueryInfo.options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
}
//Histogram needs rows of [name, number]
function drawHistogramGeneric(parser,genStruct,ElementId,QueryInfo,info) {
    var Histogram = new google.visualization.Histogram(document.getElementById(ElementId));
    var data = new google.visualization.DataTable();
    var rows = new Array();
    for (index in genStruct) {
      data.addColumn(genStruct[index][0],genStruct[index][1])
    }
    if(info){
      for (var key of info) {
        //Hate to hard code this.
        //Maybe I can add it to a class which holds the gen sturct
        if (parser.includes("FPMfast")) {
          if (key['above10k'] && key['timeabove10k'] > 30) {
            flightIds.add(key['flightid'])
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        } else if (parser === "UsageSummary") {
          //if ((key['logpurchase'] > 1) || (key['autowanrxmb'] > 10)) {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          //}
        } else {
          rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
        }
      }
    }
    if (rows.length > 0) {
      rows.sort(sortFunction);
      data.addRows(rows);
      QueryInfo.options.height = '100%';
      QueryInfo.options.width = '100%';
      Histogram.draw(data, QueryInfo.options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
}
function drawtimelineChartSES(parser,genStruct,ElementId,QueryInfo,info) {
    var container = document.getElementById(ElementId);
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
        if (parser.includes("FPMfast")) {
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
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
  }
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
          if (parser.includes("FPMfast")) {
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
      }
      if (rows.length > 0) {
        rows.sort(sortFunction);
        data.addRows(rows);
        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
      } else {
        document.getElementById(ElementId).innerHTML = "";
        console.log("No data in")
      }
}
function drawScatterChartFromArrayOfFlatJSON(parser,genStruct,ElementId,QueryInfo,info) {
      var chart = new google.charts.Scatter(document.getElementById(ElementId));
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
          if (parser.includes("FPMfast")) {
            if (key['above10k'] && key['timeabove10k'] > 0) {
              rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
            }
          } else {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        }
      }
      if (rows.length > 0) {
        rows.sort(sortFunction);
        data.addRows(rows);
        QueryInfo.options.height = columnLength*120;
        chart.draw(data, google.charts.Scatter.convertOptions(QueryInfo.options));
      } else {
        document.getElementById(ElementId).innerHTML = "";
        console.log("No data in")
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
          if (parser.includes("FPMfast")) {
            if (key['above10k'] && key['timeabove10k'] > 0) {
              rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
            }
          } else {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        }
      }
      if (rows.length > 0) {
        rows.sort(sortFunction);
        data.addRows(rows);
        QueryInfo.options.height = columnLength*60;
        chart.draw(data, google.charts.Line.convertOptions(QueryInfo.options));
      } else {
        document.getElementById(ElementId).innerHTML = "";
        console.log("No data in")
      }
}
function drawLineChartFromArrayInOneDeepJson(parser,genStruct,ElementId,QueryInfo,info) {
  var chart = new google.charts.Line(document.getElementById(ElementId));
  var data = new google.visualization.DataTable();
  var rows = new Array();
  var columnLength = 0
  if(parser === "UsageDetails"){
    console.log(info)
  }
  //Populate columns
  for (var key of Object.keys(genStruct)) {
      for (var index in genStruct[key]) {
        columnLength++
        data.addColumn(genStruct[key][index][0],genStruct[key][index][1])
      }
  }
  if(info){
    for (var root of info) {
      //remove garbage from keys
      //Keys are _id,filename,arrayKey
      keys = Object.keys(root)
      const indexfilename = keys.indexOf("filename");
      const indexid = keys.indexOf("_id");
      if (indexfilename > -1) {
        keys.splice(indexfilename, 1);
      }
      if (indexid > -1) {
        keys.splice(indexid, 1);
      }

      for (var key of keys) {
        for (var index in root[key]) {
          var row = AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, root[key][index])

          if(row.length !== 0 && !row.includes("NaN")){
            rows.push(row)
          }
        }
      }
    }
    data.addRows(rows);
  }
  if (rows.length > 0) {

    if(parser === "AAUGraphSES"){
      QueryInfo.options.height = columnLength*60
      QueryInfo.options.series = CreateSeriesFromGenStruct(genStruct)
    } else if(parser === "UDPTraceBandwidthDetails") {
      QueryInfo.options.height = columnLength*200
    } else if(parser === "UsageDetails") {
      QueryInfo.options.height = columnLength*200
    }

    chart.draw(data, google.charts.Line.convertOptions(QueryInfo.options));
  } else {
    document.getElementById(ElementId).innerHTML = "";
    console.log("No data in")
  }
}
//Work on me for WapData
function drawLineChartFromMapOfArraysJson(parser,genStruct,ElementId,QueryInfo,info) {
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
          rows.push(AddRowsBasedOnGenericStructAndMapOfArraysJson(genStruct, root[key][index]))
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
    document.getElementById(ElementId).innerHTML = "";
    console.log("No data in")
  }
}
//This returns an array of arrays
function AddRowsBasedOnGenericStructAndMapOfArraysJson(genStruct, MapOfArraysJson) {
  //Get the keys in the map to get the array
  //Iterate through the struct and convert the data based on
  //the required type at that position
  var rows = new Array();
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
    rows.push(row)
    row = new Array();
  }
  return row
}
//verify the row you were returned is not an empty array
function AddRowsToTableBasedOnPieStructAndFlatJson(pieStruct, flatJson) {
  var row = new Array();
  for (index in pieStruct) {
   if (pieStruct[index][0] === 'datetime') {
     row.push(new Date(flatJson[pieStruct[index][1]]))
   } else if (pieStruct[index][0] === 'number') {
     row.push([pieStruct[index][2],Number(flatJson[pieStruct[index][1]])])
   } else {
     row.push(flatJson[pieStruct[index][1]])
   }
 }
 return row
}
function AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, MapOfArraysJson) {
  //Get the only key in the map to get the array
  //Iterate through the struct and convert the data based on
  //the required type at that position
    var row = new Array();
    if(MapOfArraysJson){
      for (key of Object.keys(genStruct)) {
      for (index in genStruct[key]) {
        //Check to see if the key is in MapOfArraysJson
      //  if (MapOfArraysJson.hasOwnProperty([genStruct[key][index][1]]))
      //  {
          if (genStruct[key][index][0] === 'datetime') {
            row.push(new Date(MapOfArraysJson[genStruct[key][index][1]]))
          } else if (genStruct[key][index][0] === 'number') {
            row.push(Number(MapOfArraysJson[genStruct[key][index][1]]))
          } else {
            row.push(MapOfArraysJson[genStruct[key][index][1]])
          }
      //  }
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
