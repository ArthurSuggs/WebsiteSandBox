var dt = document.getElementById("Date")
if(dt){
  console.log("yes")
    dt.addEventListener("change", refreshEverything);
}
function refreshEverything(){
  if(document.getElementById("Tail")){
    getTailIds()
  }
  if(document.getElementById("FlightId")){
    getFlightIds()
  }

}
//I don't know why but replace only removes the first element it gets to
function formatDate(){
  var san = document.getElementById("Date").value.replace('-','');
  //console.log(san)
  var sanitize = san.replace('-','');
//  console.log(sanitize)
  return sanitize
}
function formatDateforDatePicker(DateYYYYMMDD){
  var yyyy = DateYYYYMMDD.slice(0,4)
  var mm = DateYYYYMMDD.slice(4,6)
  var dd = DateYYYYMMDD.slice(6,8)
  return yyyy+'-'+mm+'-'+dd
}
function populateDateWithTodaysDate(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  document.getElementById("Date").value = yyyy + '-' + mm + '-' + dd;
}
