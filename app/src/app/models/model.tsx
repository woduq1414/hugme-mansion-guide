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
    comment: string;
    category: string;
}

export type {Item, Quest, Mission, Reward};