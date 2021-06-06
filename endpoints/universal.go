package endpoints

import (
	"encoding/json"
	"fmt"
	//"io/ioutil"
	"log"
	"net/http"
	"os"
	"sort"
	"strings"
	"time"

	"github.com/ArthurSuggs/WebsiteSandBox/common"
)

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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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
func MongoData(res http.ResponseWriter, req *http.Request) {
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	//data := ms.FindStuffInCollection("KA_SPIRIT_N659NK_NKS404_20210211122917Z_ENG_CVM_ENGLOG.CSV.ZIP")
	//data := FingerPrintResults{}
	data := ms.FindRgxMatchInCollection(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
	enc := json.NewEncoder(res)
	enc.Encode(data)
	fmt.Println(req.Method, "mongoData with Airline:", Airline, "ParserName", ParserName, "Records found: ", len(data))
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}
func EngNotesSet(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "EngNotes"
	Airline := ""
	FlightId := ""
	TailId := ""
	DataEntry := ""
	Classification := ""
	DateYYYYMMDD := ""
	for key, values := range req.Form {
		fmt.Println(key)
		for _, value := range values {
			fmt.Println(value)
			switch key {
			case "Airline":
				Airline = value
			case "FlightId":
				FlightId = value
			case "TailId":
				TailId = value
			case "dataEntry":
				DataEntry = value
			case "Classification":
				Classification = value
			case "DateYYYYMMDD":
				DateYYYYMMDD = value
			}
		}
	}
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.FindEngNotesForFlight(FlightId)
	newNote := true
	currentTime := time.Now()
	notes := common.EngNotes{
		TailId:         TailId,
		FlightId:       FlightId,
		DateYYYYMMDD:   DateYYYYMMDD,
		Classification: Classification,
		DataEntry:      DataEntry,
		EntryTime:      currentTime,
	}

	for _, note := range data {
		note.EntryTime = currentTime
		if notes == note {
			newNote = false
			break
		}
	}
	enc := json.NewEncoder(res)
	if newNote {
		ms.InsertToCollection(notes)
		enc.Encode("Entered notes successful")
		fmt.Println(req.Method, "Getting ", ParserName, FlightId, DataEntry, Classification)
		fmt.Println(Airline + "_" + TailId + "_" + FlightId)
	} else {
		enc.Encode("Entered notes unsuccessful.  Note already exists")
		fmt.Println(req.Method, ParserName, FlightId, DataEntry, Classification)
		fmt.Println(Airline + "_" + TailId + "_" + FlightId)
	}

}
func EngNotesGet(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "EngNotes"
	Airline := ""
	FlightId := ""
	TailId := ""
	DataEntry := ""
	Classification := ""
	for key, values := range req.Form {
		fmt.Println(key)
		for _, value := range values {
			fmt.Println(value)
			switch key {
			case "Airline":
				Airline = value
			case "FlightId":
				FlightId = value
			case "TailId":
				TailId = value
			case "dataEntry":
				DataEntry = value
			case "Classification":
				Classification = value
			}
		}
	}
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.FindEngNotesForFlight(FlightId)
	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "Getting ", ParserName, FlightId, DataEntry, Classification)
	fmt.Println(Airline + "_" + TailId + "_" + FlightId)

}
