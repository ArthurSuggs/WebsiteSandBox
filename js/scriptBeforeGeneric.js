<!--Load the AJAX API-->
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

function addElement (idName) {
  // create a new div element
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", idName);

  // and give it some content
  const newContent = document.createTextNode(idName);

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}
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
  addElement("poopie")

}
//google.charts.load('current', {'packages':['corechart']});
//google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawLineChart);


function drawLineChart() {

    /*fetch('http://localhost:8080/testData').then(response => response.json())
  .then(info => {
    populateLineChart(info)*/
    fetch('http://localhost:8080/mongoData?Airline=SPIRIT&Parser=FingerPrint&TailId=N659NK&FlightId=NKS631&DateYYYYMMDD=20210211')
      .then(response => response.json())
    .then(info => {
      //populateLineChartFing(info)
      var columns = new Array();
      var rowsWapMgr = new Array();
      var rowsUserMgr = new Array();
    console.log(info)
      for (var key in info) {
        for (var procs in info[key].fingerprints) {
          if (procs === "WapManager"){
            //console.log(info[key].FingerPrints[procs])
            columns.push(procs)
          //  rows = info[key].FingerPrints[procs]
            for (var row of info[key].fingerprints[procs]) {
              //console.log(row)
              var res = row.windowstart.split(",");
              //var h,m,s = res[1].split(":")
              //console.log(h,m,s)
              console.log([res[1].split(":"),row.windowcnt])
              //Date(Year, Month, Day, Hours, Minutes, Seconds, Milliseconds)
              //new Date(2021,02,11,h,m,s,0)
              rowsWapMgr.push([res[1].split(":").map(Number),row.windowcnt])//
            }
          } else if (procs === "UserManagerComp") {
            for (var row of info[key].fingerprints[procs]) {
              var res = row.windowstart.split(",");
              console.log([res[1].split(":"),row.windowcnt])
              //Date(Year, Month, Day, Hours, Minutes, Seconds, Milliseconds)
              //new Date(2021,02,11,h,m,s,0)
              rowsUserMgr.push([res[1].split(":").map(Number),row.windowcnt])
            }
          }

      //console.log(info[key].FingerPrints)
      //proc.FingerPrints
        }
        //console.log(info.)
      }
      //console.log(rows)
      addElement("WapManager")
      addElement("UserManager")
      populateLineChartFing(rowsWapMgr,"WapManager","WapManager")
      populateLineChartFing(rowsUserMgr,"UserManager","UserManager")

  });
  /*{
    Airline:  "SPIRIT",
    Parser: "FingerPrint"})*/
  //getRowData(info)
  //populateLineChart(info)
  //console.log(rows)
  //console.log(info.LineChartRows[key].Row1)
  /*rows.push([info.LineChartRows[key].Row1,
  info.LineChartRows[key].Row2,
  info.LineChartRows[key].Row3,
  info.LineChartRows[key].Row4])*/
  //populateLineChart(rows)
}
function populateLineChartFing(rowData,processName,IdToPopulate) {
  /*type - A string with the data type of the values of the column.
   The type can be one of the following: 'string', 'number', 'boolean', 'date',
    'datetime', and 'timeofday'.*/
  var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'windowtime');
      data.addColumn('number', 'fig');


//console.log("pp")
      data.addRows(rowData);

      var options = {
        chart: {
          title: processName,
          subtitle: 'Logs per minute)'
        },
        width: 900,
        height: 500
      };

      //addElement(IdToPopulate)

      var chart = new google.charts.Line(document.getElementById(IdToPopulate));

      chart.draw(data, google.charts.Line.convertOptions(options));
}
function getRowData(rows) {
  console.log("poopiep")
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