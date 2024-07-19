import {
    Icon,
    IconChefHat,
    IconPalette,
    IconPlant,
    IconPlant2,
    IconSchool,
    IconSocial,
    IconStretching2,
    IconTrekking,
} from "@tabler/icons-react";

export type Quest = {
    id: string;
    category: QuestCategories;
    description: string;
    difficulty: QuestDifficulties;
    coin: number;
    reward: string;
    extraReward?: string;
    timestamp?: number;
};

export enum QuestCategories {
    FitnessAndHealth,
    CookingAndFood,
    LearningAndEducation,
    SpiritualAndMindfulness,
    CreativeArts,
    AdventureAndExploration,
    PersonalGrowthAndLifestyle,
    SocialAndCommunity,
}

export enum QuestDifficulties {
    Easy,
    Medium,
    Hard,
}

export const DifficultyTextMapping = new Map<QuestDifficulties, string>([
    [QuestDifficulties.Easy, "Easy"],
    [QuestDifficulties.Medium, "Medium"],
    [QuestDifficulties.Hard, "Hard"],
]);

export const TextDifficultyMapping = new Map<string, QuestDifficulties>([
    ["Easy", QuestDifficulties.Easy],
    ["Medium", QuestDifficulties.Medium],
    ["Hard", QuestDifficulties.Hard],
]);

export const CategoryTextMapping = new Map<QuestCategories, string>([
    [QuestCategories.FitnessAndHealth, "Fitness and Health"],
    [QuestCategories.CookingAndFood, "Cooking and Food"],
    [QuestCategories.LearningAndEducation, "Learning and Education"],
    [QuestCategories.SpiritualAndMindfulness, "Spiritual and Mindfulness"],
    [QuestCategories.CreativeArts, "Creative Arts"],
    [QuestCategories.AdventureAndExploration, "Adventure and Exploration"],
    [QuestCategories.PersonalGrowthAndLifestyle, "Personal Growth and Lifestyle"],
    [QuestCategories.SocialAndCommunity, "Social And Community"],
]);

export const TextCategoryMapping = new Map<string, QuestCategories>([
    ["Fitness and Health", QuestCategories.FitnessAndHealth],
    ["Cooking and Food", QuestCategories.CookingAndFood],
    ["Learning and Education", QuestCategories.LearningAndEducation],
    ["Spiritual and Mindfulness", QuestCategories.SpiritualAndMindfulness],
    ["Creative Arts", QuestCategories.CreativeArts],
    ["Adventure and Exploration", QuestCategories.AdventureAndExploration],
    ["Personal Growth and Lifestyle", QuestCategories.PersonalGrowthAndLifestyle],
    ["Social And Community", QuestCategories.SocialAndCommunity],
]);

export const CategoryColorMapping = new Map<QuestCategories, string>([
    [QuestCategories.FitnessAndHealth, "teal"],
    [QuestCategories.CookingAndFood, "yellow"],
    [QuestCategories.LearningAndEducation, "violet"],
    [QuestCategories.SpiritualAndMindfulness, "green"],
    [QuestCategories.CreativeArts, "pink"],
    [QuestCategories.AdventureAndExploration, "lime"],
    [QuestCategories.PersonalGrowthAndLifestyle, "orange"],
    [QuestCategories.SocialAndCommunity, "grape"],
]);

export const CategoryIconMapping = new Map<QuestCategories, Icon>([
    [QuestCategories.FitnessAndHealth, IconStretching2],
    [QuestCategories.CookingAndFood, IconChefHat],
    [QuestCategories.LearningAndEducation, IconSchool],
    [QuestCategories.SpiritualAndMindfulness, IconPlant2],
    [QuestCategories.CreativeArts, IconPalette],
    [QuestCategories.AdventureAndExploration, IconTrekking],
    [QuestCategories.PersonalGrowthAndLifestyle, IconPlant],
    [QuestCategories.SocialAndCommunity, IconSocial],
]);

export const Categories = [
    CategoryTextMapping.get(QuestCategories.FitnessAndHealth)!,
    CategoryTextMapping.get(QuestCategories.CookingAndFood)!,
    CategoryTextMapping.get(QuestCategories.LearningAndEducation)!,
    CategoryTextMapping.get(QuestCategories.SpiritualAndMindfulness)!,
    CategoryTextMapping.get(QuestCategories.CreativeArts)!,
    CategoryTextMapping.get(QuestCategories.AdventureAndExploration)!,
    CategoryTextMapping.get(QuestCategories.PersonalGrowthAndLifestyle)!,
    CategoryTextMapping.get(QuestCategories.SocialAndCommunity)!,
];

export const Difficulties = [
    DifficultyTextMapping.get(QuestDifficulties.Easy)!,
    DifficultyTextMapping.get(QuestDifficulties.Medium)!,
    DifficultyTextMapping.get(QuestDifficulties.Hard)!,
];
