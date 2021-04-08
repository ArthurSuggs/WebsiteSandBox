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
	"strconv"
	"strings"
	"time"
)

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseGlob("*.html"))
}

func main() {
	http.Handle("/home", http.HandlerFunc(ServeMainPage))
	http.Handle("/TailHealth", http.HandlerFunc(ServeTailHealth))
	http.Handle("/singleFlightAnalysis", http.HandlerFunc(ServeDeepDive))

	http.Handle("/FlightIDs", http.HandlerFunc(FlightIDs))
	http.Handle("/FleetHealth", http.HandlerFunc(FleetHealthAirline))
	http.Handle("/SWVersionsSES", http.HandlerFunc(SWVersionsSES))
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

	tpl.ExecuteTemplate(res, "singleFlightAnalysis.html", nil)
}
func SWVersionsSES(res http.ResponseWriter, req *http.Request) {
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
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := GetSWVersionsSESFromMongo(Airline, DateYYYYMMDD, ms)
	enc := json.NewEncoder(res)
	enc.Encode(data)

	fmt.Println(req.Method, "SWVersionsSES with Airline:", Airline, "ParserName", ParserName)
	fmt.Println(Airline + "_" + ".*" + "_" + ".*" + "_" + DateYYYYMMDD)
}
func GetSWVersionsSESFromMongo(Airline string, Date string, ms *MgSession) []SoftwareVersionSesResults {
	data := ms.FindRgxMatchInSoftwareVersionsSES(Airline + "_" + ".*" + "_" + ".*" + "_" + Date)
	versionMap := make(map[string]SoftwareVersionSesResults)
	for _, swVerions := range data {

		TakeOff, _ := time.Parse("2006-01-02T15:04:05Z", swVerions.TakeOff)
		if sw, ok := versionMap[swVerions.TailId]; ok {
			highestDateSofar, _ := time.Parse("2006-01-02T15:04:05Z", sw.TakeOff)
			if TakeOff.After(highestDateSofar) {
				versionMap[sw.TailId] = sw
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

func FlightIDs(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "FPMfastSES"
	Airline := ""
	TailId := ""
	DateYYYYMMDD := ""
	ConType := ""
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
			case "ConType":
				ConType = value
			}
		}
	}
	if ConType == "Legacy" {
		ParserName = "FPMfast"
	}
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.FindRgxMatchInSoftwareVersionsSES(Airline + "_" + TailId + "_" + ".*" + "_" + DateYYYYMMDD)
	fligthIds := []string{}
	for _, fpmfastses := range data {
		fligthIds = append(fligthIds, GetFlightIdAndDateFromFileName(fpmfastses.FileName))
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
	scoreMap := make(map[string]InterScores)
	for _, score := range data {
		if score.Above10k {
			if interScore, ok := scoreMap[score.TailId]; ok {
				interScore.UpdateScores(score.InternetStatus10k, score.IntranetStatus10k, score.RebootsInAir)
				scoreMap[score.TailId] = interScore
			} else {
				firstScore := InterScores{
					TailId:            score.TailId,
					Internetstatus10k: score.InternetStatus10k,
					Intranetstatus10k: score.IntranetStatus10k,
					Flights:           1,
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
