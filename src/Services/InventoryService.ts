import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

import { db } from "../Configs/Firebase/FirebaseConfig";
import { Inventory } from "../Shared/Types/InventoryType";
import { Item } from "../Shared/Types/ItemType";

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

export const addItem = async (userId: string, itemId: string, timestamp: number, quantity: number, extraReward: boolean) => {
    const userInventoryRef = doc(db, "inventories", userId);
    const userInventorySnap = await getDoc(userInventoryRef);
    const userInventory = userInventorySnap.data() as Inventory;

    if (userInventory.items[itemId]) {
        userInventory.items[itemId].quantity += quantity;
    } else {
        const newItem: Item = {
            id: itemId,
            quantity,
            timestamp,
            extraReward,
        };

        userInventory.items[itemId] = newItem;
    }

    await updateDoc(userInventoryRef, { items: userInventory.items });
};

export const subtractItem = async (userId: string, itemId: string) => {
    const userInventoryRef = doc(db, "inventories", userId);
    const userInventorySnap = await getDoc(userInventoryRef);
    const userInventory = userInventorySnap.data() as Inventory;

    const item = userInventory.items[itemId];

    if (item) {
        if (item.quantity > 1) {
            userInventory.items[itemId].quantity -= 1;
        } else {
            delete userInventory.items[itemId];
        }

        return await updateDoc(userInventoryRef, { items: userInventory.items });
    } else {
        console.error("Item not found in inventory...");
    }
};
