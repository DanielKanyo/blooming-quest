import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "../../Shared/Types/UserType";

export const initUser = {} as User;

export const userSlice = createSlice({
    name: "user",
    initialState: initUser,
    reducers: {
        updateUser: (_state, action: PayloadAction<User>) => {
            return action.payload;
        },
        updateTotalCoinAndGemInUser: (state, action: PayloadAction<{ totalCoin: number; gem: number }>) => {
            state.totalCoin += action.payload.totalCoin;
            state.gem += action.payload.gem;
        },
    },
});

export const { updateUser, updateTotalCoinAndGemInUser } = userSlice.actions;
export default userSlice.reducer;
