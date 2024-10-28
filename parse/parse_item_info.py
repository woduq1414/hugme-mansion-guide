import json
from math import isnan

import pandas as pd


item_category_list = ["MergeConsume", "MergeNormal", "MergeReward", "MergeSpawner"]
# item_category_list = ["MergeNormal", "MergeSpawner"]

result = {}

for item_category in item_category_list:

    if item_category == "MergeSpawner":
        csv_name = "Item_MergeGenerator"
    else:
        csv_name = f"Item_{item_category}"

    csv = pd.read_csv(f'./csv/{csv_name}.csv', dtype=str)

    print(csv)
    # change ItemCode column to string



    file1 = open(f'./apkdata/json/ItemName_{item_category} Shared Data.json', 'r', encoding='UTF8')

    shared_data = json.load(file1)["m_Entries"]

    file2 = open(f'./apkdata/json/ItemName_{item_category}_ko-KR.json', 'r', encoding='UTF8')

    print(item_category)

    json2 = json.load(file2)
    try:
        name_data = json2["m_TableData"]
    except:

        name_data = json2["m_Structure"]["m_TableData"]

    print(shared_data)

    for item in shared_data:

        result[item["m_Id"]] = {
            "id": item["m_Id"],
            "category": item_category,
            "key": item["m_Key"],
        }

        row = csv.loc[csv["ItemCode"] == item["m_Key"]]
        if row.empty:
            continue

        result[item["m_Id"]]["comment"] = row["Comments"].values[0]

        # print(row)
        if item_category == "MergeNormal":
            result[item["m_Id"]]["selling_price"] = int(row["SellingPrice"].values[0])
            result[item["m_Id"]]["bubble_price"] = int(row["BubblePopPrice"].values[0])
            result[item["m_Id"]]["ruby_price"] = int(row["RubyPrice"].values[0])
            result[item["m_Id"]]["coin_price"] = int(row["CoinPrice"].values[0])

        elif item_category == "MergeConsume":
            result[item["m_Id"]]["spawn_item"] = row[f"SpawnItem"].values[0]
            result[item["m_Id"]]["spawn_count"] = float(row[f"SpawnCount"].values[0])

        elif item_category == "MergeReward":
            result[item["m_Id"]]["timer_minute"] = row[f"OpenTimer_m"].values[0]
            result[item["m_Id"]]["capacity"] = row["Capacity_Random"].values[0]

            spawn_items = {}
            for i in range(1, 13):
                spawn_item = row[f"SpawnItem{i}"].values[0]
                spawn_probability = float(row[f"Probability{i}"].values[0])
                spawn_count = row[f"Count{i}"].values[0]

                if spawn_item == "" or str(spawn_item) == "nan":
                    continue

                if spawn_count != "" and str(spawn_count) != "nan":
                    spawn_items["c" + spawn_item] = spawn_count
                if spawn_probability != "" and str(spawn_probability) != "nan":
                    spawn_items[spawn_item] = spawn_probability

            result[item["m_Id"]]["spawn_items"] = spawn_items


            print(item["m_Id"])
            result[item["m_Id"]]["comment"] = [
                x["m_Localized"] for x in name_data if x["m_Id"] == item["m_Id"]
            ][0].split(" ")[0].split("(")[0]

            print(row)



        elif item_category == "MergeSpawner":

            # ChargeTime_m,Capacity,SpawnItem1,Probability1,SpawnItem2,Probability2,SpawnItem3,Probability3,SpawnItem4,Probability4,SpawnItem5,Probability5,SpawnItem6,Probability6,SpawnItem7,Probability7,SpawnItem8,Probability8,SpawnItem9,Probability9,SpawnItem10,Probability10,SpawnItem11,Probability11,SpawnItem12,Probability12
            result[item["m_Id"]]["selling_price"] = None if pd.isna(row["SellingPrice"].values[0]) else row["SellingPrice"].values[0]
            result[item["m_Id"]]["bubble_price"] = None if pd.isna(row["BubblePopPrice"].values[0]) else row["BubblePopPrice"].values[0]
            result[item["m_Id"]]["ruby_price"] = None if pd.isna(row["RubyPrice"].values[0]) else row["RubyPrice"].values[0]
            result[item["m_Id"]]["coin_price"] = None if pd.isna(row["CoinPrice"].values[0]) else row["CoinPrice"].values[0]
            result[item["m_Id"]]["charge_time"] = row["ChargeTime_m"].values[0]
            result[item["m_Id"]]["capacity"] = row["Capacity"].values[0]
            # result[item["m_Id"]]["spawn_items"]

            spawn_items = {}
            for i in range(1, 13):
                spawn_item = row[f"SpawnItem{i}"].values[0]
                spawn_probability = float(row[f"Probability{i}"].values[0])

                if spawn_item == "" or str(spawn_item) == "nan":
                    continue

                spawn_items[spawn_item] = spawn_probability



            result[item["m_Id"]]["spawn_items"] = spawn_items

        key = item["m_Key"]

        image_name_dic = {
            200 : "cleaning",
            201 : "cleaning_detergent",
            202 : "tool",
            203 : "tool_screw",
            204 : "tool_paint",
            207 : "wood",
            208 : "stationery_",
            209 : "stationery_toy_",
            210 : "construction",
            211 : "water_",
            212 : "construction_light_",
            213 : "Household_",
            100 : "cleaning_G",
            102 : "tool_G",
            105 : "plant_G",
            106 : "seedbag_G",
            107 : "plant",
            108 : "stationery_G",
            110 : "construction_G",
            111 : "construction_pipe",
            113 : "Household_G",
            114 : "Household_Electronic",
            300 : "coin",
            301 : "ruby",
            302 : "energy",
            303 : "exp",
            304 : "energy_drink",
            351 : "Halloween_candy",
            352 : "Halloween_cupcake",
            353 : "Halloween_coin_quest",

            307 : "timer",
            400 : "Reward_chest_green",
            401 : "Reward_chest_red",
            402 : "Reward_chest_blue",
            403 : "piggybank",
            404 : "energy_G",
            406 : "DailyQuest_Gift",
            451 : "Halloween_present"

        }
        item_name_tag = image_name_dic.get(int(key) // 1000, "miss")


        result[item["m_Id"]]["image_name"] = f"{item_name_tag}{str(int(key) % 1000).zfill(2)}"



    for item in name_data:
        result[item["m_Id"]]["name"] = item["m_Localized"]

print(list(result.values()))

# json.dump(list(result.values()), open(f'./csv/result2.json', 'w', encoding='UTF8'), ensure_ascii=False)

df = pd.DataFrame(list(result.values()))

df.to_csv(f'./csv/result.csv', index=False)

df.to_json(f'./csv/result.json', orient='records', force_ascii=False)