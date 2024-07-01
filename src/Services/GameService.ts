import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { store } from "../Configs/Firebase/FirebaseConfig";
import { Challenge } from "../Shared/Types/ChallengeType";
import { Quest } from "../Shared/Types/QuestType";

export enum Months {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

export const fetchCurrentChallenge = async (userId: string, year: number, month: Months): Promise<Challenge | null> => {
    const challengesRef = collection(store, "challenges");
    const q = query(challengesRef, where("userId", "==", userId), where("year", "==", year), where("month", "==", month));
    const querySnapshot = await getDocs(q);

    let challenge: Challenge | null = null;

    querySnapshot.forEach((doc) => {
        challenge = doc.data() as Challenge;
    });

    return challenge;
};

export const joinChallenge = async (userId: string, year: number, month: Months): Promise<void> => {
    await addDoc(collection(store, "challenges"), {
        userId,
        year,
        month,
        quests: [],
    });
};

export const fetchQuests = async (): Promise<Quest[]> => {
    const q = query(collection(store, "quests"));
    const querySnapshot = await getDocs(q);

    const result: Quest[] = [];

    querySnapshot.forEach((doc) => {
        result.push(doc.data() as Quest);
    });

    return result;
};
