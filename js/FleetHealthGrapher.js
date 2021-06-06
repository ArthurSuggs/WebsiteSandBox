//var webserver = 'http://MLB-M4244:8080/'
//var webserver = 'http://localhost:8080/'
RegisterGrapher(FleetHealth,"Refresh","click")

var HealthHistogramsOptions = {chart: { title: "Health Histograms"},width: '100%'};
var HealthBubbleOptions = {chart: { title: "Health Bubbles"},width: '100%'};
var HealthBarOptions = {chart: { title: "Health Bar"},width: '100%'};
function FleetHealth() {
  var date = document.getElementById("Date").value
  var airline = document.getElementById("Airline").value
  var all = ".*"
  var InfoForFleetHealth = CreateQueryInfo("FleetHealth",airline,date,all,"FleetHealth",all)
  var InfoForSWVersions = CreateQueryInfo("SWVersions",airline,date,all,"SWVersionsSES",all)

  cleanFleetHealth();
  getSWVersion(InfoForSWVersions)
  getFleetHealth(InfoForFleetHealth)

}
function getFleetHealth(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      formatInternetStatus = {
          name: "Internet Status",
          formatDetails: [
            {start: 80, end:  90, textColor: "black", cellColor: "orange"},
            {start: 0, end:  80, textColor: "black", cellColor: "red"},
          ],
      }
      formatIntranetStatus = {
          name: "Intranet Status",
          formatDetails: [
            {start: 80, end:  90, textColor: "black", cellColor: "orange"},
            {start: 0, end:  80, textColor: "black", cellColor: "red"},
          ],
      }
      formatRebootsInAir = {
          name: "Reboots In Air",
          formatDetails: [
            {start: 1, end:  2, textColor: "black", cellColor: "orange"},
            {start: 2, end:  100, textColor: "black", cellColor: "red"},
          ],
      }
      //QueryInfo.options.title = `Scores 10k to 10k over the date range by tails`
      FleetHealthStruct = addFormatInfoToArray(FleetHealthStruct,formatInternetStatus)
      FleetHealthStruct = addFormatInfoToArray(FleetHealthStruct,formatIntranetStatus)
      FleetHealthStruct = addFormatInfoToArray(FleetHealthStruct,formatRebootsInAir)
      drawTableFromFlatJson(QueryInfo.parser,FleetHealthStruct,'fpm_table',QueryInfo,info)
      QueryInfo.options = HealthBubbleOptions
      QueryInfo.options.title = `X - Internet Status
      Y - Intranet Status
      Size - Flight Count
      Colour - Inflight Reboot Count`
      drawBubbleChartFromArrayOfFlatJSON(QueryInfo.parser, FleetHealthBubbleChartStruct,'health_bubble',QueryInfo,info)
      QueryInfo.options = HealthHistogramsOptions
      QueryInfo.options.title = "Internet Status Score Distribution - Histogram"
      QueryInfo.options.colors = ['green'];
      drawHistogramGeneric(QueryInfo.parser,FleetHealthInternetstatus10kHistogramStruct,'fleet_health_Internetstatus_hist',QueryInfo,info)
      QueryInfo.options.title = "Intranet Status Score Distribution - Histogram"
      QueryInfo.options.colors = ['blue'];
      drawHistogramGeneric(QueryInfo.parser,FleetHealthIntranetstatus10kHistogramStruct,'fleet_health_Intranetstatus_hist',QueryInfo,info)
      QueryInfo.options.title = "Flight Count per tail Distribution - Histogram"
      QueryInfo.options.colors = ['orange'];
      drawHistogramGeneric(QueryInfo.parser,FleetHealthFlightsHistogramStruct,'fleet_health_flights_hist',QueryInfo,info)
      QueryInfo.options.title = "Reboots In Air per tail Distribution - Histogram"
      QueryInfo.options.colors = ['red'];
      drawHistogramGeneric(QueryInfo.parser,FleetHealthRebootsHistogramStruct,'fleet_health_reboots_hist',QueryInfo,info)
      if( QueryInfo.airline === "SPIRIT"){
        QueryInfo.options =   HealthBarOptions
        QueryInfo.options.title = "Internet and Intranet scores by tail"
        drawComboChartFromArrayOfFlatJSON(QueryInfo.parser,FleetHealthComboIntStatStruct,'fleet_health_status_line',QueryInfo,info)
        QueryInfo.options.title = "Modem State and Cabin scores by tail"
        drawComboChartFromArrayOfFlatJSON(QueryInfo.parser,FleetHealthComboCabinSignalStatStruct,'fleet_health_cabin_signal_line',QueryInfo,info)
        QueryInfo.options.title = "AAA and GCMS scores by tail"
        drawComboChartFromArrayOfFlatJSON(QueryInfo.parser,FleetHealthComboGndStatStruct,'fleet_health_gnd_line',QueryInfo,info)
      }

      // QueryInfo.options.colors = ['pink'];
      // drawHistogramGeneric(QueryInfo.parser,FleetHealthUsersHistogramStruct,'fleet_health_users_hist',QueryInfo,info)

    });
}
function getSWVersion(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      if(QueryInfo.airline !== "SPIRIT"){
        QueryInfo.parser = "SWVersions"
        drawTableFromFlatJson(QueryInfo.parser,SWVersionsStruct,'software_table',QueryInfo,info)
      } else {
        drawTableFromFlatJson(QueryInfo.parser,SWVersionsStructSES,'software_table',QueryInfo,info)
      }
    });
}
