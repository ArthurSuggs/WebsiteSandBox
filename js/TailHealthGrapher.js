var HealthBubbleOptions = {chart: { title: "Health Bubbles"},width: '100%'};
var avgEsnoHistOptions = {chart: { title: "Average Esno Per Flight (Distrobution) - Histogram"},width: '100%'};
RegisterGrapher(TailHealth,"Refresh","click")

function TailHealth(UrlParamaters) {
  var date = formatDate()
  var airline = document.getElementById("Airline").value
  var tail = document.getElementById("Tail").value
  var all = ".*"
  setUserStateCookies(airline, tail, '.*', '.*', date)
  var InfoForTailHealthFPMfast = CreateQueryInfo("mongoData",airline,date,tail,"FPMfastSES",all)
  var InfoForSWVersions = CreateQueryInfo("mongoData",airline,date,tail,"SWVersionsSES",all)
  InfoForSWVersions.struct = SWVersionsStructSES
  var InfoForTailHealthLogOffload = CreateQueryInfo("LogOffload",airline,date,tail,"LogOffload",all)
  var InfoForUserCntPerFlight = CreateQueryInfo("UserCntPerFlight",airline,date,tail,"UsersPerFlight",all,{height : 0})
  var InfoForUdpTraceSummaryTailHealth = CreateQueryInfo("mongoData",airline,date,tail,"UdpTraceSummary",all)
  var InfoForFPMfastSESandUDPTraceTailHealth = CreateQueryInfo("FPMfastSESandUDPTrace",airline,date,tail,"UdpTraceSummary",all)
  var InfoForDarkAircraft = CreateQueryInfo("DarkAircraft",airline,date,tail,"",all)
  cleanTailHealth()
  getTailIds()
  if(InfoForTailHealthFPMfast.airline !== "SPIRIT"){
    InfoForTailHealthFPMfast.parser = "FPMfast"
    InfoForSWVersions.parser = "SWVersions"
    InfoForSWVersions.struct = SWVersionsStruct
  } else {
    getDeepDiveDataUdptraceSummary(InfoForUdpTraceSummaryTailHealth)
    getFPMFastUdpTrace(InfoForFPMfastSESandUDPTraceTailHealth,"fpm_udptrace_table")
  }
  getSWVersions(InfoForSWVersions)
  getTailHealthFPMfastSES(InfoForTailHealthFPMfast)
  getLogOffload(InfoForTailHealthLogOffload)
  getDarkAircraft(InfoForDarkAircraft)
//  getUserCntPerFlight(InfoForUserCntPerFlight,UsersPerFlightLineStruct,"")
}
//COMMON with tail Health
function getDeepDiveDataUdptraceSummary(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      QueryInfo.options = avgEsnoHistOptions
      QueryInfo.options.title = "Average Esno Per Flight (Distrobution) - Histogram"
      QueryInfo.options.colors = ['green'];
      drawHistogramGeneric(QueryInfo.parser,UdpTraceSummaryAvgEsnoHistogramStruct,'udptrace_avgesno_hist',QueryInfo,info)
      QueryInfo.options.title = "Terminal State Code Connected Percent Per Flight (Distrobution) - Histogram"
      QueryInfo.options.colors = ['blue'];
      drawHistogramGeneric(QueryInfo.parser,UdpTraceSummaryTerminalStateConnectedHistogramStruct,'udptrace_termstate_connected_hist',QueryInfo,info)

      if(getTablesSelection()){
        drawTableFromFlatJson(QueryInfo.parser,UdpTraceSummaryStruct,'udptrace_table',QueryInfo,info)
      }
    });
}
function getFPMFastUdpTrace(QueryInfo,GraphHtmlId){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
        formatInternetStatus = {
            name: "InternetStatus10k",
            formatDetails: [
              {start: 80, end:  90, textColor: "black", cellColor: "orange"},
              {start: 0, end:  80, textColor: "black", cellColor: "red"},
            ],
        }
        formatIntranetStatus = {
            name: "IntranetStatus10k",
            formatDetails: [
              {start: 80, end:  90, textColor: "black", cellColor: "orange"},
              {start: 0, end:  80, textColor: "black", cellColor: "red"},
            ],
        }
        formatRebootsInAir = {
            name: "RebootsInAir",
            formatDetails: [
              {start: 1, end:  3, textColor: "black", cellColor: "orange"},
            ],
        }
        FPMFastUdpTraceStruct = addFormatInfoToArray(FPMFastUdpTraceStruct,formatInternetStatus)
        FPMFastUdpTraceStruct = addFormatInfoToArray(FPMFastUdpTraceStruct,formatIntranetStatus)
        FPMFastUdpTraceStruct = addFormatInfoToArray(FPMFastUdpTraceStruct,formatRebootsInAir)
      drawTableFromFlatJson(QueryInfo.parser,FPMFastUdpTraceStruct,GraphHtmlId,QueryInfo,info)
      QueryInfo.options = HealthBubbleOptions
      drawBubbleChartFromArrayOfFlatJSON(QueryInfo.parser, TailHealthSESBubbleChartStruct,'health_bubble',QueryInfo,info)

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
function getTailHealthFPMfastSES(QueryInfo) {
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      if(getTablesSelection()){
        drawTableFromFlatJson(QueryInfo.parser,FPMFastStruct,'fpm_table',QueryInfo,info)
      }
        drawtimelineChartSES(QueryInfo.parser,FPMFastStruct,'time_line',QueryInfo,info)
        QueryInfo.options = { chart: { title: 'Scores over 10k per flight',
         subtitle: 'over the date range provided'}, width: '100%', height: '100%'
        }
        drawLineChartFromArrayOfFlatJSON(QueryInfo.parser,ScoreLineGraphStruct,'score_line',QueryInfo,info)
        QueryInfo.options = HealthBubbleOptions
        QueryInfo.options.title = `X - Flight Start of 10k Time
        Y - Flight WANRx Total
        Size - Internet Status Score
        Colour - Inflight Reboot Count`
        drawBubbleChartFromArrayOfFlatJSON(QueryInfo.parser, TailHealthBubbleChartStruct,'health_bubble',QueryInfo,info)
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
      drawScatterChartFromArrayOfFlatJSON(QueryInfo.parser,LogOffloadPerFileScatterChartStruct,'log_offload_scatter',QueryInfo,info)
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
