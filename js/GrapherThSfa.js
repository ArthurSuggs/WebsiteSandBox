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
//name, x, y, group, size of bubble
var EnglogUserBubbleChartStruct = [
  ['string', 'user','User Id'],
  ['datetime', 'time','Purechase Command Time'],
  ['number', 'userid','User Number'],
  ['string', 'result','Result'],
  ['number', 'price','Price']
]

// var PPScatterChartStruct = [
//   ['datetime', 'registrationrec'],
//   ['number', 'paidwanrxmb']
// ]
var TailHealthSESBubbleChartStruct = [
  ['string', 'FlightID','FlightID'],
  ['datetime', 'StartOf10K','Start of 10K'],
  ['number', 'RxTotal','Rx Total'],
  ['number', 'RebootsInAir','Reboots In Air'],
  ['number', 'InternetStatus10k','Internet Status Over 10k']
]
var TailHealthBubbleChartStruct = [
  ['string', 'flightid','FlightID'],
  ['datetime', 'startof10k','Start of 10K'],
  ['number', 'rxtotal','Rx Total'],
  ['number', 'rebootsinair','Reboots In Air'],
  ['number', 'internetstatus10k','Internet Status Over 10k']
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

var PortalPlatformReturnedDataPieStruct = [
  ['string', 'HttpStatusResponse','Http Status Response'],
  ['number', 'TotalBytesReturned','Total Bytes Returned']
]
var PortalPlatformHttpStatusResponsesPieStruct = [
  ['string', 'HttpStatusResponse','Http Status Response'],
  ['number', 'Total','Total count of each status response']
]
var PortalPlatformLanIpOccurancesPieStruct = [
  ['string', 'HashedLanIP','Hashed Lan IP'],
  ['number', 'Occurances','Count of occurances in log']
]
var UsageDetailsWanSESStruct = {'usagedetails': [
    ['datetime', 'time'],
    ['number', 'wanrx'],
    ['number', 'wantx']]}
var UsageDetailsLanSESStruct = {'usagedetails': [
    ['datetime', 'time'],
    ['number', 'lanrx'],
    ['number', 'lantx']]}

var PPGetLineStruct = {'accesslineinfo': [
        ['datetime', 'datetime'],
        ['number', 'bytesreturned']]}

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
var DarkAircraftHistogramStruct = [
  ['string', 'Root_Cause'],
  ['string', 'Mx_Action']
]

var FlightTimeLineStruct = [
  ['string', 'flightid'],
  ['datetime', 'startof10k'],
  ['datetime', 'endof10k']
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
/*dataTable.addColumn({ type: 'string', id: 'Position' });
dataTable.addColumn({ type: 'string', id: 'Name' });
dataTable.addColumn({ type: 'date', id: 'Start' });
dataTable.addColumn({ type: 'date', id: 'End' });
dataTable.addRows([
[ 'President', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
[ 'President', 'John Adams', new Date(1797, 2, 4), new Date(1801, 2, 4) ],
[ 'President', 'Thomas Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
[ 'Vice President', 'John Adams', new Date(1789, 3, 21), new Date(1797, 2, 4)],
[ 'Vice President', 'Thomas Jefferson', new Date(1797, 2, 4), new Date(1801, 2, 4)],*/
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
  ['datetime', 'commandtime'],
  ['datetime', 'commandtime']
]}
var LogUserPurchaseCommandStruct = {'loguserpurchasecommand': [
    ['datetime', 'time'],
    ['string', 'userid'],
    ['string', 'description'],
    ['string', 'product'],
    ['string', 'stateresult'],
    ['string', 'deviceid'],
    ['string', 'orderid'],
    ['string', 'planid'],
    ['number', 'price']
]}
var RequestInternetServiceStruct = {'requestinternetservice': [
  ['datetime', 'time'],
  ['string', 'userid'],
  ['string', 'servicename'],
  ['string', 'deviceid']
]}
var StartAAAaccountingStruct = {'startaaaaccounting': [
  ['datetime', 'time'],
  ['string', 'userid'],
  ['string', 'session']
]}
var UserRegistrationCommandStruct = {'userreg': [
  ['datetime', 'commandtime'],
  ['string', 'userid']
]}
//This can only be used with drawHistogramFromOnlyArrayOfNamesGeneric
var UserRegistrationCommandHistogramStruct= {'userreg': [
  ['string', 'userid']
]}
//This can only be used with drawHistogramFromOnlyArrayOfNamesGeneric
var LogUserPurchaseCommandHistogramStruct= {'loguserpurchasecommand': [
  ['string', 'userid']
]}
//This can only be used with drawHistogramFromOnlyArrayOfNamesGeneric
var RequestInternetServiceStructHistogramStruct= {'requestinternetservice': [
  ['string', 'userid']
]}
//This can only be used with drawHistogramFromOnlyArrayOfNamesGeneric
var StartAAAaccountingHistogramStruct= {'startaaaaccounting': [
  ['string', 'userid']
]}

var MonitSummaryStruct = {'monitsummary': [
  ['string', 'name'],
  ['datetime', 'time'],
  ['datetime', 'time']
]}

var SWVersionsStructSES = [
	['string', 'tailid'],
	['datetime', 'takeoff'],
  ['datetime', 'landing'],
  ['string', 'departure'],
  ['string', 'destination'],
  ['string', 'flightid'],
  ['string', 'connvmswversion'],
  ['string', 'connvmswvkaconfig'],
  ['string', 'modemswver'],
  ['string', 'modemconfigver'],
  ['string', 'modemserialnum'],
  ['string', 'antswver'],
  ['string', 'antconfigver'],
  ['string', 'antserialnum'],
  ['string', 'wap1softwareversion'],
  ['string', 'wap1serialnum'],
  ['string', 'wap2softwareversion'],
  ['string', 'wap2serialnum'],
  ['string', 'wap3softwareversion'],
  ['string', 'wap3serialnum']
]
var SWVersionsStruct = [
  ['string', 'tailid'],
	['datetime', 'takeoff'],
  ['datetime', 'landing'],
  ['string', 'departure'],
  ['string', 'destination'],
  ['string', 'flightid'],
  ['string', 'cruswversion'],
  ['string', 'crukaconfig'],
  ['string', 'cruhwaddresseth0'],
  ['string', 'cruhwaddresseth1'],
  ['string', 'asuhwaddresseth0'],
  ['string', 'asuhwaddresseth1'],
  ['string', 'asusoftwareversion'],
  ['string', 'portalsoftware'],
  ['string', 'proxyversion'],
  ['string', 'widevineversion'],
  ['string', 'playreadyversion'],
  ['string', 'modemswver'],
  ['string', 'modemmac'],
  ['string', 'bdt'],
  ['string', 'switchvlans']
]
var PPOptions = {title: "Portal Platform data"};
var WapDataOptions = {chart: { title: "WapData"},width: '100%'};
var HealthBubbleOptions = {chart: { title: "Health Bubbles"},width: '100%'};
var AAUGraphSESOptions = {chart: { title: "AAUGraphSES"},width: '100%'};
var LanIpGraphSESOptions = {chart: { title: "Users From Englog Graph. NOTE: Data is lost during rate limit logging"},width: '100%'};
var MonitSummaryTableOptions = {chart: { title: "Monit Summary"},width: '100%'};
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
    cleanTh();
    TailHealth(UrlParamaters);
      setUserStateCookies(document.getElementById("Airline").value,
      document.getElementById("Tail").value,
      '.*',
      '.*',
      formatDate())
  }else if(sfa) {
      cleanSfa();
      DeepDive(UrlParamaters);
      setUserStateCookies(document.getElementById("Airline").value,
      document.getElementById("Tail").value,
      document.getElementById("FlightId").value,
      //document.getElementById("UserId").value,
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
  var InfoForSWVersions = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    date: formatDate(),
    tail: document.getElementById("Tail").value,
    parser: "SWVersionsSES",
    struct: SWVersionsStructSES,
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
    InfoForSWVersions.parser = "SWVersions"
    InfoForSWVersions.struct = SWVersionsStruct
  } else {
    getDeepDiveDataUdptraceSummary(InfoForUdpTraceSummaryTailHealth)
    getFPMFastUdpTrace(InfoForFPMfastSESandUDPTraceTailHealth,FPMFastUdpTraceStruct,"fpm_udptrace_table")
  }
  getSWVersions(InfoForSWVersions)
  getTailHealthFPMfastSES(InfoForTailHealthFPMfast)
  getLogOffload(InfoForTailHealthLogOffload)
  getDarkAircraft(InfoForDarkAircraft)
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
    date: formatDate(),
    tail: document.getElementById("Tail").value,
    parser: "FPMfastSES",
    flightId: ".*",
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
  /*var InfoForUsageDetailsSES = {
    url: "mongoData",
    airline: document.getElementById("Airline").value,
    //it's going into the date for that part of the regex used to query mongo
    date: document.getElementById("UserId").value,
    tail: ".*",
    flightId: ".*",
    options: UsageDetailsOptions,
    parser: "UsageDetails"
  }*/

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
  var InfoForPortalPlatformHttpStatusResponses= {
    url: "PortalPlatformHttpStatusResponses",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    //This looks crazy but the date is replaced by the value
    //In flight ID.
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: PPOptions,
    parser: "CVM_ACCESS"
  }
  var InfoForPortalPlatformData= {
    url: "PortalPlatformData",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    //This looks crazy but the date is replaced by the value
    //In flight ID.
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: PPOptions,
    parser: "CVM_ACCESS"
  }
  var InfoForPortalPlatformLineGraphData = {
    url: "PortalPlatformMethodGETTimeAndData",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    //This looks crazy but the date is replaced by the value
    //In flight ID.
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: PPOptions,
    parser: "CVM_ACCESS"
  }
  var InfoForPortalPlatformDeleteLineGraphData = {
    url: "PortalPlatformMethodDeleteTimeAndData",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    //This looks crazy but the date is replaced by the value
    //In flight ID.
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: PPOptions,
    parser: "CVM_ACCESS"
  }
  var InfoForPortalPlatformPutLineGraphData = {
    url: "PortalPlatformMethodPUTTimeAndData",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    //This looks crazy but the date is replaced by the value
    //In flight ID.
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: PPOptions,
    parser: "CVM_ACCESS"
  }
  var InfoForPortalPlatformLanIpOccurances = {
    url: "PortalPlatformGetRequestsByLanIp",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    //This looks crazy but the date is replaced by the value
    //In flight ID.
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: PPOptions,
    parser: "CVM_ACCESS"
  }
  var InfoForLogPurchaseCommandFromEnglog = {
    url: "LogPurchaseCommandFromEnglog",
    airline: document.getElementById("Airline").value,
    //date: document.getElementById("Date").value,
    //This looks crazy but the date is replaced by the value
    //In flight ID.
    date: ".*",
    tail: document.getElementById("Tail").value,
    flightId: document.getElementById("FlightId").value,
    options: PPOptions,
    parser: "EnglogEvents"
  }
  getTailIds()
  if(document.getElementById("Tail").value){
    getFlightIds()
  }

  if(InfoForDeepDiveFPMfast.airline !== "SPIRIT"){
    InfoForDeepDiveFPMfast.parser = "FPMfast"
  } else {
    getLogPurchaseCommandFromEnglog(InfoForLogPurchaseCommandFromEnglog)
    getPortalPlatformMethodPutTimeAndData(InfoForPortalPlatformPutLineGraphData)
    getPortalPlatformMethodDeleteTimeAndData(InfoForPortalPlatformDeleteLineGraphData)
    getPortalPlatformLanIpOccurances(InfoForPortalPlatformLanIpOccurances)
    getPortalPlatformMethodGETTimeAndData(InfoForPortalPlatformLineGraphData)
    getFPMFastUdpTrace(InfoForFPMfastSESandUDPTraceTailHealth,FPMFastUdpTraceStruct,"fpm_udptrace_table")
    getPortalPlatformData(InfoForPortalPlatformData)
    getPortalPlatformHttpStatusResponses(InfoForPortalPlatformHttpStatusResponses)
    getDeepDiveDataUdptraceSummary(InfoForUdpTraceSummary)
    InfoForUdpTraceBandwidthDetails.options.chart.subtitle = InfoForUdpTraceBandwidthDetails.flightId
    getDeepDiveDataUdptraceDetails(InfoForUdpTraceBandwidthDetails)
    InfoForAAUGraphSES.options.chart.subtitle = InfoForAAUGraphSES.flightId
    getDeepDiveDataSpecificParserChart(InfoForAAUGraphSES,AAUGraphSESStruct,'aau_graph')
  }
  getDeepDiveFPMfastSES(InfoForDeepDiveFPMfast)
  getDeepDiveDataUsageSummary(InfoForDeepDiveUsage)

  getEnglogEvents(InfoForLanIpGraph)
  getMonitSummary(InfoForMonitSummaryTable)
  //getDeepDiveDataSpecificParser has a dependency on the 1st arg having an options element
  /*getDeepDiveDataSpecificParser2(InfoForWapData,WapDataStruct,'wap_data')*/
}
function getLogPurchaseCommandFromEnglog(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      if(QueryInfo.flightId !== ".*"){
        QueryInfo.options.title = "LogPurchase Command From Englog"
        drawBubbleChartFromArrayOfFlatJSON(QueryInfo.parser,EnglogUserBubbleChartStruct,'log_purchase_command_bubble',QueryInfo,info)
      }
    });
}
function getPortalPlatformData(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      if(QueryInfo.flightId !== ".*"){
        QueryInfo.options.title = "Portal Platform Returned Data by Status Response"
        drawPieChartPP(QueryInfo.parser,PortalPlatformReturnedDataPieStruct,'pp_returned_data_pie',QueryInfo,info)
      }
    });
}
function getPortalPlatformHttpStatusResponses(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      if(QueryInfo.flightId !== ".*"){
        QueryInfo.options.title = "Portal Platform Status Response Counts"
        drawPieChartPP(QueryInfo.parser,PortalPlatformHttpStatusResponsesPieStruct,'pp_http_status_responses_pie',QueryInfo,info)
      }
    });
}
function getPortalPlatformMethodGETTimeAndData(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      if(QueryInfo.flightId !== ".*"){
        QueryInfo.options.title = "Portal Platform Get Data Returned"
        drawLineChartFromArrayObjectsWithOneDeepJson(QueryInfo.parser,PPGetLineStruct,'pp_method_get_line',QueryInfo,info)
      }
    });
}
function getPortalPlatformMethodDeleteTimeAndData(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      if(QueryInfo.flightId !== ".*"){
        QueryInfo.options.title = "Portal Platform Delete Data Returned"
        drawLineChartFromArrayObjectsWithOneDeepJson(QueryInfo.parser,PPGetLineStruct,'pp_method_delete_line',QueryInfo,info)
      }
    });
}
function getPortalPlatformMethodPutTimeAndData(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      if(QueryInfo.flightId !== ".*"){
        QueryInfo.options.title = "Portal Platform Put Data Returned"
        drawLineChartFromArrayObjectsWithOneDeepJson(QueryInfo.parser,PPGetLineStruct,'pp_method_put_line',QueryInfo,info)
      }
    });
}
function getPortalPlatformLanIpOccurances(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      if(QueryInfo.flightId !== ".*"){
        QueryInfo.options.title = "Portal Platform Lan IP Occurances in file"
        drawPieChartPP(QueryInfo.parser,PortalPlatformLanIpOccurancesPieStruct,'pp_lan_ip_occurances_pie',QueryInfo,info)
      }
    });
}
function getSWVersions(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawTableFromFlatJson(QueryInfo.parser,QueryInfo.struct,'software_table',QueryInfo,info)
    });
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
  	  drawAshwinsTimeline(QueryInfo.parser,AshwinsTimelineStruct,'ashwin_time_line',QueryInfo,info)
      drawTableFromOneDeepJson(QueryInfo.parser,FlightPhasesTableStruct,'flightphase_table',QueryInfo,info)
      drawLineChartFromArrayInOneDeepJson(QueryInfo.parser,LanIPGraphStruct,'lan_ip_graph',QueryInfo,info)
      QueryInfo.options = UserRegOptions
      drawtimelineOneNameTwoTimes(QueryInfo.parser,UserRegStruct,'usage_time_line',QueryInfo,info)
      drawtimelineOneNameTwoTimes(QueryInfo.parser,FlightPhasesStruct,'flightphase_time_line',QueryInfo,info)
      drawTableFromOneDeepJson(QueryInfo.parser,LogUserPurchaseCommandStruct,'log_purchase_command_table',QueryInfo,info)
      drawTableFromOneDeepJson(QueryInfo.parser,RequestInternetServiceStruct,'request_internet_service_table',QueryInfo,info)
      drawTableFromOneDeepJson(QueryInfo.parser,StartAAAaccountingStruct,'start_aaaaccounting_table',QueryInfo,info)
      drawTableFromOneDeepJson(QueryInfo.parser,UserRegistrationCommandStruct,'user_registration_command_table',QueryInfo,info)
      QueryInfo.options = {'title':"User Registration Command - Histogram", showTextEvery:1, width: '100%',
           bar: {groupWidth: "95%"}}
      drawHistogramFromOnlyArrayOfNamesGeneric(QueryInfo.parser,UserRegistrationCommandHistogramStruct,'user_registration_command_hist',QueryInfo,info)
      QueryInfo.options = {'title':"Log User Purchase Command - Histogram", showTextEvery:1, width: '100%',
         bar: {groupWidth: "95%"}}
      drawHistogramFromOnlyArrayOfNamesGeneric(QueryInfo.parser,LogUserPurchaseCommandHistogramStruct,'log_purchase_command_hist',QueryInfo,info)
      QueryInfo.options = {'title':"Request Internet Service - Histogram", showTextEvery:1, width: '100%',
           bar: {groupWidth: "95%"}}
      drawHistogramFromOnlyArrayOfNamesGeneric(QueryInfo.parser,RequestInternetServiceStructHistogramStruct,'request_internet_service_hist',QueryInfo,info)

      QueryInfo.options = {'title':"Start AAA accounting - Histogram", showTextEvery:1, width: '100%',
          bar: {groupWidth: "95%"}}
      drawHistogramFromOnlyArrayOfNamesGeneric(QueryInfo.parser,StartAAAaccountingHistogramStruct,'start_aaaaccounting_hist',QueryInfo,info)
    });
}
function getLogOffload(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      //console.log(info)
      drawTableFromFlatJson(QueryInfo.parser,LogOffloadPerFileStruct,"log_offload_table",QueryInfo,info)
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
      drawTableFromFlatJson(QueryInfo.parser,DarkAircraftStruct,"dark_table",QueryInfo,info)
      /*QueryInfo.options = {'title':"DarkAircraft Date -> Root Cause - Histogram", showTextEvery:1, width: '100%',
          bar: {groupWidth: "95%"}}
      drawHistogramGeneric(QueryInfo.parser,DarkAircraftHistogramStruct,'dark_histogram',QueryInfo,info)*/
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
      drawTableFromFlatJson(QueryInfo.parser,CollectionStruct,GraphHtmlId,QueryInfo,info)
      var th = document.getElementById("TailHealth")
      if(th){
        QueryInfo.options = HealthBubbleOptions
        drawBubbleChartFromArrayOfFlatJSON(QueryInfo.parser, TailHealthSESBubbleChartStruct,'health_bubble',QueryInfo,info)
      }
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
        drawTableFromFlatJson(QueryInfo.parser,FPMFastStruct,'fpm_table',QueryInfo,info)
        drawtimelineChartSES(QueryInfo.parser,FPMFastStruct,'time_line',QueryInfo,info)
        QueryInfo.options = { chart: { title: 'Scores over 10k per flight',
         subtitle: 'over the date range provided'}, width: '100%', height: '100%'
        }
        drawLineChartFromArrayOfFlatJSON(QueryInfo.parser,ScoreLineGraphStruct,'score_line',QueryInfo,info)
        QueryInfo.options = HealthBubbleOptions
        drawBubbleChartFromArrayOfFlatJSON(QueryInfo.parser, TailHealthBubbleChartStruct,'health_bubble',QueryInfo,info)
    });
}
function getDeepDiveFPMfastSES(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
        drawTableFromFlatJson(QueryInfo.parser,FPMFastStruct,'fpm_table',QueryInfo,info)
        drawtimelineOneNameTwoTimes(QueryInfo.parser,FlightTimeLineStruct,'time_line',QueryInfo,info)
        //drawtimelineChartSES(QueryInfo.parser,FPMFastStruct,'time_line',QueryInfo,info)
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
      drawTableFromFlatJson(QueryInfo.parser,UdpTraceSummaryStruct,'udptrace_table',QueryInfo,info)
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
function cleanTh(){
  document.getElementById("score_line").innerHTML = "";
  document.getElementById("health_bubble").innerHTML = "";
  document.getElementById("time_line").innerHTML = "";
  document.getElementById("dark_table").innerHTML = "";
  document.getElementById("dark_histogram").innerHTML = "";
  document.getElementById("fpm_udptrace_table").innerHTML = "";
  document.getElementById("udptrace_table").innerHTML = "";
  document.getElementById("fpm_table").innerHTML = "";
  document.getElementById("log_offload_table").innerHTML = "";
  document.getElementById("log_offload_scatter").innerHTML = "";
  document.getElementById("user_line").innerHTML = "";
  document.getElementById("user_bar").innerHTML = "";
  document.getElementById("div1").innerHTML = "";
}
function cleanSfa(){
  document.getElementById("time_line").innerHTML = "";
  document.getElementById("flightphase_table").innerHTML = "";
  document.getElementById("flightphase_time_line").innerHTML = "";
  document.getElementById("monit_summary_time_line").innerHTML = "";
  document.getElementById("ashwin_time_line").innerHTML = "";
  document.getElementById("fpm_udptrace_table").innerHTML = "";
  document.getElementById("fpm_table").innerHTML = "";
  document.getElementById("udptrace_table").innerHTML = "";
  document.getElementById("udptrace_pie_connected").innerHTML = "";
  document.getElementById("udptrace_pie_term").innerHTML = "";
  document.getElementById("pp_returned_data_pie").innerHTML = "";
  document.getElementById("pp_http_status_responses_pie").innerHTML = "";
  document.getElementById("pp_method_get_line").innerHTML = "";
  document.getElementById("pp_method_delete_line").innerHTML = "";
  document.getElementById("pp_method_put_line").innerHTML = "";
  document.getElementById("udptrace_graph_rx").innerHTML = "";
  document.getElementById("udptrace_graph_tx").innerHTML = "";
  document.getElementById("aau_graph").innerHTML = "";
  document.getElementById("lan_ip_graph").innerHTML = "";
  document.getElementById("usage_free_scatter").innerHTML = "";
  document.getElementById("usage_hist").innerHTML = "";
  document.getElementById("usage_time_line").innerHTML = "";
  document.getElementById("log_purchase_command_hist").innerHTML = "";
  document.getElementById("log_purchase_command_table").innerHTML = "";
  document.getElementById("request_internet_service_hist").innerHTML = "";
  document.getElementById("request_internet_service_table").innerHTML = "";
  document.getElementById("start_aaaaccounting_hist").innerHTML = "";
  document.getElementById("start_aaaaccounting_table").innerHTML = "";
  document.getElementById("user_registration_command_hist").innerHTML = "";
  document.getElementById("user_registration_command_table").innerHTML = "";
}
