<!--Load the AJAX API-->
var el = document.getElementById("Refresh")
if(el){
    el.addEventListener("click", drawLineChart);
}

google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawLineChart);

function drawLineChart() {
  var airline = document.getElementById("Airline").value
  var parser = document.getElementById("Parser").value
  var date = document.getElementById("Date").value
  var tail = document.getElementById("Tail").value
    fetch('http://localhost:8080/mongoData?Airline='+airline+'&Parser='+parser+
    '&TailId='+tail+'&FlightId=.*&DateYYYYMMDD='+date)
      .then(response => response.json())
    .then(info => {
      var rows = new Array();
      var flights = 0
      //var OneMegM = 1000000
      var columnNameArray = ['takeoff','rxtotal','txtotal','timeabove10k']
      if(info){
        for (var key of info) {
          if (key['above10k'] && key['timeabove10k'] > 30){
            //console.log(key['flightid'])
            rows.push([new Date(key['startof10k']),Number(key['rxtotal']),Number(key['txtotal']),Number(key['timeabove10k'])])
          }
        }
        rows.sort(sortFunction);
        populateRxTxLineChart(rows)
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

      var options = {
        chart: {
          title: 'Usage and time over 10k per flight',
          subtitle: 'over the date range provided'
        },
        width: '100%', height: '100%'
      };
      var chart = new google.charts.Line(document.getElementById('line_chart'));
      chart.draw(data, google.charts.Line.convertOptions(options));
}
