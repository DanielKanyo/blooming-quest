import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../Configs/Firebase/FirebaseConfig";
import { User } from "../Shared/Types/UserType";

export const placeItem = async (userId: string, placeId: string, itemId: string) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    const { houseArea } = docSnap.data() as User;

    houseArea[placeId] = itemId;

    await setDoc(docRef, { houseArea }, { merge: true });
};
