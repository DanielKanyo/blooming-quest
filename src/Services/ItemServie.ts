import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../Configs/Firebase/FirebaseConfig";
import { User } from "../Shared/Types/UserType";

export const updateItemInSlot = async (userId: string, slotId: string, itemId: string | null) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    const { houseAreaSlots } = userDoc.data() as User;

    houseAreaSlots[slotId] = itemId;

    await setDoc(userRef, { houseAreaSlots }, { merge: true });
};
