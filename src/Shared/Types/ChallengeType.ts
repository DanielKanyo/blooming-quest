import { Months } from "../../Services/GameService";

export type Challenge = {
    userId: string;
    year: number;
    month: Months;
    quests: Quest[];
};

export type Quest = {
    name: string;
    description: string;
};
