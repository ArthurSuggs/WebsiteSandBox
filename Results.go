package main

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"reflect"
	"time"
)

type ResultTimeFmt time.Time

type Result interface {
	ResultToJson() string
	ResultToCsv() string
}

type GenericResults struct {
	FileName        string
	ParserName      string
	StartOfFileTime string
	EndOfFileTime   string
	Error           string
}

func (res GenericResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res GenericResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type TwoFileParserResult struct {
	FirstFileOutput  string
	FirstFileHeader  string
	SecondFileOutput string
	SecondFileHeader string
}

//UPDate ME
func (res TwoFileParserResult) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res TwoFileParserResult) ResultToCsv() string {
	return res.FirstFileOutput + "," + res.SecondFileOutput
}
func (res TwoFileParserResult) UpdateHeader() string {
	return res.FirstFileHeader + "," + res.SecondFileHeader
}

type RgxResults struct {
	FileName    string
	RgxName     string
	CountInFile int
}

func (res RgxResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res RgxResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type SysevtResults struct {
	FileName             string
	TailId               string
	TakeOff              string
	Landing              string
	Departure            string
	Destination          string
	FlightID             string
	StartOf10K           string
	EndOf10K             string
	TimeAbove10K         string
	InternetStatus10k    float64
	InternetStatusGnd    float64
	IntranetStatus10k    float64
	IntranetStatusGnd    float64
	Signal10k            float64
	SignalGnd            float64
	Cabin10k             float64
	CabinGnd             float64
	PortalScore          float64
	Wap1Score            float64
	Wap2Score            float64
	Wap3Score            float64
	KamuStateScore       float64
	KamuCommScore        float64
	AAAScore             float64
	GCMSScore            float64
	BroadbandSwitchScore float64
	RxTotal              string
	TxTotal              string
	RebootsOnGround      int
	RebootsInAir         int
	Above10k             bool
}

func (res SysevtResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		fmt.Println(err)
		out = []byte(err.Error())
	}
	return string(out)
}
func (res SysevtResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type PSDPeriodic struct {
	Text         string `xml:",chardata"`
	TimeStamp    string `xml:"TimeStamp"`
	NumDataRec   string `xml:"NumDataRec"`
	NumAvailNode string `xml:"NumAvailNode"`
	NumBadNode   string `xml:"NumBadNode"`
	NumUnkNode   string `xml:"NumUnkNode"`
}
type ConnVMInterFStatus struct {
	Text       string       `xml:",chardata"`
	IntFStatus []IntFStatus `xml:"IntFStatus"`
}
type IntFStatus struct {
	Text    string `xml:",chardata"`
	IntFNam string `xml:"IntFNam"`
	Status  string `xml:"Status"`
	ByteRx  string `xml:"ByteRx"`
	ByteTx  string `xml:"ByteTx"`
}

/********************************************************************/
type ConnVMPeriodicHealth struct {
	XMLName              xml.Name `xml:"ConnVMPeriodicHealth"`
	Text                 string   `xml:",chardata"`
	TimeStamp            string   `xml:"TimeStamp"`
	LastPowerCycle       int      `xml:"LastPowerCycle"`
	PowerCycleCount      string   `xml:"PowerCycleCount"`
	ConnVMMemUtilization string   `xml:"ConnVMMemUtilization"`
	ConnVMByteToKAM      float64  `xml:"ConnVMByteToKAM"`
	ConnVMByteFrKAM      float64  `xml:"ConnVMByteFrKAM"`
	ConnVMCPUUtilization struct {
		Text      string `xml:",chardata"`
		ConnVMCPU []struct {
			Text           string `xml:",chardata"`
			CPUID          string `xml:"CPUID"`
			CPUUtilization string `xml:"CPUUtilization"`
		} `xml:"ConnVMCPU"`
	} `xml:"ConnVMCPUUtilization"`
	ConnVMInterFStatus  ConnVMInterFStatus `xml:"ConnVMInterFStatus"`
	PSDPeriodic         PSDPeriodic        `xml:"PSDPeriodic"`
	PortalComStat       string             `xml:"PortalComStat"`
	RegisteredUserCount string             `xml:"RegisteredUserCount"`
}

type IntFStatusWithTime struct {
	CurrnetTime string
	IntFStatus  []IntFStatus
}
type ConnVMPeriodicHealthResults struct {
	FileName             string
	ConnVMPeriodicHealth []IntFStatusWithTime
}

func (res ConnVMPeriodicHealthResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res ConnVMPeriodicHealthResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

/*
func (res SysevtResults) CreateHeader() string {
	v := reflect.ValueOf(res)
	var header string
	s := reflect.ValueOf(&res).Elem()
	typeOfT := s.Type()

	for i := 0; i < v.NumField(); i++ {
		header = fmt.Sprintf("%v%v,", header, typeOfT.Field(i).Name)
	}
	return string(header)
}*/

//Takes in a flat result struct and returns the structs memeber names in a csv string
func CreateHeaderGen(res interface{}) string {
	t := reflect.TypeOf(res)
	value := reflect.New(t).Interface()
	v := reflect.ValueOf(value)
	i := reflect.Indirect(v)
	var header string
	typeOfT := i.Type()

	for i := 0; i < typeOfT.NumField(); i++ {
		header = fmt.Sprintf("%v%v,", header, typeOfT.Field(i).Name)
	}
	return string(header)
}

type AAUGraphSES struct {
	Time              string
	BeamId            int
	TerminalStateCode int
	LinkState         int
	FLSignalQual      float64
	BytesRxAir        float64
	BytesTxAir        float64
	Altitude          float64
}

func (res AAUGraphSES) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res AAUGraphSES) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type AAUGraphSESResult struct {
	FileName    string
	AAUGraphSES []AAUGraphSES
}

func (res AAUGraphSESResult) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res AAUGraphSESResult) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type SignalByFlightResults struct {
	FileName     string
	TailId       string
	TakeOff      string
	Landing      string
	Departure    string
	Destination  string
	FlightID     string
	StartOf10K   string
	EndOf10K     string
	TimeAbove10K string
	Scan         float64
	NetEntry     float64
	Dhcp         float64
	Online       float64
	Install      float64
	SWDownload   float64
	Fault        float64
	Handover     float64
	Unknown      float64
	TotalTime    float64
	SignalScore  string
}

func (res SignalByFlightResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res SignalByFlightResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type UsageDetails struct {
	Time  string
	WANRx int
	WANTx int
	LANRx int
	LANTx int
}
type UsageDetailsResults struct {
	FileName     string
	UsageDetails []UsageDetails
}

func (res UsageDetailsResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res UsageDetailsResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type UsageSummaryResults struct {
	FileName        string
	TailId          string
	TakeOff         string
	Landing         string
	Departure       string
	Destination     string
	FlightID        string
	UserId          string
	RegistrationRec string
	Usergroup       string
	UserIP          string
	AutoWanRxMB     float64
	AutoWanTxMB     float64
	PaidWanRxMB     float64
	PaidWanTxMB     float64
	WholeSOrdRqt    int
	WholeSOrdResp   int
	AuthRec         int
	LogPurchase     int
	WLChange        int
	DeviceAdd       int
	ServiceTput     int
	ProductType     string
}

func (res UsageSummaryResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res UsageSummaryResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type EngLogSummaryResults struct {
	FileName       string
	TotalUsers     string
	PortalIn       float64
	PortalOut      float64
	AuthContentCnt int
	MoviesWatched  int
}

func (res EngLogSummaryResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res EngLogSummaryResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type UdpTraceSummaryResults struct {
	FileName                string
	AvgEsno                 float64
	TermState000            float64
	TermStateNot000         float64
	Connected               float64
	Disconnected            float64
	Degraded                float64
	OutOfCoverageSeconds    int
	SecondsInOtherTermState string
	//SecondsInOtherTermState string
	/*return fmt.Sprintf("%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%d,%s", float64(esnoTotalOver10K)/float64(linesOver10K)/10,
	float64(termStateCodesOver10K["0.0.0"])/float64(linesOver10K)*100,
	float64(termStateNot000)/float64(linesOver10K)*100, float64(connected)/float64(linesOver10K)*100,
	float64(disConnected)/float64(linesOver10K)*100, float64(degraded)/float64(linesOver10K)*100,
	timeOOC, strings.Join(allStateCodes, ","))*/
}

func (res UdpTraceSummaryResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res UdpTraceSummaryResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type UdpTraceBandwidth struct {
	DateTime         string
	ActualRxBwKbps   float64
	PossibleRxBwKbps float64
	ActualTxBwKbps   float64
	PossibleTxBwKbps float64
}

func (res UdpTraceBandwidth) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res UdpTraceBandwidth) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type UdpTraceBandwidthResults struct {
	FileName          string
	UdpTraceBandwidth []UdpTraceBandwidth
}

func (res UdpTraceBandwidthResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res UdpTraceBandwidthResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type UdpTraceDetails struct {
	DateTime              string
	SQF                   int
	EsNo                  int
	OutRouteModcod        string
	SymbolRate            float64
	TerminalStateCode     string
	RequestedTransmitRate string
	CurrentTransmitRate   string
	CurrentUplinkEsNo     int
	OutrouteKBytesRx      int
	InrouteKBytesTx       int
}

type MessageLogSummaryResults struct {
	FileName    string
	StartOfFile string
	EndOfFile   string
	TimeOn      float64
	TimeOff     float64
	RebootCnt   int
	NicUpTime   float64
	NicDownTime float64
}

func (res MessageLogSummaryResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res MessageLogSummaryResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type SoftwareVersionLegacyResults struct {
	FileName           string
	TailId             string
	TakeOff            string
	Landing            string
	Departure          string
	Destination        string
	FlightID           string
	CRUSWVersion       string
	CRUKaConfig        string
	CRUHwAddressEth0   string
	CRUHwAddressEth1   string
	ASUHwAddressEth0   string
	ASUHwAddressEth1   string
	ASUSoftwareVersion string
	ASUKaConfig        string
	PortalSoftware     string
	ProxyVersion       string
	WideVineVersion    string
	PlayReadyVersion   string
	ModemSWVer         string
	ModemMAC           string
	Bdt                string
	SwitchVlans        string
}

func (res SoftwareVersionLegacyResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res SoftwareVersionLegacyResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type SoftwareVersionSesResults struct {
	FileName            string
	TailId              string
	TakeOff             string
	Landing             string
	Departure           string
	Destination         string
	FlightID            string
	ConnVMSWVersion     string
	ConnVMSWVKaConfig   string
	ModemSWVer          string
	WAP1SoftwareVersion string
	WAP1SerialNum       string
	WAP2SoftwareVersion string
	WAP2SerialNum       string
	WAP3SoftwareVersion string
	WAP3SerialNum       string
}

func (res SoftwareVersionSesResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res SoftwareVersionSesResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

//Need Set of a process to give a summary of each
type ProcessCrashResults struct {
	FileName             string
	ProcessNotRunning    int
	ProcessRestarting    int
	ReachedResourceLimit int
	MonitReboot          int
}

func (res ProcessCrashResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res ProcessCrashResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type WAPData struct {
	CurrentTime    string
	Days_Active    float64
	Hours_Active   float64
	Minutes_Active float64
	Seconds_Active float64
	Bytes_Sent     float64
	Bytes_Received float64
}

func (res WAPData) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res WAPData) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type WapDataResults struct {
	FileName string
	WAP1Data []WAPData
	WAP2Data []WAPData
	WAP3Data []WAPData
}

func (res WapDataResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res WapDataResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type FingerPrint struct {
	WindowCnt   int
	WindowStart string
}

func (res FingerPrint) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res FingerPrint) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type FingerPrintResults struct {
	FileName     string
	FingerPrints map[string][]FingerPrint
}

func (res FingerPrintResults) ResultToJson() string {
	out, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}
	return string(out)
}
func (res FingerPrintResults) ResultToCsv() string {
	v := reflect.ValueOf(res)
	var csvString string
	for i := 0; i < v.NumField(); i++ {
		csvString = fmt.Sprintf("%v%v,", csvString, v.Field(i).Interface())
	}
	return csvString
}

type Eth0IssueResults struct {
}
