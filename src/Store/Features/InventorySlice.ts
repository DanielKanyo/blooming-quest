import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Inventory } from "../../Shared/Types/InventoryType";

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
    },
});

export const { updateInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
