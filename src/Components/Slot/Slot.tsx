import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Image, Menu, ScrollArea, Flex, ActionIcon, Badge, Loader, Center } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

import { addItem, subtractItem } from "../../Services/InventoryService";
import { updateItemInSlot } from "../../Services/ItemServie";
import { EXTRA_REWARDS, REWARDS } from "../../Shared/Rewards";
import { Item } from "../../Shared/Types/ItemType";
import { filterAndSortRewards } from "../../Shared/Utils";
import { addItemToInventory, subtractItemFromInventory } from "../../Store/Features/InventorySlice";
import { updateItemInSlotInUser } from "../../Store/Features/UserSlice";
import store from "../../Store/Store";
import "./Slot.css";

type SlotProps = {
    slotId: string;
    size: number;
    itemId: string | null;
    extraRewardSlot: boolean;
};

type ItemPickerProps = {
    items: {
        [itemId: string]: Item;
    };
    slotId: string;
    oldItemId: string | null;
    extraRewardSlot: boolean;
    loading: boolean;
    getRewardSrc: (reward: string, extraRewardSlot: boolean) => string | undefined;
    setLoading: (loading: boolean) => void;
};

const EmptyInventory = () => {
    return <div>Empty Inventory</div>;
};

const ItemPicker = ({ items, slotId, oldItemId, extraRewardSlot, loading, getRewardSrc, setLoading }: ItemPickerProps) => {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const dispatch = useDispatch();

    const handleItemClick = useCallback(
        async (userId: string, slotId: string, itemId: string, oldItemId: string | null, extraReward: boolean) => {
            setLoading(true);

            try {
                // Update item in slot
                await updateItemInSlot(userId, slotId, itemId);
                // Subtract item in inventory
                await subtractItem(userId, itemId);
                // If old item id (item in slot) not null, move it back to inventory
                if (oldItemId) {
                    const timestamp = new Date().getTime();

                    await addItem(userId, oldItemId, timestamp, 1, extraReward);
                    dispatch(addItemToInventory({ itemId: oldItemId, timestamp, quantity: 1, extraReward }));
                }
                // Update store
                dispatch(updateItemInSlotInUser({ slotId, itemId }));
                dispatch(subtractItemFromInventory({ itemId, quantity: 1 }));
            } catch (err) {
                console.error("Something went wrong...", err);
            } finally {
                setLoading(false);
            }
        },
        [dispatch, setLoading]
    );

    const detachItem = useCallback(
        async (userId: string, slotId: string, itemId: string, extraRewardSlot: boolean) => {
            setLoading(true);

            try {
                const timestamp = new Date().getTime();

                // Set slot back to null
                await updateItemInSlot(userId, slotId, null);
                // Move back item to inventory
                await addItem(userId, itemId, timestamp, 1, extraRewardSlot);

                // Do the same steps in store
                dispatch(updateItemInSlotInUser({ slotId, itemId: null }));
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
            {oldItemId && (
                <ActionIcon
                    variant="light"
                    h={100}
                    w={80}
                    radius="md"
                    color="gray"
                    disabled={loading}
                    onClick={() => detachItem(user.id, slotId, oldItemId, extraRewardSlot)}
                    mt="sm"
                >
                    <Flex gap="xs" direction="column" align="center" justify="center">
                        <Image
                            className="item-img"
                            radius="md"
                            h={46}
                            w={46}
                            src={getRewardSrc(oldItemId, extraRewardSlot)}
                            alt={`item-${oldItemId}`}
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
                        onClick={() => handleItemClick(user.id, slotId, item.id, oldItemId, extraRewardSlot)}
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

export function Slot({ itemId, slotId, size, extraRewardSlot }: SlotProps) {
    const inventoryStore = useSelector((state: ReturnType<typeof store.getState>) => state.inventory);
    const [loading, setLoading] = useState(false);

    const getRewardSrc = useCallback((reward: string, extraRewardSlot: boolean) => {
        if (extraRewardSlot) {
            return EXTRA_REWARDS.get(reward);
        }

        return REWARDS.get(reward);
    }, []);

    return (
        <Menu
            position="right-start"
            withArrow
            arrowPosition="center"
            shadow="md"
            transitionProps={{ transition: "fade-up", duration: 150 }}
            trigger="click-hover"
            radius="md"
        >
            <Menu.Target>
                <Card className="slot" shadow="md" padding="xs" radius="md">
                    {itemId ? (
                        <>
                            {loading ? (
                                <Center style={{ height: size, width: size }}>
                                    <Loader color="var(--mantine-color-dark-0)" type="dots" />
                                </Center>
                            ) : (
                                <Image className="slot-img" radius="md" h={size} w={size} src={getRewardSrc(itemId, extraRewardSlot)} />
                            )}
                        </>
                    ) : (
                        <Flex justify="center" align="center" style={{ height: size, width: size }}>
                            <IconPencil />
                        </Flex>
                    )}
                </Card>
            </Menu.Target>
            {inventoryStore.inventory && (
                <Menu.Dropdown px="sm" py={0}>
                    <ScrollArea h={200} type="never">
                        {Object.keys(inventoryStore.inventory.items).length ? (
                            <ItemPicker
                                items={inventoryStore.inventory.items}
                                oldItemId={itemId}
                                slotId={slotId}
                                extraRewardSlot={extraRewardSlot}
                                loading={loading}
                                getRewardSrc={getRewardSrc}
                                setLoading={setLoading}
                            />
                        ) : (
                            <EmptyInventory />
                        )}
                    </ScrollArea>
                </Menu.Dropdown>
            )}
        </Menu>
    );
}
