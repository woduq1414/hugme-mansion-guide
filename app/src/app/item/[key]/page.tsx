'use client'

import Image from "next/image";

import {groupedItemData, typedItemData} from "@/app/data/ItemData";

import {useEffect, useState} from "react";

import {Item, Mission, Quest, Reward} from "@/app/models/model";


import ItemWrapper from "@/app/components/ItemWrapper";
import {useRouter} from "next/navigation";
import exp from "node:constants";


export default function ItemDetailPage(
    {params}: { params: { key: string } }
) {
    // console.log(questData["m_TableData"])


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

    const item = typedItemObj[params.key];

    if (!item) {
        return (
            <div>아이템이 존재하지 않습니다.</div>
        );
    }

    return (

        <div className={"flex flex-col items-center mb-3"}>
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


            {
                item["selling_price"] && item["selling_price"] > 0 && (

                    <div className={"flex"}>
                        <span className={"flex flex-row items-center"}>
                            <span>
                                팔 때 :
                            </span>
                            <Image src={"/sprites/coin01.png"} alt={"coin"} width={20} height={20}></Image>
                             <span className={"font-bold"}>{item["selling_price"]}</span>
                        </span>
                        <span className={"flex flex-row items-center ml-3"}>
                            <span>
                                살 때 :
                            </span>
                            <Image src={"/sprites/coin01.png"} alt={"coin"} width={20} height={20}></Image>
                             <span className={"font-bold"}>{item["coin_price"]}</span>
                            <span className={"ml-1"}>
                                /
                            </span>
                            <Image src={"/sprites/ruby01.png"} alt={"ruby"} width={20} height={20}></Image>
                             <span className={"font-bold"}>{item["ruby_price"]}</span>
                        </span>

                    </div>
                )
            }

            {item["category"] == "MergeNormal" ? (
                    <div>

                        {
                            (() => {
                                const firstItem = (parseInt(params.key) - parseInt(params.key) % 100 + 1) + "";

                                let targetCategory = undefined;
                                for (let spawner in groupedItemData[0]) {

                                    if (groupedItemData[0][spawner][3]["spawn_items"]) {
                                        if (firstItem in groupedItemData[0][spawner][3]["spawn_items"]) {

                                            targetCategory = spawner;
                                            break;
                                        }
                                    }

                                }
                                if (!targetCategory) {
                                    return (
                                        <div></div>
                                    )
                                }

                                return (
                                    <div className={"flex flex-col gap-2 items-center"}>
                                        <div className={"font-bold text-xl mt-8"}>
                                            필요 에너지 기댓값
                                        </div>
                                        {
                                            groupedItemData[0][targetCategory].slice(3).map((item: Item, idx: number) => {
                                                let spawnItems = item["spawn_items"];
                                                let expectedPerEnergy = 0;
                                                for(let key in spawnItems){
                                                    console.log(item, key);
                                                   if(Math.floor(parseInt(key) / 100) == Math.floor(parseInt(params.key) / 100)){
                                                       expectedPerEnergy += spawnItems[key] * Math.pow(2, (parseInt(key) % 100 - 1));
                                                   }
                                                }
                                                let neededLv1Item = Math.pow(2, (parseInt(params.key) % 100 - 1));


                                                return (
                                                    <div key={idx} className={"flex flex-row gap-2 items-center"}>
                                                        <ItemWrapper item={item}/>
                                                        <div className={"text-lg ml-3"}>
                                                            {item["name"]}
                                                        </div>
                                                        <div className={"text-xl ml-3"}>
                                                        <span
                                                            className={" font-bold"}>{Math.floor(neededLv1Item / expectedPerEnergy * 10)/ 10}</span> 개
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                )

                                // return [].map((sdf) => {
                                //     return (
                                //         <div key={sdf} className={"flex flex-row gap-2 items-center"}>
                                //             <ItemWrapper item={typedItemObj["energy"]}/>
                                //             <div className={"text-lg ml-3"}>
                                //                 {typedItemObj["energy"]["name"]}
                                //             </div>
                                //             <div className={"text-xl ml-3"}>
                                //                 <span className={" font-bold"}>1</span> 개
                                //             </div>
                                //         </div>
                                //     )
                                // })
                            })()

                        }
                    </div>
                )
                :
                (
                    item["category"] == "MergeNormal" &&
                    <></>)
            }

            {item["category"] == "MergeSpawner" && item["spawn_items"] != null &&
            (Object.keys(item["spawn_items"]).length > 0) ? (
                    <div className={"flex flex-col gap-2 mt-10 items-center"}>

                        <div className={"flex flex-row gap-3"}>
                            <div className={"font-bold text-xl"}>
                                충전 시간
                            </div>
                            <div className={"text-xl"}>
                                {
                                    item["charge_time"] && item["charge_time"] > 0 ? (
                                        <span><span className={"font-bold"}>{item["charge_time"]}</span> 분</span>
                                    ) : <span>
                                1회용
                                </span>
                                }
                            </div>
                        </div>
                        <div className={"flex flex-row gap-3"}>
                            <div className={"font-bold text-xl"}>
                                생산량
                            </div>
                            <div className={"text-xl"}>
                                <span className={"font-bold"}>{item["capacity"]}</span> 개
                            </div>
                        </div>

                        <div className={"font-bold text-xl mt-8"}>
                            생산품
                        </div>
                        {

                            Object.entries(item["spawn_items"])

                                .sort(([, valueA], [, valueB]) => valueB - valueA)

                                .map(([key]) => key).map((key, idx) => {

                                if (item["spawn_items"] == null) {
                                    return;
                                }
                                //                               console.log(  Object.entries(item["spawn_items"])
                                // .sort(([, a], [, b]) => a - b)
                                // .reduce((r, [k, v]) => ({ ...r, [k]: v }), {}));

                                return (
                                    <div key={idx} className={"flex flex-row gap-2 items-center"}>
                                        <ItemWrapper item={typedItemObj[key]}/>
                                        <div className={"text-lg ml-3"}>
                                            {typedItemObj[key]["name"]}
                                        </div>
                                        <div className={"text-xl ml-3"}>
                                        <span
                                            className={" font-bold"}>{Math.round(item["spawn_items"][key] * 100)}</span> %
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                )
                :
                (
                    item["category"] == "MergeSpawner" &&
                    <div className={"text-2xl mt-10"}>
                        생산 불가
                    </div>)
            }

            {item["category"] == "MergeReward" && item["spawn_items"] != null &&
            (Object.keys(item["spawn_items"]).length > 0) ? (
                    <div className={"flex flex-col gap-2 mt-10 items-center"}>

                        <div className={"flex flex-row gap-3"}>
                            <div className={"font-bold text-xl"}>
                                오픈 시간
                            </div>
                            <div className={"text-xl"}>
                                {
                                    item["timer_minute"] && item["timer_minute"] > 0 ? (
                                        <span><span className={"font-bold"}>{item["timer_minute"]}</span> 분</span>
                                    ) : <span>
                                즉시
                                </span>
                                }
                            </div>
                        </div>
                        {
                            item["capacity"] && item["capacity"] > 0 && (
                                <div className={"flex flex-row gap-3"}>
                                    <div className={"font-bold text-xl"}>
                                        랜덤 생산량
                                    </div>
                                    <div className={"text-xl"}>
                                        <span className={"font-bold"}>{item["capacity"]}</span> 개
                                    </div>
                                </div>
                            )
                        }

                        <div className={"font-bold text-xl mt-8"}>
                            생산품
                        </div>
                        {

                            Object.entries(item["spawn_items"])

                                .sort(([, valueA], [, valueB]) => valueB - valueA)

                                .map(([key]) => key).map((key, idx) => {

                                if (item["spawn_items"] == null) {
                                    return;
                                }
                                //                               console.log(  Object.entries(item["spawn_items"])
                                // .sort(([, a], [, b]) => a - b)
                                // .reduce((r, [k, v]) => ({ ...r, [k]: v }), {}));

                                // console.log(key);
                                if(typedItemObj[key] === undefined){
                                    return (
                                        <div key={idx} className={"flex flex-row gap-2 items-center"}>
                                            <ItemWrapper item={typedItemObj[key]}/>
                                            <div className={"text-lg ml-3"}>
                                                미확인 아이템
                                            </div>
                                            {
                                                item["spawn_items"][key] >= 1 ? (
                                                        <div className={"text-xl ml-3"}>
                                        <span
                                            className={" font-bold"}>{item["spawn_items"][key]}</span> 개
                                                        </div>
                                                    ) :
                                                    <div className={"text-xl ml-3"}>
                                            <span
                                                className={" font-bold"}>{Math.round(item["spawn_items"][key] * 100)}</span> %
                                                    </div>

                                            }
                                        </div>
                                    );
                                }
                                return (
                                    <div key={idx} className={"flex flex-row gap-2 items-center"}>
                                        <ItemWrapper item={typedItemObj[key]}/>
                                        <div className={"text-lg ml-3"}>
                                            {typedItemObj[key]["name"]}
                                        </div>
                                        {
                                            item["spawn_items"][key] >= 1 ? (
                                                    <div className={"text-xl ml-3"}>
                                        <span
                                            className={" font-bold"}>{item["spawn_items"][key]}</span> 개
                                                    </div>
                                                ) :
                                                <div className={"text-xl ml-3"}>
                                            <span
                                                className={" font-bold"}>{Math.round(item["spawn_items"][key] * 100)}</span> %
                                                </div>

                                        }
                                    </div>
                                )
                            })

                        }
                    </div>
                )
                :
                (
                    <></>)
            }
        </div>

    )
        ;
}
