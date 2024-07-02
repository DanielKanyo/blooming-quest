import { createContext } from "react";

import { Challenge } from "../Shared/Types/ChallengeType";

export const ChallengeContext = createContext({} as Challenge | null);
