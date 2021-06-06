google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['line']});
google.charts.load('current', {'packages':['table']});
google.charts.load('current', {'packages':['timeline']});
google.charts.load('current', {'packages':['scatter']});
//var webserver = 'http://MLB-M4244:8080/'
//var webserver = 'http://localhost:8080/'

var UsageDetailsOptions  = {chart: { title: "UsageDetails"},width: '50%'};
populateDateWithTodaysDate()
getUserStateCookies()
document.getElementById("Refresh").onload = getUserStateCookies()
var el = document.getElementById("Refresh")
var al = document.getElementById("Airline")
var tl = document.getElementById("Tail")
var fl = document.getElementById("FlightId")
if(el){
    el.addEventListener("click", CreateChartsAndTables);
}
if(al){
    al.addEventListener("change", getTailIds);
}
if(tl){
    tl.addEventListener("change", getFlightIds);
}
if(fl){
    fl.addEventListener("change", getUserIds);
}
getTailIds()
if(document.getElementById("Tail").value){
  getFlightIds()
}

if(document.getElementById("FlightId").value){
  getUserIds()
}

//getUserStateCookies()

function CreateChartsAndTables(){
  var ua = document.getElementById("UserAnalysis")
  var UrlParamaters = "poopie"
  if(ua) {
    setUserStateCookies(document.getElementById("Airline").value,
    document.getElementById("Tail").value,
    document.getElementById("FlightId").value,
    document.getElementById("UserId").value,
    document.getElementById("Date").value)
    DeepDiveUsage(UrlParamaters)
  }
}

//If using the flightId remove the date from url
function DeepDiveUsage(UrlParamaters){
  var InfoForUsageDetailsSES = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    //it's going into the date for that part of the regex used to query mongo
    date: document.getElementById("UserId").value+".XML",
    tail: ".*",
    flightId: ".*",
    options: UsageDetailsOptions,
    parser: "UsageDetails"
  }

  var InfoForDeepDiveUsage = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    date: ".*",
    parser: "UsageSummary",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value
  }
  getFlightIds()

  if(document.getElementById("FlightId").value){
    getUserIds()
  }
  if(document.getElementById("UserId").value){
    //figure this out
  //  UsageDetailsOptions.options.chart.subtitle = document.getElementById("UserId").value
    getDeepDiveDataUsageDetails(InfoForUsageDetailsSES)
  }
  getDeepDiveDataUsageSummary(InfoForDeepDiveUsage)
}

function getDeepDiveDataUsageSummary(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawTableFromFlatJson(QueryInfo.parser,UsageSummaryStruct,'usage_table',QueryInfo,info)
        QueryInfo.options = {'title':'Usage Bar Graph', showTextEvery:1, width: '100%',
            bar: {groupWidth: "95%"}}
      drawBarChartGeneric(QueryInfo.parser,UsageBarStruct,'usage_bar',QueryInfo,info)
        QueryInfo.options.title = "User Session Length - Histogram"
      drawHistogramGeneric(QueryInfo.parser,UserHistogramStruct,'usage_hist',QueryInfo,info)

      QueryInfo.options.title = "X - Users registration time: Y - Paid WanRx: Size - Sample Size  - Bubble"
      drawBubbleChartFromArrayOfFlatJSON(QueryInfo.parser,UserPaidBubbleChartStruct,'usage_paid_bubble',QueryInfo,info)
      QueryInfo.options.title = "X - Users registration time: Y - Free WanRx: Size - Sample Size  - Bubble"
      drawBubbleChartFromArrayOfFlatJSON(QueryInfo.parser,UserFreeBubbleChartStruct,'usage_free_bubble',QueryInfo,info)

      QueryInfo.options.title = "Users registration time and usage - Scatter"
      drawScatterChartFromArrayOfFlatJSON(QueryInfo.parser,UserFreeScatterChartStruct,'usage_free_scatter',QueryInfo,info)
      QueryInfo.options.title = "Users Paid WanRx"
      drawPieChartUsage(QueryInfo.parser,UserPaidRxPieStruct,'usage_pie_paid_wanrx',QueryInfo,info)
      QueryInfo.options.title = "Users Paid WanTx"
      drawPieChartUsage(QueryInfo.parser,UserPaidTxPieStruct,'usage_pie_paid_wantx',QueryInfo,info)
      QueryInfo.options.title = "Users Free WanRx"
      drawPieChartUsage(QueryInfo.parser,UserFreeRxPieStruct,'usage_pie_free_wanrx',QueryInfo,info)
      QueryInfo.options.title = "Users Free WanTx"
      drawPieChartUsage(QueryInfo.parser,UserFreeTxPieStruct,'usage_pie_free_wantx',QueryInfo,info)
      //QueryInfo.options.title = "Users Paid wanRx - Scatter"
      //drawScatterChartFromArrayOfFlatJSON(QueryInfo.parser,UserPaidScatterChartStruct,'usage_paid_scatter',QueryInfo,info)
    });
}
function getDeepDiveDataUsageDetails(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawLineChartFromArrayInOneDeepJson(QueryInfo.parser,UsageDetailsWanSESStruct,'usage_chart_wan',QueryInfo,info)
      drawLineChartFromArrayInOneDeepJson(QueryInfo.parser,UsageDetailsLanSESStruct,'usage_chart_lan',QueryInfo,info)
    });
}

// function drawPieChartUsage(parser,pieStruct,ElementId,QueryInfo,info) {
//     var chart = new google.visualization.PieChart(document.getElementById(ElementId));
//     var rows = new Array();
//     var header = new Array();
//      for (var row of pieStruct) {
//        header.push(row[2])
//      }
//      rows.push(header)
//     if(info){
//       for (var key of info) {
//         rows.push(AddRowsToTableBasedOnPieUsageStructAndFlatJson(pieStruct, key))
//       }
//     }
//     if (rows.length > 1) {
//     /*var rowsClean = new Array();
//     rowsClean.push(header)
//     //rows
//     ["N659NK_20210401121727_22", ["Wan Rx - Paid", 0 ] ]*/
//       var data = google.visualization.arrayToDataTable(rows)
//       QueryInfo.options.width = "900px";
//       QueryInfo.options.height =  "500px";
//       chart.draw(data, QueryInfo.options);
//     } else {
//       document.getElementById(ElementId).innerHTML = "";
//       console.log("No data in")
//     }
// }
// function AddRowsToTableBasedOnPieUsageStructAndFlatJson(pieStruct, flatJson) {
//   var row = new Array();
//   for (index in pieStruct) {
//    if (pieStruct[index][0] === 'datetime') {
//      row.push(new Date(flatJson[pieStruct[index][1]]))
//    } else if (pieStruct[index][0] === 'number') {
//      row.push(Number(flatJson[pieStruct[index][1]]))
//    } else {
//      row.push(flatJson[pieStruct[index][1]])
//    }
//  }
//  return row
// }
