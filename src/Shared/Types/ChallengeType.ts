import { Months } from "../../Services/GameService";

export type Challenge = {
    userId: string;
    year: number;
    month: Months;
};
