<!--Load the AJAX API-->
var el = document.getElementById("DeepDive")
if(el){
    el.addEventListener("click", drawLineChartplease);
}
//mongo holds it as a map of arrays
var AAUGraphSESStruct = {'aaugraphses': [
  ['datetime', 'time'],
  ['number', 'beamid'],
  ['number', 'terminalstatecode'],
  ['number', 'linkstate'],
  ['number', 'flsignalqual'],
  ['number', 'bytesrxair'],
  ['number', 'altitude'],
]}
var wap1dataStruct = { "wap1data" : [                
                        ['datetime', 'currenttime'],
                       // ['number','days_active'],
                        //['number','hours_active'],
                        //['number','minutes_active'],
                       // ['number','seconds_active'],
                        ['number','bytes_sent'],
                        ['number','bytes_received']],
					"wap2data" : [                
                        ['datetime', 'currenttime'],
                       // ['number','days_active'],
                        //['number','hours_active'],
                        //['number','minutes_active'],
                       // ['number','seconds_active'],
                        ['number','bytes_sent'],
                        ['number','bytes_received']],
						"wap3data" : [                
                        ['datetime', 'currenttime'],
                       // ['number','days_active'],
                        //['number','hours_active'],
                        //['number','minutes_active'],
                       // ['number','seconds_active'],
                        ['number','bytes_sent'],
                        ['number','bytes_received']],
}

google.charts.load('current', {'packages':['core']});
google.charts.setOnLoadCallback(drawLineChartplease);

function drawLineChartplease() {
  drawLineChartGeneric('AAUGraphSES',AAUGraphSESStruct,'aau_graph')
  //drawLineChartGeneric('WapData',wap1dataStruct,'wap1data')
}

function drawLineChartGeneric(parser,genStruct,ElementId) {
  var airline = document.getElementById("Airline").value
  //var parser = document.getElementById("Parser").value
  var date = document.getElementById("Date").value
  var tail = document.getElementById("Tail").value
  var flightId = document.getElementById("FlightId").value
  fetch('http://localhost:8080/mongoData?Airline='+airline+'&Parser='+parser+
  '&TailId='+tail+'&FlightId='+flightId+'&DateYYYYMMDD='+date)
    .then(response => response.json())
    .then(info => {
      var chart = new google.charts.Line(document.getElementById(ElementId));
	  //var chart = new google.charts.LineChart(document.getElementById(ElementId));
	  //var chart = new google.visualization.LineChart(document.getElementById(ElementId));
      var data = new google.visualization.DataTable();
      var rows = new Array();
      var columnLength = 0
      //var OneMegM = 1000000
      //Populate the columns
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
			  //console.log(root[key][index])
              rows.push(AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, root[key][index]))
            }
          }
        }
        data.addRows(rows);
        var options = {
          chart: {
            title: parser,
            subtitle: 'over 10k'
          },
		  //legend:{position: 'bottom', alignment:'start'},
          width: '100%', height: columnLength*60
        };
        options.series = CreateSeriesFromGenStruct(genStruct)
        //options.vAxes = CreateVaxesFromGenStruct(genStruct)
        // before you pass the options to the drawing function
        options.explorer = {
          actions: ['dragToZoom', 'rightClickToReset'],
		  axis: 'horizontal',
		  keepInBounds: true,
		  maxZoomIn: 4.0
          /* you can add more options */
        }
        chart.draw(data, google.charts.Line.convertOptions(options));
		//chart.draw(data,options)
      }
  });
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
