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
        updateTotalCoinInUser: (state, action: PayloadAction<number>) => {
            state.totalCoin += action.payload;
        },
    },
});

export const { updateUser, updateTotalCoinInUser } = userSlice.actions;
export default userSlice.reducer;
