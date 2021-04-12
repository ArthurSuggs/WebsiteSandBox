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
