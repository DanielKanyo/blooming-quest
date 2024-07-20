export type Inventory = {
    userId: string;
    items: {
        [itemId: string]: Item;
    };
};

export type Item = {
    id: string;
    quantity: number;
    timestamp: number;
    extraReward: boolean;
};
