export type Garden = {
    gardenId: string;
    challengeId: string;
    timestamp: number;
    slots: Slots;
};

type Slots = {
    [key: string]: string | null;
};
