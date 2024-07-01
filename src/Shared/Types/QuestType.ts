export type Quest = {
    category: QuestCategories;
    description: string;
    difficulty: Difficulties;
    xp: number;
};

export enum QuestCategories {
    Healt,
}

export enum Difficulties {
    Easy,
    Medium,
    Hard,
}
