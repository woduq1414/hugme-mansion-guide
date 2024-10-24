import json
from PIL import Image
import numpy
from matplotlib import pyplot as plt
from os import listdir
from os.path import isfile, join


# categories_list = ["SeedBags", "Water", "Woods", "Plants", "Cleanings", "Currencies", "Constructions", "Househods", "Stationeries", "Tools"]
categories_list = ["DailyQuest",]

for category in categories_list:
    print("Processing category: ", category)

    # load json
    json_file = open("./apkdata/atlas/Atlas_" + category + ".json", "r")


    data = json.load(json_file)



    mypath = "./apkdata/atlas"
    atlas_files = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    atlas_file_name = None
    for file_name in atlas_files:
        if ".png" in file_name and category in file_name:
            atlas_file_name = file_name
            break

    print("Atlas file name: ", atlas_file_name)
    atlas_image = Image.open("./apkdata/atlas/" + atlas_file_name)



    sprite_name_list = data["m_PackedSpriteNamesToIndex"]


    sort = list(sorted(data["m_RenderDataMap"], key=lambda x: x["Key"]["Key"]["m_Data_0_"]))



    for i, render_data in enumerate(sort):
        print("Processing ", i, "th image")

        sprite_name = sprite_name_list[i]
        print("Sprite name: ", sprite_name)

        m_height = render_data["Value"]["m_TextureRect"]["m_Height"]
        m_width = render_data["Value"]["m_TextureRect"]["m_Width"]
        m_x = render_data["Value"]["m_TextureRect"]["m_X"]
        m_y = render_data["Value"]["m_TextureRect"]["m_Y"]

        print("m_x", m_x, "m_y", m_y, "m_width", m_width, "m_height", m_height)

        # get the sprite image
        atlas_image_size = atlas_image.size
        print("atlas_image_size: ", atlas_image_size)


        sprite_image = atlas_image.crop((m_x, atlas_image_size[1] - m_y - m_height, m_x+m_width, atlas_image_size[1] - m_y))


        # save the image
        sprite_image.save("./apkdata/sprites/" + sprite_name + ".png")



