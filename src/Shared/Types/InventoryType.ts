export type Inventory = {
    userId: string;
    items: {
        [itemId: string]: Item;
    };
};

export type Item = {
    quantity: number;
    timestamp: number;
    extraReward: boolean;
};
