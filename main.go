package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"
	"os"
	"strconv"
)

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseFiles("index.html"))
}
func main() {
	http.Handle("/home", http.HandlerFunc(ServeMainPage))
	http.Handle("/rtnJson", http.HandlerFunc(rtnJson))
	http.Handle("/rtnLineJson", http.HandlerFunc(rtnLineJson))
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

type dt struct {
	Topping string
	Slices  int
	Rows    map[string]int
}
type LineChartRow struct {
	Row1 int
	Row2 float64
	Row3 float64
	Row4 float64
}
type LineChartData struct {
	LineChartRows []LineChartRow
	//array of arrays
	/*data.addRows([
	  [1,  37.8, 80.8, 41.8],
	  [2,  30.9, 69.5, 32.4],
	  [3,  25.4,   57, 25.7],
	  [4,  11.7, 18.8, 10.5],
	  [5,  11.9, 17.6, 10.4],
	  [6,   8.8, 13.6,  7.7],
	  [7,   7.6, 12.3,  9.6],
	  [8,  12.3, 29.2, 10.6],
	  [9,  16.9, 42.9, 14.8],
	  [10, 12.8, 30.9, 11.6],
	  [11,  50.3,  7.9,  4.7],
	  [12,  60.6,  8.4,  5.2],
	  [13,  74.8,  6.3,  3.6],
	  [14,  84.2,  6.2,  3.4]
	]);*/
}

func rtnLineJson(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	lcd := LineChartData{
		LineChartRows: []LineChartRow{
			LineChartRow{1, 37.8, 80.8, 41.8},
			LineChartRow{2, 30.9, 69.5, 32.4},
			LineChartRow{3, 25.4, 57, 25.7},
			LineChartRow{4, 11.7, 18.8, 10.5},
			LineChartRow{5, 11.9, 17.6, 10.4},
			LineChartRow{6, 8.8, 13.6, 7.7},
			LineChartRow{7, 7.6, 12.3, 9.6},
			LineChartRow{8, 12.3, 29.2, 10.6},
			LineChartRow{9, 16.9, 42.9, 14.8},
			LineChartRow{10, 12.8, 30.9, 11.6},
			LineChartRow{11, 55.3, 7.9, 4.7},
			LineChartRow{12, 66.6, 8.4, 5.2},
			LineChartRow{13, 74.8, 6.3, 3.6},
			LineChartRow{14, 84.2, 6.2, 3.4},
		},
	}
	enc := json.NewEncoder(res)
	enc.Encode(lcd)
	fmt.Println(req.Method, "rtnLineJson")
}
func rtnJson(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	data := dt{
		Topping: "string",
		Slices:  6,
		Rows: map[string]int{
			"Mushrooms": 3,
			"Onions":    1,
			"Olives":    1,
			"Zucchini":  1,
			"Pepperoni": 2,
			"PineApple": 5,
			"Bacon":     7,
			"Anchoves":  4,
		},
	}
	enc := json.NewEncoder(res)
	enc.Encode(data)
	fmt.Println(req.Method, "rtnJson")
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
