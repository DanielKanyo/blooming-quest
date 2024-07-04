import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Challenge } from "../../Shared/Types/ChallengeType";
import { Quest } from "../../Shared/Types/QuestType";

export type ChallengeStore = {
    challenge: Challenge | null;
    loading: boolean;
};

export const challengeSlice = createSlice({
    name: "challenge",
    initialState: { challenge: null, loading: true } as ChallengeStore,
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
    },
});

export const { updateChallenge, updateChallengeLoading, addQuestToChallenge } = challengeSlice.actions;
export default challengeSlice.reducer;
