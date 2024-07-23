import { useCallback } from "react";
import { useSelector } from "react-redux";

import { ActionIcon, Tooltip, Modal, Text, Image, Flex, SimpleGrid, Card, ScrollArea, Badge, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBackpack, IconFlower, IconSparkles } from "@tabler/icons-react";

import leaft from "../Assets/Other/leaf.png";
import { EXTRA_REWARDS, REWARDS } from "../Shared/Rewards";
import { Item } from "../Shared/Types/ItemType";
import { filterRewards } from "../Shared/Utils";
import store from "../Store/Store";

type InventoryBodyProps = {
    items: {
        [itemId: string]: Item;
    };
};

const EmptyInventoryBody = () => {
    return (
        <Flex direction="column" justify="center" align="center" px={10} pb={10}>
            <Image h={72} w={72} src={leaft} mb={16} />
            <Text size="xl" mb={10}>
                Your inventory is empty...
            </Text>
            <Text size="sm" c="dimmed" ta="center">
                Join challenges and complete quests <br /> to acquire rewards...
            </Text>
        </Flex>
    );
};

const ItemsArea = ({ items, simpleRewards }: { items: Item[]; simpleRewards: boolean }) => {
    const getRewardSrc = useCallback((reward: string) => {
        return REWARDS.get(reward) || EXTRA_REWARDS.get(reward);
    }, []);

    return (
        <div>
            <Tooltip label={simpleRewards ? "Rewards" : "Bonus Rewards"} color="gray">
                <Card c="white" bg={simpleRewards ? "teal" : "yellow"} style={{ display: "flex", alignItems: "center" }} p={12} radius="md">
                    {simpleRewards ? <IconFlower /> : <IconSparkles />}
                </Card>
            </Tooltip>
            <ScrollArea
                h={390}
                mt="md"
                style={{ background: "var(--mantine-color-dark-8)", borderRadius: "var(--mantine-radius-md)" }}
                type="never"
                p="md"
            >
                <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm">
                    {items.map((item) => (
                        <Card
                            key={item.id}
                            shadow="md"
                            padding="lg"
                            radius="md"
                            bg={simpleRewards ? "var(--mantine-color-dark-5)" : "rgba(255, 215, 0, 0.1)"}
                            style={{ position: "relative" }}
                        >
                            <Image radius="md" h={64} w={64} src={getRewardSrc(item.id)} />
                            <Badge variant="light" color="gray" style={{ position: "absolute", bottom: 5, right: 5 }} radius="md">
                                {item.quantity}
                            </Badge>
                        </Card>
                    ))}
                </SimpleGrid>
            </ScrollArea>
        </div>
    );
};

const InventoryBody = ({ items }: InventoryBodyProps) => {
    const simpleRewards = filterRewards(items, false);
    const extraRewards = filterRewards(items, true);

    return (
        <Group>
            <ItemsArea items={simpleRewards} simpleRewards={true} />
            <ItemsArea items={extraRewards} simpleRewards={false} />
        </Group>
    );
};

export function Inventory() {
    const inventoryStore = useSelector((state: ReturnType<typeof store.getState>) => state.inventory);
    const [opened, { open, close }] = useDisclosure(false);

    if (!inventoryStore.inventory) {
        return null;
    }

    return (
        <>
            <Modal opened={opened} onClose={close} size="auto" centered radius="md" title="Inventory">
                {Object.keys(inventoryStore.inventory.items).length ? (
                    <InventoryBody items={inventoryStore.inventory.items} />
                ) : (
                    <EmptyInventoryBody />
                )}
            </Modal>
            <Tooltip label="Inventory" color="gray" radius="md">
                <ActionIcon radius="md" variant="light" color="gray" size="lg" aria-label="inventory" onClick={open}>
                    <IconBackpack size={22} />
                </ActionIcon>
            </Tooltip>
        </>
    );
}
