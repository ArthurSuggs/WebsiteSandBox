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
var sn = document.getElementById("submitNotes")
var ss = document.getElementById("submitSurvey")
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
if(sn){
  attachFormSubmitEvent("formIdSubmit")
}
if(ss){
  attachFormSubmitEvent("formSurveySubmit")
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
  document.getElementById("eng_notes_table").innerHTML = "";
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
  document.getElementById("eng_notes_table").innerHTML = "";
  document.getElementById("eng_notes_pie").innerHTML = "";
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
//From sof to POST data without redirect
function formSubmit(event) {
  var date = formatDate()
  var airline = document.getElementById("Airline").value
  var tail = document.getElementById("Tail").value
  var flightId = document.getElementById("FlightId").value
  var all = ".*"
  var InfoForEngNotes = CreateQueryInfo(url,airline,date,tail,"Notes",flightId)
  var dataEntry = document.getElementById("dataEntry").value
  var Classification = document.getElementById("Classification").value

  var apiUrl = "/EngNotesSet"
  if (event.target.id  === "formSurveySubmit"){
	  console.log("formSurveySubmit")
	  apiUrl = "/SurveysNotesSet"
	  Classification = document.getElementById("SurveyClassification").value
	  dataEntry = document.getElementById("SurveyNotes").value
  }

  var url = apiUrl+'?Airline='+InfoForEngNotes.airline+'&Parser='+InfoForEngNotes.parser+
  '&TailId='+InfoForEngNotes.tail+'&FlightId='+InfoForEngNotes.flightId+'&DateYYYYMMDD='+InfoForEngNotes.date+'&dataEntry='+dataEntry+'&Classification='+Classification
  console.log("SUBMIT TO", url)

  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.onload = function() { // request successful
  // we can use server response to our request now
    console.log(request.responseText);
  };

  request.onerror = function() {
    // request failed
  };

  request.send(new FormData(event.target)); // create FormData from form that triggered event
  event.preventDefault();
}

// and you can attach form submit event like this for example
function attachFormSubmitEvent(formId){
  var EvtListner = document.getElementById(formId)
  EvtListner.addEventListener("submit", formSubmit);
}
