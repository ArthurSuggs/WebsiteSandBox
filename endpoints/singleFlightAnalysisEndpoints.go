package endpoints

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/ArthurSuggs/WebsiteSandBox/common"
)

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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetProcessRestarts(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "MonitSummarizer with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetLogPurchaseCommandFromEnglog(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "GetLogPurchaseCommandFromEnglog with Airline:", Airline, "ParserName", ParserName)
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetLogPurchaseCommandFromPPAccess(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "GetLogPurchaseCommandFromPPAccess with Airline:", Airline, "ParserName", ParserName)
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.GetPortalPlatformGetRequestsByLanIp(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "GetPortalPlatformGetRequestsByLanIp with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}
func SurveysNotesSet(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "Surveys"
	Airline := ""
	FlightId := ""
	TailId := ""
	DataEntry := ""
	Classification := ""
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
			case "dataEntry":
				DataEntry = value
			case "Classification":
				Classification = value
			}

		}
	}
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	choppedTail := ""
	//Need to translate from LTV tail to real tailNumber
	if len(TailId) > 3 {
		if Airline == "JETBLUE" {
			choppedTail = TailId[1:4]
		} else if Airline == "UNITED" {
			choppedTail = TailId[len(TailId)-3:]
		} else if Airline == "SPIRIT" {
			choppedTail = TailId[1:4]
		}

	}

	//tail flight month day
	fltId_timeStamp := strings.Split(FlightId, "_")
	fmt.Println(fltId_timeStamp[0], fltId_timeStamp[1])
	flightIdTime, _ := time.Parse("20060102150405Z", fltId_timeStamp[1])
	month := flightIdTime.Format("Jan")
	day := flightIdTime.Format("2")
	cleanFlightId := ""
	enc := json.NewEncoder(res)
	fmt.Println(day, month)
	var RemoveLettersFromFlightId *regexp.Regexp = regexp.MustCompile("[A-Z]*([0-9]+)")
	if RemoveLettersFromFlightId.MatchString(fltId_timeStamp[0]) {
		matches := RemoveLettersFromFlightId.FindStringSubmatch(fltId_timeStamp[0])
		cleanFlightId = matches[1]
		if ms.SetSurveyClass(choppedTail, month, day, cleanFlightId, Classification, DataEntry) {
			fmt.Println(req.Method, "SurveysNotesSet Successful for", choppedTail, month, day, cleanFlightId)
			enc.Encode("Successful")
		} else {
			fmt.Println(req.Method, "SurveysNotesSet failed for", choppedTail, month, day, cleanFlightId)
			enc.Encode("Failed")
		}

	} else {
		fmt.Println(req.Method, "SurveysNotesSet failed for", choppedTail, month, day, cleanFlightId)
		enc.Encode("Failed")
	}

}
