import { deleteUser, updatePassword } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

import { auth, store } from "../../Configs/Firebase/FirebaseConfig";
import { User } from "./UserType";

export const createUser = async (userId: string, userDetails: User) => {
    await setDoc(doc(store, "users", userId), userDetails);
};

export const fetchUser = async (userId: string): Promise<User | null> => {
    const docRef = doc(store, "users", userId);
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
    await deleteDoc(doc(store, "users", auth.currentUser!.uid));
};
