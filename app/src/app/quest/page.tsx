'use client'

import Image from "next/image";

import questData from "../data/quest_data.json";

import {limit} from "@/app/data/limit";

const questFloorLimit = limit["quest"]["final_floor"];

import {useEffect, useState} from "react";

import {Item, Mission, Quest, Reward} from "../models/model";


import {typedItemData} from "@/app/data/ItemData";

import {typedQuestData} from "@/app/data/questData";

import ItemWrapper from "../components/ItemWrapper";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";


export default function Home() {
    // console.log(questData["m_TableData"])

    const [targetFloor, setTargetFloor] = useState(1);
    // console.log(typedQuestData);

    const typedItemObj: {
        [key: string]: Item
    } = {};
    typedItemData.forEach((item) => {
        typedItemObj[item["key"]] = item;
    });

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (searchParams.has('floor')) {
            setTargetFloor(parseInt(searchParams.get('floor') as string));
        }
    }, [searchParams])

    return (

        <div className={"flex flex-col w-full mb-2"}>
            <div className={"flex flex-row flex-wrap px-4 gap-2 w-full"}>
                {
                    [...Array(questFloorLimit)].map((_, i) => {
                        return i + 1;
                    }).map((idx) => {
                        return (
                            <div key={idx} className={`bg-amber-300 rounded-md px-2 text-lg cursor-pointer ${
                                targetFloor === idx ? 'bg-amber-500' : ''
                            }`}
                                 onClick={() => {
                                     router.push("/quest?floor=" + idx);
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

                                            // console.log(mission);
                                            if (mission["item"] == null) {
                                                return;
                                            }


                                            return (

                                                <ItemWrapper

                                                    key={
                                                        idx2
                                                    }
                                                    item={mission["item"]} cnt={mission["cnt"]}/>
                                            )
                                        })
                                    }

                                </div>

                                <div className={"flex flex-row gap-2 items-center"}>
                                    {
                                        quest["event"] && (
                                            <div className={"rounded-lg px-3 py-1 bg-gray-200 text-sm cursor-pointer"}>
                                                + {
                                                    quest["event"].split("open")[1].split("F")[0]
                                                }층 해금
                                            </div>
                                        )
                                    }
                                    {
                                        quest["reward"].map((reward: Reward, idx2: number) => {

                                            // console.log(reward);
                                            if (reward["item"] == null) {
                                                return;
                                            }


                                            return (

                                                <ItemWrapper
                                                    size={undefined}
                                                    key={
                                                        idx2
                                                    }
                                                    item={reward["item"]} cnt={reward["cnt"]}/>
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
