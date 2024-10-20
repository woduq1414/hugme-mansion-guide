from matplotlib import pyplot as plt
import pandas as pd


csv = pd.read_csv(f'./csv/result.csv')

print(csv)

# 여러 이미지를 한 줄에 5개씩 보여줌



# image = plt.imread(f'./apkdata/sprites/{row["image_name"]}.png')
# plt.subplot(1, 5, index + 1)
# plt.imshow(image)
# plt.title(row["name"])
fig = plt.figure(figsize=(20, 150))

rows = 90
cols = 5

i = 1

prev_category = None
for index, row in csv.iterrows():
    try:
        image = plt.imread(f'./apkdata/sprites/{row["image_name"]}.png')
    except:
        pass

    if prev_category is not None and prev_category != row["comment"]:
        if i % 5 != 4:
            i += 5
        i = i - i % 5 + 6
        print(i)
    prev_category = row["comment"]

    ax = fig.add_subplot(rows, cols, i)
    ax.imshow(image)
    ax.set_xticks([]), ax.set_yticks([])
    ax.axes.get_xaxis().set_visible(False)

    ax.axes.get_yaxis().set_visible(False)
    # plt.title(row["name"])
    i += 1

plt.xticks([]), plt.yticks([])

plt.tight_layout()
plt.subplots_adjust(left = 0, bottom = 0, right = 1, top = 0.95, hspace = 0.1, wspace = 0)
plt.show()