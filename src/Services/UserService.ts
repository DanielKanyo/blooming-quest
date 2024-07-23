import { deleteUser, updatePassword } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "../Configs/Firebase/FirebaseConfig";
import { User } from "../Shared/Types/UserType";

export const createUser = async (userId: string, userDetails: User) => {
    await setDoc(doc(db, "users", userId), userDetails);
};

export const fetchUser = async (userId: string): Promise<User | null> => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? (docSnap.data() as User) : null;
};

export const signOut = async (): Promise<void> => {
    await auth.signOut();
};

export const setNewPassword = async (newPassword: string): Promise<void> => {
    await updatePassword(auth.currentUser!, newPassword);
};

export const deleteAccount = async (): Promise<void> => {
    await deleteUser(auth.currentUser!);
};

export const deleteAccountData = async (): Promise<void> => {
    await deleteDoc(doc(db, "users", auth.currentUser!.uid));
};

export const updateTotalCoinAndGem = async (userId: string, newCoin: number, newGem: number) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    const { totalCoin, gem } = docSnap.data() as User;

    await setDoc(docRef, { totalCoin: totalCoin + newCoin, gem: gem + newGem }, { merge: true });
};
