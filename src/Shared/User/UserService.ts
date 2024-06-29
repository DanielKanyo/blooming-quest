import { doc, getDoc, setDoc } from "firebase/firestore";
import { store } from "../../Firebase/FirebaseConfig";
import { User } from "./UserType";

export const createUser = async (userId: string, userDetails: User) => {
    await setDoc(doc(store, "users", userId), userDetails);
};

export const fetchUser = async (userId: string): Promise<User | null> => {
    const docRef = doc(store, "users", userId);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? (docSnap.data() as User) : null;
};