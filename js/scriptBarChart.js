<!--Load the AJAX API-->
var el = document.getElementById("Refresh")
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
   drawBarChartGeneric('UsageSummary',UsageBarStruct,'usage_bar',true)
}
function drawBarChartGeneric(parser,genStruct,ElementId,useFlightId) {
  var airline = document.getElementById("Airline").value
  //var parser = document.getElementById("Parser").value
  var date = document.getElementById("Date").value
  var tail = document.getElementById("Tail").value

  var flightId = ".*"
  if(useFlightId) {
    flightId = document.getElementById("FlightId").value
  }
  fetch('http://localhost:8080/mongoData?Airline='+airline+'&Parser='+parser+
  '&TailId='+tail+'&FlightId='+flightId+'&DateYYYYMMDD='+date)
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
      rows.sort(sortFunction);
      data.addRows(rows);
      options = {'title':parser,
                  /*width: '100%',

                  height: '100%'//};*/
                  showTextEvery:1,
                  width: '100%',
                  height: rows.length*50,
          bar: {groupWidth: "95%"},
              };

      chartBar.draw(data, options);
    }
  });
}
