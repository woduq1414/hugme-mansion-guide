import itemData from "@/app/data/item_data.json";


import {Item, Mission, Quest, Reward} from "../models/model";



export const typedItemData: Item[] = itemData as Item[];


export const itemEngToKor: {
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