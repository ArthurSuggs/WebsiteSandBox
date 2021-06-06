//var webserver = 'http://MLB-M4244:8080/'
//var webserver = 'http://localhost:8080/'

RegisterGrapher(DeepDiveFlytNet,"Refresh","click")
var WapDataOptions = {chart: { title: "WapData"},width: '100%'};
var FingerPrintSESOptions = {chart: { title: "Process HeartBeat"},width: '100%',height: '100%'};
var MonitSummaryTableOptions = {chart: { title: "Monit Summary"},width: '100%'};
var LanIpGraphSESOptions = {chart: { title: "Users From Englog Graph. NOTE: Data is lost during rate limit logging"},width: '100%'};

//If using the flightId remove the date from url
function DeepDiveFlytNet(UrlParamaters){
  var date = formatDate()
  var airline = document.getElementById("Airline").value
  var tail = document.getElementById("Tail").value
  var flightId = document.getElementById("FlightId").value
  var all = ".*"
  setUserStateCookies(airline, tail, flightId, date)

  var InfoForDeepDiveFPMfast = CreateQueryInfo("mongoData",airline,all,tail,"EnglogEvents",flightId,FingerPrintSESOptions)
  var InfoForMonitSummaryTable = CreateQueryInfo("mongoData",airline,all,tail,"MonitSummary",flightId,MonitSummaryTableOptions)
  var InfoForWapData = CreateQueryInfo("mongoData",airline,all,tail,"WapData",flightId,WapDataOptions)
//  var InfoForFingerPrint
  cleanSfaFlyTnet()
  getTailIds()
  if(document.getElementById("Tail").value){
    getFlightIds()
  }
  getEnglogEvents(InfoForDeepDiveFPMfast)
  getMonitSummary(InfoForMonitSummaryTable)
  /*getDeepDiveDataSpecificParser2(InfoForWapData,WapDataStruct,'wap_data')*/
}
function getMonitSummary(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawtimelineOneNameTwoTimes(QueryInfo.parser,MonitSummaryStruct,'monit_summary_time_line',QueryInfo,info)
    });
}
function getEnglogEvents(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
  	  // drawAshwinsTimeline(QueryInfo.parser,AshwinsTimelineStruct,'ashwin_time_line',QueryInfo,info)
      drawFingerPrintLineCharts(QueryInfo.parser,FingerPrintLineStruct,'finger_print_line',QueryInfo,info)
      // drawTableFromOneDeepJson(QueryInfo.parser,FlightPhasesTableStruct,'flightphase_table',QueryInfo,info)
      QueryInfo.options = LanIpGraphSESOptions
      drawLineChartFromArrayInOneDeepJson(QueryInfo.parser,LanIPGraphStruct,'lan_ip_graph',QueryInfo,info)
      // QueryInfo.options = UserRegOptions
      // drawtimelineOneNameTwoTimes(QueryInfo.parser,UserRegStruct,'usage_time_line',QueryInfo,info)
      // drawtimelineOneNameTwoTimes(QueryInfo.parser,FlightPhasesStruct,'flightphase_time_line',QueryInfo,info)
    });
}
function getLogOffload(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      //console.log(info)
      drawTableGeneric(QueryInfo.parser,LogOffloadPerFileStruct,"log_offload_table",QueryInfo,info)
      QueryInfo.options = { chart: { title: 'LogOffloads',}}
      //QueryInfo.options.title = "Offloads - Scatter"
      drawScatterChartFromArrayOfFlatJSON(QueryInfo.parser,LogOffloadPerFileBarCharStruct,'log_offload_scatter',QueryInfo,info)
    });
}
function getDarkAircraft(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawTableGeneric(QueryInfo.parser,DarkAircraftStruct,"dark_table",QueryInfo,info)
      /*QueryInfo.options = {'title':"DarkAircraft Date -> Root Cause - Histogram", showTextEvery:1, width: '100%',
          bar: {groupWidth: "95%"}}
      drawHistogramGeneric(QueryInfo.parser,DarkAircraftHistogramStruct,'dark_histogram',QueryInfo,info)*/
    });
}
