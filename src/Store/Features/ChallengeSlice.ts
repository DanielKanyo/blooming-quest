import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Challenge } from "../../Shared/Types/ChallengeType";
import { Quest } from "../../Shared/Types/QuestType";

export type ChallengeStore = {
    challenge: Challenge | null;
    loading: boolean;
};

export const initChallenge: ChallengeStore = {
    challenge: null,
    loading: true,
};

export const challengeSlice = createSlice({
    name: "challenge",
    initialState: initChallenge,
    reducers: {
        updateChallenge: (_state, action: PayloadAction<ChallengeStore>) => {
            return action.payload;
        },
        updateChallengeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        addQuestToChallenge: (state, action: PayloadAction<Quest>) => {
            if (state.challenge) {
                state.challenge.quests.push(action.payload);
            }
        },
        completeQuestInChallenge: (state, action: PayloadAction<{ questId: string; coinCurrent: number }>) => {
            if (state.challenge) {
                state.challenge.coinCurrent = action.payload.coinCurrent;
                state.challenge.completedQuests.push(action.payload.questId);
            }
        },
        completeChallenge: (state) => {
            if (state.challenge) {
                state.challenge.completed = true;
            }
        },
    },
});

export const { updateChallenge, updateChallengeLoading, addQuestToChallenge, completeQuestInChallenge, completeChallenge } =
    challengeSlice.actions;
export default challengeSlice.reducer;
