//var webserver = 'http://MLB-M4244:8080/'
var webserver = 'http://localhost:8080/'
var el = document.getElementById("Refresh")
if(el){
    el.addEventListener("click", drawTableForFleetHealth);
}

//The generic table sturct but be and array of 2d arrays
//index 0 is type
//index 1 is the name of the key to look up the data from the flat json
// var FleetHealthStruct = [
//     ['string', 'TailId'],
//     ['number', 'Internetstatus10k'],
//     ['number', 'Intranetstatus10k'],
//     ['number', 'Flights'],
//     ['number', 'RebootsInAir'],
//     ['number', 'Users']
// ]

var SWVersionsStructSES = [
	['string', 'TailId'],
	['datetime', 'Landing'],
    ['string', 'ConnVMSWVersion'],
    ['string', 'ConnVMSWVKaConfig'],
    ['string', 'ModemSWVer'],
    ['string', 'WAP1SoftwareVersion']
]
var SWVersionsStruct = [
	['string', 'TailId'],
	['datetime', 'Landing'],
  ['string', "FlightID"],
    ['string', 'CRUSWVersion'],
    ['string', 'CRUKaConfig'],
    ['string', 'ASUSoftwareVersion'],
    ['string', 'ASUKaConfig'],
    ['string', 'ModemMAC'],
    ['string', 'CRUHwAddressEth0'],
    ['string', 'ASUHwAddressEth0'],
    ['string', 'Bdt']
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
var FleetHealthStruct = [
    ['string', 'Tail'],
    ['number', 'Internet Status'],
    ['number', 'Intranet Status'],
    ['number', 'Cabin'],
    ['number', 'Portal'],
    ['number', 'Wap1'],
    ['number', 'Wap2'],
    ['number', 'Wap3'],
    ['number', 'AAA'],
    ['number', 'GCMS'],
    ['number', 'Modem State'],
    ['number', 'Modem Comms'],
    ['number', 'Reboots In Air'],
    ['number', 'Flights']
]
var FleetHealthComboGndStatStruct = [
    ['string', 'Tail'],
    ['number', 'AAA'],
    ['number', 'GCMS']
]
var FleetHealthComboIntStatStruct = [
    ['string', 'Tail'],
    ['number', 'Internet Status'],
    ['number', 'Intranet Status']
]
var FleetHealthComboCabinSignalStatStruct = [
    ['string', 'Tail'],
    ['number', 'Modem State'],
    ['number', 'Cabin']
]
var FleetHealthBubbleChartStruct = [
  ['string', 'Tail','TailId'],
  ['number', 'Reboots In Air','Reboots In Air'],
  ['number', 'Flights','Flights'],
  ['number', 'Internet Status','Internet Status'],
  ['number', 'Intranet Status','Intranet Status']
]
var FleetHealthInternetstatus10kHistogramStruct = [
  ['string', 'Tail'],
  ['number', 'Internet Status']
]
var FleetHealthIntranetstatus10kHistogramStruct = [
  ['string', 'Tail'],
  ['number', 'Intranet Status']
]
var FleetHealthFlightsHistogramStruct = [
  ['string', 'Tail'],
  ['number', 'Flights']
]
var FleetHealthRebootsHistogramStruct = [
  ['string', 'Tail'],
  ['number', 'Reboots In Air']
]
// var FleetHealthUsersHistogramStruct = [
//   ['string', 'TailId'],
//   ['number', 'Users']
// ]
var HealthHistogramsOptions = {chart: { title: "Health Histograms"},width: '100%'};
var HealthBubbleOptions = {chart: { title: "Health Bubbles"},width: '100%'};
var HealthBarOptions = {chart: { title: "Health Bar"},width: '100%'};
function drawTableForFleetHealth() {
  var InfoForFleetHealth = {
    url: "FleetHealth",
    airline: document.getElementById("Airline").value,
    date: document.getElementById("Date").value,
    tail: ".*",
    flightId: ".*",
    parser: "FleetHealth"
  }
   var InfoForSWVersions = {
    url: "SWVersions",
    airline: document.getElementById("Airline").value,
    date: document.getElementById("Date").value,
    tail: ".*",
    flightId: ".*",
    parser: "SWVersionsSES"
  }
  cleanFleetHealth();
  getSWVersion(InfoForSWVersions)
  getFleetHealth(InfoForFleetHealth)

}
function getFleetHealth(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawTableFromFlatJson(QueryInfo.parser,FleetHealthStruct,'fpm_table',QueryInfo,info)
      QueryInfo.options = HealthBubbleOptions
      drawBubbleChartFromArrayOfFlatJSON(QueryInfo.parser, FleetHealthBubbleChartStruct,'health_bubble',QueryInfo,info)
      QueryInfo.options = HealthHistogramsOptions
      QueryInfo.options.colors = ['green'];
      drawHistogramGeneric(QueryInfo.parser,FleetHealthInternetstatus10kHistogramStruct,'fleet_health_Internetstatus_hist',QueryInfo,info)
      QueryInfo.options.colors = ['blue'];
      drawHistogramGeneric(QueryInfo.parser,FleetHealthIntranetstatus10kHistogramStruct,'fleet_health_Intranetstatus_hist',QueryInfo,info)
      QueryInfo.options.colors = ['orange'];
      drawHistogramGeneric(QueryInfo.parser,FleetHealthFlightsHistogramStruct,'fleet_health_flights_hist',QueryInfo,info)
      QueryInfo.options.colors = ['red'];
      drawHistogramGeneric(QueryInfo.parser,FleetHealthRebootsHistogramStruct,'fleet_health_reboots_hist',QueryInfo,info)
      if( QueryInfo.airline === "SPIRIT"){
        QueryInfo.options =   HealthBarOptions
        drawComboChartFromArrayOfFlatJSON(QueryInfo.parser,FleetHealthComboIntStatStruct,'fleet_health_status_line',QueryInfo,info)
        drawComboChartFromArrayOfFlatJSON(QueryInfo.parser,FleetHealthComboCabinSignalStatStruct,'fleet_health_cabin_signal_line',QueryInfo,info)
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
function cleanFleetHealth(){
  document.getElementById("health_bubble").innerHTML = "";
  document.getElementById("fleet_health_Internetstatus_hist").innerHTML = "";
  document.getElementById("fleet_health_Intranetstatus_hist").innerHTML = "";
  document.getElementById("fleet_health_flights_hist").innerHTML = "";
  document.getElementById("fleet_health_reboots_hist").innerHTML = "";
  document.getElementById("fleet_health_users_hist").innerHTML = "";
  document.getElementById("fleet_health_status_line").innerHTML = "";
  document.getElementById("fleet_health_cabin_signal_line").innerHTML = "";
  document.getElementById("fleet_health_gnd_line").innerHTML = "";
  document.getElementById("fpm_table").innerHTML = "";
  document.getElementById("software_table").innerHTML = "";
}
