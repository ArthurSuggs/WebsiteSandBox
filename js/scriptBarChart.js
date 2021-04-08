<!--Load the AJAX API-->
var el = document.getElementById("DeepDive")
if(el){
    el.addEventListener("click", drawBarChart);
}
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawBarChart);

var UsageBarStruct = [
  ['string', 'userid'],
  ['number', 'autowanrxmb'],
  ['number', 'autowantxmb'],
  ['number', 'paidwanrxmb'],
  ['number', 'paidwantxmb'],
  ['number', 'logpurchase']
]
function drawBarChart() {
  var InfoForUsageBar = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    date: document.getElementById("Date").value,
    tail: document.getElementById("Tail").value,
    options: {'title':'Usage Bar Graph',
                showTextEvery:1,
                width: '100%',
        bar: {groupWidth: "95%"},
      },
    flightId: document.getElementById("FlightId").value
  }
   drawBarChartGeneric('UsageSummary',UsageBarStruct,'usage_bar',InfoForUsageBar)
}
function drawBarChartGeneric(parser,genStruct,ElementId,QueryInfo) {
  fetch('http://localhost:8080/'+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
  .then(info => {
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
        if (parser === "FPMfastSES") {
          if (key['above10k'] && key['timeabove10k'] > 30) {
            flightIds.add(key['flightid'])
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        } else if (parser === "UsageSummary") {
          if ((key['logpurchase'] > 1) || (key['autowanrxmb'] > 10)) {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        }
      }
    }
    if (rows.length > 0) {
      rows.sort(sortFunction);
      data.addRows(rows);      
      QueryInfo.options.height.rows.length*50,
      chartBar.draw(data, QueryInfo.options);
    } else {
      console.log("No data in")
    }
  });
}
