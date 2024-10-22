'use client'

import Image from "next/image";

import questData from "../data/quest_data.json";
import itemData from "../data/item_data.json";

import {useEffect, useState} from "react";

interface Mission {
    cnt: number;
    item: Item;
}

interface Reward {
    cnt: number;
    item: Item;
}

interface Quest {
    quest_id: string;

    mission: Mission[];
    reward: Reward[];
    name: string;
}

interface Item {
    key: string;
    image_name: string;
}

const typedQuestData: Quest[] = questData as unknown as Quest[];

const typedItemData: Item[] = itemData as Item[];


export default function Home() {
    // console.log(questData["m_TableData"])

    const [targetFloor, setTargetFloor] = useState(1);


    const typedItemObj: {
        [key: string]: Item
    } = {};
    typedItemData.forEach((item) => {
        typedItemObj[item["key"]] = item;
    });

    return (

        <div className={"flex flex-col w-full "}>
            <div className={"flex flex-row flex-wrap px-4 gap-2 w-full"}>
                {
                    [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12].map((idx) => {
                        return (
                            <div key={idx} className={`bg-amber-300 rounded-md px-2 text-lg cursor-pointer ${
                                targetFloor === idx ? 'bg-amber-500' : ''
                            }`}
                                 onClick={() => {
                                     setTargetFloor(idx);
                                 }}
                            >
                                {idx}층
                            </div>
                        );

                    })
                }
            </div>
            <div className={"flex w-full flex-col gap-2 "}>{
                (typedQuestData as Quest[]).map((quest: Quest, idx) => {

                    if (Math.floor((parseInt(quest["quest_id"].substring(3, 9)) - 100000) / 1000) != targetFloor) {
                        return;
                    }

                    return (
                        <div key={idx}
                             className={"rounded-xl shadow-lg border-gray-400 px-4 py-2 pt-4 flex flex-col mx-3 gap-2"}>
                            <div className="font-bold text-lg">{quest["name"].replaceAll("\\n", " ")}</div>
                            <div className={"flex flex-row justify-between"}>
                                <div className={"flex flex-row gap-2"}>
                                    {
                                        quest["mission"].map((mission: Mission, idx2: number) => {

                                            console.log(mission);
                                            if (mission["item"] == null) {
                                                return;
                                            }


                                            return (

                                                <div key={idx2}
                                                     className={"rounded-2xl border-2 border-amber-300 w-16 h-16 block relative"}>
                                                    <Image src={`/sprites/${mission["item"]["image_name"]}.png`}
                                                           alt={mission["item"]["image_name"]}
                                                           className={"p-[0.25rem]"}
                                                           fill/>

                                                    {/*<div>{quest["mission"][itemKey]}</div>*/}
                                                    <div className={"text-xs leading-[1.2rem]" +
                                                        " text-center h-5 w-5 bg-red-300 absolute right-[-0.3rem] bottom-[-0.1rem] rounded-full border-white border"}>
                                                        {mission["cnt"]}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>

                                <div className={"flex flex-row gap-2"}>
                                    {
                                        quest["reward"].map((reward: Reward, idx2: number) => {

                                            console.log(reward);
                                            if (reward["item"] == null) {
                                                return;
                                            }


                                            return (

                                                <div key={idx2}
                                                     className={"rounded-2xl border-2 border-amber-300 w-16 h-16 block relative"}>
                                                    <Image src={`/sprites/${reward["item"]["image_name"]}.png`}
                                                           alt={reward["item"]["image_name"]}
                                                           className={"p-[0.25rem]"}
                                                           fill/>

                                                    {/*<div>{quest["mission"][itemKey]}</div>*/}
                                                    <div className={"text-xs leading-[1.2rem]" +
                                                        " text-center h-5 w-5 bg-red-300 absolute right-[-0.3rem] bottom-[-0.1rem] rounded-full border-white border"}>
                                                        {reward["cnt"]}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>

                            </div>
                        </div>
                    )


                })
            }
            </div>


        </div>
    );
}
