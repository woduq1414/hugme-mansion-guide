import json
import pandas as pd

db_file = open(f'./apkdata/json/db.json', 'r', encoding='UTF8')
db_data = json.load(db_file)

for table in db_data["Metas"]:

    result = []

    columns = [x["Name"] for x in table["Fields"]]
    fields = table["Entities"]

    for field in fields:
        row = {}
        for dic in field["Values"]:
            row[dic["Name"]] = dic["Value"]

        if table["Name"] in ["Item_MergeConsume", "Item_MergeNormal", "Item_MergeGenerator"]:
            if row["ItemCode"] != "" and row["Comments"] == "":
                row["Comments"] = result[-1]["Comments"]

        result.append(row)

    df = pd.DataFrame(result)
    print(df)
    df.to_csv(f'./csv/{table["Name"]}.csv', index=False)

