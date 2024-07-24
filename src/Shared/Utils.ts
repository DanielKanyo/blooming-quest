import { EXTRA_REWARDS } from "./Rewards";
import { Item } from "./Types/ItemType";

export const randomNumberBetween = (min: number, max: number): number => {
    return Math.floor(Math.random() * max) + min;
};

export const randomExtraReward = (): string => {
    const values = Array.from(EXTRA_REWARDS.keys());
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
};

export const daysInThisMonth = () => {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

export const MONTHS = new Map<number, string>([
    [0, "January"],
    [1, "February"],
    [2, "March"],
    [3, "April"],
    [4, "May"],
    [5, "June"],
    [6, "July"],
    [7, "August"],
    [8, "September"],
    [9, "October"],
    [10, "November"],
    [11, "December"],
]);

export const JOIN_CHALLENGE_TEXT = `Join the ${MONTHS.get(new Date().getMonth())} challenge to be able to accept quests...`;

export const GOLD_COLOR = "#FFD700";

export const filterAndSortRewards = (items: { [itemId: string]: Item }, extraReward: boolean) => {
    return Object.values(items)
        .filter((value) => value.extraReward === extraReward)
        .sort((a, b) => b.timestamp - a.timestamp);
};
