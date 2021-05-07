google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['line']});
google.charts.load('current', {'packages':['table']});
google.charts.load('current', {'packages':['timeline']});
google.charts.load('current', {'packages':['scatter']});

function drawPieChartGeneric(parser,pieStruct,ElementId,QueryInfo,info) {
    var chart = new google.visualization.PieChart(document.getElementById(ElementId));
    var rows = new Array();
    //pieStruct
    /*var UdpTraceSummaryPieStruct = [
     ['number', 'connected',"Connected"],
     ['number', 'disconnected',"Disconnected"]]*/
     var header = new Array();
     for (var row of pieStruct) {
       header.push(row[2])
     }
    if(info){
      for (var key of info) {
        rows.push(AddRowsToTableBasedOnPieStructAndFlatJson(pieStruct, key))
      }
    }
    if (rows.length > 0) {
    var rowsClean = new Array();
    rowsClean.push(header)
    for(misformed of rows) {
      for(row of misformed) {
        rowsClean.push(row)
      }
    }
      var data = google.visualization.arrayToDataTable(rowsClean)
      QueryInfo.options.width = "900px";
      QueryInfo.options.height =  "500px";
      chart.draw(data, QueryInfo.options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
}
function drawColumnChartFromArrayOfFlatJSON(parser,genStruct,ElementId,QueryInfo,info) {
    var chartColumnChart = new google.visualization.ColumnChart(document.getElementById(ElementId));
    var data = new google.visualization.DataTable();
    var rows = new Array();
    for (index in genStruct) {
      data.addColumn(genStruct[index][0],genStruct[index][1])
    }
    if(info){
      for (var key of info) {
        //Hate to hard code this.
        //Maybe I can add it to a class which holds the gen sturct
        if (parser.includes("FPMfast")) {
          if (key['above10k'] && key['timeabove10k'] > 30) {
            //flightIds.add(key['flightid'])
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        } else if (parser === "UsageSummary") {
          if ((key['logpurchase'] > 1) || (key['autowanrxmb'] > 10)) {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        } else {
          rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
        }
      }
    }
    if (rows.length > 0) {
      rows.sort(sortFunction);
      data.addRows(rows);
      QueryInfo.options.height = rows.length*50,
      chartColumnChart.draw(data, QueryInfo.options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
}
function drawBarChartGeneric(parser,genStruct,ElementId,QueryInfo,info) {
    var chartBar = new google.visualization.BarChart(document.getElementById(ElementId));
    var data = new google.visualization.DataTable();
    var rows = new Array();
    for (index in genStruct) {
      data.addColumn(genStruct[index][0],genStruct[index][1])
    }
    if(info){
      for (var key of info) {
        //Hate to hard code this.
        //Maybe I can add it to a class which holds the gen sturct
        if (parser.includes("FPMfast")) {
          if (key['above10k'] && key['timeabove10k'] > 30) {
            //flightIds.add(key['flightid'])
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        } else if (parser === "UsageSummary") {
          if ((key['logpurchase'] > 1) || (key['autowanrxmb'] > 10)) {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        } else {
          rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
        }
      }
    }
    if (rows.length > 0) {
      rows.sort(sortFunction);
      data.addRows(rows);
      QueryInfo.options.height = rows.length*50,
      chartBar.draw(data, QueryInfo.options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
}
function drawComboChartFromArrayOfFlatJSON(parser,genStruct,ElementId,QueryInfo,info) {
    var ComboChart = new google.visualization.ComboChart(document.getElementById(ElementId));
    var data = new google.visualization.DataTable();
    var rows = new Array();
    for (index in genStruct) {
      data.addColumn(genStruct[index][0],genStruct[index][1])
    }
    if(info){
      for (var key of info) {
        //Hate to hard code this.
        //Maybe I can add it to a class which holds the gen sturct
        if (parser.includes("FPMfast")) {
          if (key['above10k'] && key['timeabove10k'] > 30) {
            //flightIds.add(key['flightid'])
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        } else if (parser === "UsageSummary") {
          if ((key['logpurchase'] > 1) || (key['autowanrxmb'] > 10)) {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        } else {
          rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
        }
      }
    }
    if (rows.length > 0) {
      rows.sort(sortFunction);
      data.addRows(rows);
      QueryInfo.options.height = rows.length*50,
      QueryInfo.options.series = CreateSeriesFromFlatGenStruct(genStruct)
      ComboChart.draw(data, QueryInfo.options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
}

//Histogram needs rows of [name, number]
function drawHistogramFromOnlyArrayOfNamesGeneric(parser,genStruct,ElementId,QueryInfo,info) {
    var Histogram = new google.visualization.Histogram(document.getElementById(ElementId));
    var data = new google.visualization.DataTable();
    var OneDeepJsonKey = ""
    for (var key of Object.keys(genStruct)) {
      OneDeepJsonKey = key
      for (var index in genStruct[key]) {
        data.addColumn(genStruct[key][index][0],genStruct[key][index][1])
      }
    }
    data.addColumn('number','Count')
    //hash of names to count
    var nameCount = new Map()
    if(info){
      for (var root of info) {
        //remove garbage from keys
        keys = keyRemover(Object.keys(root),OneDeepJsonKey)
        for (var key of keys) {
          for (var index in root[key]) {
            //this returns the name in an arroy one deep
            var nameArray = AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, root[key][index])
            var name = nameArray[0]
            if (!nameCount.has(name)){
              nameCount.set(name,1)
            } else {
              var count = nameCount.get(name)
              count +=1
              nameCount.set(name,count)
            }
          }
        }
      }
    }
    if (nameCount.size > 0) {
      var rows = new Array();
      //gotta create the array of arrays from the map
      for (let [key, value] of nameCount) {
        rows.push([key, value])
        //console.log(key + ' = ' + value)
      }
      data.addRows(rows);
      QueryInfo.options.height = '100%';
      QueryInfo.options.width = '100%';
      Histogram.draw(data, QueryInfo.options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
}
//Histogram needs rows of [name, number]
function drawHistogramGeneric(parser,genStruct,ElementId,QueryInfo,info) {
    var Histogram = new google.visualization.Histogram(document.getElementById(ElementId));
    var data = new google.visualization.DataTable();
    var rows = new Array();
    for (index in genStruct) {
      data.addColumn(genStruct[index][0],genStruct[index][1])
    }
    if(info){
      for (var key of info) {
        //Hate to hard code this.
        //Maybe I can add it to a class which holds the gen sturct
        if (parser.includes("FPMfast")) {
          if (key['above10k'] && key['timeabove10k'] > 30) {
            flightIds.add(key['flightid'])
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        } else if (parser === "UsageSummary") {
          //if ((key['logpurchase'] > 1) || (key['autowanrxmb'] > 10)) {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          //}
        } else {
          rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
        }
      }
    }
    if (rows.length > 0) {
      rows.sort(sortFunction);
      data.addRows(rows);
      QueryInfo.options.height = '100%';
      QueryInfo.options.width = '100%';
      Histogram.draw(data, QueryInfo.options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
}
function drawFingerPrintLineCharts(parser,genStruct,ElementId,QueryInfo,info){
  //var chart = new google.charts.Line(document.getElementById(ElementId));
  var dataBarChart = new google.visualization.DataTable();
  var rows = new Array();
  var barchart = new Array();
  var barchartcnt = new Array();
  var columnLength = 0
  var OneDeepJsonKey = ""
  //Populate columns
  dataBarChart.addColumn('string', 'ProcessName');
  dataBarChart.addColumn('number', 'Count')
  for (var key of Object.keys(genStruct)) {
    OneDeepJsonKey = key
  }
  if(info){
    for (var root of info) {
      //remove garbage from keys
      keys = keyRemover(Object.keys(root),OneDeepJsonKey)
      for (var key of keys) {
        for (var processName in root[key]) {
          //Here we have keys to arrays
          //Create new ElementId if needed
          var pn = document.getElementById(processName);
          if (!pn){
            addElement(ElementId, processName,'div')
          }
          //Populate the new element with the row data
          var chart = new google.charts.Line(document.getElementById(processName));
          var dataLineChart = new google.visualization.DataTable();
          //Add column
          dataLineChart.addColumn('datetime','windowtime')
          dataLineChart.addColumn('number',processName)
          //Populate rows from arrays
          //Now iterate over the array for the current process
          for (var arrayOfFingerPrints in root[key][processName]) {
            var row = AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, root[key][processName][arrayOfFingerPrints])
            if(row.length !== 0 && !row.includes("NaN")){
              rows.push(row)
            }
          }
          if (rows.length > 0) {
            columnLength++
            dataLineChart.addRows(rows);
            var cntTotal = 0
            for(var row of rows){
              cntTotal += row[1]
            }
            //var cntTotal = rows.reduce((accumulator, currentValue) => accumulator + currentValue)
            barchart.push([processName,cntTotal])
            QueryInfo.options.height = 350
            //QueryInfo.options.style = {colors:['red','#004411']}
            chart.draw(dataLineChart, google.charts.Line.convertOptions(QueryInfo.options));
          }
          //Clear out the array
          rows = new Array();
        }
      }
    }
  }
  //Draw the bar chart
  if(columnLength){
    dataBarChart.addRows(barchart);
    // Set chart options
    options = {'title':'ProcessCnt',
                //width: '100%',
                 showTextEvery:1,
                height: 50*columnLength//};
            };
    var chartBar = new google.visualization.BarChart(document.getElementById(ElementId));
    chartBar.draw(dataBarChart, options);
  } else {
    document.getElementById(ElementId).innerHTML = "";
    console.log("No data in")
  }
}
//Timelines need a row for every entry.
function drawAshwinsTimeline(parser,genStruct,ElementId,QueryInfo,info) {
  var container = document.getElementById(ElementId);
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();
  var timelineCnt = 0
  var rowLength  = 0
	var first = true;
	var OneDeepJsonKey = ""
    for (var key of Object.keys(genStruct)) {
  		OneDeepJsonKey = key
      dataTable.addColumn({ type: 'string', id: 'Position' })
      dataTable.addColumn({ type: 'string', id: 'Name' })
      dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
      for (var index in genStruct[key]) {
        timelineCnt++
        if(genStruct[key][index][0] === 'datetime'){
          dataTable.addColumn({ type: genStruct[key][index][0], id: 'Start' })
          dataTable.addColumn({ type: genStruct[key][index][0], id: 'End' })
        } else {
          //dataTable.addColumn({ type: genStruct[key][index][0], id: genStruct[key][index][1] })

        }
      }
    }
	//How to get the start and end times when only one time is given
	//Start is previous time and end is current time. (Except for the first sample)
	//The color will be based on previous state
    if(info){
      for (var root of info) {
		  //remove garbage from keys
      keys = keyRemover(Object.keys(root),OneDeepJsonKey)
		  for (var key of keys) {
        for (var index in root[key]) {
    			if (first){
    			  first = false;
    			} else {
    			  //create new function that takes in the current an previous entries
    			  var row = AddRowsToTableBasedOnGenericStructAndTwoOneDeepJson(genStruct, root[key][index], root[key][index-1])
    			  if(row.length !== 0 && !row.includes("NaN")){
      				for (var line of row){
                dataTable.addRows([line])
                rowLength++
              }
    			  }
    			}
          }
        }
      }
    }
	//Gotta Change the color of the line to red for 0 and green for gt 1
    if (rowLength>0){
        var options = {
            timeline: { colorByRowLabel: true },
            width: '100%',
            backgroundColor: '#ffd'
          };
          options.width = '100%';
          var weight = 50
          if(timelineCnt > 150){
            weight = 1.5
          } else if(timelineCnt > 100){
            weight = 4
          } else if(timelineCnt > 50){
            weight = 8
          } else if(timelineCnt > 25){
            weight = 16
          } else if(timelineCnt > 12){
            weight = 32
          }
          options.height = timelineCnt*weight
      chart.draw(dataTable, options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
}
function drawtimelineOneNameTwoTimes(parser,genStruct,ElementId,QueryInfo,info) {
    var container = document.getElementById(ElementId);
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    var rows = new Array();
    var timelineCnt = 0
    var rowLength  = 0
    var OneDeepJsonKey = ""
    if (!Array.isArray(genStruct)){
      for (var key of Object.keys(genStruct)) {
        OneDeepJsonKey = key
        timelineCnt++
          for (var index in genStruct[key]) {
            dataTable.addColumn(genStruct[key][index][0],genStruct[key][index][1])
          }
      }
    } else {
      for (index in genStruct) {
        dataTable.addColumn(genStruct[index][0],genStruct[index][1])
      }
    }

    if(info){
      if(OneDeepJsonKey !== ""){
      for (var root of info) {
          //remove garbage from keys
          keys = keyRemover(Object.keys(root),OneDeepJsonKey)
          for (var key of keys) {
            for (var index in root[key]) {
              var row = AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, root[key][index])
              if(row.length !== 0 && !row.includes("NaN")){
                rows.push(row)
                dataTable.addRows(rows)
                rowLength++
              }
              rows = new Array();
            }
          }
        }
      } else {
        for (var key of info) {
          rowLength++
          rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          dataTable.addRows(rows)
        }
      }
    }
    if (rowLength>0){
        var options = {
            timeline: { colorByRowLabel: true },
            width: '100%',
            backgroundColor: '#ffd'
          };
          options.width = '100%';
          //Gotta figure out a way to make the correct size
          var weight = 400

          options.height = weight
      chart.draw(dataTable, options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
}
function drawtimelineChartSES(parser,genStruct,ElementId,QueryInfo,info) {
    var container = document.getElementById(ElementId);
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    var rows = new Array();
    var timelineCnt = 0
    dataTable.addColumn({ type: 'string', id: 'TailId' });
    dataTable.addColumn({ type: 'string', id: 'FlightId' });
    dataTable.addColumn({ type: 'datetime', id: 'Start' });
    dataTable.addColumn({ type: 'datetime', id: 'End' });
    if(info){
      for (var key of info) {
        if (parser.includes("FPMfast")) {
          if (key['above10k'] && key['timeabove10k'] > 0) {
            var startDate = new Date(key['takeoff'])
            var endDate = new Date(key['landing'])
            if (startDate > endDate){
            } else{
              rows.push([key['tailid'],key['flightid'],startDate,endDate])
              dataTable.addRows(rows)
              timelineCnt++
            }
          rows = new Array();
        }
      }
    }
    if (timelineCnt>0){
        var options = {
            timeline: { colorByRowLabel: true },
            width: '100%', height: 25,
            backgroundColor: '#ffd'
          };
      //options.height = timelineCnt*25
      chart.draw(dataTable, options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
  }
}
function drawTableFromOneDeepJson(parser,genStruct,ElementId,QueryInfo,info) {
      var table = new google.visualization.Table(document.getElementById(ElementId));
      var data = new google.visualization.DataTable();
      var rows = new Array();
      var OneDeepJsonKey = ""
      //Populate columns
      for (var key of Object.keys(genStruct)) {
        OneDeepJsonKey = key
          for (var index in genStruct[key]) {
            data.addColumn(genStruct[key][index][0],genStruct[key][index][1])
          }
      }
      if(info){
        for (var root of info) {
          //remove garbage from keys
          keys = keyRemover(Object.keys(root),OneDeepJsonKey)
          for (var key of keys) {
            for (var index in root[key]) {
              var row = AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, root[key][index])

              if(row.length !== 0 && !row.includes("NaN")){
                rows.push(row)
              }
            }
          }
        }
      }
      if (rows.length > 0) {
        rows.sort(sortFunction);
        data.addRows(rows);
        table.draw(data, {width: '100%', height: '100%'});
      } else {
        document.getElementById(ElementId).innerHTML = "";
        console.log("No data in")
      }
}
function drawTableFromFlatJson(parser,genStruct,ElementId,QueryInfo,info) {
      var table = new google.visualization.Table(document.getElementById(ElementId));
      var data = new google.visualization.DataTable();
      var rows = new Array();
      var flightIds = new Set();
      var links = new Set();
      for (index in genStruct) {
        data.addColumn(genStruct[index][0],genStruct[index][1])
      }
      if(info){
        for (var key of info) {
          //Hate to hard code this.
          //Maybe I can add it to a class which holds the gen sturct
          //console.log(key)
          if (parser.includes("FPMfast")) {
            if (key['above10k'] && key['timeabove10k'] > 0) {
              rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
            }
          } else if (parser === "FleetHealth"){
              //links.add(key['TailId'])
              rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          } else {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        }
      }
      if (rows.length > 0) {
        rows.sort(sortFunction);
        data.addRows(rows);
        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
      } else {
        document.getElementById(ElementId).innerHTML = "";
        console.log("No data in")
      }
}
function drawBubbleChartFromArrayOfFlatJSON(parser,bubbleStruct,ElementId,QueryInfo,info) {
      var chart = new google.visualization.BubbleChart(document.getElementById(ElementId));
      var rows = new Array();
      var columnLength = 0
      //bubbleStruct
      /*var UserPaidBubbleChartStruct = [
        ['string', 'userid','Id'],
        ['datetime', 'registrationrec','Start'],
        ['number', 'paidwanrxmb','Paid Wan Rx MB'],
        ['number', 'logpurchase','Purchase count'],
        ['number', 'servicetput','Sample Size']
      ]*/
       var header = new Array();
       for (var row of bubbleStruct) {
         header.push(row[2])
         columnLength++
       }
      if(info){
        for (var key of info) {
          if (parser.includes("FPMfast")) {
            if (key['above10k'] && key['timeabove10k'] > 0) {
              rows.push(AddRowsToTableBasedOnBubbleStructAndFlatJson(bubbleStruct, key))
            }
          } else {
            rows.push(AddRowsToTableBasedOnBubbleStructAndFlatJson(bubbleStruct, key))
          }
        }
      }
      if (rows.length > 0) {
        var rowsClean = new Array();
        rowsClean.push(header)
        for(misformed of rows) {
          //for(row of misformed) {
            rowsClean.push(misformed)
        //  }
        }
        var data = google.visualization.arrayToDataTable(rowsClean)
      //  QueryInfo.options.width = "900px";
      //  QueryInfo.options.height =  "500px";
      QueryInfo.options.height = columnLength*120;
        chart.draw(data, QueryInfo.options);
      } else {
        document.getElementById(ElementId).innerHTML = "";
        console.log("No data in")
      }
}
function drawScatterChartFromArrayOfFlatJSON(parser,genStruct,ElementId,QueryInfo,info) {
      var chart = new google.charts.Scatter(document.getElementById(ElementId));
      var data = new google.visualization.DataTable();
      var rows = new Array();
      var flights = 0
      var columnLength = 0
      //var OneMegM = 1000000
      for (index in genStruct) {
        data.addColumn(genStruct[index][0],genStruct[index][1])
        columnLength++
      }
      if(info){
        for (var key of info) {
          if (parser.includes("FPMfast")) {
            if (key['above10k'] && key['timeabove10k'] > 0) {
              rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
            }
          } else {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        }
      }
      if (rows.length > 0) {
        rows.sort(sortFunction);
        data.addRows(rows);
        QueryInfo.options.height = columnLength*120;
        chart.draw(data, google.charts.Scatter.convertOptions(QueryInfo.options));
      } else {
        document.getElementById(ElementId).innerHTML = "";
        console.log("No data in")
      }
}
function drawScatterChartFromArrayInOneDeepJson(parser,genStruct,ElementId,QueryInfo,info) {
      var chart = new google.charts.Scatter(document.getElementById(ElementId));
      var data = new google.visualization.DataTable();
      var rows = new Array();
      var flights = 0
      var columnLength = 0
      var OneDeepJsonKey = ""
      //Populate columns
      for (var key of Object.keys(genStruct)) {
        OneDeepJsonKey = key
        for (var index in genStruct[key]) {
          columnLength++
          data.addColumn(genStruct[key][index][0],genStruct[key][index][1])
        }
      }
      if(info){
        for (var root of info) {
          //remove garbage from keys
          keys = keyRemover(Object.keys(root),OneDeepJsonKey)
          for (var key of keys) {
            for (var index in root[key]) {
              var row = AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, root[key][index])

              if(row.length !== 0 && !row.includes("NaN")){
                rows.push(row)
              }
            }
          }
        }
      }
      if (rows.length > 0) {
        rows.sort(sortFunction);
        data.addRows(rows);
        QueryInfo.options.height = columnLength*120;
        chart.draw(data, google.charts.Scatter.convertOptions(QueryInfo.options));
      } else {
        document.getElementById(ElementId).innerHTML = "";
        console.log("No data in")
      }
}
function drawLineChartFromArrayOfFlatJSON(parser,genStruct,ElementId,QueryInfo,info) {
      var chart = new google.charts.Line(document.getElementById(ElementId));
      var data = new google.visualization.DataTable();
      var rows = new Array();
      var flights = 0
      var columnLength = 0
      //var OneMegM = 1000000
      for (index in genStruct) {
        data.addColumn(genStruct[index][0],genStruct[index][1])
        columnLength++
      }
      if(info){
        for (var key of info) {
          if (parser.includes("FPMfast")) {
            if (key['above10k'] && key['timeabove10k'] > 0) {
              rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
            }
          } else {
            rows.push(AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, key))
          }
        }
      }
      if (rows.length > 0) {
        rows.sort(sortFunction);
        data.addRows(rows);
        QueryInfo.options.height = columnLength*60;
        chart.draw(data, google.charts.Line.convertOptions(QueryInfo.options));
      } else {
        document.getElementById(ElementId).innerHTML = "";
        console.log("No data in")
      }
}
function drawLineChartFromArrayInOneDeepJson(parser,genStruct,ElementId,QueryInfo,info) {
  var chart = new google.charts.Line(document.getElementById(ElementId));
  var data = new google.visualization.DataTable();
  var rows = new Array();
  var columnLength = 0
  var OneDeepJsonKey = ""
  //Populate columns
  for (var key of Object.keys(genStruct)) {
    OneDeepJsonKey = key
    for (var index in genStruct[key]) {
      columnLength++
      data.addColumn(genStruct[key][index][0],genStruct[key][index][1])
    }
  }
  if(info){
    for (var root of info) {
      //remove garbage from keys
      keys = keyRemover(Object.keys(root),OneDeepJsonKey)
      for (var key of keys) {
        for (var index in root[key]) {
          var row = AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, root[key][index])

          if(row.length !== 0 && !row.includes("NaN")){
            rows.push(row)
          }
        }
      }
    }
    data.addRows(rows);
  }
  if (rows.length > 0) {

    if(parser === "AAUGraphSES"){
      QueryInfo.options.height = columnLength*60
      QueryInfo.options.series = CreateSeriesFromGenStruct(genStruct)
    } else if(parser === "EnglogEvents") {
      QueryInfo.options.height = columnLength*100
      QueryInfo.options.series = CreateSeriesFromGenStruct(genStruct)
    } else if(parser === "UDPTraceBandwidthDetails") {
      QueryInfo.options.height = columnLength*200
    } else if(parser === "UsageDetails") {
      QueryInfo.options.height = columnLength*200
    }

    chart.draw(data, google.charts.Line.convertOptions(QueryInfo.options));
  } else {
    document.getElementById(ElementId).innerHTML = "";
    console.log("No data in")
  }
}
function drawLineChartFromArrayObjectsWithOneDeepJson(parser,genStruct,ElementId,QueryInfo,info) {
  var chart = new google.charts.Line(document.getElementById(ElementId));
  var data = new google.visualization.DataTable();
  var rows = new Array();
  var columnLength = 0
  var OneDeepJsonKey = ""
  //Populate columns
  for (var key of Object.keys(genStruct)) {
    OneDeepJsonKey = key
    for (var index in genStruct[key]) {
      columnLength++
      data.addColumn(genStruct[key][index][0],genStruct[key][index][1])
    }
  }
  if(info){
    for (var root of info) {
      //remove garbage from keys
      keys = keyRemover(Object.keys(root),OneDeepJsonKey)
      for (var key of keys) {
        var row = AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, root[key])
        if(row.length !== 0 && !row.includes("NaN")){
          rows.push(row)
        }
      }
    }
    data.addRows(rows);
  }
  if (rows.length > 0) {

    if(parser === "AAUGraphSES"){
      QueryInfo.options.height = columnLength*60
      QueryInfo.options.series = CreateSeriesFromGenStruct(genStruct)
    } else if(parser === "EnglogEvents") {
      QueryInfo.options.height = columnLength*100
      QueryInfo.options.series = CreateSeriesFromGenStruct(genStruct)
    } else if(parser === "UDPTraceBandwidthDetails") {
      QueryInfo.options.height = columnLength*200
    } else if(parser === "UsageDetails") {
      QueryInfo.options.height = columnLength*200
    }

    chart.draw(data, google.charts.Line.convertOptions(QueryInfo.options));
  } else {
    document.getElementById(ElementId).innerHTML = "";
    console.log("No data in")
  }
}
//Work on me for WapData
function drawLineChartFromMapOfArraysJson(parser,genStruct,ElementId,QueryInfo,info) {
  var chart = new google.charts.Line(document.getElementById(ElementId));
  var data = new google.visualization.DataTable();
  var rows = new Array();
  var columnLength = 0
  //Populate columns
  for (key of Object.keys(genStruct)) {
      for (index in genStruct[key]) {
        columnLength++
        data.addColumn(genStruct[key][index][0],genStruct[key][index][1])
      }
  }
  if(info){
    for (var root of info) {
      for (key of Object.keys(root)) {
        for (index in root[key]) {
          rows.push(AddRowsBasedOnGenericStructAndMapOfArraysJson(genStruct, root[key][index]))
        }
      }
    }
    data.addRows(rows);
  }
  if (rows.length > 0) {
    QueryInfo.options.height = columnLength*60
    QueryInfo.options.series = CreateSeriesFromGenStruct(genStruct)
    chart.draw(data, google.charts.Line.convertOptions(QueryInfo.options));
  } else {
    document.getElementById(ElementId).innerHTML = "";
    console.log("No data in")
  }
}
function drawPieChartUsage(parser,pieStruct,ElementId,QueryInfo,info) {
    var chart = new google.visualization.PieChart(document.getElementById(ElementId));
    var rows = new Array();
    var header = new Array();
     for (var row of pieStruct) {
       header.push(row[2])
     }
     rows.push(header)
    if(info){
      for (var key of info) {
        rows.push(AddRowsToTableBasedOnPieUsageStructAndFlatJson(pieStruct, key))
      }
    }
    if (rows.length > 1) {
    /*var rowsClean = new Array();
    rowsClean.push(header)
    //rows
    ["N659NK_20210401121727_22", ["Wan Rx - Paid", 0 ] ]*/
      var data = google.visualization.arrayToDataTable(rows)
      QueryInfo.options.width = "900px";
      QueryInfo.options.height =  "500px";
      chart.draw(data, QueryInfo.options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
}
function drawPieChartPP(parser,pieStruct,ElementId,QueryInfo,info) {
    var chart = new google.visualization.PieChart(document.getElementById(ElementId));
    var rows = new Array();
    var header = new Array();
     for (var row of pieStruct) {
       header.push(row[2])
     }
     rows.push(header)
    if(info){
      for (var key of info) {
        rows.push(AddRowsToTableBasedOnPieUsageStructAndFlatJson(pieStruct, key))
      }
    }
    if (rows.length > 1) {
    /*var rowsClean = new Array();
    rowsClean.push(header)
    //rows
    ["N659NK_20210401121727_22", ["Wan Rx - Paid", 0 ] ]*/
      var data = google.visualization.arrayToDataTable(rows)
      // QueryInfo.options.title = "Portal Platform data";
      QueryInfo.options.width = "900px";
      QueryInfo.options.height =  "500px";
      chart.draw(data, QueryInfo.options);
    } else {
      document.getElementById(ElementId).innerHTML = "";
      console.log("No data in")
    }
}
function AddRowsToTableBasedOnPieUsageStructAndFlatJson(pieStruct, flatJson) {
  var row = new Array();
  for (index in pieStruct) {
   if (pieStruct[index][0] === 'datetime') {
     row.push(new Date(flatJson[pieStruct[index][1]]))
   } else if (pieStruct[index][0] === 'number') {
     row.push(Number(flatJson[pieStruct[index][1]]))
   } else {
     row.push(flatJson[pieStruct[index][1]])
   }
 }
 return row
}
//This returns an array of arrays
function AddRowsBasedOnGenericStructAndMapOfArraysJson(genStruct, MapOfArraysJson) {
  //Get the keys in the map to get the array
  //Iterate through the struct and convert the data based on
  //the required type at that position
  var rows = new Array();
  var row = new Array();
  for (key of Object.keys(genStruct)) {
    for (index in genStruct[key]) {
      if (genStruct[key][index][0] === 'datetime') {
        row.push(new Date(MapOfArraysJson[genStruct[key][index][1]]))
      } else if (genStruct[key][index][0] === 'number') {
        row.push(Number(MapOfArraysJson[genStruct[key][index][1]]))
      } else {
        row.push(MapOfArraysJson[genStruct[key][index][1]])
      }
    }
    rows.push(row)
    row = new Array();
  }
  return row
}
//verify the row you were returned is not an empty array
function AddRowsToTableBasedOnPieStructAndFlatJson(pieStruct, flatJson) {
  var row = new Array();
  for (index in pieStruct) {
   if (pieStruct[index][0] === 'datetime') {
     row.push(new Date(flatJson[pieStruct[index][1]]))
   } else if (pieStruct[index][0] === 'number') {
     row.push([pieStruct[index][2],Number(flatJson[pieStruct[index][1]])])
   } else {
     row.push(flatJson[pieStruct[index][1]])
   }
 }
 return row
}
function AddRowsToTableBasedOnBubbleStructAndFlatJson(bubbleStruct, flatJson) {
  var row = new Array();
  for (index in bubbleStruct) {
   if (bubbleStruct[index][0] === 'datetime') {
     row.push(new Date(flatJson[bubbleStruct[index][1]]))
   } else if (bubbleStruct[index][0] === 'number') {
     row.push(Number(flatJson[bubbleStruct[index][1]]))
   } else {
     row.push(flatJson[bubbleStruct[index][1]])
   }
 }
 return row
}
//This need to return an array of arrays with each array having the start and
//end time
//If currenttime is bad we skip it.
function AddRowsToTableBasedOnGenericStructAndTwoOneDeepJson(genStruct, MapOfArraysJson, PreviousMapOfArraysJson) {

  //Get the only key in the map to get the array
  //Iterate through the struct and convert the data based on
  //the required type at that position
    var row = new Array();
    //var rows = new Array();
    var StartTime = new Date();
    var EndTime = new Date();
    if(MapOfArraysJson && PreviousMapOfArraysJson){
      for (key of Object.keys(genStruct)) {
  		  for (index in genStruct[key]) {
    			//Check to see if the key is in MapOfArraysJson
    			if (MapOfArraysJson.hasOwnProperty([genStruct[key][index][1]]))
    			{
    			  if (genStruct[key][index][0] === 'datetime') {
              StartTime = new Date(PreviousMapOfArraysJson[genStruct[key][index][1]])
              EndTime = new Date(MapOfArraysJson[genStruct[key][index][1]])
    			  } else if (genStruct[key][index][0] === 'number') {
              var data = Number(MapOfArraysJson[genStruct[key][index][1]])
              var Name = ""
              var Positions = genStruct[key][index][1]
              var style = '#8d8'
              if(data > 0){
                Name = "Up"
              } else {
                Name = "Down"
                style = 'red'
              }
				      row.push([Positions,Name,style,StartTime,EndTime])
    			  }
  			 }
		  }
		}
	}
	return row
}
function AddRowsToTableBasedOnGenericStructAndOneDeepJson(genStruct, MapOfArraysJson) {
  //Get the only key in the map to get the array
  //Iterate through the struct and convert the data based on
  //the required type at that position
    var row = new Array();
    if(MapOfArraysJson){
      for (key of Object.keys(genStruct)) {
      for (index in genStruct[key]) {
        //Check to see if the key is in MapOfArraysJson
        if (MapOfArraysJson.hasOwnProperty([genStruct[key][index][1]]))
        {
          if (genStruct[key][index][0] === 'datetime') {
            row.push(new Date(MapOfArraysJson[genStruct[key][index][1]]))
          } else if (genStruct[key][index][0] === 'number') {
            row.push(Number(MapOfArraysJson[genStruct[key][index][1]]))
          } else {
            row.push(MapOfArraysJson[genStruct[key][index][1]])
          }
        }
      }
    }
  }
  return row
}
function AddRowsToTableBasedOnGenericStructAndFlatJson(genStruct, flatJson) {
  //Iterate through the sturct and convert the data based on
  //the required type at that position
  var row = new Array();
  for (index in genStruct) {
    if (genStruct[index][0] === 'datetime') {
      row.push(new Date(flatJson[genStruct[index][1]]))
    } else if (genStruct[index][0] === 'number') {
      row.push(Number(flatJson[genStruct[index][1]]))
    } else {
      row.push(flatJson[genStruct[index][1]])
    }
  }
  return row
}
function CreateSeriesFromGenStruct(genStruct){
  var newSer = {}
  for (key of Object.keys(genStruct)) {
      for (index in genStruct[key]) {
        if(index > 0){
          newSer[index] = {targetAxisIndex: index}
        }
      }
  }
  return newSer
}
function CreateVaxesFromGenStruct(genStruct){
  var newVaxes = {}
  for (key of Object.keys(genStruct)) {
      for (index in genStruct[key]) {
        if(index > 0){
          newVaxes[index] =  {title: genStruct[key][index][1]}
        }
      }
  }
  return newVaxes
}
function CreateSeriesFromFlatGenStruct(genStruct){
  var newSer = {}
  for (index in genStruct) {
        if(index > 0){
          newSer[index] = {targetAxisIndex: index}
        }
  }
  return newSer
}
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
function keyRemover(keys,keyToKeep){
  var whileBreaker = 0
  var hasKeyToKeep = false
  while((keys.length !== 1) && (whileBreaker < 10)){
    whileBreaker++
    for (var key of keys) {
      if (key !== keyToKeep){
        const indexOfKey = keys.indexOf(key);
        if (indexOfKey > -1) {
        keys.splice(indexOfKey, 1);
        }
      }
    }
  }
  for (var key of keys) {
    if (key === keyToKeep){
      hasKeyToKeep = true
    }
  }
  if(hasKeyToKeep){
    return keys
  }
  var emptyArray = new Array();
  return emptyArray
}
