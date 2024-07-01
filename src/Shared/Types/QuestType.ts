export type Quest = {
    id: string;
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
