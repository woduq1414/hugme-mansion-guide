'use client'

import Image from "next/image";

import questData from "../data/quest_data.json";


import {Key, useEffect, useState} from "react";

import {Item, Mission, Quest, Reward} from "../models/model";

const typedQuestData: Quest[] = questData as unknown as Quest[];

import {typedItemData, itemEngToKor, groupedItemData} from "@/app/data/ItemData";

import ItemWrapper from "../components/ItemWrapper";
import {useRouter} from "next/navigation";
import {useSearchParams} from 'next/navigation'

export default function ItemPage() {
    // console.log(questData["m_TableData"])

    const [targetCategory, setTargetCategory] = useState(0);

    const router = useRouter();

    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.has('category')) {
            setTargetCategory(parseInt(searchParams.get('category') as string));
        }
    }, [searchParams])





    return (

        <div className={"flex flex-col w-full "}>
            <div className={"flex flex-row flex-wrap px-4 gap-2 w-full"}>
                {
                    ["생산템", "일반템", "보상템", "특수템",].map((category, idx) => {
                        return (
                            <div key={idx} className={`bg-amber-300 rounded-md px-2 text-lg cursor-pointer ${
                                targetCategory === idx ? 'bg-amber-500' : ''
                            }`}
                                 onClick={() => {
                                     router.push("/item?category=" + idx);
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
                                <div className={"font-bold text-lg"}>{itemEngToKor[category]}</div>
                                <div className={"flex flex-row gap-2 flex-wrap "}>
                                    {
                                        groupedItemData[targetCategory][category].map((item: Item, idx2: number) => {
                                            return (
                                                <ItemWrapper
                                                    size={undefined}
                                                    key={
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
