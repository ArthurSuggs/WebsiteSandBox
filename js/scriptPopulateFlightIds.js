<!--Load the AJAX API-->
/*var el = document.getElementById("Refresh")
if(el){
    el.addEventListener("click", populateFlightIds);
}*/
/*function insertAfter(newElement, referenceElement) {
    referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}*/
function addOptionsToSelect(setOfOptions, selectId) {
  var select = document.getElementById(selectId);
  var arrayOfOptions = [... setOfOptions]
  for(index in arrayOfOptions) {
      select.options[select.options.length] = new Option(arrayOfOptions[index], arrayOfOptions[index]);
  }
}
function populateFlightIds() {
    var airline = document.getElementById("Airline").value
    var parser = 'FPMfastSES'
    var date = document.getElementById("Date").value
    var tail = document.getElementById("Tail").value
    fetch('http://localhost:8080/mongoData?Airline='+airline+'&Parser='+parser+
    '&TailId='+tail+'&FlightId=.*&DateYYYYMMDD='+date)
      .then(response => response.json())
    .then(info => {
      var flightIds = new Set();
      for (var key of info) {
          flightIds.add(key['flightid'])
      }
      addOptionsToSelect(flightIds, 'FlightId')
  });
}
