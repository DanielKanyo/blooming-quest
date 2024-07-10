import { EXTRA_REWARDS } from "./Rewards";

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
