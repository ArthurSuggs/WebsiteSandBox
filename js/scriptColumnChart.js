<!--Load the AJAX API-->
var el = document.getElementById("Refresh")
if(el){
    el.addEventListener("click", drawColumnChart);
}

google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawColumnChart);

//Create 3 columns for each tail
//The average signal,cabin,tsc connected
function drawColumnChart() {

  var airline = document.getElementById("Airline").value
    var parser = document.getElementById("Parser").value
    var date = document.getElementById("Date").value
    var tail = document.getElementById("Tail").value
    fetch('http://localhost:8080/mongoData?Airline='+airline+'&Parser='+parser+
    '&TailId='+tail+'&FlightId=.*&DateYYYYMMDD='+date)
      .then(response => response.json())
    .then(info => {
      var columns = new Array();
      var internetstatus10k = 0
      var intranetstatus10k = 0
      var timeabove10k = 0
      var flights = 0
      //var dataTable = new google.visualization.DataTable();
      columns.push(["TailId",'Internet', 'Intranet', 'Time Above 10k'])
      //Iterate through array of responses
      for (var key of info) {
        if (key['above10k'] && key['timeabove10k'] > 30){
          internetstatus10k += Number(key['internetstatus10k'])
          intranetstatus10k += Number(key['intranetstatus10k'])
          timeabove10k += Number(key['timeabove10k'])
          flights++
        }
      }
      if (flights > 0) {
        internetstatus10k = internetstatus10k/flights
        intranetstatus10k = intranetstatus10k/flights
        timeabove10k = timeabove10k/flights
      }
      columns.push([tail,internetstatus10k,intranetstatus10k,timeabove10k])
      //dataTable.addRows(columns)
      var data = google.visualization.arrayToDataTable(columns)

        var options = {
          chart: {
            title: 'Internet, Intranet and Time Over 10k',
            subtitle: 'Average over the date range provided',
          },
          width: '100%', height: '100%'
        };

        var chart = new google.charts.Bar(document.getElementById('column_chart'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
  });
}
