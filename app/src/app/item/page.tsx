'use client'

import Image from "next/image";

import questData from "../data/quest_data.json";


import {Key, useEffect, useState} from "react";

import {Item, Mission, Quest, Reward} from "../models/model";

const typedQuestData: Quest[] = questData as unknown as Quest[];

import {typedItemData} from "@/app/data/ItemData";

import ItemWrapper from "../components/ItemWrapper";


export default function ItemPage() {
    // console.log(questData["m_TableData"])

    const [targetCategory, setTargetCategory] = useState(0);



    const groupedItemData: {
        [key: number]: {
            [key: string]: Item[]
        }
    } = {
        0: {},
        1: {},
        2: {},
    };

    typedItemData.forEach((item) => {
        let categoryIndex: number = 0;
        if (item["category"] == "MergeSpawner") {
            categoryIndex = 0;
        } else if (item["category"] == "MergeNormal") {
            categoryIndex = 1;
        } else {
            categoryIndex = 2;
        }

        if (item["comment"]) {
            if (!(item["comment"].toLowerCase() in groupedItemData[categoryIndex])) {
                groupedItemData[categoryIndex][item["comment"].toLowerCase()] = [item];
            } else {
                groupedItemData[categoryIndex][item["comment"].toLowerCase()].push(item);
            }
        }


    });

    const engToKor: {
        [key: string]: string
    } = {
        "coin": "코인",
        "ruby": "루비",
        "exp": "경험치",
        "cleaning products": "청소 도구",
        "cleaning storages": "청소용구함",
        "detergent": "세제",
        "tools": "공구",
        "toolboxes": "공구상자",
        "screws": "나사",
        "paint cans": "페인트",
        "flowerpots": "화분",
        "seedbag": "씨앗주머니",
        "plants": "식물",
        "wood": "목재",
        "stationery": "학용품",
        "toys": "장난감",
        "schoolbag": "책가방",
        "construction materia": "건축재료",
        "construction pallets": "공사자재함",
        "pipes": "파이프",
        "water": "물",
        "lamp": "전등",
        "household goods": "생활용품",
        "electronic products" : "전자제품",
        "shopping carts": "쇼핑카트",
        "energydrink" : "에너지 부스터",
        "timebooster" : "타임 부스터",
        "battery" : "배터리"

    }


    return (

        <div className={"flex flex-col w-full "}>
            <div className={"flex flex-row flex-wrap px-4 gap-2 w-full"}>
                {
                    ["생산템", "일반템", "특수템"].map((category, idx) => {
                        return (
                            <div key={idx} className={`bg-amber-300 rounded-md px-2 text-lg cursor-pointer ${
                                targetCategory === idx ? 'bg-amber-500' : ''
                            }`}
                                 onClick={() => {

                                     setTargetCategory(idx);
                                 }}
                            >
                                {category}
                            </div>
                        );

                    })
                }
            </div>
            <div className={"flex w-full flex-col gap-4 px-4 pt-3 "}>
                {
                    Object.keys(groupedItemData[targetCategory]).map((category, idx) => {
                        return (
                            <div key={idx} className={""}>
                                <div className={"font-bold text-lg"}>{engToKor[category]}</div>
                                <div className={"flex flex-row gap-2 flex-wrap "}>
                                    {
                                        groupedItemData[targetCategory][category].map((item: Item, idx2: number) => {
                                            return (
                                                <ItemWrapper key={
                                                    idx2
                                                }
                                                             item={item} cnt={undefined}/>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        );
                    })
                }
            </div>


        </div>
    );
}
