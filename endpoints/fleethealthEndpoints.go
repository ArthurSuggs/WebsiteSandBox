package endpoints

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/ArthurSuggs/WebsiteSandBox/common"
)

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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := GetFPMfastSESFromMongo(Airline, DateYYYYMMDD, ms)
	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "FPMfastSES with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + ".*" + "_" + ".*" + "_" + DateYYYYMMDD)
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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
func GetSWVersionsFromMongo(Airline string, Date string, ms *common.MgSession) []common.SoftwareVersionLegacyResults {
	data := ms.FindRgxMatchInSoftwareVersions(Airline + "_" + ".*" + "_" + ".*" + "_" + Date)
	versionMap := make(map[string]common.SoftwareVersionLegacyResults)
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
	var versions []common.SoftwareVersionLegacyResults
	for _, version := range versionMap {
		versions = append(versions, version)
	}
	return versions
}
func GetSWVersionsSESFromMongo(Airline string, Date string, ms *common.MgSession) []common.SoftwareVersionSesResults {
	data := ms.FindRgxMatchInSoftwareVersionsSES(Airline + "_" + ".*" + "_" + ".*" + "_" + Date)
	versionMap := make(map[string]common.SoftwareVersionSesResults)
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
	var versions []common.SoftwareVersionSesResults
	for _, version := range versionMap {
		versions = append(versions, version)
	}
	return versions

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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := GetFPMfastSESandUDPTraceFromMongo(Airline, TailId, DateYYYYMMDD, FlightId, ms)
	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "FPMfastSESandUDPTrace with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + ".*" + "_" + ".*" + "_" + DateYYYYMMDD)
}
func GetFPMfastSESandUDPTraceFromMongo(Airline string, TailId string, DateYYYYMMDD string, FlightId string, ms *common.MgSession) []FPMfastUdpTraceSummary {
	FPMfastSESdata := ms.FindRgxMatchInFPMfastSES(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
	ParserName := "UdpTraceSummary"
	ms = common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	UdpTraceSummarydata := ms.FindRgxMatchInUdpTraceSummary(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
	FPMfastSESandUDPTrace := []FPMfastUdpTraceSummary{}
	ParserName = "UsageSummary"
	ms = common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))

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
func GetFPMfastSESFromMongo(Airline string, Date string, ms *common.MgSession) []InterScores {
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
