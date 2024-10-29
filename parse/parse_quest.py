import json
from math import isnan

import pandas as pd

quest_name_json = json.load(open("./apkdata/json/QuestNames_ko-KR.json", 'r', encoding='UTF8'))['m_Structure']["m_TableData"]
quest_data_json = json.load(open("./apkdata/json/QuestNames Shared Data.json", "r", encoding="UTF8"))["m_Structure"][
    "m_Entries"]

quest_data_csv = pd.read_csv(f'./csv/QuestData.csv', dtype=str)

event_quest_name_json = json.load(open("./apkdata/json/QuestNames_Event_ko-KR.json", 'r', encoding='UTF8'))["m_Structure"]["m_TableData"]
event_quest_data_json = json.load(open("./apkdata/json/QuestNames_Event Shared Data.json", "r", encoding="UTF8"))["m_Structure"][
    "m_Entries"]
event_quest_data_csv = pd.read_csv(f'./csv/QuestData_Event.csv', dtype=str)

event_cond_csv = pd.read_csv(f"./csv/EventCond.csv")

event_cond_dict = {}
for idx, row in event_cond_csv.iterrows():
    if "open" in row["EventCode"]:
        event_cond_dict[row["RequiredQuestID"]] = row["EventCode"]


item_data_json = json.load(open("./csv/result.json", 'r', encoding='UTF8'))

print(quest_name_json)
result = []

for data in [{
    "csv": quest_data_csv,
    "data_json": quest_data_json,
    "name_json" : quest_name_json
}, {
    "csv": event_quest_data_csv,
    "data_json": event_quest_data_json,
    "name_json": event_quest_name_json
}]:

    data_csv = data["csv"]
    data_json = data["data_json"]
    name_json = data["name_json"]


    for idx, row in data_csv.iterrows():

        # row to dict
        dict = {}

        dict["quest_id"] = row["QuestID"]

        if dict["quest_id"] in event_cond_dict:
            dict["event"] = event_cond_dict[dict["quest_id"]]

        mission_dict = {}
        if str(row["MissionItem0"]) == "nan":
            continue

        mission_dict[row["MissionItem0"]] = int(row["MsCount0"])
        if str(row["MissionItem1"]) != "nan":
            try:
                mission_dict[row["MissionItem1"]] = int(row["MsCount1"])
            except:
                pass

        reward_dict = {}
        if str(row["RewardItem0"]) != "nan":
            reward_dict[row["RewardItem0"]] = int(row["RwCount0"])
        if str(row["RewardItem1"]) != "nan":
            reward_dict[row["RewardItem1"]] = int(row["RwCount1"])
        if str(row["RewardItem2"]) != "nan":
            reward_dict[row["RewardItem2"]] = int(row["RwCount2"])
        if str(row["RewardItem3"]) != "nan":
            reward_dict[row["RewardItem3"]] = int(row["RwCount3"])

        mission_list = []
        for k, v in mission_dict.items():
            dic = {}
            dic["cnt"] = v
            try:
                # print(k)
                item = [x for x in item_data_json if x["key"] == k][0]
                dic["item"] = {
                    "key": item["key"],
                    "category": item["category"],
                    "comment": item["comment"],
                    "name": item["name"],
                    "image_name": item["image_name"]
                }
            except:
                dic["item"] = None
                print(k, "!!")
            mission_list.append(dic)

        dict["mission"] = mission_list



        reward_list = []

        for k, v in reward_dict.items():
            dic = {}
            dic["cnt"] = v
            try:

                item = [x for x in item_data_json if x["key"] == k][0]
                dic["item"] = {
                    "key": item["key"],
                    "category": item["category"],
                    "comment": item["comment"],
                    "name": item["name"],
                    "image_name": item["image_name"]
                }
            except:

                if k == "s100004":
                    dic["item"] = {
                        "key": "exp",
                        "category": "MergeConsume",
                        "comment": "exp",
                        "name": "exp",
                        "image_name": "exp04"
                    }
                elif k == "s100001":
                    dic["item"] = {
                        "key": "coin",
                        "category": "MergeConsume",
                        "comment": "coin",
                        "name": "coin",
                        "image_name": "coin01"
                    }
                elif k == "s101001":
                    dic["item"] = {
                        "key" : "HalloweenToken",
                        "category" : "MergeConsume",
                        "comment" : "HalloweenToken",
                        "name": "HalloweenToken",
                        "image_name": "Halloween_coin_quest",
                    }
                else:
                    dic["item"] = None
                    print(k)
            reward_list.append(dic)
        dict["reward"] = reward_list

        if str(row["QuestID"]) == "nan":
            continue

        # print(row)

        quest_m_id = [
            x["m_Id"] for x in data_json if x["m_Key"] == row["QuestID"]
        ][0]

        quest_name = [
            x["m_Localized"] for x in name_json if x["m_Id"] == quest_m_id
        ][0]

        dict["name"] = quest_name

        print(quest_name)

        print(dict)

        result.append(dict)

df = pd.DataFrame(result)
df.to_json("./csv/quest_data.json", orient="records", force_ascii=False, indent=4)
