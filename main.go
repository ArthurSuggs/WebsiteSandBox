package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"math"
	"net/http"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"
)

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseGlob("*.html"))
}

func main() {
	//Pages
	http.Handle("/home", http.HandlerFunc(ServeMainPage))
	http.Handle("/TailHealth", http.HandlerFunc(ServeTailHealth))
	http.Handle("/singleFlightAnalysis", http.HandlerFunc(ServeDeepDive))
	http.Handle("/singleFlightAnalysisFlytnet", http.HandlerFunc(ServeDeepDiveFlytnet))
	http.Handle("/UserAnalysis", http.HandlerFunc(ServeUserAnalysis))

	http.Handle("/FlightIDs", http.HandlerFunc(FlightIDs))
	http.Handle("/UserIDs", http.HandlerFunc(UserIDs))
	http.Handle("/TailIDs", http.HandlerFunc(TailIDs))

	http.Handle("/UserCntPerFlight", http.HandlerFunc(UserCntPerFlightOnDateRgx))
	//http.Handle("/FleetHealth", http.HandlerFunc(FleetHealthAirline))
	http.Handle("/FleetHealth", http.HandlerFunc(FleetHealthAirlineAgg))
	http.Handle("/FPMfastSESandUDPTrace", http.HandlerFunc(FPMfastSESandUDPTrace))
	http.Handle("/LogOffload", http.HandlerFunc(GetLogOffload))

	http.Handle("/DarkAircraft", http.HandlerFunc(DarkAircraft))
	http.Handle("/SWVersions", http.HandlerFunc(SWVersions))
	http.Handle("/MonitSummary", http.HandlerFunc(MonitSummarizer))
	http.Handle("/UserSessionsEng", http.HandlerFunc(UserSessionsEng))
	http.Handle("/LogPurchaseCommandFromPPAccess", http.HandlerFunc(LogPurchaseCommandFromPPAccess))
	http.Handle("/LogPurchaseCommandFromEnglog", http.HandlerFunc(LogPurchaseCommandFromEnglog))
	http.Handle("/PortalPlatformGetRequestsByLanIp", http.HandlerFunc(PortalPlatformGetRequestsByLanIp))
	http.Handle("/PortalPlatformMethodDeleteTimeAndData", http.HandlerFunc(PortalPlatformMethodDeleteTimeAndData))
	http.Handle("/PortalPlatformMethodPUTTimeAndData", http.HandlerFunc(PortalPlatformMethodPUTTimeAndData))
	http.Handle("/PortalPlatformMethodGETTimeAndData", http.HandlerFunc(PortalPlatformMethodGETTimeAndData))
	http.Handle("/PortalPlatformHttpStatusResponses", http.HandlerFunc(PortalPlatformHttpStatusResponses))
	http.Handle("/PortalPlatformData", http.HandlerFunc(PortalPlatformData))
	http.Handle("/DarkEntry", http.HandlerFunc(ServeDarkEntry))
	//http.Handle("/SWVersionsSES", http.HandlerFunc(SWVersionsSES))
	http.Handle("/ParsedFilenames", http.HandlerFunc(ParsedFilenames))
	//http.Handle("/UsageFileCnt", http.HandlerFunc(UsageFileCnt))
	//http.Handle("/rtnJson", http.HandlerFunc(rtnJson))
	//http.Handle("/rtnLineJson", http.HandlerFunc(rtnLineJson))
	http.Handle("/testData", http.HandlerFunc(testData))
	http.Handle("/mongoData", http.HandlerFunc(mongoData))
	/*http.Handle("/css/", http.FileServer(http.Dir("css")))
	http.Handle("/js/", http.FileServer(http.Dir("js")))*/
	http.Handle("/", http.FileServer(http.Dir("js/")))
	http.ListenAndServe(":8080", nil)
}
func ServeMainPage(res http.ResponseWriter, req *http.Request) {
	err := req.ParseForm()
	if err != nil {
		fmt.Println(err)
	}

	tpl.ExecuteTemplate(res, "index.html", nil)
}
func ServeTailHealth(res http.ResponseWriter, req *http.Request) {
	err := req.ParseForm()
	if err != nil {
		fmt.Println(err)
	}

	tpl.ExecuteTemplate(res, "TailHealth.html", nil)
}
func ServeDeepDive(res http.ResponseWriter, req *http.Request) {
	err := req.ParseForm()
	if err != nil {
		fmt.Println(err)
	}
	/*http.SetCookie(res, &http.Cookie{
		Name:  "my-cookie",
		Value: "some value",
		Path:  "/",
	})*/
	tpl.ExecuteTemplate(res, "singleFlightAnalysis.html", nil)
}
func ServeDeepDiveFlytnet(res http.ResponseWriter, req *http.Request) {
	err := req.ParseForm()
	if err != nil {
		fmt.Println(err)
	}
	tpl.ExecuteTemplate(res, "singleFlightAnalysisFlytnet.html", nil)
}
func ServeDarkEntry(res http.ResponseWriter, req *http.Request) {
	err := req.ParseForm()
	if err != nil {
		fmt.Println(err)
	}
	tpl.ExecuteTemplate(res, "DarkEntry.html", nil)
}

func ServeUserAnalysis(res http.ResponseWriter, req *http.Request) {
	err := req.ParseForm()
	if err != nil {
		fmt.Println(err)
	}
	tpl.ExecuteTemplate(res, "UserAnalysis.html", nil)
}
func FPMfastSESandUDPTrace(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "FPMfastSES"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	FlightId := ".*"
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			case "FlightId":
				FlightId = value
			}
		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := GetFPMfastSESandUDPTraceFromMongo(Airline, TailId, DateYYYYMMDD, FlightId, ms)
	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "FPMfastSESandUDPTrace with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + ".*" + "_" + ".*" + "_" + DateYYYYMMDD)
}

type FPMfastUdpTraceSummary struct {
	Departure         string
	Destination       string
	FlightID          string
	StartOf10K        string
	EndOf10K          string
	TimeAbove10K      string
	InternetStatus10k float64
	IntranetStatus10k float64
	RxTotal           string
	TxTotal           string
	UserCnt           int
	RebootsInAir      int
	Above10k          bool
	AvgEsno           float64
	TermState000      float64
	TermStateNot000   float64
	Connected         float64
	Disconnected      float64
	Degraded          float64
}

func GetFPMfastSESandUDPTraceFromMongo(Airline string, TailId string, DateYYYYMMDD string, FlightId string, ms *MgSession) []FPMfastUdpTraceSummary {
	FPMfastSESdata := ms.FindRgxMatchInFPMfastSES(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
	ParserName := "UdpTraceSummary"
	ms = CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	UdpTraceSummarydata := ms.FindRgxMatchInUdpTraceSummary(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
	FPMfastSESandUDPTrace := []FPMfastUdpTraceSummary{}
	ParserName = "UsageSummary"
	ms = CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))

	for _, fpmfastses := range FPMfastSESdata {
		if fpmfastses.Above10k {
			searcher := Airline + "_" + TailId + "_" + GetFlightIdAndDateFromFileName(fpmfastses.FileName)
			//Find matching UDPtrace log and get count of users from UsageSummary collections
			matchedUdptrace := false
			for _, UDPtracelog := range UdpTraceSummarydata {
				if strings.Contains(UDPtracelog.FileName, searcher) {
					matchedUdptrace = true
					currentFlight := FPMfastUdpTraceSummary{
						Departure:         fpmfastses.Departure,
						Destination:       fpmfastses.Destination,
						FlightID:          fpmfastses.FlightID,
						StartOf10K:        fpmfastses.StartOf10K,
						EndOf10K:          fpmfastses.EndOf10K,
						TimeAbove10K:      fpmfastses.TimeAbove10K,
						InternetStatus10k: fpmfastses.InternetStatus10k,
						IntranetStatus10k: fpmfastses.IntranetStatus10k,
						RxTotal:           fpmfastses.RxTotal,
						TxTotal:           fpmfastses.TxTotal,
						UserCnt:           ms.FindRgxMatchInCollectionAndReturnCntOfDocs(searcher),
						RebootsInAir:      fpmfastses.RebootsInAir,
						Above10k:          fpmfastses.Above10k,
						AvgEsno:           UDPtracelog.AvgEsno,
						TermState000:      UDPtracelog.TermState000,
						TermStateNot000:   UDPtracelog.TermStateNot000,
						Connected:         UDPtracelog.Connected,
						Disconnected:      UDPtracelog.Disconnected,
						Degraded:          UDPtracelog.Degraded,
					}
					FPMfastSESandUDPTrace = append(FPMfastSESandUDPTrace, currentFlight)
				}
			}
			if !matchedUdptrace {
				currentFlight := FPMfastUdpTraceSummary{
					Departure:         fpmfastses.Departure,
					Destination:       fpmfastses.Destination,
					FlightID:          fpmfastses.FlightID,
					StartOf10K:        fpmfastses.StartOf10K,
					EndOf10K:          fpmfastses.EndOf10K,
					TimeAbove10K:      fpmfastses.TimeAbove10K,
					InternetStatus10k: fpmfastses.InternetStatus10k,
					IntranetStatus10k: fpmfastses.IntranetStatus10k,
					RxTotal:           fpmfastses.RxTotal,
					TxTotal:           fpmfastses.TxTotal,
					UserCnt:           ms.FindRgxMatchInCollectionAndReturnCntOfDocs(searcher),
					RebootsInAir:      fpmfastses.RebootsInAir,
					Above10k:          fpmfastses.Above10k,
					AvgEsno:           0,
					TermState000:      0,
					TermStateNot000:   0,
					Connected:         0,
					Disconnected:      0,
					Degraded:          0,
				}
				FPMfastSESandUDPTrace = append(FPMfastSESandUDPTrace, currentFlight)
			}
		}
	}
	return FPMfastSESandUDPTrace
}
func GetLogOffload(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "LogOffload"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}

	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	//OffloadedFiles := []string{}
	data := ms.FindRgxMatchInLogOffload(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)
	ParserName = "FPMfastSES"
	ms = CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	FPMfastSESdata := ms.FindRgxMatchInFPMfastSES(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)

	type offloadCountPerFile struct {
		TakeOff       string
		Landing       string
		Departure     string
		Destination   string
		FlightID      string
		Above10k      bool
		UsageOffloads int
		AllOffloads   int
	}
	offloadCountPerFiles := []offloadCountPerFile{}
	countPerFile := make(map[string]int)
	for _, lo := range data {
		currentCnt := 0
		usageOffloads := 0
		for _, loe := range lo.LogOffload {
			if loe.Status == "Uploaded" {
				currentCnt++
				if strings.Contains(loe.Name, "USAGE") {
					usageOffloads++
				}
				//			OffloadedFiles = append(OffloadedFiles, loe.Name)
			}
		}
		searcher := Airline + "_" + TailId + "_" + GetFlightIdAndDateFromFileName(lo.FileName)
		for _, fpmfastses := range FPMfastSESdata {
			if strings.Contains(fpmfastses.FileName, searcher) {
				offloadCountPerFiles = append(offloadCountPerFiles, offloadCountPerFile{
					TakeOff:       fpmfastses.TakeOff,
					Landing:       fpmfastses.Landing,
					Departure:     fpmfastses.Departure,
					Destination:   fpmfastses.Destination,
					FlightID:      fpmfastses.FlightID,
					Above10k:      fpmfastses.Above10k,
					UsageOffloads: usageOffloads,
					AllOffloads:   currentCnt})
			}
		}

		countPerFile[lo.FileName] = currentCnt
	}
	enc := json.NewEncoder(res)
	enc.Encode(offloadCountPerFiles)

	fmt.Println(req.Method, "LogOffload with Airline:", Airline, "TailId", TailId)
	fmt.Println(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)
}

type UserSessionData struct {
	UserId                      string
	CreationTime                time.Time
	LogUserPurchaseCommandTime  time.Time
	LogUserPurchaseCommandCount int
	RequestInternetServiceTime  time.Time
	RequestInternetServiceCount int
	RequestInternetServiceName  string
	StartAaaAccountingTime      time.Time
	StartAaaAccountingCount     int
	VolumeLimitMonitorTime      time.Time
	VolumeLimitMonitorCount     int
	Price                       float64
	Product                     string
	Description                 string
	OrderId                     string
	StateResult                 string
	PlanID                      string
	DeviceId                    string
	//WanIP                       string
}

func (usd *UserSessionData) updateUserSessionDataWithLogUserPurchaseCommand(lupc LogUserPurchaseCommand) {
	if usd.RequestInternetServiceTime.IsZero() {
		usd.LogUserPurchaseCommandTime = lupc.Time
		usd.Description = lupc.Description
		usd.Price = lupc.Price
		usd.Product = lupc.Product
		usd.OrderId = lupc.OrderId
		usd.StateResult = lupc.StateResult
		usd.PlanID = lupc.PlanID
		usd.DeviceId = lupc.DeviceId
		usd.LogUserPurchaseCommandCount = 1
	} else {
		usd.LogUserPurchaseCommandCount++
	}
}
func (usd *UserSessionData) updateUserSessionDataWithRequestInternetService(ris RequestInternetService) {
	if usd.RequestInternetServiceTime.IsZero() {
		usd.RequestInternetServiceTime = ris.Time
		usd.RequestInternetServiceName = ris.ServiceName
		usd.RequestInternetServiceCount = 1
	} else {
		usd.RequestInternetServiceCount++
	}
}
func (usd *UserSessionData) updateUserSessionDataWithVolumeLimitMonitor(vlm VolumeLimitMonitor) {
	if usd.VolumeLimitMonitorTime.IsZero() {
		usd.VolumeLimitMonitorTime = vlm.Time
		usd.VolumeLimitMonitorCount = 1
	} else {
		usd.VolumeLimitMonitorCount++
	}
}
func (usd *UserSessionData) updateUserSessionDataWithStartAaaAccounting(saa StartAaaAccounting) {
	if usd.StartAaaAccountingTime.IsZero() {
		usd.StartAaaAccountingTime = saa.Time
		usd.StartAaaAccountingCount = 1
	} else {
		usd.StartAaaAccountingCount++
	}
}

//Work on this later
//This is it.
//Ensure that outside requests are limited
//There is an assumption that the arrays of EnglogEventsResults are in cron order
/*type EnglogEventsResults struct {
	FileName               string
	FlightPhases           []EnglogEvent
	Reboots                []EnglogEvent
	EnglogPoints           []EnglogPoint
	FkalMgrUpdateInternet  []FkalMgrUpdateInternet
	UserReg                []UserReg
	LogUserPurchaseCommand []LogUserPurchaseCommand
	RequestInternetService []RequestInternetService
	StartAaaAccounting     []StartAaaAccounting
	VolumeLimitMonitor     []VolumeLimitMonitor
	FingerPrintResults     map[string][]FingerPrint
}*/
func UserSessionsEng(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "EnglogEvents"
	Airline := ""
	TailId := ""
	FlightId := ""
	DateYYYYMMDD := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "FlightId":
				FlightId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.FindRgxMatchInEnglogEvents(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
	regUsers := make(map[string]int)
	//lupcUniqUsers := make(map[string]int)
	//risUserCnt := make(map[string]int)

	UserSessionDatas := []UserSessionData{}
	for _, ev := range data {
		//count user reg for each user and create then aappend UserSessionData struct
		for _, UserReg := range ev.UserReg {
			if urCount, ok := regUsers[UserReg.UserId]; ok {
				regUsers[UserReg.UserId] = urCount + 1
			} else {
				regUsers[UserReg.UserId] = 1
				usd := UserSessionData{}
				usd.UserId = UserReg.UserId
				usd.CreationTime = UserReg.CommandTime
				//LogUserPurchaseCommand
				for _, lupc := range ev.LogUserPurchaseCommand {
					if usd.UserId == lupc.UserId {
						usd.updateUserSessionDataWithLogUserPurchaseCommand(lupc)
					}
				}
				//RequestInternetService
				for _, ris := range ev.RequestInternetService {
					if usd.UserId == ris.UserId {
						usd.updateUserSessionDataWithRequestInternetService(ris)
					}
				}
				//StartAaaAccounting
				for _, saa := range ev.StartAaaAccounting {
					if usd.UserId == saa.UserId {
						usd.updateUserSessionDataWithStartAaaAccounting(saa)
					}
				}
				//VolumeLimitMonitor
				for _, vlm := range ev.VolumeLimitMonitor {
					if usd.UserId == vlm.UserId {
						usd.updateUserSessionDataWithVolumeLimitMonitor(vlm)
					}
				}
				//fmt.Println(UserReg.CreationTime, UserReg.UserId, ev.FileName)
				/*prod := ""
				if usd.Product == "" {
					prod = "NO LogPurchase"
				} else {
					prod = usd.Product
				}
				risService := ""
				if usd.RequestInternetServiceName == "" {
					risService = "NO risService"
				} else {
					risService = usd.RequestInternetServiceName
				}
				fmt.Println(usd.CreationTime, usd.UserId, usd.LogUserPurchaseCommandTime,
					usd.RequestInternetServiceTime, prod, risService)*/
				if usd.RequestInternetServiceName != "" || usd.Product != "" {
					fmt.Println(usd.CreationTime, usd.UserId, usd.StartAaaAccountingTime,
						usd.RequestInternetServiceTime, usd.LogUserPurchaseCommandTime,
						usd.Product, usd.RequestInternetServiceName)
				}
				UserSessionDatas = append(UserSessionDatas, usd)
			}
		}

		//LogUserPurchaseCommand
		/*for _, lupc := range ev.LogUserPurchaseCommand {
			//fmt.Println(lupc.Time, lupc.UserId, lupc)
			if lupcCount, ok := lupcUniqUsers[lupc.UserId]; ok {
				lupcUniqUsers[lupc.UserId] = lupcCount + 1
			} else {
				lupcUniqUsers[lupc.UserId] = 1
				for _, usd := range UserSessionDatas {
					if usd.UserId == lupc.UserId {
						//Need way to update
						usd.updateUserSessionDataWithLogUserPurchaseCommand(lupc)
					}
				}
			}
		}

		for _, ris := range ev.RequestInternetService {
			fmt.Println(ris.Time, ris.UserId, ris.ServiceName)
			if risCount, ok := risUserCnt[ris.UserId]; ok {
				risUserCnt[ris.UserId] = risCount + 1
			} else {
				risUserCnt[ris.UserId] = 1
			}
		}
		for userId, cnt := range lupcUniqUsers {
			fmt.Println(userId, cnt, risUserCnt[userId])
		}

		for _, ris := range ev.RequestInternetService {
			fmt.Println(ris.Time, ris.UserId, ris.ServiceName)
		}
		fmt.Println(ev.FileName)*/
	}
	/*for _, usd := range UserSessionDatas {
		if usd.LogUserPurchaseCommandCount > 0 {
			fmt.Println(usd.CreationTime, usd.UserId, usd.LogUserPurchaseCommandTime, usd.RequestInternetServiceTime, usd.Product)
		}
	}*/

	enc := json.NewEncoder(res)
	enc.Encode(UserSessionDatas)
	fmt.Println(req.Method, "UserSessionsEng with Airline:", Airline, "ParserName", ParserName, "Records found: ", len(data))
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}
func PortalPlatformData(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "CVM_ACCESS"
	Airline := ""
	TailId := ""
	FlightId := ""
	DateYYYYMMDD := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "FlightId":
				FlightId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetPortalPlatformData(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "GetPortalPlatformData with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}
func PortalPlatformHttpStatusResponses(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "CVM_ACCESS"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	FlightId := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "FlightId":
				FlightId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetPortalPlatformHttpStatusResponses(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "GetPortalPlatformHttpStatusResponses with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}
func PortalPlatformMethodPUTTimeAndData(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "CVM_ACCESS"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	FlightId := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "FlightId":
				FlightId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetPortalPlatformMethodPUTTimeAndData(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "GetPortalPlatformMethodPUTTimeAndData with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}
func PortalPlatformMethodDeleteTimeAndData(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "CVM_ACCESS"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	FlightId := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "FlightId":
				FlightId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetPortalPlatformMethodDeleteTimeAndData(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "GetPortalPlatformMethodDeleteTimeAndData with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}
func PortalPlatformMethodGETTimeAndData(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "CVM_ACCESS"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	FlightId := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "FlightId":
				FlightId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetPortalPlatformMethodGETTimeAndData(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "GetPortalPlatformMethodGETTimeAndData with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}
func PortalPlatformGetRequestsByLanIp(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "CVM_ACCESS"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	FlightId := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "FlightId":
				FlightId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetPortalPlatformGetRequestsByLanIp(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "GetPortalPlatformGetRequestsByLanIp with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}
func LogPurchaseCommandFromPPAccess(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "CVM_ACCESS"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	FlightId := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "FlightId":
				FlightId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetLogPurchaseCommandFromPPAccess(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "GetLogPurchaseCommandFromPPAccess with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}
func LogPurchaseCommandFromEnglog(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "EnglogEvents"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	FlightId := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "FlightId":
				FlightId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetLogPurchaseCommandFromEnglog(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "GetLogPurchaseCommandFromEnglog with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}

func MonitSummarizer(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "MonitSummary"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetProcessRestarts(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "MonitSummarizer with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)
}
func SWVersions(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "SWVersionsSES"
	Airline := ""
	DateYYYYMMDD := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	if Airline != "SPIRIT" {
		ParserName = "SWVersions"
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()

	if Airline != "SPIRIT" {
		data := GetSWVersionsFromMongo(Airline, DateYYYYMMDD, ms)
		enc := json.NewEncoder(res)
		enc.Encode(data)
	} else {
		data := GetSWVersionsSESFromMongo(Airline, DateYYYYMMDD, ms)
		enc := json.NewEncoder(res)
		enc.Encode(data)

	}

	fmt.Println(req.Method, "SWVersions with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + ".*" + "_" + ".*" + "_" + DateYYYYMMDD)
}
func GetSWVersionsFromMongo(Airline string, Date string, ms *MgSession) []SoftwareVersionLegacyResults {
	data := ms.FindRgxMatchInSoftwareVersions(Airline + "_" + ".*" + "_" + ".*" + "_" + Date)
	versionMap := make(map[string]SoftwareVersionLegacyResults)
	for _, swVerions := range data {
		TakeOff, _ := time.Parse("2006-01-02T15:04:05Z", swVerions.TakeOff)
		if sw, ok := versionMap[swVerions.TailId]; ok {
			highestDateSofar, _ := time.Parse("2006-01-02T15:04:05Z", sw.TakeOff)
			if TakeOff.After(highestDateSofar) {
				versionMap[sw.TailId] = swVerions
			}
		} else {
			versionMap[swVerions.TailId] = swVerions
		}
	}
	var versions []SoftwareVersionLegacyResults
	for _, version := range versionMap {
		versions = append(versions, version)
	}
	return versions
}
func GetSWVersionsSESFromMongo(Airline string, Date string, ms *MgSession) []SoftwareVersionSesResults {
	data := ms.FindRgxMatchInSoftwareVersionsSES(Airline + "_" + ".*" + "_" + ".*" + "_" + Date)
	versionMap := make(map[string]SoftwareVersionSesResults)
	for _, swVerions := range data {
		TakeOff, _ := time.Parse("2006-01-02T15:04:05Z", swVerions.TakeOff)
		if sw, ok := versionMap[swVerions.TailId]; ok {
			highestDateSofar, _ := time.Parse("2006-01-02T15:04:05Z", sw.TakeOff)
			if TakeOff.After(highestDateSofar) {
				versionMap[sw.TailId] = swVerions
			}

		} else {
			versionMap[swVerions.TailId] = swVerions
		}
	}
	var versions []SoftwareVersionSesResults
	for _, version := range versionMap {
		versions = append(versions, version)
	}
	return versions

}
func UserCntPerFlightOnDateRgx(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "FPMfastSES"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	//defer ms.DisconnectFromMongo()
	data := ms.FindRgxMatchInFPMfastSES(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)
	ParserName = "UsageSummary"
	ms = CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	UserCntPerFlights := []UserCntPerFlight{}
	for _, fpmfastses := range data {
		if fpmfastses.Above10k {
			searcher := Airline + "_" + TailId + "_" + GetFlightIdAndDateFromFileName(fpmfastses.FileName)
			//fmt.Println("Getting UserCntPerFlights with", searcher)
			UserCnt := ms.FindRgxMatchInCollectionAndReturnCntOfDocs(searcher)
			currentFlight := UserCntPerFlight{
				TakeOff:      fpmfastses.TakeOff,
				FlightId:     fpmfastses.FlightID,
				FlightIdUniq: GetFlightIdAndDateFromFileName(fpmfastses.FileName),
				UserCnt:      UserCnt,
			}
			UserCntPerFlights = append(UserCntPerFlights, currentFlight)
		}
	}

	enc := json.NewEncoder(res)
	enc.Encode(UserCntPerFlights)

	fmt.Println(req.Method, "Getting UserCntPerFlights")
	fmt.Println(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)
}

type UserCntPerFlight struct {
	TakeOff      string
	FlightId     string
	FlightIdUniq string
	UserCnt      int
}
type DarkAc struct {
	Tail              string
	Type              string
	Opened            string
	Closed            string
	Days              string
	Squawk            string
	Mx_Action         string
	Description       string
	REF               string
	Main              string
	LRU               string
	Root_Cause        string
	ODC_Root          string
	Engineering_Notes string
}

func DarkAircraft(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "DarkSheet"
	Airline := ""
	//FlightId := ""
	TailId := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			}

		}
	}

	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	choppedTail := ""
	//Need to translate from LTV tail to real tailNumber
	if len(TailId) > 3 {
		if Airline == "JETBLUE" {
			choppedTail = TailId[1:4]
		} else if Airline == "UNITED" {
			choppedTail = TailId[len(TailId)-3:]
		}

	}
	data := ms.FindRgxMatchInDarkCollection("tail", choppedTail)
	fmt.Println(req.Method, "Getting DarkAircraft from", ParserName)
	fmt.Println(Airline + "_" + ".*" + "_" + choppedTail)

	enc := json.NewEncoder(res)
	enc.Encode(data)
}
func ParsedFilenames(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "FPMfastSES"
	Airline := ""
	//FlightId := ""
	TailId := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			}

		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetParsedFilenames(Airline + "_" + TailId)
	for _, filename := range data {
		fmt.Println(filename)
	}
	//UserIds := []string{}
}
func TailIDs(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "FPMfastSES"
	Airline := ""
	DateYYYYMMDD := ""
	//ConType := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	if Airline != "SPIRIT" {
		ParserName = "FPMfast"
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	TailIds := ms.FindDistinctStringsFromRgxOnFilename(Airline+"_"+".*"+"_"+".*"+"_"+DateYYYYMMDD, "tailid")

	enc := json.NewEncoder(res)
	sort.Strings(TailIds)
	enc.Encode(TailIds)

	fmt.Println(req.Method, "Getting TailIds from", ParserName)
	fmt.Println(Airline + "_" + ".*" + "_" + ".*" + "_" + DateYYYYMMDD)
}
func UserIDs(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "UsageSummary"
	Airline := ""
	FlightId := ""
	TailId := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "FlightId":
				FlightId = value
			case "TailId":
				TailId = value
			}

		}
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.FindRgxMatchInUsageSummary(Airline + "_" + TailId + "_" + FlightId)
	UserIds := []string{}
	for _, usagesummary := range data {
		UserIds = append(UserIds, usagesummary.UserId)
	}
	enc := json.NewEncoder(res)
	sort.Strings(UserIds)
	enc.Encode(UserIds)

	fmt.Println(req.Method, "Getting UserIds", FlightId)
	fmt.Println(Airline + "_" + TailId + "_" + FlightId)
}
func FlightIDs(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "FPMfastSES"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	if Airline != "SPIRIT" {
		ParserName = "FPMfast"
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.FindRgxMatchInFPMfastSES(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)
	fligthIds := []string{}
	for _, fpmfastses := range data {
		if fpmfastses.Above10k {
			fligthIds = append(fligthIds, GetFlightIdAndDateFromFileName(fpmfastses.FileName))
		}
	}
	enc := json.NewEncoder(res)
	enc.Encode(fligthIds)

	fmt.Println(req.Method, "Getting FlightIDs", ParserName)
	fmt.Println(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)
}

//KA_SPIRIT_N659NK_NKS372_20210213071518Z_OFFLOAD_CVM_UDPTRACEDATALOG.LOG.ZIP
func GetFlightIdAndDateFromFileName(FileName string) string {
	FilenameParts := strings.Split(FileName, "_")
	if len(FilenameParts) > 5 {
		FlightId := FilenameParts[3]
		Date := strings.TrimSuffix(FilenameParts[4], "Z")
		return FlightId + "_" + Date + "Z"
	}
	return FileName
}
func FleetHealthAirlineAgg(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "FPMfastSES"
	Airline := ""
	DateYYYYMMDD := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	if Airline != "SPIRIT" {
		ParserName = "FPMfast"
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	//Get the distinct tails for that query
	tails := ms.FindDistinctStringsFromRgxOnFilename(Airline+"_"+".*"+"_"+".*"+"_"+DateYYYYMMDD, "tailid")

	var results []interface{}
	for _, tail := range tails {
		// ms.ConnectToCollection(ParserName)
		data := ms.GetFleetHealthAirlineAgg(Airline + "_" + tail + "_" + ".*" + "_" + DateYYYYMMDD)
		// ms.ConnectToCollection("UsageSummary")
		// userCnt := ms.FindRgxMatchInCollectionAndReturnCntOfDocs(Airline + "_" + tail + "_" + ".*" + "_" + DateYYYYMMDD)
		// userCntMap := make(map[string]int)
		// userCntMap["TotalUsers"] = userCnt
		// userCntWrapped := []interface{}{userCntMap}
		// data = append(userCntWrapped, data...)
		// enc := json.NewEncoder(res)
		// enc.Encode(data)
		for _, tailData := range data {
			if tailData != "null" {
				results = append(results, tailData)
			}
		}

	}
	//data := ms.GetFleetHealthAirlineAgg(Airline + "_" + ".*" + "_" + ".*" + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(results)

	fmt.Println(req.Method, "FleetHealthAirlineAgg with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + ".*" + "_" + ".*" + "_" + DateYYYYMMDD)
}
func FleetHealthAirline(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "FPMfastSES"
	Airline := ""
	DateYYYYMMDD := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	if Airline != "SPIRIT" {
		ParserName = "FPMfast"
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := GetFPMfastSESFromMongo(Airline, DateYYYYMMDD, ms)
	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "FPMfastSES with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + ".*" + "_" + ".*" + "_" + DateYYYYMMDD)
}

type InterScores struct {
	TailId            string
	Internetstatus10k float64
	Intranetstatus10k float64
	Flights           int
	RebootsInAir      int
	Users             int
}

func (I *InterScores) UpdateScores(Internetstatus10k float64, Intranetstatus10k float64, RebootsInAir int) {
	I.Internetstatus10k += Internetstatus10k
	I.Intranetstatus10k += Intranetstatus10k
	I.Flights++
	I.RebootsInAir += RebootsInAir
}
func (I *InterScores) CalculateScores() {
	I.Internetstatus10k = math.Round(I.Internetstatus10k/float64(I.Flights)*100) / 100
	I.Intranetstatus10k = math.Round(I.Intranetstatus10k/float64(I.Flights)*100) / 100
}

func GetFPMfastSESFromMongo(Airline string, Date string, ms *MgSession) []InterScores {
	data := ms.FindRgxMatchInFPMfastSES(Airline + "_" + ".*" + "_" + ".*" + "_" + Date)
	ms.ConnectToCollection("UsageSummary")
	scoreMap := make(map[string]InterScores)
	for _, score := range data {
		if score.Above10k {
			if interScore, ok := scoreMap[score.TailId]; ok {
				interScore.UpdateScores(score.InternetStatus10k, score.IntranetStatus10k, score.RebootsInAir)
				scoreMap[score.TailId] = interScore
			} else {

				UserCnt := ms.FindRgxMatchInCollectionAndReturnCntOfDocs(Airline + "_" + score.TailId + "_" + ".*" + "_" + Date)
				firstScore := InterScores{
					TailId:            score.TailId,
					Internetstatus10k: score.InternetStatus10k,
					Intranetstatus10k: score.IntranetStatus10k,
					Flights:           1,
					Users:             UserCnt,
				}
				scoreMap[score.TailId] = firstScore
			}
		}
	}
	var scores []InterScores
	for _, value := range scoreMap {
		value.CalculateScores()
		//scoreMap[key] = value
		scores = append(scores, value)
	}
	return scores
}
func GetUserSummaryCountForCurrentRgx(rgx string) {

}
func mongoData(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := ""
	Airline := ""
	FlightId := "*"
	TailId := ""
	DateYYYYMMDD := ""
	for key, values := range req.Form {
		for _, value := range values { // range over []string
			fmt.Println(key, value)
			switch key {
			case "Airline":
				Airline = value
			case "TailId":
				TailId = value
			case "Parser":
				ParserName = value
			case "FlightId":
				FlightId = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	//fmt.Println("Airline:", Airline, "ParserName", ParserName)
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	//data := ms.FindStuffInCollection("KA_SPIRIT_N659NK_NKS404_20210211122917Z_ENG_CVM_ENGLOG.CSV.ZIP")
	//data := FingerPrintResults{}
	data := ms.FindRgxMatchInCollection(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
	enc := json.NewEncoder(res)
	enc.Encode(data)
	fmt.Println(req.Method, "mongoData with Airline:", Airline, "ParserName", ParserName, "Records found: ", len(data))
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}

func testData(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	enc := json.NewEncoder(res)
	data, err := ReadCsv("testData.csv")
	if err != nil {
		fmt.Println(req.Method, "testData", "poopie", err)
	} else {
		enc.Encode(ConvertSliceOfStringSlicesToSliceOfFloatSlices(data))
		fmt.Println(req.Method, "testData")
	}

}
func ReadCsv(filename string) ([][]string, error) {

	// Open CSV file
	f, err := os.Open(filename)
	if err != nil {
		return [][]string{}, err
	}
	defer f.Close()

	// Read File into a Variable
	lines, err := csv.NewReader(f).ReadAll()
	if err != nil {
		return [][]string{}, err
	}

	return lines, nil
}

//need to removed entire slice if one of the elements fails the conversion to float
func ConvertSliceOfStringSlicesToSliceOfFloatSlices(csvRows [][]string) [][]float64 {
	//var sliceOfFloat64Slices [][]float64
	sliceOfFloat64Slices := make([][]float64, len(csvRows))
	for idx, arr := range csvRows {
		sliceOfFloat64Slices[idx] = make([]float64, len(arr))
		for j := 0; j < len(arr); j++ {
			f, err := strconv.ParseFloat(csvRows[idx][j], 64)
			if err != nil {
				fmt.Println(err)
			} else {
				sliceOfFloat64Slices[idx][j] = f
			}
		}
	}
	return sliceOfFloat64Slices
}
