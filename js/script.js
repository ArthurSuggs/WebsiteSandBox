<!--Load the AJAX API-->
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

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

google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawLineChart);


function drawLineChart() {

    fetch('http://localhost:8080/mongoData?Airline=SPIRIT&Parser=FingerPrint&TailId=N659NK&FlightId=NKS631&DateYYYYMMDD=20210211')
      .then(response => response.json())
    .then(info => {
      //populateLineChartFing(info)
      var columns = new Array();
      var barchart = new Array();
      var barchartcnt = new Array();
      var rows = new Array();
      //console.log(info)
      for (var key in info) {
        for (var procs in info[key].fingerprints) {
          columns.push(procs)
          for (var row of info[key].fingerprints[procs]) {
              var res = row.windowstart.split(",");
            //Date(Year, Month, Day, Hours, Minutes, Seconds, Milliseconds)
              //new Date(2021,02,11,h,m,s,0)
              rows.push([res[1].split(":").map(Number),row.windowcnt])
              barchartcnt.push(row.windowcnt)
            }
            var cntTotal = barchartcnt.reduce((accumulator, currentValue) => accumulator + currentValue)
            barchart.push([procs,cntTotal])
            //console.log(procs," count Total:", barchartcnt.reduce((accumulator, currentValue) => accumulator + currentValue))
            //addElement(procs)
            //populateLineChartFing(rows,procs,procs)
            //rows = new Array();
            barchartcnt = new Array();
          }
        }
        populateBarGen(barchart)
  });
}
function populateBarGen(rowData) {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'ProcessName');
      data.addColumn('number', 'Count');
      data.addRows(rowData);
      // Set chart options
      options = {'title':'ProcessCnt',
                  //width: '100%',
                   showTextEvery:1
                //  height: '100vh'//};
              };
      var chartBar = new google.visualization.BarChart(document.getElementById('chart_bar'));
      chartBar.draw(data, options);
}
function populateLineChartFing(rowData,processName,columnNameArray) {
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

      var chart = new google.charts.Line(document.getElementById(processName));

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

google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawIT);

//this creates a table from a flat json
function drawIT() {
  fetch('http://localhost:8080/mongoData?Airline=SPIRIT&Parser=SWVersionsSES&TailId=N674NK&FlightId=.*&DateYYYYMMDD=2021030')
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
