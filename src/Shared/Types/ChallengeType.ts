import { Months } from "../../Services/ChallengeService";
import { Quest } from "./QuestType";

export type Challenge = {
    id: string;
    userId: string;
    year: number;
    month: Months;
    quests: Quest[];
    coinToComplete: number;
    coinCurrent: number;
    completedQuests: string[];
    completed: boolean;
};
