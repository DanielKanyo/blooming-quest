import { useSelector } from "react-redux";

import { ActionIcon, Tooltip, Modal, Text, Image, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBackpack } from "@tabler/icons-react";

import leaft from "../Assets/Other/leaf.png";
import store from "../Store/Store";

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

const InventoryBody = () => {
    return <div>Display here the inventory...</div>;
};

export function Inventory() {
    const inventoryStore = useSelector((state: ReturnType<typeof store.getState>) => state.inventory);
    const [opened, { open, close }] = useDisclosure(false);

    if (!inventoryStore.inventory) {
        return null;
    }

    return (
        <>
            <Modal opened={opened} onClose={close} size="auto" centered radius="md">
                {inventoryStore.inventory.items.length ? <InventoryBody /> : <EmptyInventoryBody />}
            </Modal>
            <Tooltip label="Inventory" color="gray" radius="md">
                <ActionIcon radius="md" variant="light" color="gray" size="lg" aria-label="inventory" mr={12} onClick={open}>
                    <IconBackpack />
                </ActionIcon>
            </Tooltip>
        </>
    );
}
