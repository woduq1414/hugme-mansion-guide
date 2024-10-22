import Image from "next/image";
import {Item} from "@/app/models/model";

export default function ItemWrapper(
   props: {
         item: Item,
         cnt: number
   }
) {

    const {item, cnt} = props;

    return (
        <div
             className={"rounded-2xl border-2 border-amber-300 w-16 h-16 block relative"}>
            <Image src={`/sprites/${item["image_name"]}.png`}
                   alt={item["image_name"]}
                   className={"p-[0.25rem]"}
                   fill/>

            {/*<div>{quest["mission"][itemKey]}</div>*/}
            <div className={"text-xs leading-[1.2rem]" +
                " text-center h-5 w-5 bg-red-300 absolute right-[-0.3rem] bottom-[-0.1rem] rounded-full border-white border"}>
                {cnt}
            </div>
        </div>
    )
}
