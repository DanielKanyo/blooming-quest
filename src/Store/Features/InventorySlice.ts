import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Inventory, Item } from "../../Shared/Types/InventoryType";

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
        addItemToInventory: (state, action: PayloadAction<{ itemId: string; timestamp: number; quantity: number }>) => {
            const { itemId, timestamp, quantity } = action.payload;

            if (state.inventory) {
                if (state.inventory.items[itemId]) {
                    state.inventory.items[itemId].quantity += quantity;
                } else {
                    state.inventory.items[itemId] = {
                        quantity,
                        timestamp,
                    } as Item;
                }
            }
        },
    },
});

export const { updateInventory, addItemToInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
