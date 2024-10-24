import questData from "../data/quest_data.json";
import {limit} from "@/app/data/limit";

const limitFloor = limit["quest"]["final_floor"];
const limitQuest = limit["quest"]["final_quest"];

import {Item, Mission, Quest, Reward} from "../models/model";


let endIdx = -1;
for(let i = 0 ; i < questData.length ; i++ ){
    const quest = questData[i];
    const key = quest["quest_id"];

    // console.log(key, String(limitFloor * 1000 + limitQuest).padStart(5, "0"))
    if(key.endsWith(String(limitFloor * 1000 + limitQuest).padStart(5, "0"))){
        endIdx = i;
        break;
    }

}

export const typedQuestData : Quest[] = questData.slice(0, endIdx) as Quest[];
