//var webserver = 'http://MLB-M4244:8080/'
var webserver = 'http://localhost:8080/'
function RegisterGrapher(GraphingFunction,ElementId,EventType){
  var EvtListner = document.getElementById(ElementId)
  EvtListner.addEventListener(EventType, GraphingFunction);
}
populateDateWithTodaysDate()
getUserStateCookies()
document.getElementById("Refresh").onload = getUserStateCookies()
var el = document.getElementById("Refresh")
var al = document.getElementById("Airline")
var tl = document.getElementById("Tail")
var fl = document.getElementById("FlightId")
var to = document.getElementById("TablesOn")

// var fh = document.getElementById("Refresh")
// if(fh){
//     el.addEventListener("click", drawTableForFleetHealth);
// }
// if(el){
//     el.addEventListener("click", CreateChartsAndTables);
// }
var tables = false
function getTablesSelection(){
  if(to && document.getElementById("TablesOn").checked){
      return true
  }
  return false
}

if(al){
    al.addEventListener("change", getTailIds);
}
if(tl && fl){
    tl.addEventListener("change", getFlightIds);
}

function CreateQueryInfo(urlIn,airlineIn,dateIn,tailIn,parserIn,flightIdIn,optionsIn){
  var opt = ""
  if (optionsIn){
    opt = optionsIn
  }
  var QueryInfo = {
    url: urlIn,
    airline: airlineIn,
    date: dateIn,
    tail: tailIn,
    parser: parserIn,
    flightId: flightIdIn,
    options: opt,
  }
  return QueryInfo
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
function cleanTailHealth(){
  document.getElementById("score_line").innerHTML = "";
  document.getElementById("time_line").innerHTML = "";
  document.getElementById("udptrace_avgesno_hist").innerHTML = "";
  document.getElementById("udptrace_termstate_connected_hist").innerHTML = "";
  document.getElementById("dark_table").innerHTML = "";
  document.getElementById("dark_histogram").innerHTML = "";
  document.getElementById("fpm_udptrace_table").innerHTML = "";
  document.getElementById("udptrace_table").innerHTML = "";
  document.getElementById("fpm_table").innerHTML = "";
  document.getElementById("log_offload_table").innerHTML = "";
  document.getElementById("log_offload_scatter").innerHTML = "";
  document.getElementById("software_table").innerHTML = "";
  document.getElementById("user_line").innerHTML = "";
  document.getElementById("user_bar").innerHTML = "";
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
function cleanSfaFlyTnet(){
  document.getElementById("monit_summary_time_line").innerHTML = "";
  document.getElementById("finger_print_line").innerHTML = "";
//  document.getElementById("childElement").innerHTML = "";
  document.getElementById("lan_ip_graph").innerHTML = "";
}
