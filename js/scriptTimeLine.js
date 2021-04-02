<!--Load the AJAX API-->
var el = document.getElementById("Refresh")
if(el){
    el.addEventListener("click", drawtimelineChart);
}

google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawtimelineChart);


function drawtimelineChart() {

  var airline = document.getElementById("Airline").value
    var parser = document.getElementById("Parser").value
    var date = document.getElementById("Date").value
    var tail = document.getElementById("Tail").value
    fetch('http://localhost:8080/mongoData?Airline='+airline+'&Parser='+parser+
    '&TailId='+tail+'&FlightId=.*&DateYYYYMMDD='+date)
      .then(response => response.json())
    .then(info => {
      var container = document.getElementById('time_line');
      var chart = new google.visualization.Timeline(container);
      var dataTable = new google.visualization.DataTable();
      dataTable.addColumn({ type: 'string', id: 'TailId' });
      dataTable.addColumn({ type: 'string', id: 'FlightId' });
      dataTable.addColumn({ type: 'datetime', id: 'Start' });
      dataTable.addColumn({ type: 'datetime', id: 'End' });
      //new Date('2015-01-01')
      //new Date(2014, 10, 15, 0, 30)
      //TODO:Make the Keys and column names dymanmic
      var rows = new Array();
      //Iterate through array of responses
      for (var key of info) {
        if (key['above10k']){
        var startDate = new Date(key['takeoff'])
        var endDate = new Date(key['landing'])
        if (startDate > endDate){

        } else{
          rows.push([key['tailid'],key['flightid'],startDate,endDate])
          dataTable.addRows(rows)
        }

          rows = new Array();
        }
      }
        var options = {
     timeline: { colorByRowLabel: true },
     backgroundColor: '#ffd'
   };

   chart.draw(dataTable, options);
  });
}

//this creates a table from a flat json
function drawIT() {
  //fetch('http://localhost:8080/mongoData?Airline=SPIRIT&Parser=SWVersionsSES&TailId=N674NK&FlightId=.*&DateYYYYMMDD=2021030')
  fetch('http://localhost:8080/mongoData?Airline=SPIRIT&Parser=FPMfastSES&TailId=N661NK&FlightId=.*&DateYYYYMMDD=202103')
    .then(response => response.json())
  .then(info => {
    //console.log(info)
var data = new google.visualization.DataTable();
//add the column names only do one
var first = true
var rows = new Array();
var currentRow = new Array();
//Iterate through array of responses
for (var key of info) {
    //Go thur the data a populate the column names
    //and get the first row of data
    //This has a random order for the keys
    for (var cname of Object.keys(key)) {
        if (first === true){
          console.log(cname)
          data.addColumn(typeof key[cname], cname)
        }
        currentRow.push(key[cname])
    }
    /*for (var cname of Object.keys(key)) {
        if (first === true){
          console.log(cname)
          data.addColumn(typeof key[cname], cname)
        }
        currentRow.push(key[cname])
    }*/
    first = false
    rows.push(currentRow)
    currentRow = new Array();
}

data.addRows(rows);

var table = new google.visualization.Table(document.getElementById('table_div'));

table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
});
}
