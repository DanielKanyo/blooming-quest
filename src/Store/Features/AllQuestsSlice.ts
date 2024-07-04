import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Quest } from "../../Shared/Types/QuestType";

export type AllQuestsStore = {
    quests: Quest[];
    loading: boolean;
};

export const allQuestsSlice = createSlice({
    name: "allQuests",
    initialState: { quests: [], loading: true } as AllQuestsStore,
    reducers: {
        updateAllQuests: (_state, action: PayloadAction<AllQuestsStore>) => {
            return action.payload;
        },
        addQuest: (state, action: PayloadAction<Quest>) => {
            state.quests = [action.payload, ...state.quests];
        },
        removeQuest: (state, action: PayloadAction<string>) => {
            state.quests = state.quests.filter((q) => q.id !== action.payload);
        },
    },
});

export const { updateAllQuests, addQuest, removeQuest } = allQuestsSlice.actions;
export default allQuestsSlice.reducer;
