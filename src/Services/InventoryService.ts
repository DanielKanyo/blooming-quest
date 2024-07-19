import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

import { db } from "../Configs/Firebase/FirebaseConfig";
import { Inventory } from "../Shared/Types/InventoryType";

export const createInventory = async (userId: string) => {
    const inventoriesRef = doc(collection(db, "inventories"));

    const inventory: Inventory = {
        userId,
        id: inventoriesRef.id,
        items: [],
    };

    await setDoc(inventoriesRef, inventory);
};

export const fetchInventory = async (userId: string) => {
    const inventoryRef = collection(db, "inventories");

    const q = query(inventoryRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    let inventory: Inventory | null = null;

    querySnapshot.forEach((doc) => {
        inventory = doc.data() as Inventory;
    });

    return inventory;
};
