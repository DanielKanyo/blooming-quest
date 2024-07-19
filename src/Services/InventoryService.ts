import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

import { db } from "../Configs/Firebase/FirebaseConfig";
import { Inventory, Item } from "../Shared/Types/InventoryType";

export const createInventory = async (userId: string) => {
    const inventory: Inventory = {
        userId,
        items: {},
    };

    await setDoc(doc(db, "inventories", userId), inventory);
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

export const addItem = async (userId: string, itemId: string, timestamp: number, quantity: number) => {
    const userInventoryRef = doc(db, "inventories", userId);
    const userInventorySnap = await getDoc(userInventoryRef);
    const userInventory = userInventorySnap.data() as Inventory;

    if (userInventory.items[itemId]) {
        userInventory.items[itemId].quantity += quantity;
    } else {
        userInventory.items[itemId] = {
            quantity,
            timestamp,
        } as Item;
    }

    await updateDoc(userInventoryRef, { items: userInventory.items });
};
