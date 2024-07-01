import { createContext } from "react";

import { Challenge } from "./ChallengeType";

export const ChallengeContext = createContext({} as Challenge | null);
