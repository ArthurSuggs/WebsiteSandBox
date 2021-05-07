package main

import (
	"fmt"
	"log"
	"os"
	"sync"

	_ "go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type MgSession struct {
	Session        *mgo.Session
	DataBaseName   string
	CollectionName string
	Collection     *mgo.Collection
	DataBase       *mgo.Database
	Logger         *log.Logger
}
type ResultMg struct {
	FileName string
	Data     string
}

var Mgs *MgSession
var onceMgs sync.Once

func GetMgSession(test bool) *MgSession {
	onceMgs.Do(func() {
		if test {
			Mgs = CreateSessionConnectToDbAndCollection(`mongodb://localhost:27017`,
				"Test", "Test", log.New(os.Stdout, "", log.Ldate))
		} else {
			Mgs = CreateSessionConnectToDbAndCollection(`mongodb://localhost:27017`,
				"AIO", "AIO", log.New(os.Stdout, "", log.Ldate))
		}
	})
	return Mgs
}

//remeber this after calling
//defer ms.DisconnectFromMongo()
func CreateSessionConnectToDbAndCollection(mongoURL string, DbName string, CollectionName string, Logger *log.Logger) *MgSession {
	ms := MgSession{
		DataBaseName:   "",
		CollectionName: "",
		Logger:         Logger,
	}
	ms.CreateSession(mongoURL)
	ms.ConnectToDb(DbName)
	ms.ConnectToCollection(CollectionName)
	return &ms
}

//"mongodb://localhost"
func (m *MgSession) CreateSession(mongoURL string) {
	s, err := mgo.Dial(mongoURL)

	if err != nil {
		m.Logger.Panicln(err)
	}

	m.Logger.Println("You connected to your mongo database.")
	m.Session = s
}
func (m *MgSession) DisconnectFromMongo() {
	m.Session.Close()
	m.Logger.Println("DisconnectFromMongo")
}
func (m *MgSession) ConnectToDb(DbName string) {
	m.DataBaseName = DbName
	m.DataBase = m.Session.DB(DbName)
	m.Logger.Println("Connected to Db", DbName)
}
func (m *MgSession) ConnectToCollection(CollectionName string) {
	m.CollectionName = CollectionName
	m.Collection = m.DataBase.C(CollectionName)
	m.Logger.Println("Connected to Collection", CollectionName)
}
func (m *MgSession) CreateIndexInCollection(IndexKey string) {
	err := m.Collection.EnsureIndexKey(IndexKey)
	if err == nil {
		m.Logger.Println(m.DataBaseName, m.CollectionName, " Index created on  ", IndexKey)
	} else {
		m.Logger.Println(err)
	}
}
func (m *MgSession) DeleteFromCollection(indexedName string, indexedValue string) {

	err := m.Collection.Remove(bson.M{indexedName: indexedValue})
	if err == nil {
		m.Logger.Println(m.DataBaseName, m.CollectionName, " Removed ", indexedValue)
	} else {
		m.Logger.Println(err)
	}
}

func (m *MgSession) FindAllInCollection(indexedName string, indexedValue string) []interface{} {
	var result []interface{}
	m.Collection.Find(bson.M{indexedName: indexedValue}).All(&result)
	return result
}
func (m *MgSession) FindRgxMatchInEnglogEvents(rgx string) []EnglogEventsResults {
	var res []EnglogEventsResults
	fmt.Println(m.Collection.Find(bson.M{
		"filename": bson.RegEx{
			Pattern: rgx,
			Options: "i",
		},
	}).All(&res))
	return res
}
func (m *MgSession) FindRgxMatchInDarkCollection(findid string, rgx string) []DarkAc {
	var res []DarkAc
	fmt.Println(m.Collection.Find(bson.M{
		findid: bson.RegEx{
			Pattern: rgx,
			Options: "i",
		},
	}).All(&res))
	return res
}

func (m *MgSession) FindRgxMatchInCollection(rgx string) []interface{} {
	var res []interface{}
	fmt.Println(m.Collection.Find(bson.M{
		"filename": bson.RegEx{
			Pattern: rgx,
			Options: "i",
		},
	}).All(&res))
	return res
}

func (m *MgSession) FindRgxMatchInFPMfastSES(rgx string) []SysevtResults {
	var res []SysevtResults
	fmt.Println(m.Collection.Find(bson.M{
		"filename": bson.RegEx{
			Pattern: rgx,
			Options: "i",
		},
	}).All(&res))
	return res
}
func (m *MgSession) FindDistinctStringsFromRgxOnFilename(rgx string, distinctId string) []string {
	res := []string{}
	err := m.Collection.Find(bson.M{
		"filename": bson.RegEx{
			Pattern: rgx,
			Options: "i",
		},
	}).Distinct(distinctId, &res)
	if err != nil {
		fmt.Println(err)
	}
	return res
}
func (m *MgSession) FindRgxMatchInLogOffload(rgx string) []LogOffloadResults {
	var res []LogOffloadResults
	m.Collection.Find(bson.M{"filename": bson.RegEx{Pattern: rgx, Options: "i"}}).All(&res)
	//m.Collection.Find(bson.M{"filename": bson.RegEx{Pattern: rgx, Options: "i"}}).Select(bson.M{"logoffload.name": 1, "_id": 0}).All(&res)
	return res
}
func (m *MgSession) FindRgxMatchInCollectionAndReturnCntOfDocs(rgx string) int {
	cnt, err := m.Collection.Find(bson.M{
		"filename": bson.RegEx{
			Pattern: rgx,
			Options: "i",
		},
	}).Count()
	if err != nil {
		fmt.Println(err)
	}
	return cnt
}
func (m *MgSession) FindRgxMatchInSoftwareVersionsSES(rgx string) []SoftwareVersionSesResults {
	var res []SoftwareVersionSesResults
	m.Collection.Find(bson.M{
		"filename": bson.RegEx{
			Pattern: rgx,
			Options: "i",
		},
	}).All(&res)
	return res
}
func (m *MgSession) FindRgxMatchInSoftwareVersions(rgx string) []SoftwareVersionLegacyResults {
	var res []SoftwareVersionLegacyResults
	m.Collection.Find(bson.M{
		"filename": bson.RegEx{
			Pattern: rgx,
			Options: "i",
		},
	}).All(&res)
	return res
}
func (m *MgSession) FindRgxMatchInUsageSummary(rgx string) []UsageSummaryResults {
	var res []UsageSummaryResults
	m.Collection.Find(bson.M{
		"filename": bson.RegEx{
			Pattern: rgx,
			Options: "i",
		},
	}).All(&res)
	return res
}
func (m *MgSession) FindRgxMatchInUdpTraceSummary(rgx string) []UdpTraceSummaryResults {
	var res []UdpTraceSummaryResults
	m.Collection.Find(bson.M{
		"filename": bson.RegEx{
			Pattern: rgx,
			Options: "i",
		},
	}).All(&res)
	return res
}
func (m *MgSession) FindStuffInCollection(FileName string) []interface{} {
	var res []interface{}
	col := m.Collection
	query := bson.M{"filename": FileName}
	err := col.Find(query).All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}
func (m *MgSession) GetParsedFilenames(rgx string) []interface{} {
	var res []interface{}
	col := m.Collection
	query := bson.M{"filename": bson.RegEx{Pattern: rgx, Options: "i"}}
	err := col.Find(query).Select(bson.M{"filename": 1, "_id": 0}).All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}
func (m *MgSession) GetLogPurchaseCommandFromPPAccess(rgx string) []interface{} {
	var res []interface{}
	o1 := bson.M{"$match": bson.M{"filename": bson.M{"$regex": rgx}}}

	o2 := bson.M{"$unwind": "$accesslineinfo"}
	o3 := bson.M{"$match": bson.M{"accesslineinfo.url": bson.M{"$regex": "user"}}}

	o4 := bson.M{"$project": bson.M{"_id": 0,
		"user":               "$accesslineinfo.lanip",
		"time":               "$accesslineinfo.datetime",
		"httpstatusresponse": "$accesslineinfo.httpstatusresponse",
		"url":                "$accesslineinfo.url",
	}}

	operations := []bson.M{o1, o2, o3, o4}
	col := m.Collection
	pipe := col.Pipe(operations)

	err := pipe.All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}
func (m *MgSession) GetLogPurchaseCommandFromEnglog(rgx string) []interface{} {
	var res []interface{}
	o1 := bson.M{"$match": bson.M{"filename": bson.M{"$regex": rgx}}}

	o2 := bson.M{"$unwind": "$loguserpurchasecommand"}

	o3 := bson.M{"$project": bson.M{"user": "$loguserpurchasecommand.userid",
		"time":   "$loguserpurchasecommand.time",
		"userid": bson.M{"$split": []string{"$loguserpurchasecommand.userid", "_"}},
		"result": "$loguserpurchasecommand.stateresult",
		"price":  "$loguserpurchasecommand.price",
	}}

	o4 := bson.M{"$unwind": "$userid"}

	o5 := bson.M{"$match": bson.M{"userid": bson.M{"$not": bson.M{"$regex": "[0-9]{4}"}}}}

	o6 := bson.M{"$match": bson.M{"userid": bson.M{"$not": bson.M{"$regex": "[A-Z]"}}}}

	o7 := bson.M{"$project": bson.M{"_id": 0,
		"user":   1,
		"time":   1,
		"userid": bson.M{"$toInt": "$userid"},
		"result": 1,
		"price":  1,
	}}

	operations := []bson.M{o1, o2, o3, o4, o5, o6, o7}
	col := m.Collection
	pipe := col.Pipe(operations)

	err := pipe.All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}

func (m *MgSession) GetPortalPlatformData(rgx string) []interface{} {
	var res []interface{}
	o1 := bson.M{"$match": bson.M{"filename": bson.M{"$regex": rgx}}}

	o2 := bson.M{"$unwind": "$accesslineinfo"}

	o3 := bson.M{"$group": bson.M{"_id": "$accesslineinfo.httpstatusresponse",
		"TotalBytesReturned": bson.M{"$sum": "$accesslineinfo.bytesreturned"}}}

	o4 := bson.M{"$project": bson.M{"_id": 0,
		"HttpStatusResponse": "$_id",
		"TotalBytesReturned": 1,
	}}

	operations := []bson.M{o1, o2, o3, o4}
	col := m.Collection
	pipe := col.Pipe(operations)

	err := pipe.All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}

//Get process restarts using aggerate and pipelines with mongo
func (m *MgSession) GetPortalPlatformGetRequestsByLanIp(rgx string) []interface{} {
	var res []interface{}
	o1 := bson.M{"$match": bson.M{"filename": bson.M{"$regex": rgx}}}

	o2 := bson.M{"$unwind": "$accesslineinfo"}

	o3 := bson.M{"$match": bson.M{"accesslineinfo.lanip": bson.M{"$not": bson.M{"$regex": "f97ffc3c1aff84770151bbc1e43b1e23a2b104c5"}}}}

	o4 := bson.M{"$group": bson.M{"_id": "$accesslineinfo.lanip",
		"Occurances": bson.M{"$sum": 1}}}

	o5 := bson.M{"$project": bson.M{"_id": 0,
		"HashedLanIP": "$_id",
		"Occurances":  1,
	}}

	operations := []bson.M{o1, o2, o3, o4, o5}
	col := m.Collection
	pipe := col.Pipe(operations)

	err := pipe.All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}

//Get process restarts using aggerate and pipelines with mongo
func (m *MgSession) GetPortalPlatformHttpStatusResponses(rgx string) []interface{} {
	var res []interface{}
	o1 := bson.M{"$match": bson.M{"filename": bson.M{"$regex": rgx}}}

	o2 := bson.M{"$unwind": "$accesslineinfo"}

	o3 := bson.M{"$group": bson.M{"_id": "$accesslineinfo.httpstatusresponse",
		"Total": bson.M{"$sum": 1}}}

	o4 := bson.M{"$project": bson.M{"_id": 0,
		"HttpStatusResponse": "$_id",
		"Total":              1,
	}}

	operations := []bson.M{o1, o2, o3, o4}
	col := m.Collection
	pipe := col.Pipe(operations)

	err := pipe.All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}
func (m *MgSession) GetPortalPlatformMethodsTimeAndData(rgx string, method string) []interface{} {
	var res []interface{}
	o1 := bson.M{"$match": bson.M{"filename": bson.M{"$regex": rgx}}}

	o2 := bson.M{"$unwind": "$accesslineinfo"}

	o3 := bson.M{"$match": bson.M{"accesslineinfo.method": bson.M{"$regex": method}}}

	o4 := bson.M{"$project": bson.M{"_id": 0,
		"accesslineinfo.datetime":      1,
		"accesslineinfo.bytesreturned": 1,
		//"accesslineinfo.method": 1,
	}}

	operations := []bson.M{o1, o2, o3, o4}
	col := m.Collection
	pipe := col.Pipe(operations)

	err := pipe.All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}
func (m *MgSession) GetPortalPlatformMethodPUTTimeAndData(rgx string) []interface{} {
	var res []interface{}
	o1 := bson.M{"$match": bson.M{"filename": bson.M{"$regex": rgx}}}

	o2 := bson.M{"$unwind": "$accesslineinfo"}

	o3 := bson.M{"$match": bson.M{"accesslineinfo.method": bson.M{"$regex": "PUT"}}}

	o4 := bson.M{"$project": bson.M{"_id": 0,
		"accesslineinfo.datetime":      1,
		"accesslineinfo.bytesreturned": 1,
	}}

	operations := []bson.M{o1, o2, o3, o4}
	col := m.Collection
	pipe := col.Pipe(operations)

	err := pipe.All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}

func (m *MgSession) GetPortalPlatformMethodDeleteTimeAndData(rgx string) []interface{} {
	var res []interface{}
	o1 := bson.M{"$match": bson.M{"filename": bson.M{"$regex": rgx}}}

	o2 := bson.M{"$unwind": "$accesslineinfo"}

	o3 := bson.M{"$match": bson.M{"accesslineinfo.method": bson.M{"$regex": "DELETE"}}}

	o4 := bson.M{"$project": bson.M{"_id": 0,
		"accesslineinfo.datetime":      1,
		"accesslineinfo.bytesreturned": 1,
	}}

	operations := []bson.M{o1, o2, o3, o4}
	col := m.Collection
	pipe := col.Pipe(operations)

	err := pipe.All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}

//Get process restarts using aggerate and pipelines with mongo
func (m *MgSession) GetPortalPlatformMethodGETTimeAndData(rgx string) []interface{} {
	var res []interface{}
	o1 := bson.M{"$match": bson.M{"filename": bson.M{"$regex": rgx}}}

	o2 := bson.M{"$unwind": "$accesslineinfo"}

	o3 := bson.M{"$match": bson.M{"accesslineinfo.method": bson.M{"$regex": "GET"}}}

	o4 := bson.M{"$project": bson.M{"_id": 0,
		"accesslineinfo.datetime":      1,
		"accesslineinfo.bytesreturned": 1,
	}}

	operations := []bson.M{o1, o2, o3, o4}
	col := m.Collection
	pipe := col.Pipe(operations)

	err := pipe.All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}

//Get process restarts using aggerate and pipelines with mongo
func (m *MgSession) GetProcessRestarts(rgx string) []interface{} {
	var res []interface{}
	o1 := bson.M{"$match": bson.M{"filename": bson.M{"$regex": rgx}}}

	o2 := bson.M{"$unwind": "$monitsummary"}

	o3 := bson.M{"$match": bson.M{"monitsummary.action": bson.M{"$regex": "Restarting"}}}

	o4 := bson.M{"$count": "Reboots"}

	operations := []bson.M{o1, o2, o3, o4}
	col := m.Collection
	pipe := col.Pipe(operations)

	err := pipe.All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}

func (m *MgSession) GetFleetHealthAirlineAgg(rgx string) []interface{} {
	var res []interface{}
	o1 := bson.M{"$match": bson.M{"filename": bson.M{"$regex": rgx}}}

	o2 := bson.M{"$match": bson.M{"above10k": true}}

	o3 := bson.M{"$group": bson.M{"Internet Status": bson.M{"$avg": "$internetstatus10k"},
		"Intranet Status": bson.M{"$avg": "$intranetstatus10k"},
		"Signal":          bson.M{"$avg": "$signal10k"},
		"Cabin":           bson.M{"$avg": "$cabin10k"},
		"Portal":          bson.M{"$avg": "$portalscore"},
		"Wap1":            bson.M{"$avg": "$wap1score"},
		"Wap2":            bson.M{"$avg": "$wap2score"},
		"Wap3":            bson.M{"$avg": "$wap3score"},
		"AAA":             bson.M{"$avg": "$aaascore"},
		"GCMS":            bson.M{"$avg": "$gcmsscore"},
		"Modem State":     bson.M{"$avg": "$kamustatescore"},
		"Modem Comms":     bson.M{"$avg": "$kamucommscore"},
		"Reboots In Air":  bson.M{"$sum": "$rebootsinair"},
		"Flights":         bson.M{"$sum": 1},
		// "rxtotal":           bson.M{"$avg": "$rxtotal"},
		// "txtotal":           bson.M{"$avg": "$txtotal"},
		"_id": "$tailid"}}

	o4 := bson.M{"$project": bson.M{"_id": 0, "Tail": "$_id",
		"Internet Status": 1,
		"Intranet Status": 1,
		"Signal":          1,
		"Cabin":           1,
		"Portal":          1,
		"Wap1":            1,
		"Wap2":            1,
		"Wap3":            1,
		"AAA":             1,
		"GCMS":            1,
		"Modem State":     1,
		"Modem Comms":     1,
		"Reboots In Air":  1,
		"Flights":         1,
		// "rxtotal":           1,
		// "txtotal":           1,
	}}

	operations := []bson.M{o1, o2, o3, o4}
	col := m.Collection
	pipe := col.Pipe(operations)
	// Run the queries and capture the results
	err := pipe.All(&res)
	if nil != err {
		fmt.Println(err)
	}
	return res
}

//Example code for using aggerate and pipelines with mongo
/*func (m *MgSession) GetAggreateData(rgx string) []interface{} {
	o1 := bson.M{"$match" :bson.M {"source":"..."},}

	o2 := bson.M{"$unwind": "$comments",}

	o3 := bson.M{"$group": bson.M{"_id": "$url","size": bson.M{	"$sum": 1,},},}

	o4 := bson.M{"sort": bson.M{"size": -1,},}

	o5 := bson.M{"$limit": 5,}
	operations := []bson.M{o1, o2, o3, o4, o5}

	pipe := col.Pipe(operations)

	// Run the queries and capture the results
	results := []bson.M{}
	err := pipe.All(&results)
	if nil != err {
		fmt.Println(err)
	}
	return results
}*/

//m.Collection.Find(bson.M{"filename": bson.RegEx{Pattern: rgx,Options: "i",},}).All(&res)
