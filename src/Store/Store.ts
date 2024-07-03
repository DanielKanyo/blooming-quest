import { configureStore } from "@reduxjs/toolkit";

import challengeReducer from "./Features/ChallengeSlice";
import userReducer from "./Features/UserSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        challenge: challengeReducer,
    },
});

export default store;
