import { arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

import { db } from "../Configs/Firebase/FirebaseConfig";
import { Challenge } from "../Shared/Types/ChallengeType";
import { Quest, QuestCategories, QuestDifficulties } from "../Shared/Types/QuestType";

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
    const challengesRef = collection(db, "challenges");
    const q = query(challengesRef, where("userId", "==", userId), where("year", "==", year), where("month", "==", month));
    const querySnapshot = await getDocs(q);

    let challenge: Challenge | null = null;

    querySnapshot.forEach((doc) => {
        challenge = doc.data() as Challenge;
    });

    return challenge;
};

export const joinChallenge = async (userId: string, year: number, month: Months): Promise<void> => {
    const docRef = doc(collection(db, "challenges"));

    const challenge: Challenge = {
        userId,
        year,
        month,
        id: docRef.id,
        quests: [],
        xpToComplete: 50,
        xpCurrent: 0,
        completedQuests: [],
    };

    await setDoc(docRef, challenge);
};

export const fetchQuests = async (): Promise<Quest[]> => {
    const q = query(collection(db, "quests"));
    const querySnapshot = await getDocs(q);

    const result: Quest[] = [];

    querySnapshot.forEach((doc) => {
        result.push(doc.data() as Quest);
    });

    return result;
};

export const acceptQuest = async (challengeId: string, questId: string) => {
    const questDocRef = doc(db, "quests", questId);
    const challengeDocRef = doc(db, "challenges", challengeId);

    const questDocSnap = await getDoc(questDocRef);
    const challengeDocSnap = await getDoc(challengeDocRef);

    const quest = questDocSnap.data() as Quest;
    const challenge = challengeDocSnap.data() as Challenge;

    if (!quest) {
        throw new Error("Quest does not exists...");
    }

    const questToAdd = {
        ...quest,
        completed: false,
    };

    await setDoc(challengeDocRef, { quests: [questToAdd, ...challenge.quests] }, { merge: true });
};

export const createQuest = async (
    category: QuestCategories,
    description: string,
    difficulty: QuestDifficulties,
    xp: number
): Promise<Quest> => {
    const docRef = doc(collection(db, "quests"));

    const quest: Quest = {
        category,
        description,
        difficulty,
        xp,
        id: docRef.id,
    };

    await setDoc(docRef, quest);

    const questDocRef = doc(db, "quests", docRef.id);

    return (await getDoc(questDocRef)).data() as Quest;
};

export const deleteQuest = async (questId: string): Promise<void> => {
    await deleteDoc(doc(db, "quests", questId));
};

export const completeQuest = async (challengeId: string, questId: string): Promise<void> => {
    const challengeDocRef = doc(db, "challenges", challengeId);

    await updateDoc(challengeDocRef, {
        completedQuests: arrayUnion(questId),
    });
};
