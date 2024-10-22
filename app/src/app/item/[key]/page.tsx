'use client'

import Image from "next/image";

import {typedItemData} from "@/app/data/ItemData";

import {useEffect, useState} from "react";

import {Item, Mission, Quest, Reward} from "@/app/models/model";


import ItemWrapper from "@/app/components/ItemWrapper";
import {useRouter} from "next/navigation";


export default function ItemDetailPage(
    {params}: { params: { key: string } }
) {
    // console.log(questData["m_TableData"])

    const [targetFloor, setTargetFloor] = useState(1);

    const router = useRouter();


    const typedItemObj: {
        [key: string]: Item
    } = {};
    typedItemData.forEach((item) => {
        typedItemObj[item["key"]] = item;
    });

    function movePage(key: number) {
        if (key in typedItemObj) {
            router.push(`/item/${key}`);
        }
    }


    return (

        <div className={"flex flex-col items-center"}>
            <div className={"flex flex-row justify-center gap-6 mt-10 items-center"}>
                <div className={`cursor-pointer
                ${(parseInt(params.key) - 1) + "" in typedItemObj ? "cursor-pointer" : "invisible"}`}
                     onClick={() => {
                         movePage(parseInt(params.key) - 1);
                     }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                    </svg>
                </div>

                <ItemWrapper
                    size={"large"}
                    item={typedItemObj[params.key]}
                    cnt={undefined}
                />
                <div className={`cursor-pointer
                ${(parseInt(params.key) + 1) + "" in typedItemObj ? "cursor-pointer" : "invisible"}`}
                     onClick={() => {
                         movePage(parseInt(params.key) + 1);
                     }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                    </svg>
                </div>


            </div>

            <div className={"flex flex-col gap-2 mt-3 justify-center"}>
                <div className={"text-2xl font-bold text-center"}>{typedItemObj[params.key].name}</div>

            </div>
        </div>

    );
}
