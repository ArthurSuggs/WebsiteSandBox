//TailHealth
var TailHealthSESBubbleChartStruct = [
  ['string', 'FlightID','FlightID'],
  ['datetime', 'StartOf10K','Start of 10K'],
  ['number', 'RxTotal','Rx Total'],
  ['number', 'RebootsInAir','Reboots In Air'],
  ['number', 'InternetStatus10k','Internet Status Over 10k']
]
var TailHealthBubbleChartStruct = [
  ['string', 'flightid','FlightID'],
  ['datetime', 'startof10k','Start of 10K'],
  ['number', 'rxtotal','Rx Total'],
  ['number', 'rebootsinair','Reboots In Air'],
  ['number', 'internetstatus10k','Internet Status Over 10k']
]
var ScoreLineGraphStruct = [
    ['datetime', 'takeoff'],
    ['number', 'internetstatus10k'],
    ['number', 'intranetstatus10k'],
    ['number', 'kamustatescore'],
    ['number', 'portalscore'],
    ['number', 'wap1score'],
    ['number', 'wap2score'],
    ['number', 'wap3score']
]
var SurveyStruct = [
  ['string', 'tail'],
  ['string', 'month'],
  ['string', 'day'],
  ['string', 'departure'],
  ['string', 'destination'],
  ['string', 'flightid'],
  ['string', 'overall'],
  ['string', 'issuesyn'],
  ['string', 'issueactivities'],
  ['string', 'classification'],
  ['string', 'notes']
]
var SurveyPieStruct = [
  ['string', 'Classification','Classification'],
  ['number', 'Total','Total of each Survey Classification']
]

var EngNotesPieStruct = [
  ['string', 'Classification','Classification'],
  ['number', 'Total','Total of each Engineering notes Classification']
]
var SurveyHistogramStruct = [
  ['string', 'flightid'],
  ['string', 'classification']
]
var DarkAircraftStruct = [
  ['string', 'Tail'],
  ['string', 'Type'],
  ['string', 'Opened'],
  ['string', 'Closed'],
  ['string', 'Squawk'],
  ['string', 'Mx_Action'],
  ['string', 'Description'],
  ['string', 'Root_Cause'],
  ['string', 'Engineering_Notes']
]
var DarkAircraftHistogramStruct = [
  ['string', 'Root_Cause'],
  ['string', 'Mx_Action']
]
var LogOffloadPerFileStruct = [
  ['string', 'TakeOff'],
  ['string', 'Landing'],
  ['string', 'Departure'],
  ['string', 'Destination'],
  ['string', 'FlightID'],
  ['boolean', 'Above10k'],
  ['number', 'UsageOffloads'],
  ['number', 'AllOffloads']
]
var LogOffloadPerFileScatterChartStruct = [
  ['datetime', 'TakeOff'],
  ['number', 'UsageOffloads'],
  ['number', 'AllOffloads']
]
var UsersPerFlightLineStruct = [
  //['datetime', 'TakeOff'],
  ['string', 'FlightId'],
  //['string', 'FlightIdUniq'],
  ['number', 'UserCnt']
]
//Common
var SWVersionsStructSES = [
	// ['string', 'tailid'],
	['datetime', 'takeoff'],
  ['datetime', 'landing'],
  ['string', 'departure'],
  ['string', 'destination'],
  ['string', 'flightid'],
  ['string', 'connvmswversion'],
  ['string', 'connvmswvkaconfig'],
  ['string', 'modemswver'],
  ['string', 'modemconfigver'],
  ['string', 'modemserialnum'],
  ['string', 'antswver'],
  ['string', 'antconfigver'],
  ['string', 'antserialnum'],
  ['string', 'wap1softwareversion'],
  ['string', 'wap1serialnum'],
  ['string', 'wap2softwareversion'],
  ['string', 'wap2serialnum'],
  ['string', 'wap3softwareversion'],
  ['string', 'wap3serialnum']
]
var SWVersionsStruct = [
  // ['string', 'tailid'],
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
var UdpTraceSummaryStruct = [
 ['string', 'filename'],
 ['number', 'avgesno'],
 ['number', 'termstate000'],
 ['number', 'termstatenot000'],
 ['number', 'connected'],
 ['number', 'disconnected'],
 ['number', 'outofcoverageseconds']]

 var UdpTraceSummaryAvgEsnoHistogramStruct = [
   ['string', 'filename'],
   ['number', 'avgesno']
 ]
 var UdpTraceSummaryTerminalStateConnectedHistogramStruct = [
   ['string', 'filename'],
   ['number', 'connected']
 ]
 var FPMFastUdpTraceStruct = [
   ['datetime', 'StartOf10K'],
   ['datetime', 'EndOf10K'],
   ['number', 'TimeAbove10K'],
   ['string', 'Departure'],
   ['string', 'Destination'],
   ['string', 'FlightID'],
   ['number', 'InternetStatus10k'],
   ['number', 'IntranetStatus10k'],
   ['number', 'RxTotal'],
   ['number', 'TxTotal'],
   ['number', 'UserCnt'],
   ['number', 'RebootsInAir'],
   ['number', 'AvgEsno'],
   ['number', 'TermState000'],
   // ['number', 'TermStateNot000'],
   ['number', 'Connected'],
   // ['number', 'Disconnected'],
   // ['number', 'Degraded'],
 ]
 var FlightTimeLineStruct = [
   ['string', 'flightid'],
   ['datetime', 'startof10k'],
   ['datetime', 'endof10k']
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
