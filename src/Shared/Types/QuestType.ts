export type Quest = {
    id: string;
    category: QuestCategories;
    description: string;
    difficulty: Difficulties;
    xp: number;
    acceptedByChallenges?: string[]
};

export enum QuestCategories {
    Healt,
}

export enum Difficulties {
    Easy,
    Medium,
    Hard,
}
