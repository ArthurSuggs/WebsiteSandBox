<!--Load the AJAX API-->DeepDive
//var webserver = 'http://MLB-M4244:8080/'
var webserver = 'http://localhost:8080/'
var el = document.getElementById("Refresh")
if(el){
    el.addEventListener("click", drawTableForFleetHealth);
}

//The generic table sturct but be and array of 2d arrays
//index 0 is type
//index 1 is the name of the key to look up the data from the flat json
var FleetHealthStruct = [
    ['string', 'TailId'],
    ['number', 'Internetstatus10k'],
    ['number', 'Intranetstatus10k'],
    ['number', 'Flights'],
    ['number', 'RebootsInAir'],
    ['number', 'Users']
]

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
var FleetHealthBubbleChartStruct = [
  ['string', 'TailId','TailId'],
  ['number', 'RebootsInAir','Reboots In Air'],
  ['number', 'Flights','Flights'],
  ['number', 'Internetstatus10k','Internet Status Over 10k'],
  ['number', 'Users','Users']
]
var FleetHealthInternetstatus10kHistogramStruct = [
  ['string', 'TailId'],
  ['number', 'Internetstatus10k']
]
var FleetHealthIntranetstatus10kHistogramStruct = [
  ['string', 'TailId'],
  ['number', 'Intranetstatus10k']
]
var FleetHealthFlightsHistogramStruct = [
  ['string', 'TailId'],
  ['number', 'Flights']
]
var FleetHealthUsersHistogramStruct = [
  ['string', 'TailId'],
  ['number', 'Users']
]
var HealthBubbleOptions = {chart: { title: "Health Bubbles"},width: '100%'};

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
  getSWVersion(InfoForSWVersions)
  getFleetHealth(InfoForFleetHealth)

}
function getFleetHealth(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      drawTableGeneric(QueryInfo.parser,FleetHealthStruct,'fpm_table',QueryInfo,info)
      QueryInfo.options = HealthBubbleOptions
      drawBubbleChartFromArrayOfFlatJSON(QueryInfo.parser, FleetHealthBubbleChartStruct,'health_bubble',QueryInfo,info)
      QueryInfo.options.colors = ['green'];
      drawHistogramGeneric(QueryInfo.parser,FleetHealthInternetstatus10kHistogramStruct,'fleet_health_Internetstatus_hist',QueryInfo,info)
      QueryInfo.options.colors = ['blue'];
      drawHistogramGeneric(QueryInfo.parser,FleetHealthIntranetstatus10kHistogramStruct,'fleet_health_Intranetstatus_hist',QueryInfo,info)
      QueryInfo.options.colors = ['orange'];
      drawHistogramGeneric(QueryInfo.parser,FleetHealthFlightsHistogramStruct,'fleet_health_flights_hist',QueryInfo,info)
      QueryInfo.options.colors = ['pink'];
      drawHistogramGeneric(QueryInfo.parser,FleetHealthUsersHistogramStruct,'fleet_health_users_hist',QueryInfo,info)

    });
}
function getSWVersion(QueryInfo){
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      if(QueryInfo.airline !== "SPIRIT"){
        QueryInfo.parser = "SWVersions"
        drawTableGeneric(QueryInfo.parser,SWVersionsStruct,'software_table',QueryInfo,info)
      } else {
        drawTableGeneric(QueryInfo.parser,SWVersionsStructSES,'software_table',QueryInfo,info)
      }
    });
}
