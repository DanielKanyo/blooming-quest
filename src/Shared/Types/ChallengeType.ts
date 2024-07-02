import { Months } from "../../Services/GameService";

export type Challenge = {
    id: string;
    userId: string;
    year: number;
    month: Months;
    quests: [];
};
