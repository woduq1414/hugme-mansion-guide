import Image from "next/image";
import {Item} from "@/app/models/model";

export default function ItemWrapper(
    props: {
        item: Item,
        cnt: number | undefined
    }
) {

    const {item, cnt} = props;

    const borderColorMap: {
        [key: string]: string
    } = {
        "coin": "border-amber-300",
        "ruby": "border-red-300",
        "exp": "border-green-300",
        "cleaning products": "border-blue-300",
        "cleaning storages": "border-blue-300",
        "detergent": "border-blue-300",
        "tools": "border-green-500",
        "toolboxes": "border-green-500",
        "screws": "border-green-500",
        "paint cans": "border-green-500",
        "flowerpots": "border-yellow-800",
        "seedbag": "border-yellow-700",
        "plants": "border-yellow-900",
        "wood": "border-yellow-900",
        "stationery": "border-red-500",
        "toys": "border-red-500",
        "schoolbag": "border-red-500",
        "construction materia": "border-yellow-500",
        "construction pallets": "border-yellow-500",
        "pipes": "border-blue-500",
        "water": "border-blue-500",
        "lamp": "border-yellow-500",
        "household goods": "border-red-300",
        "shopping carts": "border-red-300"
    }

    let borderColor = "border-gray-300";

    if (item["comment"] && item["comment"].toLowerCase() in borderColorMap) {
        // console.log(item["comment"].toLowerCase())
        borderColor = borderColorMap[item["comment"].toLowerCase()];
    }


    return (
        <div
            className={`rounded-2xl border-2 ${borderColor} w-16 h-16 block relative cursor-pointer`}>
            <Image src={`/sprites/${item["image_name"]}.png`}
                   alt={item["image_name"]}
                   className={"p-[0.25rem]"}
                   fill/>

            {/*<div>{quest["mission"][itemKey]}</div>*/}
            {
                cnt && cnt > 0 ? (
                    <div className={`text-xs leading-[1.2rem]" +
                " text-center h-5 w-5 bg-white absolute right-[-0.3rem] bottom-[-0.1rem] rounded-full ${borderColor} border-2 font-bold`}>
                        {cnt}
                    </div>
                ) : null
            }
        </div>
    )
}
