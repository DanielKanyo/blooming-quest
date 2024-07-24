import { Item } from "./ItemType";

export type Inventory = {
    userId: string;
    items: {
        [itemId: string]: Item;
    };
};
