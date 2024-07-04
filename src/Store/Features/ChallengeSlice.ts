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
        completeQuestInChallenge: (state, action: PayloadAction<{ questId: string; xpCurrent: number }>) => {
            if (state.challenge) {
                state.challenge.xpCurrent = action.payload.xpCurrent;
                state.challenge.completedQuests.push(action.payload.questId);
            }
        },
    },
});

export const { updateChallenge, updateChallengeLoading, addQuestToChallenge, completeQuestInChallenge } = challengeSlice.actions;
export default challengeSlice.reducer;
