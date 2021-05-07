//var webserver = 'http://MLB-M4244:8080/'
var webserver = 'http://localhost:8080/'

var WapDataStruct = {
  'wap1data': [
    ['datetime','currenttime'],
    ['number','bytes_sent'],
    ['number','bytes_received']]/*,
  'wap2data': [
    ['datetime','currenttime'],
    ['number','bytes_sent'],
    ['number','bytes_received']],
  'wap3data': [
    ['datetime','currenttime'],
    ['number','bytes_sent'],
    ['number','bytes_received']]*/
}
var LogOffloadPerFileStruct = [
  ['string', 'TakeOff'],
  ['string', 'Landing'],
  ['string', 'Departure'],
  ['string', 'Destination'],
  ['string', 'FlightID'],
  ['boolean', 'Above10k'],
  ['number', 'UsageOffloads'],
  ['number', 'AllOffloads']
]
var LogOffloadPerFileBarCharStruct = [
  ['datetime', 'TakeOff'],
  ['number', 'UsageOffloads'],
  ['number', 'AllOffloads']
]
var DarkAircraftStruct = [
  ['string', 'Tail'],
  ['string', 'Type'],
  ['string', 'Opened'],
  ['string', 'Closed'],
  ['string', 'Squawk'],
  ['string', 'Mx_Action'],
  ['string', 'Description'],
  ['string', 'Root_Cause'],
  ['string', 'Engineering_Notes']
]
var DarkAircraftHistogramStruct = [
  ['string', 'Root_Cause'],
  ['string', 'Mx_Action']
]
var FPMFastStruct = [
  ['datetime', 'startof10k'],
  ['datetime', 'endof10k'],
  ['number', 'timeabove10k'],
  ['string', 'departure'],
  ['string', 'destination'],
  ['string', 'flightid'],
  ['number', 'internetstatus10k'],
  ['number', 'intranetstatus10k'],
  ['number', 'rxtotal'],
  ['number', 'txtotal'],
  ['number', 'rebootsinair']
]
var LanIPGraphStruct = {'englogpoints': [
  ['datetime', 'currenttime'],
  ['number', 'lanipcnt'],
  ['number', 'currentroutecnt'],
  ['number', 'userregcnt'],
  ['number', 'alt']
]}
var AshwinsTimelineStruct = { 'fkalmgrupdateinternet': [
  ['datetime', 'currenttime'],
  ['number', 'internetstate'],
	['number', 'broadbandswitchstate'],
	['number', 'internetoverridestate'],
	['number', 'sysinternet'],
	['number', 'sysintranet'],
	['number', 'kamonline'],
	['number', 'portalonline'],
	['number', 'wapsonline']
]}
var FingerPrintLineStruct = { 'fingerprintresults': [
  ['datetime', 'windowstart'],
  ['number', 'windowcnt']
]}
var FlightPhasesStruct = {'flightphases': [
  ['string', 'name'],
  ['datetime', 'time'],
  ['datetime', 'time']
]}
var FlightPhasesTableStruct = {'flightphases': [
  ['datetime', 'time'],
  ['string', 'name']
]}
var RebootsStruct = {'reboots': [
  ['datetime', 'time'],
  ['string', 'name']
]}
var UserRegStruct = {'userreg': [
  ['string', 'userid'],
  ['datetime', 'creationtime'],
  ['datetime', 'creationtime']
]}
var MonitSummaryStruct = {'monitsummary': [
  ['string', 'name'],
  ['datetime', 'time'],
  ['datetime', 'time']
]}
var WapDataOptions = {chart: { title: "WapData"},width: '100%'};
var FingerPrintSESOptions = {chart: { title: "Process HeartBeat"},width: '100%',height: '100%'};
var MonitSummaryTableOptions = {chart: { title: "Monit Summary"},width: '100%'};
var LanIpGraphSESOptions = {chart: { title: "Users From Englog Graph. NOTE: Data is lost during rate limit logging"},width: '100%'};
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
if(tl && fl){
    tl.addEventListener("change", getFlightIds);
}

function CreateChartsAndTables(){
  var sfa = document.getElementById("singleFlightAnalysisFlytnet")
  var UrlParamaters = "poopie"
  if(sfa) {
      cleanSfaFlyTnet();
      DeepDiveFlytNet(UrlParamaters)
      setUserStateCookies(document.getElementById("Airline").value,
      document.getElementById("Tail").value,
      document.getElementById("FlightId").value,
      //document.getElementById("UserId").value,
      formatDate())
  }
}
//If using the flightId remove the date from url
function DeepDiveFlytNet(UrlParamaters){
  var InfoForFingerPrint = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: FingerPrintSESOptions,
    parser: "EnglogEvents"
  }
  var InfoForMonitSummaryTable = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: MonitSummaryTableOptions,
    parser: "MonitSummary"
  }
  var InfoForWapData = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: WapDataOptions,
    parser: "WapData"
  }
  getTailIds()
  if(document.getElementById("Tail").value){
    getFlightIds()
  }
  getEnglogEvents(InfoForFingerPrint)
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
function cleanSfaFlyTnet(){
  document.getElementById("monit_summary_time_line").innerHTML = "";
  document.getElementById("finger_print_line").innerHTML = "";
//  document.getElementById("childElement").innerHTML = "";
  document.getElementById("lan_ip_graph").innerHTML = "";
}
