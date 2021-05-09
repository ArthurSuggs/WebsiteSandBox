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
var LogOffloadPerFileBarCharStruct = [
  ['datetime', 'TakeOff'],
  ['number', 'UsageOffloads'],
  ['number', 'AllOffloads']
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
var LanIPGraphStruct = {'englogpoints': [
  ['datetime', 'currenttime'],
  ['number', 'lanipcnt'],
  ['number', 'currentroutecnt'],
  ['number', 'userregcnt'],
  ['number', 'alt']
]}
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
var FingerPrintLineStruct = { 'fingerprintresults': [
  ['datetime', 'windowstart'],
  ['number', 'windowcnt']
]}
var FlightPhasesStruct = {'flightphases': [
  ['string', 'name'],
  ['datetime', 'time'],
  ['datetime', 'time']
]}
var FlightPhasesTableStruct = {'flightphases': [
  ['datetime', 'time'],
  ['string', 'name']
]}
var RebootsStruct = {'reboots': [
  ['datetime', 'time'],
  ['string', 'name']
]}
var UserRegStruct = {'userreg': [
  ['string', 'userid'],
  ['datetime', 'creationtime'],
  ['datetime', 'creationtime']
]}
var MonitSummaryStruct = {'monitsummary': [
  ['string', 'name'],
  ['datetime', 'time'],
  ['datetime', 'time']
]}
