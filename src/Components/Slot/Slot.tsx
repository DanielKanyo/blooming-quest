import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { Card, Image, Menu, ScrollArea, Flex, ActionIcon, Badge } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

import { addItemToSlot } from "../../Services/ItemServie";
import { EXTRA_REWARDS, REWARDS } from "../../Shared/Rewards";
import { Item } from "../../Shared/Types/ItemType";
import { filterAndSortRewards } from "../../Shared/Utils";
import store from "../../Store/Store";
import "./Slot.css";

type SlotProps = {
    slotId: string;
    size: number;
    itemId: string | null;
};

type ItemPickerProps = {
    items: {
        [itemId: string]: Item;
    };
    slotId: string;
    getRewardSrc: (reward: string) => string | undefined;
};

const EmptyInventory = () => {
    return <div>Empty Inventory</div>;
};

const ItemPicker = ({ items, slotId, getRewardSrc }: ItemPickerProps) => {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const [loading, setLoading] = useState(false);

    const handleItemClick = useCallback(async (userId: string, slotId: string, itemId: string) => {
        setLoading(true);

        try {
            await addItemToSlot(userId, slotId, itemId);
            // TODO: Remove item from inventory, update store
            console.log("Done");
        } catch (err) {
            console.error("Something went wrong...", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const sortedItems = useMemo(() => filterAndSortRewards(items, true), [items]);

    return (
        <Flex gap="xs" direction="column">
            {sortedItems.map((item) => (
                <ActionIcon
                    variant="light"
                    key={item.id}
                    className="item-btn"
                    h={100}
                    w={70}
                    radius="md"
                    color="gray"
                    onClick={() => handleItemClick(user.id, slotId, item.id)}
                    disabled={loading}
                >
                    <Flex gap="xs" direction="column" align="center" justify="center">
                        <Image className="item-img" radius="md" h={44} w={44} src={getRewardSrc(item.id)} alt={`Item ${item.id}`} />
                        <Badge variant="light" color="gray" radius="md">
                            {item.quantity}
                        </Badge>
                    </Flex>
                </ActionIcon>
            ))}
        </Flex>
    );
};

export function Slot({ itemId, slotId, size }: SlotProps) {
    const inventoryStore = useSelector((state: ReturnType<typeof store.getState>) => state.inventory);

    const getRewardSrc = useCallback((reward: string) => {
        return REWARDS.get(reward) || EXTRA_REWARDS.get(reward);
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
                        <Image radius="md" h={size} w={size} src={getRewardSrc(itemId)} />
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
                            <ItemPicker items={inventoryStore.inventory.items} getRewardSrc={getRewardSrc} slotId={slotId} />
                        ) : (
                            <EmptyInventory />
                        )}
                    </ScrollArea>
                </Menu.Dropdown>
            )}
        </Menu>
    );
}
