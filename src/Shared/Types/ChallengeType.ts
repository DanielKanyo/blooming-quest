import { Months } from "../../Services/GameService";
import { Quest } from "./QuestType";

export type Challenge = {
    userId: string;
    year: number;
    month: Months;
    quests: Quest[];
};
