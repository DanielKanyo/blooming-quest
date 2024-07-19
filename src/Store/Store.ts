import { configureStore } from "@reduxjs/toolkit";

import allQuestsReducer from "./Features/AllQuestsSlice";
import challengeReducer from "./Features/ChallengeSlice";
import inventoryReducer from "./Features/InventorySlice";
import userReducer from "./Features/UserSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        challenge: challengeReducer,
        allQuests: allQuestsReducer,
        inventory: inventoryReducer,
    },
});

export default store;
