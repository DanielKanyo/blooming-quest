import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../Configs/Firebase/FirebaseConfig";
import { Garden } from "../Shared/Types/GardenType";
import { User } from "../Shared/Types/UserType";

export const updateItemInHouseSlot = async (userId: string, slotId: string, itemId: string | null) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    const { houseAreaSlots } = userDoc.data() as User;

    houseAreaSlots[slotId] = itemId;

    await setDoc(userRef, { houseAreaSlots }, { merge: true });
};

export const updateItemInGardenSlot = async (gardenId: string, slotId: string, itemId: string | null) => {
    const gardensRef = doc(db, "gardens", gardenId);
    const gardenDoc = await getDoc(gardensRef);

    const { slots } = gardenDoc.data() as Garden;

    slots[slotId] = itemId;

    await setDoc(gardensRef, { slots }, { merge: true });
};
