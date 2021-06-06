package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"
	"os"
	"strconv"

	"github.com/ArthurSuggs/WebsiteSandBox/endpoints"
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

	http.Handle("/FlightIDs", http.HandlerFunc(endpoints.FlightIDs))
	http.Handle("/UserIDs", http.HandlerFunc(endpoints.UserIDs))
	http.Handle("/TailIDs", http.HandlerFunc(endpoints.TailIDs))

	//TailHealth
	http.Handle("/UserCntPerFlight", http.HandlerFunc(endpoints.UserCntPerFlightOnDateRgx))
	http.Handle("/LogOffload", http.HandlerFunc(endpoints.GetLogOffload))
	http.Handle("/DarkAircraft", http.HandlerFunc(endpoints.DarkAircraft))
	http.Handle("/Surveys", http.HandlerFunc(endpoints.Surveys))
	http.Handle("/SurveyClass", http.HandlerFunc(endpoints.SurveyClass))
	http.Handle("/EngNotesTailClass", http.HandlerFunc(endpoints.EngNotesTailClass))

	//Usesd by multiple pages
	http.Handle("/FPMfastSESandUDPTrace", http.HandlerFunc(endpoints.FPMfastSESandUDPTrace))
	http.Handle("/mongoData", http.HandlerFunc(endpoints.MongoData))
	http.Handle("/EngNotesSet", http.HandlerFunc(endpoints.EngNotesSet))
	http.Handle("/EngNotesGet", http.HandlerFunc(endpoints.EngNotesGet))
	http.Handle("/SurveysNotesSet", http.HandlerFunc(endpoints.SurveysNotesSet))

	//http.Handle("/FleetHealth", http.HandlerFunc(FleetHealthAirline))
	http.Handle("/FleetHealth", http.HandlerFunc(endpoints.FleetHealthAirlineAgg))
	http.Handle("/SWVersions", http.HandlerFunc(endpoints.SWVersions))

	http.Handle("/MonitSummary", http.HandlerFunc(endpoints.MonitSummarizer))
	//http.Handle("/UserSessionsEng", http.HandlerFunc(endpoints.UserSessionsEng))
	http.Handle("/LogPurchaseCommandFromPPAccess", http.HandlerFunc(endpoints.LogPurchaseCommandFromPPAccess))
	http.Handle("/LogPurchaseCommandFromEnglog", http.HandlerFunc(endpoints.LogPurchaseCommandFromEnglog))
	http.Handle("/PortalPlatformGetRequestsByLanIp", http.HandlerFunc(endpoints.PortalPlatformGetRequestsByLanIp))
	http.Handle("/PortalPlatformMethodDeleteTimeAndData", http.HandlerFunc(endpoints.PortalPlatformMethodDeleteTimeAndData))
	http.Handle("/PortalPlatformMethodPUTTimeAndData", http.HandlerFunc(endpoints.PortalPlatformMethodPUTTimeAndData))
	http.Handle("/PortalPlatformMethodGETTimeAndData", http.HandlerFunc(endpoints.PortalPlatformMethodGETTimeAndData))
	http.Handle("/PortalPlatformHttpStatusResponses", http.HandlerFunc(endpoints.PortalPlatformHttpStatusResponses))
	http.Handle("/PortalPlatformData", http.HandlerFunc(endpoints.PortalPlatformData))
	http.Handle("/DarkEntry", http.HandlerFunc(ServeDarkEntry))
	//http.Handle("/SWVersionsSES", http.HandlerFunc(SWVersionsSES))

	http.Handle("/ParsedFilenames", http.HandlerFunc(endpoints.ParsedFilenames))
	http.Handle("/testData", http.HandlerFunc(testData))

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

func GetUserSummaryCountForCurrentRgx(rgx string) {

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
