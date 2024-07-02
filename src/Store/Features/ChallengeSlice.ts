import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Challenge } from "../../Shared/Types/ChallengeType";

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
        updateChallengeLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { updateChallenge, updateChallengeLoading } = challengeSlice.actions;
export default challengeSlice.reducer;
