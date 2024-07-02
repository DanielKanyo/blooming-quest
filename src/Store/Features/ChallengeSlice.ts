import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Challenge } from "../../Shared/Types/ChallengeType";

export const challengeSlice = createSlice({
    name: "challenge",
    initialState: {} as Challenge,
    reducers: {
        updateChallenge: (_state, action: PayloadAction<Challenge>) => {
            return action.payload;
        },
    },
});

export const { updateChallenge } = challengeSlice.actions;
export default challengeSlice.reducer;
