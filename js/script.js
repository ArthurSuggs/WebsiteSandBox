<!--Load the AJAX API-->
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

      //get the data from go
      fetch('http://localhost:8080/rtnJson').then(response => response.json())
  .then(info => {
    var rows = new Array();
    for (var key in info.Rows) {
      rows.push([key,info.Rows[key]])
    }
    populateBarAndOrPieCharts(rows)

  });

}
//google.charts.load('current', {'packages':['corechart']});
//google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawLineChart);


function drawLineChart() {

    fetch('http://localhost:8080/testData').then(response => response.json())
  .then(info => {

  /*var rows = new Array();

  for (var key in info.LineChartRows) {
    //console.log(info.LineChartRows[key].Row1)
    rows.push([info.LineChartRows[key].Row1,
    info.LineChartRows[key].Row2,
    info.LineChartRows[key].Row3,
    info.LineChartRows[key].Row4])
  }*/
  //getRowData(info)
  populateLineChart(info)
  //  console.log(rows)

  //populateLineChart(rows)

  });

}
function getRowData(rows) {
  console.log("pp")
}
function populateLineChart(rowData) {
  var data = new google.visualization.DataTable();
      data.addColumn('number', 'day');
      data.addColumn('number', 'timeOver10k');
      data.addColumn('number', 'Usage');
      data.addColumn('number', 'Unk');

console.log("pp")
      data.addRows(rowData);

      var options = {
        chart: {
          title: 'Box Office Earnings in First Two Weeks of Opening',
          subtitle: 'in millions of dollars (USD)'
        },
        width: 900,
        height: 500
      };

      var chart = new google.charts.Line(document.getElementById('chart_line'));

      chart.draw(data, google.charts.Line.convertOptions(options));
}
//google.charts.load('current', {'packages':['line']});
function populateBarAndOrPieCharts(rowData) {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      data.addRows(rowData);
      // Set chart options
      var options = {'title':'How Much Pizza I Ate Last Night',
                     'width':400,
                     'height':300};

      // Instantiate and draw our chart, passing in some options.
      var chartPie = new google.visualization.PieChart(document.getElementById('chart_pie'));
      chartPie.draw(data, options);

      options = {'title':'How Much Pizza I Ate Last Night',
                     'width':500,
                     'height':300};

      var chartBar = new google.visualization.BarChart(document.getElementById('chart_bar'));
      chartBar.draw(data, options);
}
