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
    event? : string | null;
}

interface Item {
    key: string;
    image_name: string;
    comment: string;
    category: string;
    name: string;
    capacity?: number | null;
    charge_time?: number | null;
    timer_minute? : number | null;
    selling_price? : number | null;
    bubble_price? : number | null;
    ruby_price? : number | null;
    coin_price? : number | null;
    spawn_items? : {
        [key: string]: number
    } | null;


}

export type {Item, Quest, Mission, Reward};