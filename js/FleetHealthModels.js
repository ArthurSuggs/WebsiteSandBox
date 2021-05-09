//FleetHealth
//index 0 is type
//index 1 is the name of the key to look up the data from the flat json
var SWVersionsStructSES = [
	['string', 'TailId'],
	['datetime', 'TakeOff'],
  ['datetime', 'Landing'],
  ['string', 'Departure'],
  ['string', 'Destination'],
  ['string', 'FlightID'],
  ['string', 'ConnVMSWVersion'],
  ['string', 'ConnVMSWVKaConfig'],
  ['string', 'ModemSWVer'],
  ['string', 'ModemConfigVer'],
  ['string', 'ModemSerialNum'],
  ['string', 'AntSWVer'],
  ['string', 'AntConfigVer'],
  ['string', 'AntSerialNum'],
  ['string', 'WAP1SoftwareVersion'],
  ['string', 'WAP1SerialNum'],
  ['string', 'WAP2SoftwareVersion'],
  ['string', 'WAP2SerialNum'],
  ['string', 'WAP3SoftwareVersion'],
  ['string', 'WAP3SerialNum']
]

var SWVersionsStruct = [
  ['string', 'tailid'],
	['datetime', 'takeoff'],
  ['datetime', 'landing'],
  ['string', 'departure'],
  ['string', 'destination'],
  ['string', 'flightid'],
  ['string', 'cruswversion'],
  ['string', 'crukaconfig'],
  ['string', 'cruhwaddresseth0'],
  ['string', 'cruhwaddresseth1'],
  ['string', 'asuhwaddresseth0'],
  ['string', 'asuhwaddresseth1'],
  ['string', 'asusoftwareversion'],
  ['string', 'portalsoftware'],
  ['string', 'proxyversion'],
  ['string', 'widevineversion'],
  ['string', 'playreadyversion'],
  ['string', 'modemswver'],
  ['string', 'modemmac'],
  ['string', 'bdt'],
  ['string', 'switchvlans']
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
  ['number', 'Internet Status','Internet Status'],
  ['number', 'Intranet Status','Intranet Status'],
	['number', 'Reboots In Air','Reboots In Air'],
	['number', 'Flights','Flights']
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




//SingleFlightAnalysisFlytnet
