package endpoints

import (
	"time"

	"github.com/ArthurSuggs/WebsiteSandBox/common"
)

type UserSessionData struct {
	UserId                      string
	CreationTime                time.Time
	LogUserPurchaseCommandTime  time.Time
	LogUserPurchaseCommandCount int
	RequestInternetServiceTime  time.Time
	RequestInternetServiceCount int
	RequestInternetServiceName  string
	StartAaaAccountingTime      time.Time
	StartAaaAccountingCount     int
	VolumeLimitMonitorTime      time.Time
	VolumeLimitMonitorCount     int
	Price                       float64
	Product                     string
	Description                 string
	OrderId                     string
	StateResult                 string
	PlanID                      string
	DeviceId                    string
	//WanIP                       string
}

func (usd *UserSessionData) updateUserSessionDataWithRequestInternetService(ris common.RequestInternetService) {
	if usd.RequestInternetServiceTime.IsZero() {
		usd.RequestInternetServiceTime = ris.Time
		usd.RequestInternetServiceName = ris.ServiceName
		usd.RequestInternetServiceCount = 1
	} else {
		usd.RequestInternetServiceCount++
	}
}
func (usd *UserSessionData) updateUserSessionDataWithVolumeLimitMonitor(vlm common.VolumeLimitMonitor) {
	if usd.VolumeLimitMonitorTime.IsZero() {
		usd.VolumeLimitMonitorTime = vlm.Time
		usd.VolumeLimitMonitorCount = 1
	} else {
		usd.VolumeLimitMonitorCount++
	}
}
func (usd *UserSessionData) updateUserSessionDataWithStartAaaAccounting(saa common.StartAaaAccounting) {
	if usd.StartAaaAccountingTime.IsZero() {
		usd.StartAaaAccountingTime = saa.Time
		usd.StartAaaAccountingCount = 1
	} else {
		usd.StartAaaAccountingCount++
	}
}
func (usd *UserSessionData) updateUserSessionDataWithLogUserPurchaseCommand(lupc common.LogUserPurchaseCommand) {
	if usd.RequestInternetServiceTime.IsZero() {
		usd.LogUserPurchaseCommandTime = lupc.Time
		usd.Description = lupc.Description
		usd.Price = lupc.Price
		usd.Product = lupc.Product
		usd.OrderId = lupc.OrderId
		usd.StateResult = lupc.StateResult
		usd.PlanID = lupc.PlanID
		usd.DeviceId = lupc.DeviceId
		usd.LogUserPurchaseCommandCount = 1
	} else {
		usd.LogUserPurchaseCommandCount++
	}
}

//Work on this later
//This is it.
//Ensure that outside requests are limited
//There is an assumption that the arrays of EnglogEventsResults are in cron order
/*type EnglogEventsResults struct {
	FileName               string
	FlightPhases           []EnglogEvent
	Reboots                []EnglogEvent
	EnglogPoints           []EnglogPoint
	FkalMgrUpdateInternet  []FkalMgrUpdateInternet
	UserReg                []UserReg
	LogUserPurchaseCommand []LogUserPurchaseCommand
	RequestInternetService []RequestInternetService
	StartAaaAccounting     []StartAaaAccounting
	VolumeLimitMonitor     []VolumeLimitMonitor
	FingerPrintResults     map[string][]FingerPrint
}*/
/*func UserSessionsEng(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	ParserName := "EnglogEvents"
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
	ms := CreateSessionConnectToDbAndCollection("mongodb://localhost", Airline, ParserName, log.New(os.Stdout, "", log.Ltime))
	defer ms.DisconnectFromMongo()
	data := ms.FindRgxMatchInEnglogEvents(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
	regUsers := make(map[string]int)
	//lupcUniqUsers := make(map[string]int)
	//risUserCnt := make(map[string]int)

	UserSessionDatas := []UserSessionData{}
	for _, ev := range data {
		//count user reg for each user and create then aappend UserSessionData struct
		for _, UserReg := range ev.UserReg {
			if urCount, ok := regUsers[UserReg.UserId]; ok {
				regUsers[UserReg.UserId] = urCount + 1
			} else {
				regUsers[UserReg.UserId] = 1
				usd := UserSessionData{}
				usd.UserId = UserReg.UserId
				usd.CreationTime = UserReg.CommandTime
				//LogUserPurchaseCommand
				for _, lupc := range ev.LogUserPurchaseCommand {
					if usd.UserId == lupc.UserId {
						usd.updateUserSessionDataWithLogUserPurchaseCommand(lupc)
					}
				}
				//RequestInternetService
				for _, ris := range ev.RequestInternetService {
					if usd.UserId == ris.UserId {
						usd.updateUserSessionDataWithRequestInternetService(ris)
					}
				}
				//StartAaaAccounting
				for _, saa := range ev.StartAaaAccounting {
					if usd.UserId == saa.UserId {
						usd.updateUserSessionDataWithStartAaaAccounting(saa)
					}
				}
				//VolumeLimitMonitor
				for _, vlm := range ev.VolumeLimitMonitor {
					if usd.UserId == vlm.UserId {
						usd.updateUserSessionDataWithVolumeLimitMonitor(vlm)
					}
				}
				//fmt.Println(UserReg.CreationTime, UserReg.UserId, ev.FileName)
				prod := ""
				if usd.Product == "" {
					prod = "NO LogPurchase"
				} else {
					prod = usd.Product
				}
				risService := ""
				if usd.RequestInternetServiceName == "" {
					risService = "NO risService"
				} else {
					risService = usd.RequestInternetServiceName
				}
				fmt.Println(usd.CreationTime, usd.UserId, usd.LogUserPurchaseCommandTime,
					usd.RequestInternetServiceTime, prod, risService)
				if usd.RequestInternetServiceName != "" || usd.Product != "" {
					fmt.Println(usd.CreationTime, usd.UserId, usd.StartAaaAccountingTime,
						usd.RequestInternetServiceTime, usd.LogUserPurchaseCommandTime,
						usd.Product, usd.RequestInternetServiceName)
				}
				UserSessionDatas = append(UserSessionDatas, usd)
			}
		}

		//LogUserPurchaseCommand
		for _, lupc := range ev.LogUserPurchaseCommand {
			//fmt.Println(lupc.Time, lupc.UserId, lupc)
			if lupcCount, ok := lupcUniqUsers[lupc.UserId]; ok {
				lupcUniqUsers[lupc.UserId] = lupcCount + 1
			} else {
				lupcUniqUsers[lupc.UserId] = 1
				for _, usd := range UserSessionDatas {
					if usd.UserId == lupc.UserId {
						//Need way to update
						usd.updateUserSessionDataWithLogUserPurchaseCommand(lupc)
					}
				}
			}
		}

		for _, ris := range ev.RequestInternetService {
			fmt.Println(ris.Time, ris.UserId, ris.ServiceName)
			if risCount, ok := risUserCnt[ris.UserId]; ok {
				risUserCnt[ris.UserId] = risCount + 1
			} else {
				risUserCnt[ris.UserId] = 1
			}
		}
		for userId, cnt := range lupcUniqUsers {
			fmt.Println(userId, cnt, risUserCnt[userId])
		}

		for _, ris := range ev.RequestInternetService {
			fmt.Println(ris.Time, ris.UserId, ris.ServiceName)
		}
		fmt.Println(ev.FileName)
	}
	for _, usd := range UserSessionDatas {
		if usd.LogUserPurchaseCommandCount > 0 {
			fmt.Println(usd.CreationTime, usd.UserId, usd.LogUserPurchaseCommandTime, usd.RequestInternetServiceTime, usd.Product)
		}
	}

	enc := json.NewEncoder(res)
	enc.Encode(UserSessionDatas)
	fmt.Println(req.Method, "UserSessionsEng with Airline:", Airline, "ParserName", ParserName, "Records found: ", len(data))
	fmt.Println(Airline + "_" + TailId + "_" + FlightId + "_" + DateYYYYMMDD)
}*/
