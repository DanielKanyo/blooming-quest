import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Quest } from "../../Shared/Types/QuestType";

export type AllQuestsStore = {
    quests: Quest[];
    loading: boolean;
};

export const initAllQuests: AllQuestsStore = {
    quests: [],
    loading: true,
};

export const allQuestsSlice = createSlice({
    name: "allQuests",
    initialState: initAllQuests,
    reducers: {
        updateAllQuests: (_state, action: PayloadAction<AllQuestsStore>) => {
            return action.payload;
        },
        updateAllQuestsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        extendAllQuests: (state, action: PayloadAction<Quest[]>) => {
            state.quests = [...state.quests, ...action.payload];
        },
        addQuest: (state, action: PayloadAction<Quest>) => {
            state.quests = [action.payload, ...state.quests];
        },
        removeQuest: (state, action: PayloadAction<string>) => {
            state.quests = state.quests.filter((q) => q.id !== action.payload);
        },
    },
});

export const { updateAllQuests, addQuest, removeQuest, extendAllQuests, updateAllQuestsLoading } = allQuestsSlice.actions;
export default allQuestsSlice.reducer;
