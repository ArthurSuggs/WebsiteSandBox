//var webserver = 'http://MLB-M4244:8080/'
var webserver = 'http://localhost:8080/'
var UsageSummaryStruct = [
  ['datetime', 'registrationrec'],
  ['string', 'flightid'],
  ['string', 'userid'],
  ['number', 'autowanrxmb'],
  ['number', 'autowantxmb'],
  ['number', 'paidwanrxmb'],
  ['number', 'paidwantxmb'],
  ['number', 'wholesordrqt'],
  ['number', 'wholesordresp'],
  ['number', 'authrec'],
  ['number', 'logpurchase'],
  ['number', 'wlchange'],
  ['number', 'deviceadd'],
  ['number', 'servicetput'],
  ['string', 'producttype']
]
var UserHistogramStruct = [
  ['string', 'userid'],
  ['number', 'servicetput']
]
var UserFreeScatterChartStruct = [
  ['datetime', 'registrationrec'],
  ['number', 'paidwanrxmb'],
  ['number', 'autowanrxmb']
]
var UserPaidScatterChartStruct = [
  ['datetime', 'registrationrec'],
  ['number', 'paidwanrxmb']
]
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
var UsageBarStruct = [
  ['string', 'userid'],
  ['number', 'autowanrxmb'],
  ['number', 'autowantxmb'],
  ['number', 'paidwanrxmb'],
  ['number', 'paidwantxmb'],
  ['number', 'logpurchase']
]
var FleetHealthStruct = [
    ['string', 'TailId'],
    ['number', 'Internetstatus10k'],
    ['number', 'Intranetstatus10k'],
    ['number', 'Flights'],
    ['number', 'RebootsInAir']
]
var UsersPerFlightLineStruct = [
  //['datetime', 'TakeOff'],
  ['string', 'FlightId'],
  //['string', 'FlightIdUniq'],
  ['number', 'UserCnt']
]
var UdpTraceSummaryStruct = [
 ['string', 'filename'],
 ['number', 'avgesno'],
 ['number', 'termstate000'],
 ['number', 'termstatenot000'],
 ['number', 'connected'],
 ['number', 'disconnected'],
 ['number', 'outofcoverageseconds']]
var UdpTraceSummaryConnectedPieStruct = [
  ['number', 'connected',"Connected"],
  ['number', 'disconnected',"Disconnected"]]
var UdpTraceSummaryTerminalPieStruct = [
   ['number', 'termstate000',"Terminal State 0.0.0"],
   ['number', 'termstatenot000',"Terminal State Not 0.0.0"]]
var UsageDetailsWanSESStruct = {'usagedetails': [
    ['datetime', 'time'],
    ['number', 'wanrx'],
    ['number', 'wantx']]}
var UsageDetailsLanSESStruct = {'usagedetails': [
    ['datetime', 'time'],
    ['number', 'lanrx'],
    ['number', 'lantx']]}
var UdpTraceBandwidthDetailsRxStruct = {'udptracebandwidth': [
    ['datetime', 'datetime'],
    ['number', 'actualrxbwkbps'],
    ['number', 'possiblerxbwkbps']]}

var UdpTraceBandwidthDetailsTxStruct = {'udptracebandwidth': [
        ['datetime', 'datetime'],
        ['number', 'actualtxbwkbps'],
        ['number', 'possibletxbwkbps']]}
var SWVersionsStruct = [
	['string', 'TailId'],
	['datetime', 'Landing'],
    ['string', 'ConnVMSWVersion'],
    ['string', 'ConnVMSWVKaConfig'],
    ['string', 'ModemSWVer'],
    ['string', 'WAP1SoftwareVersion']
]
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
var FPMFastUdpTraceStruct = [
  ['datetime', 'StartOf10K'],
  ['datetime', 'EndOf10K'],
  ['number', 'TimeAbove10K'],
  ['string', 'Departure'],
  ['string', 'Destination'],
  ['string', 'FlightID'],
  ['number', 'InternetStatus10k'],
  ['number', 'IntranetStatus10k'],
  ['number', 'RxTotal'],
  ['number', 'TxTotal'],
  ['number', 'UserCnt'],
  ['number', 'RebootsInAir'],
  ['number', 'AvgEsno'],
  ['number', 'TermState000'],
  ['number', 'TermStateNot000'],
  ['number', 'Connected'],
  ['number', 'Disconnected'],
  ['number', 'Degraded'],
]
var ScoreLineGraphStruct = [
    ['datetime', 'takeoff'],
    ['number', 'internetstatus10k'],
    ['number', 'intranetstatus10k'],
    ['number', 'kamustatescore'],
    ['number', 'portalscore'],
    ['number', 'wap1score'],
    ['number', 'wap2score'],
    ['number', 'wap3score']
]
var AAUGraphSESStruct = {'aaugraphses': [
  ['datetime', 'time'],
  ['number', 'beamid'],
  ['number', 'terminalstatecode'],
  ['number', 'linkstate'],
  ['number', 'flsignalqual'],
  ['number', 'bytesrxair'],
  ['number', 'altitude'],
]}
var LanIPGraphStruct = {'englogpoints': [
  ['datetime', 'currenttime'],
  ['number', 'lanipcnt'],
  ['number', 'currentroutecnt'],
  ['number', 'userregcnt'],
  ['number', 'alt']
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
var WapDataOptions = {chart: { title: "WapData"},width: '100%'};
var AAUGraphSESOptions = {chart: { title: "AAUGraphSES"},width: '100%'};
var LanIpGraphSESOptions = {chart: { title: "Users From Englog Graph. NOTE: Data is lost during rate limit logging"},width: '100%'};
var UDPTraceDetailGraphSESOptions = {chart: { title: "UDPTraceDetail"},width: '100%'};
var UsageDetailsOptions  = {chart: { title: "UsageDetails"},width: '50%'};
var UserRegOptions  = {chart: { title: "User Manager: Got user registration command timeline"},width: '1000%'};
AAUGraphSESOptions.explorer = {
  actions: ['dragToZoom', 'rightClickToReset'],
  axis: 'horizontal',
  keepInBounds: true,
  maxZoomIn: 4.0
}
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
  var th = document.getElementById("TailHealth")
  var sfa = document.getElementById("singleFlightAnalysis")
  var UrlParamaters = "poopie"
  if(th){
      TailHealth(UrlParamaters);
      setUserStateCookies(document.getElementById("Airline").value,
      document.getElementById("Tail").value,
      '.*',
      '.*',
      formatDate())
  }else if(sfa) {
      DeepDive(UrlParamaters)
      setUserStateCookies(document.getElementById("Airline").value,
      document.getElementById("Tail").value,
      document.getElementById("FlightId").value,
      document.getElementById("UserId").value,
      formatDate())
  }
}
function TailHealth(UrlParamaters) {
  var InfoForTailHealthFPMfast = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    date: formatDate(),
    tail: document.getElementById("Tail").value,
    parser: "FPMfastSES",
    flightId: '.*'
  }
  var InfoForTailHealthLogOffload = {
    url: "LogOffload",
    airline: document.getElementById("Airline").value,
    date: formatDate(),
    tail: document.getElementById("Tail").value,
    parser: "LogOffload",
    flightId: '.*'
  }
  var InfoForUserCntPerFlight = {
    url: "UserCntPerFlight",
    airline: document.getElementById("Airline").value,
    date: formatDate(),
    tail: document.getElementById("Tail").value,
    parser: "UsersPerFlight",
    options: {height : 0},
    flightId: '.*'
  }
  var InfoForUdpTraceSummaryTailHealth= {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    date: formatDate(),
    tail: document.getElementById("Tail").value,
    flightId: '.*',
    parser: "UdpTraceSummary"
  }
  var InfoForFPMfastSESandUDPTraceTailHealth= {
    url: "FPMfastSESandUDPTrace",
    airline: document.getElementById("Airline").value,
    date: formatDate(),
    tail: document.getElementById("Tail").value,
    flightId: '.*',
    parser: "UdpTraceSummary"
  }
  var InfoForDarkAircraft= {
    url: "DarkAircraft",
    airline: document.getElementById("Airline").value,
    date: formatDate(),
    tail: document.getElementById("Tail").value,
    flightId: '.*',
    parser: ""
  }
  getTailIds()
  if(InfoForTailHealthFPMfast.airline !== "SPIRIT"){
    InfoForTailHealthFPMfast.parser = "FPMfast"
  } else {
    getFPMFastUdpTrace(InfoForFPMfastSESandUDPTraceTailHealth,FPMFastUdpTraceStruct,"fpm_udptrace_table")
    getDeepDiveDataUdptraceSummary(InfoForUdpTraceSummaryTailHealth)
  }
  getLogOffload(InfoForTailHealthLogOffload)
  getDarkAircraft(InfoForDarkAircraft)
  getTailHealthFPMfastSES(InfoForTailHealthFPMfast)
  getUserCntPerFlight(InfoForUserCntPerFlight,UsersPerFlightLineStruct,"")
}
//If using the flightId remove the date from url
function DeepDive(UrlParamaters){
  var InfoForDeepDiveFPMfast = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    //This looks crazy but the date is replaced by the value
    //In flight ID.
    date: ".*",
    tail: document.getElementById("Tail").value,
    parser: "FPMfastSES",
    flightId: document.getElementById("FlightId").value,
  }
  var InfoForFPMfastSESandUDPTraceTailHealth= {
    url: "FPMfastSESandUDPTrace",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    //This looks crazy but the date is replaced by the value
    //In flight ID.
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    parser: "UdpTraceSummary"
  }
  var InfoForLanIpGraph = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: LanIpGraphSESOptions,
    parser: "EnglogEvents"
  }
  var InfoForAAUGraphSES = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: AAUGraphSESOptions,
    parser: "AAUGraphSES"
  }
  var InfoForUsageDetailsSES = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    //it's going into the date for that part of the regex used to query mongo
    date: document.getElementById("UserId").value,
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
  var InfoForUdpTraceSummary= {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    //This looks crazy but the date is replaced by the value
    //In flight ID.
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: WapDataOptions,
    parser: "UdpTraceSummary"
  }
  var InfoForUdpTraceBandwidthDetails = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    //This looks crazy but the date is replaced by the value
    //In flight ID.
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: UDPTraceDetailGraphSESOptions,
    parser: "UDPTraceBandwidthDetails"
  }
  getTailIds()
  if(document.getElementById("Tail").value){
    getFlightIds()
  }

  /*if(document.getElementById("FlightId").value){
    getUserIds()
  }
  if(document.getElementById("UserId").value){
    //figure this out
  //  UsageDetailsOptions.options.chart.subtitle = document.getElementById("UserId").value
    getDeepDiveDataUsageDetails(InfoForUsageDetailsSES)
  }*/

  if(InfoForDeepDiveFPMfast.airline !== "SPIRIT"){
    InfoForDeepDiveFPMfast.parser = "FPMfast"
  }
  getDeepDiveFPMfastSES(InfoForDeepDiveFPMfast)
  getDeepDiveDataUsageSummary(InfoForDeepDiveUsage)
  getDeepDiveDataUdptraceSummary(InfoForUdpTraceSummary)
  InfoForUdpTraceBandwidthDetails.options.chart.subtitle = InfoForUdpTraceBandwidthDetails.flightId
  getDeepDiveDataUdptraceDetails(InfoForUdpTraceBandwidthDetails)
  InfoForAAUGraphSES.options.chart.subtitle = InfoForAAUGraphSES.flightId
  //getDeepDiveDataSpecificParser has a dependency on the 1st arg having an options element
  getDeepDiveDataSpecificParserChart(InfoForAAUGraphSES,AAUGraphSESStruct,'aau_graph')
  getFPMFastUdpTrace(InfoForFPMfastSESandUDPTraceTailHealth,FPMFastUdpTraceStruct,"fpm_udptrace_table")
  getEnglogEvents(InfoForLanIpGraph)
  /*getDeepDiveDataSpecificParser2(InfoForWapData,WapDataStruct,'wap_data')*/
}
function getEnglogEvents(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawTableFromOneDeepJson(QueryInfo.parser,FlightPhasesTableStruct,'flightphase_table',QueryInfo,info)
      drawLineChartFromArrayInOneDeepJson(QueryInfo.parser,LanIPGraphStruct,'lan_ip_graph',QueryInfo,info)
      QueryInfo.options = UserRegOptions
      drawtimelineOneNameTwoTimes(QueryInfo.parser,UserRegStruct,'usage_time_line',QueryInfo,info)
      drawtimelineOneNameTwoTimes(QueryInfo.parser,FlightPhasesStruct,'flightphase_time_line',QueryInfo,info)

    });
}
function getLogOffload(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      //console.log(info)
      drawTableGeneric(QueryInfo.parser,LogOffloadPerFileStruct,"log_offload_table",QueryInfo,info)
      QueryInfo.options = { chart: { title: 'v',}}
      //QueryInfo.options.title = "Offloads - Scatter"
      drawScatterChartFromArrayOfFlatJSON(QueryInfo.parser,LogOffloadPerFileBarCharStruct,'log_offload_scatter',QueryInfo,info)
    });
}
function getDarkAircraft(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      //console.log(info)
      drawTableGeneric(QueryInfo.parser,DarkAircraftStruct,"dark_table",QueryInfo,info)
    });
}

function getUserCntPerFlight(QueryInfo,CollectionStruct,GraphHtmlId){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawBarChartGeneric(QueryInfo.parser,CollectionStruct,'user_bar',QueryInfo,info)
      //Use histogram with departure and destination
      //drawHistogramGeneric(QueryInfo.parser,CollectionStruct,'user_bar',QueryInfo,info)
      drawLineChartFromArrayOfFlatJSON(QueryInfo.parser,CollectionStruct,'user_line',QueryInfo,info)
    });
}
function getFPMFastUdpTrace(QueryInfo,CollectionStruct,GraphHtmlId){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawTableGeneric(QueryInfo.parser,CollectionStruct,GraphHtmlId,QueryInfo,info)
    });
}
function getDeepDiveDataSpecificParserChart(QueryInfo,CollectionStruct,GraphHtmlId) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      //debugger;
      drawLineChartFromArrayInOneDeepJson(QueryInfo.parser,CollectionStruct,GraphHtmlId,QueryInfo,info)
    });
}
function getTailHealthFPMfastSES(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
        drawTableGeneric(QueryInfo.parser,FPMFastStruct,'fpm_table',QueryInfo,info)
        drawtimelineChartSES(QueryInfo.parser,FPMFastStruct,'time_line',QueryInfo,info)
        QueryInfo.options = { chart: { title: 'Scores over 10k per flight',
         subtitle: 'over the date range provided'}, width: '100%', height: '100%'
        }
        drawLineChartFromArrayOfFlatJSON(QueryInfo.parser,ScoreLineGraphStruct,'score_line',QueryInfo,info)
    });
}
function getDeepDiveFPMfastSES(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
        drawTableGeneric(QueryInfo.parser,FPMFastStruct,'fpm_table',QueryInfo,info)
        drawtimelineChartSES(QueryInfo.parser,FPMFastStruct,'time_line',QueryInfo,info)
    });
  }
function getDeepDiveDataUsageSummary(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      QueryInfo.options = {'title':"User Session Length - Histogram", showTextEvery:1, width: '100%',
          bar: {groupWidth: "95%"}}
      drawHistogramGeneric(QueryInfo.parser,UserHistogramStruct,'usage_hist',QueryInfo,info)
      QueryInfo.options.title = "Users registration time and usage - Scatter"
      drawScatterChartFromArrayOfFlatJSON(QueryInfo.parser,UserFreeScatterChartStruct,'usage_free_scatter',QueryInfo,info)
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
function getDeepDiveDataUdptraceSummary(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      //These are only done for Sfa
      if(QueryInfo.flightId !== ".*"){
        drawPieChartGeneric(QueryInfo.parser,UdpTraceSummaryConnectedPieStruct,'udptrace_pie_connected',QueryInfo,info)
        drawPieChartGeneric(QueryInfo.parser,UdpTraceSummaryTerminalPieStruct,'udptrace_pie_term',QueryInfo,info)
      }
      drawTableGeneric(QueryInfo.parser,UdpTraceSummaryStruct,'udptrace_table',QueryInfo,info)
    });
}
function getDeepDiveDataUdptraceDetails(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawLineChartFromArrayInOneDeepJson(QueryInfo.parser,UdpTraceBandwidthDetailsRxStruct,'udptrace_graph_rx',QueryInfo,info)
      drawLineChartFromArrayInOneDeepJson(QueryInfo.parser,UdpTraceBandwidthDetailsTxStruct,'udptrace_graph_tx',QueryInfo,info)
    });
}
