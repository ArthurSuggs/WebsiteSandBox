var UsageDetailsWanSESStruct = {'usagedetails': [
    ['datetime', 'time'],
    ['number', 'wanrx'],
    ['number', 'wantx']]}

var UsageDetailsLanSESStruct = {'usagedetails': [
    ['datetime', 'time'],
    ['number', 'lanrx'],
    ['number', 'lantx']]}

var UsageBarStruct = [
  ['string', 'userid'],
  ['number', 'autowanrxmb'],
  ['number', 'autowantxmb'],
  ['number', 'paidwanrxmb'],
  ['number', 'paidwantxmb'],
  ['number', 'logpurchase']
]

var UsageSummaryStruct = [
  ['datetime', 'registrationrec'],
  ['string', 'flightid'],
  ['string', 'userid'],
  ['number', 'autowanrxmb'],
  ['number', 'autowantxmb'],
  ['number', 'paidwanrxmb'],
  ['number', 'paidwantxmb'],
  ['number', 'wholesordrqt'],
  ['number', 'wholesordresp'],
  ['number', 'authrec'],
  ['number', 'logpurchase'],
  ['number', 'wlchange'],
  ['number', 'deviceadd'],
  ['number', 'servicetput'],
  ['string', 'producttype']
]
var UserHistogramStruct = [
  ['string', 'userid'],
  ['number', 'servicetput']
]
var UserFreeScatterChartStruct = [
  ['datetime', 'registrationrec'],
  ['number', 'paidwanrxmb'],
  ['number', 'autowanrxmb']
]
var UserPaidBubbleChartStruct = [
  ['string', 'userid','Id'],
  ['datetime', 'registrationrec','Start'],
  ['number', 'paidwanrxmb','Paid Wan Rx MB'],
  ['string', 'producttype','Product Type'],
  ['number', 'servicetput','Sample Size']
]
var UserFreeBubbleChartStruct = [
  ['string', 'userid','Id'],
  ['datetime', 'registrationrec','Start'],
  ['number', 'autowanrxmb','Free Wan Rx MB'],
  ['string', 'producttype','Product Type'],
  ['number', 'servicetput','Sample Size']
]
var UsageBarStruct = [
  ['string', 'userid'],
  ['number', 'autowanrxmb'],
  ['number', 'autowantxmb'],
  ['number', 'paidwanrxmb'],
  ['number', 'paidwantxmb'],
  ['number', 'logpurchase']
]

var UsersPerFlightLineStruct = [
  //['datetime', 'TakeOff'],
  ['string', 'FlightId'],
  //['string', 'FlightIdUniq'],
  ['number', 'UserCnt']
]
var UserPaidRxPieStruct = [
  ['string', 'userid', "User ID"],
  ['number', 'paidwanrxmb',"Wan Rx - Paid"]]
var UserPaidTxPieStruct = [
  ['string', 'userid', "User ID"],
  ['number', 'paidwantxmb',"Wan Tx - Paid"]]
var UserFreeRxPieStruct = [
  ['string', 'userid', "User ID"],
  ['number', 'autowanrxmb',"Wan Rx - Free"]]
var UserFreeTxPieStruct = [
  ['string', 'userid', "User ID"],
  ['number', 'autowantxmb',"Wan Tx - Free"]]
