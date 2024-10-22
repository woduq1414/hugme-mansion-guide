import json
from math import isnan

import pandas as pd

quest_name_json = json.load(open("./apkdata/json/QuestNames_ko-KR.json", 'r', encoding='UTF8'))["m_TableData"]
quest_data_json = json.load(open("./apkdata/json/QuestNames Shared Data.json", "r", encoding="UTF8"))["m_Structure"][
    "m_Entries"]

quest_data_csv = pd.read_csv(f'./csv/QuestData.csv', dtype=str)

item_data_json = json.load(open("./csv/result.json", 'r', encoding='UTF8'))

print(quest_name_json)
result = []
for idx, row in quest_data_csv.iterrows():

    # row to dict
    dict = {}

    dict["quest_id"] = row["QuestID"]

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
            else:
                dic["item"] = None
                print(k)
        reward_list.append(dic)
    dict["reward"] = reward_list

    quest_m_id = [
        x["m_Id"] for x in quest_data_json if x["m_Key"] == row["QuestID"]
    ][0]

    quest_name = [
        x["m_Localized"] for x in quest_name_json if x["m_Id"] == quest_m_id
    ][0]

    dict["name"] = quest_name

    print(quest_name)

    print(dict)

    result.append(dict)

df = pd.DataFrame(result)
df.to_json("./csv/quest_data.json", orient="records", force_ascii=False, indent=4)
