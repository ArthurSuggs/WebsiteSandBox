//Sfa
var AshwinsTimelineStruct = { 'fkalmgrupdateinternet': [
  ['datetime', 'currenttime'],
  ['number', 'internetstate'],
	['number', 'broadbandswitchstate'],
	['number', 'internetoverridestate'],
	['number', 'sysinternet'],
	['number', 'sysintranet'],
	['number', 'kamonline'],
	['number', 'portalonline'],
	['number', 'wapsonline']
]}
var FlightPhasesTableStruct = {'flightphases': [
  ['datetime', 'time'],
  ['string', 'name']
]}
var FlightPhasesStruct = {'flightphases': [
  ['string', 'name'],
  ['datetime', 'time'],
  ['datetime', 'time']
]}
var UserRegStruct = {'userreg': [
  ['string', 'userid'],
  ['datetime', 'commandtime'],
  ['datetime', 'commandtime']
]}
var LogUserPurchaseCommandStruct = {'loguserpurchasecommand': [
    ['datetime', 'time'],
    ['string', 'userid'],
    ['string', 'description'],
    ['string', 'product'],
    ['string', 'stateresult'],
    ['string', 'deviceid'],
    ['string', 'orderid'],
    ['string', 'planid'],
    ['number', 'price']
]}
var RequestInternetServiceStruct = {'requestinternetservice': [
  ['datetime', 'time'],
  ['string', 'userid'],
  ['string', 'servicename'],
  ['string', 'deviceid']
]}
var StartAAAaccountingStruct = {'startaaaaccounting': [
  ['datetime', 'time'],
  ['string', 'userid'],
  ['string', 'session']
]}
var UserRegistrationCommandStruct = {'userreg': [
  ['datetime', 'commandtime'],
  ['string', 'userid']
]}
//This can only be used with drawHistogramFromOnlyArrayOfNamesGeneric
var UserRegistrationCommandHistogramStruct= {'userreg': [
  ['string', 'userid']
]}
//This can only be used with drawHistogramFromOnlyArrayOfNamesGeneric
var LogUserPurchaseCommandHistogramStruct= {'loguserpurchasecommand': [
  ['string', 'userid']
]}
//This can only be used with drawHistogramFromOnlyArrayOfNamesGeneric
var RequestInternetServiceStructHistogramStruct= {'requestinternetservice': [
  ['string', 'userid']
]}
//This can only be used with drawHistogramFromOnlyArrayOfNamesGeneric
var StartAAAaccountingHistogramStruct= {'startaaaaccounting': [
  ['string', 'userid']
]}

var MonitSummaryStruct = {'monitsummary': [
  ['string', 'name'],
  ['datetime', 'time'],
  ['datetime', 'time']
]}

var AAUGraphSESStruct = {'aaugraphses': [
  ['datetime', 'time'],
  ['number', 'beamid'],
  ['number', 'terminalstatecode'],
  ['number', 'linkstate'],
  ['number', 'flsignalqual'],
  ['number', 'bytesrxair'],
  ['number', 'bytestxair'],
  ['number', 'altitude'],
]}

var LanIPGraphStruct = {'englogpoints': [
  ['datetime', 'currenttime'],
  ['number', 'lanipcnt'],
  ['number', 'currentroutecnt'],
  ['number', 'userregcnt'],
  ['number', 'alt']
]}

var UdpTraceBandwidthDetailsRxStruct = {'udptracebandwidth': [
    ['datetime', 'datetime'],
    ['number', 'actualrxbwkbps'],
    ['number', 'possiblerxbwkbps']]}

var UdpTraceBandwidthDetailsTxStruct = {'udptracebandwidth': [
        ['datetime', 'datetime'],
        ['number', 'actualtxbwkbps'],
        ['number', 'possibletxbwkbps']]}

var UdpTraceSummaryConnectedPieStruct = [
  ['number', 'connected',"Connected"],
  ['number', 'disconnected',"Disconnected"]]

var UdpTraceSummaryTerminalPieStruct = [
   ['number', 'termstate000',"Terminal State 0.0.0"],
   ['number', 'termstatenot000',"Terminal State Not 0.0.0"]]

var WapDataStruct = {
 'wap1data': [
   ['datetime','currenttime'],
   ['number','bytes_sent'],
   ['number','bytes_received']]/*,
 'wap2data': [
   ['datetime','currenttime'],
   ['number','bytes_sent'],
   ['number','bytes_received']],
 'wap3data': [
   ['datetime','currenttime'],
   ['number','bytes_sent'],
   ['number','bytes_received']]*/
}

var UserHistogramStruct = [
  ['string', 'userid'],
  ['number', 'servicetput']
]
var UserFreeScatterChartStruct = [
  ['datetime', 'registrationrec'],
  ['number', 'paidwanrxmb'],
  ['number', 'autowanrxmb']
]

//name, x, y, group, size of bubble
var EnglogUserBubbleChartStruct = [
  ['string', 'user','User Id'],
  ['datetime', 'time','Purechase Command Time'],
  ['number', 'userid','User Number'],
  ['string', 'result','Result'],
  ['number', 'price','Price']
]

var PortalPlatformReturnedDataPieStruct = [
  ['string', 'HttpStatusResponse','Http Status Response'],
  ['number', 'TotalBytesReturned','Total Bytes Returned']
]
var PortalPlatformHttpStatusResponsesPieStruct = [
  ['string', 'HttpStatusResponse','Http Status Response'],
  ['number', 'Total','Total count of each status response']
]
var PortalPlatformLanIpOccurancesPieStruct = [
  ['string', 'HashedLanIP','Hashed Lan IP'],
  ['number', 'Occurances','Count of occurances in log']
]

var PPGetLineStruct = {'accesslineinfo': [
        ['datetime', 'datetime'],
        ['number', 'bytesreturned']]}
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
  ['number', 'TermStateNot000'],
  ['number', 'Connected'],
  ['number', 'Disconnected'],
  ['number', 'Degraded'],
]
var UdpTraceSummaryStruct = [
 ['string', 'filename'],
 ['number', 'avgesno'],
 ['number', 'termstate000'],
 ['number', 'termstatenot000'],
 ['number', 'connected'],
 ['number', 'disconnected'],
 ['number', 'outofcoverageseconds']]
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
 var FlightTimeLineStruct = [
   ['string', 'flightid'],
   ['datetime', 'startof10k'],
   ['datetime', 'endof10k']
 ]
var EngNoteStruct = [
	['string', 'TailId'],
	['string', 'FlightId'],
	['string', 'Classification'],
	['string', 'DataEntry'],
	['datetime', 'EntryTime']
]
