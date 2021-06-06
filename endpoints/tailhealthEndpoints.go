package endpoints

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/ArthurSuggs/WebsiteSandBox/common"
)

type UserCntPerFlight struct {
	TakeOff      string
	FlightId     string
	FlightIdUniq string
	UserCnt      int
}

// type DarkAc struct {
// 	Tail              string
// 	Type              string
// 	Opened            string
// 	Closed            string
// 	Days              string
// 	Squawk            string
// 	Mx_Action         string
// 	Description       string
// 	REF               string
// 	Main              string
// 	LRU               string
// 	Root_Cause        string
// 	ODC_Root          string
// 	Engineering_Notes string
// }

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

	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	//OffloadedFiles := []string{}
	data := ms.FindRgxMatchInLogOffload(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)
	ParserName = "FPMfastSES"
	ms = common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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
	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	//defer ms.DisconnectFromMongo()
	data := ms.FindRgxMatchInFPMfastSES(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)
	ParserName = "UsageSummary"
	ms = common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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

	ms := common.CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
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

func Surveys(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "Surveys"
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
	data := ms.FindRgxMatchInSurveyCollection("tail", choppedTail)
	fmt.Println(req.Method, "Getting Survey from", ParserName)
	fmt.Println(Airline + "_" + ".*" + "_" + choppedTail)

	enc := json.NewEncoder(res)
	enc.Encode(data)
}

func SurveyClass(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "Surveys"
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
	data := ms.GetSurveyClass(choppedTail)
	fmt.Println(req.Method, "GetSurveyClass from", choppedTail)
	fmt.Println(Airline + "_" + ".*" + "_" + choppedTail)

	enc := json.NewEncoder(res)
	enc.Encode(data)
}

func EngNotesTailClass(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "EngNotes"
	Airline := ""
	//FlightId := ""
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
	data := ms.GetEngNotesTailClass(choppedTail, DateYYYYMMDD)
	fmt.Println(req.Method, "EngNotesTailClass from", choppedTail)
	fmt.Println(Airline + "_" + ".*" + "_" + choppedTail +"_"+ DateYYYYMMDD)

	enc := json.NewEncoder(res)
	enc.Encode(data)
}
