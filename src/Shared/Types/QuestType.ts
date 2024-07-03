import { Icon, IconChefHat, IconHeart, IconRun, IconSchool } from "@tabler/icons-react";

export type Quest = {
    id: string;
    category: QuestCategories;
    description: string;
    difficulty: QuestDifficulties;
    xp: number;
    completed?: boolean;
    accepted?: boolean;
};

export enum QuestCategories {
    Healt,
    Sport,
    Cooking,
    Education,
}

export enum QuestDifficulties {
    Easy,
    Intermediate,
    Hard,
}

export const DifficultyTextMapping = new Map<QuestDifficulties, string>([
    [QuestDifficulties.Easy, "Easy"],
    [QuestDifficulties.Intermediate, "Intermediate"],
    [QuestDifficulties.Hard, "Hard"],
]);

export const TextDifficultyMapping = new Map<string, QuestDifficulties>([
    ["Easy", QuestDifficulties.Easy],
    ["Intermediate", QuestDifficulties.Intermediate],
    ["Hard", QuestDifficulties.Hard],
]);

export const CategoryTextMapping = new Map<QuestCategories, string>([
    [QuestCategories.Healt, "Health and Wellness"],
    [QuestCategories.Sport, "Sport and Fitness"],
    [QuestCategories.Cooking, "Cooking and Food"],
    [QuestCategories.Education, "Learning and Education"],
]);

export const TextCategoryMapping = new Map<string, QuestCategories>([
    ["Health and Wellness", QuestCategories.Healt],
    ["Sport and Fitness", QuestCategories.Sport],
    ["Cooking and Food", QuestCategories.Cooking],
    ["Learning and Education", QuestCategories.Education],
]);

export const CategoryColorMapping = new Map<QuestCategories, string>([
    [QuestCategories.Healt, "teal"],
    [QuestCategories.Sport, "cyan"],
    [QuestCategories.Cooking, "yellow"],
    [QuestCategories.Education, "violet"],
]);

export const CategoryIconMapping = new Map<QuestCategories, Icon>([
    [QuestCategories.Healt, IconHeart],
    [QuestCategories.Sport, IconRun],
    [QuestCategories.Cooking, IconChefHat],
    [QuestCategories.Education, IconSchool],
]);

export const Categories = [
    CategoryTextMapping.get(QuestCategories.Healt)!,
    CategoryTextMapping.get(QuestCategories.Sport)!,
    CategoryTextMapping.get(QuestCategories.Cooking)!,
    CategoryTextMapping.get(QuestCategories.Education)!,
];

export const Difficulties = [
    DifficultyTextMapping.get(QuestDifficulties.Easy)!,
    DifficultyTextMapping.get(QuestDifficulties.Intermediate)!,
    DifficultyTextMapping.get(QuestDifficulties.Hard)!,
];
