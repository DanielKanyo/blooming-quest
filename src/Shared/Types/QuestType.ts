import { Icon, IconHeart, IconRun } from "@tabler/icons-react";

export type Quest = {
    id: string;
    category: QuestCategories;
    description: string;
    difficulty: Difficulties;
    xp: number;
    completed?: boolean;
};

export enum QuestCategories {
    Healt,
    Sport,
}

export enum Difficulties {
    Easy,
    Medium,
    Hard,
}

export const CategoryTextMapping = new Map<QuestCategories, string>([
    [QuestCategories.Healt, "Health"],
    [QuestCategories.Sport, "Sport"],
]);

export const CategoryColorMapping = new Map<QuestCategories, string>([
    [QuestCategories.Healt, "teal"],
    [QuestCategories.Sport, "cyan"],
]);

export const CategoryIconMapping = new Map<QuestCategories, Icon>([
    [QuestCategories.Healt, IconHeart],
    [QuestCategories.Sport, IconRun],
]);
