function addOptionsToSelect(setOfOptions, selectId) {
  var select = document.getElementById(selectId);
  var currentSelection = select.value
  var length = select.options.length;
  for (i = length-1; i >= 0; i--) {
    select.remove(i)
    //select.options[i] = null;
  }
  var arrayOfOptions = [... setOfOptions]
  for(index in arrayOfOptions) {
      select.options[select.options.length] = new Option(arrayOfOptions[index], arrayOfOptions[index]);
  }
  //console.log(currentSelection)
  if (arrayOfOptions.includes(currentSelection)) {
    select.options[select.options.length] = new Option(currentSelection, currentSelection);
    select.value = currentSelection
  }
}
function getTailIds() {
  var QueryInfo = {
    url: "TailIDs",
    airline: document.getElementById("Airline").value,
    date: formatDate(),
  }
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      var TailIds = new Set();
      if(info){
        for (var tailid of info) {
          TailIds.add(tailid)
        }
      }
      addOptionsToSelect(TailIds, 'Tail')
    });
}
function getFlightIds() {
  var QueryInfo = {
    url: "FlightIDs",
    airline: document.getElementById("Airline").value,
    date: formatDate(),
    tail: document.getElementById("Tail").value,
    ConType: "SES"
  }
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      var flightIds = new Set();
      if(info){
        for (var flightid of info) {
          flightIds.add(flightid)
        }
      }
      addOptionsToSelect(flightIds, 'FlightId')
    });
}
function getUserIds() {
  var QueryInfo = {
    url: "UserIDs",
    airline: document.getElementById("Airline").value,
    tail: document.getElementById("Tail").value,
    parser: "UsageSummary",
    flightId: document.getElementById("FlightId").value,
    ConType: "SES"
  }
  fetch(webserver+QueryInfo.url+'?Airline='+QueryInfo.airline+'&Parser='+QueryInfo.parser+
  '&TailId='+QueryInfo.tail+'&FlightId='+QueryInfo.flightId+'&DateYYYYMMDD='+QueryInfo.date)
    .then(response => response.json())
    .then(info => {
      var userIds = new Set();
      if(info){
        for (var userId of info) {
          userIds.add(userId)
        }
      }
      addOptionsToSelect(userIds, 'UserId')
    });
}
