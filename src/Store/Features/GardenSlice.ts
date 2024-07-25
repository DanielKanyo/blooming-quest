import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Garden } from "../../Shared/Types/GardenType";

export type GardenStore = {
    gardens: Garden[];
};

export const initGardens: GardenStore = {
    gardens: [],
};

export const gardenSlice = createSlice({
    name: "garden",
    initialState: initGardens,
    reducers: {
        updateGardens: (_state, action: PayloadAction<GardenStore>) => {
            return action.payload;
        },
        updateItemInGardenSlotInStore: (state, action: PayloadAction<{ gardenId: string; slotId: string; itemId: string | null }>) => {
            const { gardenId, slotId, itemId } = action.payload;
            const garden = state.gardens.find((g) => g.gardenId === gardenId);

            if (garden) {
                garden.slots[slotId] = itemId;
            }
        },
    },
});

export const { updateGardens, updateItemInGardenSlotInStore } = gardenSlice.actions;
export default gardenSlice.reducer;
