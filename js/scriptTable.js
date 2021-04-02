<!--Load the AJAX API-->
var el = document.getElementById("Refresh")
if(el){
    el.addEventListener("click", drawTable);
}

google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

function drawTable() {

    var airline = document.getElementById("Airline").value
    var parser = document.getElementById("Parser").value
    var date = document.getElementById("Date").value
    var tail = document.getElementById("Tail").value
    fetch('http://localhost:8080/mongoData?Airline='+airline+'&Parser='+parser+
    '&TailId='+tail+'&FlightId=.*&DateYYYYMMDD='+date)
      .then(response => response.json())
    .then(info => {
      var data = new google.visualization.DataTable();
      //add the column names only do one
      var first = true
      var rows = new Array();
      var currentRow = new Array();
      data.addColumn('datetime', 'startof10k')
      data.addColumn('datetime', 'endof10k')
      data.addColumn('number', 'timeabove10k')
      data.addColumn('string', 'departure')
      data.addColumn('string', 'departure')
      data.addColumn('string', 'flightid')
      data.addColumn('number', 'internetstatus10k')
      data.addColumn('number', 'intranetstatus10k')
      for (var key of info) {
        if (key['above10k'] && key['timeabove10k'] > 30){
          console.log(key['departure'])
          rows.push([new Date(key['startof10k']),new Date(key['endof10k']),
          Number(key['timeabove10k']), key['departure'],key['departure'],
          key['flightid'],Number(key['internetstatus10k']),
          Number(key['intranetstatus10k'])
        ])
        }
      }
      rows.sort(sortFunction);

      data.addRows(rows);
      var table = new google.visualization.Table(document.getElementById('table_div'));
      table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
  });
}
