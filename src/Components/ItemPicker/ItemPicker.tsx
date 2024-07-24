import { Dispatch, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Image, Flex, ActionIcon, Badge } from "@mantine/core";
import { UnknownAction } from "@reduxjs/toolkit";

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

const handleUpdateSlot = async (
    userId: string,
    slotId: string,
    newItemId: string | null,
    oldItemId: string | null,
    extraReward: boolean,
    setLoading: (loading: boolean) => void,
    dispatch: Dispatch<UnknownAction>
) => {
    setLoading(true);

    try {
        // Update item in slot
        await updateItemInSlot(userId, slotId, newItemId);

        if (newItemId) {
            // Subtract new item from inventory
            await subtractItem(userId, newItemId);
            dispatch(subtractItemFromInventory({ itemId: newItemId, quantity: 1 }));
        }

        if (oldItemId) {
            const timestamp = new Date().getTime();
            // Add old item back to inventory
            await addItem(userId, oldItemId, timestamp, 1, extraReward);
            dispatch(addItemToInventory({ itemId: oldItemId, timestamp, quantity: 1, extraReward }));
        }

        // Update store
        dispatch(updateSlotItemInUser({ slotId, itemId: newItemId }));
    } catch (err) {
        console.error("Something went wrong...", err);
    } finally {
        setLoading(false);
    }
};

export const ItemPicker = ({ items, slotId, activeItemId, extraRewardSlot, loading, getRewardSrc, setLoading }: ItemPickerProps) => {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const dispatch = useDispatch();

    const handleItemClick = useCallback(
        (itemId: string) => {
            handleUpdateSlot(user.id, slotId, itemId, activeItemId, extraRewardSlot, setLoading, dispatch);
        },
        [user.id, slotId, activeItemId, extraRewardSlot, setLoading, dispatch]
    );

    const handleActiveItemClick = useCallback(() => {
        handleUpdateSlot(user.id, slotId, null, activeItemId, extraRewardSlot, setLoading, dispatch);
    }, [user.id, slotId, activeItemId, extraRewardSlot, setLoading, dispatch]);

    const sortedItems = useMemo(() => filterAndSortRewards(items, extraRewardSlot), [extraRewardSlot, items]);

    return (
        <>
            {activeItemId && (
                <ActionIcon
                    variant="light"
                    h={100}
                    w={82}
                    radius="md"
                    color="gray"
                    mt="sm"
                    onClick={handleActiveItemClick}
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
                        <Badge color="teal" radius="md">
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
                        w={82}
                        radius="md"
                        color="gray"
                        onClick={() => handleItemClick(item.id)}
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
