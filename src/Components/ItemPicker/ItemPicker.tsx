import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Image, Flex, ActionIcon, Badge } from "@mantine/core";

import { addItem, subtractItem } from "../../Services/InventoryService";
import { updateItemInSlot } from "../../Services/ItemServie";
import { Item } from "../../Shared/Types/ItemType";
import { filterAndSortRewards } from "../../Shared/Utils";
import { addItemToInventory, subtractItemFromInventory } from "../../Store/Features/InventorySlice";
import { updateSlotItemInUser } from "../../Store/Features/UserSlice";
import store from "../../Store/Store";
import "./ItemPicker.css";

type ItemPickerProps = {
    items: {
        [itemId: string]: Item;
    };
    slotId: string;
    activeItemId: string | null;
    extraRewardSlot: boolean;
    loading: boolean;
    getRewardSrc: (reward: string, extraRewardSlot: boolean) => string | undefined;
    setLoading: (loading: boolean) => void;
};

export const ItemPicker = ({ items, slotId, activeItemId, extraRewardSlot, loading, getRewardSrc, setLoading }: ItemPickerProps) => {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const dispatch = useDispatch();

    const handleItemClick = useCallback(
        async (userId: string, slotId: string, itemId: string, activeItemId: string | null, extraReward: boolean) => {
            setLoading(true);

            try {
                // Update item in slot
                await updateItemInSlot(userId, slotId, itemId);
                // Subtract item in inventory
                await subtractItem(userId, itemId);
                // If old item id (item in slot) not null, move it back to inventory
                if (activeItemId) {
                    const timestamp = new Date().getTime();

                    await addItem(userId, activeItemId, timestamp, 1, extraReward);
                    // Update store
                    dispatch(addItemToInventory({ itemId: activeItemId, timestamp, quantity: 1, extraReward }));
                }
                // Update store
                dispatch(updateSlotItemInUser({ slotId, itemId }));
                dispatch(subtractItemFromInventory({ itemId, quantity: 1 }));
            } catch (err) {
                console.error("Something went wrong...", err);
            } finally {
                setLoading(false);
            }
        },
        [dispatch, setLoading]
    );

    const handleActiveItemClick = useCallback(
        async (userId: string, slotId: string, itemId: string, extraRewardSlot: boolean) => {
            setLoading(true);

            try {
                const timestamp = new Date().getTime();

                // Set slot back to null
                await updateItemInSlot(userId, slotId, null);
                // Move back item to inventory
                await addItem(userId, itemId, timestamp, 1, extraRewardSlot);

                // Do the same steps in store
                dispatch(updateSlotItemInUser({ slotId, itemId: null }));
                dispatch(addItemToInventory({ itemId, timestamp, quantity: 1, extraReward: extraRewardSlot }));
            } catch (err) {
                console.error("Something went wrong...", err);
            } finally {
                setLoading(false);
            }
        },
        [dispatch, setLoading]
    );

    const sortedItems = useMemo(() => filterAndSortRewards(items, extraRewardSlot), [extraRewardSlot, items]);

    return (
        <>
            {activeItemId && (
                <ActionIcon
                    variant="light"
                    h={100}
                    w={80}
                    radius="md"
                    color="gray"
                    mt="sm"
                    onClick={() => handleActiveItemClick(user.id, slotId, activeItemId, extraRewardSlot)}
                    disabled={loading}
                >
                    <Flex gap="xs" direction="column" align="center" justify="center">
                        <Image
                            className="item-img"
                            radius="md"
                            h={46}
                            w={46}
                            src={getRewardSrc(activeItemId, extraRewardSlot)}
                            alt={`item-${activeItemId}`}
                        />
                        <Badge variant="light" color="teal" radius="md">
                            Active
                        </Badge>
                    </Flex>
                </ActionIcon>
            )}
            <Flex direction="column" gap="xs">
                {sortedItems.map((item) => (
                    <ActionIcon
                        variant="light"
                        key={item.id}
                        className="item-btn"
                        h={100}
                        w={80}
                        radius="md"
                        color="gray"
                        onClick={() => handleItemClick(user.id, slotId, item.id, activeItemId, extraRewardSlot)}
                        disabled={loading}
                    >
                        <Flex gap="xs" direction="column" align="center" justify="center">
                            <Image
                                className="item-img"
                                radius="md"
                                h={46}
                                w={46}
                                src={getRewardSrc(item.id, extraRewardSlot)}
                                alt={`item-${item.id}`}
                            />
                            <Badge variant="light" color="gray" radius="md">
                                {item.quantity}
                            </Badge>
                        </Flex>
                    </ActionIcon>
                ))}
            </Flex>
        </>
    );
};
