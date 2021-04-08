<!--Load the AJAX API-->
var el = document.getElementById("Refresh")
if(el){
    el.addEventListener("click", drawLineChartFromArrayOfFlatJSONPlease);
}

google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawLineChartFromArrayOfFlatJSONPlease);

var ScoreLineGraphStruct = [
    ['datetime', 'takeoff'],
    ['number', 'internetstatus10k'],
    ['number', 'intranetstatus10k'],
    ['number', 'kamustatescore'],
    ['number', 'portalscore'],
    ['number', 'wap1score'],
    ['number', 'wap2score'],
    ['number', 'wap2score']
]
function drawLineChartFromArrayOfFlatJSONPlease() {
  var InfoForLineChartFromScores = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    date: document.getElementById("Date").value,
    tail: document.getElementById("Tail").value,
    options: {
      chart: {
        title: 'Scores over 10k per flight',
        subtitle: 'over the date range provided'
      },
      width: '100%', height: '100%'
    },
    flightId: ".*"
  }
  drawLineChartFromArrayOfFlatJSON('FPMfastSES',ScoreLineGraphStruct,'line_chart',InfoForLineChartFromScores)
  //drawLineChartGeneric('WapData',wap1dataStruct,'wap1data')
}

function drawLineChartFromArrayOfFlatJSON(parser,genStruct,ElementId,QueryInfo) {
  fetch('http://localhost:8080/'+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
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
  });
}
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
function populateRxTxLineChart(rowData) {
  var data = new google.visualization.DataTable();
      data.addColumn('datetime', 'startof10k');
      data.addColumn('number', 'rxtotal');
      data.addColumn('number', 'txtotal');
      data.addColumn('number', 'timeabove10k');
      data.addRows(rowData);


}
