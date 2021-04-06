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
)

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseGlob("*.html"))
}

func main() {
	http.Handle("/home", http.HandlerFunc(ServeMainPage))
	http.Handle("/FleetHealth", http.HandlerFunc(FleetHealthAirline))
	http.Handle("/deep", http.HandlerFunc(ServeDeepDive))
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

func ServeDeepDive(res http.ResponseWriter, req *http.Request) {
	err := req.ParseForm()
	if err != nil {
		fmt.Println(err)
	}

	tpl.ExecuteTemplate(res, "deep.html", nil)
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

	fmt.Println(req.Method, "mongoData with Airline:", Airline, "ParserName", ParserName)
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
