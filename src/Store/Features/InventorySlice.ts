import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Inventory } from "../../Shared/Types/InventoryType";
import { Item } from "../../Shared/Types/ItemType";

export type InventoryStore = {
    inventory: Inventory | null;
    loading: boolean;
};

export const initInventory: InventoryStore = {
    inventory: null,
    loading: true,
};

export const inventorySlice = createSlice({
    name: "inventory",
    initialState: initInventory,
    reducers: {
        updateInventory: (_state, action: PayloadAction<InventoryStore>) => {
            return action.payload;
        },
        addItemToInventory: (
            state,
            action: PayloadAction<{ itemId: string; timestamp: number; quantity: number; extraReward: boolean }>
        ) => {
            const { itemId, timestamp, quantity, extraReward } = action.payload;

            if (state.inventory) {
                if (state.inventory.items[itemId]) {
                    state.inventory.items[itemId].quantity += quantity;
                } else {
                    const newItem: Item = {
                        id: itemId,
                        quantity,
                        timestamp,
                        extraReward,
                    };

                    state.inventory.items[itemId] = newItem;
                }
            }
        },
        subtractItemFromInventory: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
            const { itemId, quantity } = action.payload;

            if (state.inventory) {
                const item = state.inventory.items[itemId];

                if (item.quantity > 1) {
                    state.inventory.items[itemId].quantity -= quantity;
                } else {
                    delete state.inventory.items[itemId];
                }
            }
        },
    },
});

export const { updateInventory, addItemToInventory, subtractItemFromInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
