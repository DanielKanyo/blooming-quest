import { useCallback } from "react";
import { useSelector } from "react-redux";

import { Card, Image, Menu, ScrollArea, Flex, ActionIcon } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

import { placeItem } from "../../Services/ItemServie";
import { EXTRA_REWARDS, REWARDS } from "../../Shared/Rewards";
import { Item } from "../../Shared/Types/ItemType";
import store from "../../Store/Store";
import "./ItemBox.css";

type ItemProps = {
    placeId: string;
    size: number;
    itemId: string | null;
};

type ItemPickerProps = {
    items: {
        [itemId: string]: Item;
    };
    placeId: string;
    getRewardSrc: (reward: string) => string | undefined;
};

const EmptyInventory = () => {
    return <div>Empty Inventory</div>;
};

const ItemPicker = ({ items, placeId, getRewardSrc }: ItemPickerProps) => {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);

    const handlePlaceItem = useCallback(async (userId: string, placeId: string, itemId: string) => {
        try {
            await placeItem(userId, placeId, itemId);
            // TODO: Remove item from inventory, update store
            console.log("Done");
        } catch {
            console.log("Something went wrong...");
        }
    }, []);

    const sortItems = useCallback((items: { [itemId: string]: Item }) => {
        return Object.values(items).sort((a, b) => b.timestamp - a.timestamp);
    }, []);

    const sortedItems = sortItems(items);

    return (
        <Flex gap="xs" direction="column">
            {sortedItems.map((item) => (
                <ActionIcon
                    variant="light"
                    key={item.id}
                    className="item-box-btn"
                    size="xl"
                    p="xl"
                    radius="md"
                    color="gray"
                    onClick={() => handlePlaceItem(user.id, placeId, item.id)}
                >
                    <Image radius="md" h={44} w={44} src={getRewardSrc(item.id)} />
                </ActionIcon>
            ))}
        </Flex>
    );
};

export function ItemBox({ itemId, placeId, size }: ItemProps) {
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
                <Card className="item-box" shadow="md" padding="xs" radius="md">
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
                    <ScrollArea h={180} type="never">
                        {Object.keys(inventoryStore.inventory.items).length ? (
                            <ItemPicker items={inventoryStore.inventory.items} getRewardSrc={getRewardSrc} placeId={placeId} />
                        ) : (
                            <EmptyInventory />
                        )}
                    </ScrollArea>
                </Menu.Dropdown>
            )}
        </Menu>
    );
}
