function setUserStateCookies(Airline,TailId, FlightId,UserId,DateYYYYMMDD) {
  var d = new Date();
  d.setTime(d.getTime() + (1*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = "Airline" + "=" + Airline + ";" + expires + ";path=/";
  document.cookie = "Tail" + "=" + TailId + ";" + expires + ";path=/";
  document.cookie = "FlightId" + "=" + FlightId + ";" + expires + ";path=/";
  document.cookie = "UserId" + "=" + UserId + ";" + expires + ";path=/";
  document.cookie = "Date" + "=" + formatDate(DateYYYYMMDD) + ";" + expires + ";path=/";
}
function getUserStateCookies() {
  document.getElementById("Airline").value = getCookie("Airline");
  addOptionToSelect(getCookie("Tail"), "Tail")
  //document.getElementById("Tail").value = getCookie("Tail");
  if(document.getElementById("FlightId")){
    document.getElementById("FlightId").value = getCookie("FlightId");
  }
  if(document.getElementById("UserId")){
    document.getElementById("UserId").value = getCookie("UserId");
  }
  if(getCookie("Date")){
    document.getElementById("Date").value = formatDateforDatePicker(getCookie("Date"));
  }
}
function addOptionToSelect(option, selectId) {
  var select = document.getElementById(selectId);
  var length = select.options.length;
  select.options[select.options.length] = new Option(option, option);
  select.value = option
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
