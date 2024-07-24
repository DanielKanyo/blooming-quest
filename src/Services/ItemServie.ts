import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../Configs/Firebase/FirebaseConfig";
import { User } from "../Shared/Types/UserType";

export const addItemToSlot = async (userId: string, slotId: string, itemId: string) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    const { houseArea } = userDoc.data() as User;

    houseArea[slotId] = itemId;

    await setDoc(userRef, { houseArea }, { merge: true });
};
