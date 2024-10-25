import json

log_file = open("./apkdata/asset_ripper_log_result.txt", encoding="utf8")

target_list = ["ItemName_MergeConsume", "ItemName_MergeNormal", "ItemName_MergeSpawner",
               "ItemName_MergeReward"]

type = -1
flag = False

log_txt = log_file.read().split("\n")

tmp = []

for l in log_txt:
    if l.isdigit() and int(l) > 999413536801770704:
        continue
    tmp.append(l)


log_txt = tmp
print(len(log_txt))


# print(log_txt)
idx = 0

while idx < len(log_txt):
    # print(idx, len(log_txt))
    l = log_txt[idx]
    idx += 1

    line = l
    if type != -1:
        if flag is True:

            if line in target_list:
                print("title", line)

                title = line

                _ = log_txt[idx]
                idx += 1

                id = None
                data = []
                while True:
                    id = log_txt[idx]
                    idx += 1

                    if id == "UnityEngine.IMetadata":
                        break

                    value = log_txt[idx]
                    idx += 1

                    idx += 2

                    print("id", id, "val", value)
                    data.append(
                        {
                            "m_Id": int(id),
                            "m_Key": value,

                        }
                    )
                print(data)

                full_data = {
                    "m_Entries" : data
                }

                json.dump(full_data, open(f"./apkdata/json_from_log/{title} Shared Data.json", "w"))

                # exit()

            flag = False
        else:
            pass

    if line == "Reading MonoBehaviour Structure   " or line == "Reading MonoBehaviour Structure MonoScript UnityEngine.Localization.Tables SharedTableData":
        type = 0
        flag = True

    if line == "UnityEngine.ManagedReferencesRegistry":
        type = -1
