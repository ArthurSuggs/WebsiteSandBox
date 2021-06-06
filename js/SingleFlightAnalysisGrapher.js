//var webserver = 'http://MLB-M4244:8080/'
//var webserver = 'http://localhost:8080/'
RegisterGrapher(DeepDive,"Refresh","click")
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

//If using the flightId remove the date from url
function DeepDive(UrlParamaters){
  var date = formatDate()
  var airline = document.getElementById("Airline").value
  var tail = document.getElementById("Tail").value
  var flightId = document.getElementById("FlightId").value
  var all = ".*"
  setUserStateCookies(airline, tail, flightId, date)
  var InfoForDeepDiveFPMfast = CreateQueryInfo("mongoData",airline,date,tail,"FPMfastSES",all)
  var InfoForFPMfastSESandUDPTraceTailHealth = CreateQueryInfo("FPMfastSESandUDPTrace",airline,all,tail,"UdpTraceSummary",flightId)
  var InfoForLanIpGraph = CreateQueryInfo("mongoData",airline,all,tail,"EnglogEvents",flightId,LanIpGraphSESOptions)
  var InfoForMonitSummaryTable = CreateQueryInfo("mongoData",airline,all,tail,"MonitSummary",flightId, MonitSummaryTableOptions)
  var InfoForAAUGraphSES = CreateQueryInfo("mongoData",airline,all,tail,"AAUGraphSES",flightId,AAUGraphSESOptions)
  var InfoForDeepDiveUsage = CreateQueryInfo("mongoData",airline,all,tail,"UsageSummary",flightId)
  var InfoForWapData = CreateQueryInfo("mongoData",airline,all,tail,"WapData",flightId)
  var InfoForUdpTraceSummary = CreateQueryInfo("mongoData",airline,all,tail,"UdpTraceSummary",flightId)
  var InfoForUdpTraceBandwidthDetails = CreateQueryInfo("mongoData",airline,all,tail,"UDPTraceBandwidthDetails",flightId,UDPTraceDetailGraphSESOptions)
  var InfoForPortalPlatformHttpStatusResponses = CreateQueryInfo("PortalPlatformHttpStatusResponses",airline,all,tail,"CVM_ACCESS",flightId,PPOptions)
  var InfoForPortalPlatformData = CreateQueryInfo("PortalPlatformData",airline,all,tail,"CVM_ACCESS",flightId,PPOptions)
  var InfoForPortalPlatformLineGraphData = CreateQueryInfo("PortalPlatformMethodGETTimeAndData",airline,all,tail,"CVM_ACCESS",flightId,PPOptions)
  var InfoForPortalPlatformDeleteLineGraphData = CreateQueryInfo("PortalPlatformMethodDeleteTimeAndData",airline,all,tail,"CVM_ACCESS",flightId,PPOptions)
  var InfoForPortalPlatformPutLineGraphData = CreateQueryInfo("PortalPlatformMethodPUTTimeAndData",airline,all,tail,"CVM_ACCESS",flightId,PPOptions)
  var InfoForPortalPlatformLanIpOccurances = CreateQueryInfo("PortalPlatformGetRequestsByLanIp",airline,all,tail,"CVM_ACCESS",flightId,PPOptions)
  var InfoForLogPurchaseCommandFromEnglog = CreateQueryInfo("LogPurchaseCommandFromEnglog",airline,all,tail,"EnglogEvents",flightId,PPOptions)
  var InfoForGetEngNotes = CreateQueryInfo("EngNotesGet",airline,date,tail,"EngNotes",flightId)
  cleanSfa()
  getTailIds()
  if(document.getElementById("Tail").value){
    getFlightIds()
  }

  if(InfoForDeepDiveFPMfast.airline !== "SPIRIT"){
    InfoForDeepDiveFPMfast.parser = "FPMfast"
  } else {
    getLogPurchaseCommandFromEnglog(InfoForLogPurchaseCommandFromEnglog)
    // getPortalPlatformMethodPutTimeAndData(InfoForPortalPlatformPutLineGraphData)
    // getPortalPlatformMethodDeleteTimeAndData(InfoForPortalPlatformDeleteLineGraphData)
    // getPortalPlatformLanIpOccurances(InfoForPortalPlatformLanIpOccurances)
    // getPortalPlatformMethodGETTimeAndData(InfoForPortalPlatformLineGraphData)
    // getPortalPlatformData(InfoForPortalPlatformData)
    // getPortalPlatformHttpStatusResponses(InfoForPortalPlatformHttpStatusResponses)

     getFPMFastUdpTrace(InfoForFPMfastSESandUDPTraceTailHealth,FPMFastUdpTraceStruct,"fpm_udptrace_table")
     getDeepDiveDataUdptraceSummary(InfoForUdpTraceSummary)
     InfoForUdpTraceBandwidthDetails.options.chart.subtitle = InfoForUdpTraceBandwidthDetails.flightId
    getDeepDiveDataUdptraceDetails(InfoForUdpTraceBandwidthDetails)
    InfoForAAUGraphSES.options.chart.subtitle = InfoForAAUGraphSES.flightId
    getDeepDiveDataSpecificParserChart(InfoForAAUGraphSES,AAUGraphSESStruct,'aau_graph')
  }
  // getDeepDiveFPMfastSES(InfoForDeepDiveFPMfast)
  // getDeepDiveDataUsageSummary(InfoForDeepDiveUsage)
  getEngNotes(InfoForGetEngNotes)
  getEnglogEvents(InfoForLanIpGraph)
  getMonitSummary(InfoForMonitSummaryTable)
  //getDeepDiveDataSpecificParser has a dependency on the 1st arg having an options element
  /*getDeepDiveDataSpecificParser2(InfoForWapData,WapDataStruct,'wap_data')*/
}
function getEngNotes(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawTableFromFlatJson(QueryInfo.parser,EngNoteStruct,'eng_notes_table',QueryInfo,info)
    });
}
function getLogPurchaseCommandFromEnglog(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      if(QueryInfo.flightId !== ".*"){
        QueryInfo.options.title = `LogPurchase Command From Englog
        X - Log Purchase Command Time
        Y - User Id
        Size - Purchase Amount
        Color - Result`
        QueryInfo.options.hAxis = {title: 'Log Purchase Time'}
        QueryInfo.options.vAxis = {title: 'User Id'}
        QueryInfo.options.bubble = {
            textStyle: {
              fontSize: 12,
              fontName: 'Times-Roman',
              color: 'blue',
              bold: true,
              italic: true
            }
        }
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
      if(getTablesSelection()){
        drawTableFromOneDeepJson(QueryInfo.parser,LogUserPurchaseCommandStruct,'log_purchase_command_table',QueryInfo,info)
        drawTableFromOneDeepJson(QueryInfo.parser,RequestInternetServiceStruct,'request_internet_service_table',QueryInfo,info)
        drawTableFromOneDeepJson(QueryInfo.parser,StartAAAaccountingStruct,'start_aaaaccounting_table',QueryInfo,info)
        drawTableFromOneDeepJson(QueryInfo.parser,UserRegistrationCommandStruct,'user_registration_command_table',QueryInfo,info)
      }
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
function getFPMFastUdpTrace(QueryInfo,CollectionStruct,GraphHtmlId){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawTableFromFlatJson(QueryInfo.parser,CollectionStruct,GraphHtmlId,QueryInfo,info)
      // var th = document.getElementById("TailHealth")
      // if(th){
      //   QueryInfo.options = HealthBubbleOptions
      //   drawBubbleChartFromArrayOfFlatJSON(QueryInfo.parser, TailHealthSESBubbleChartStruct,'health_bubble',QueryInfo,info)
      // }
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
