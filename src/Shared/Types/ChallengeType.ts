import { Months } from "../../Services/GameService";
import { Quest } from "./QuestType";

export type Challenge = {
    id: string;
    userId: string;
    year: number;
    month: Months;
    quests: Quest[];
    xpToComplete: number;
    xpCurrent: number;
};
