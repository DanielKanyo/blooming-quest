import { useSelector } from "react-redux";

import { ActionIcon, Tooltip, Modal, Text, Image, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBackpack } from "@tabler/icons-react";

import leaft from "../Assets/Other/leaf.png";
import store from "../Store/Store";

const EmptyInventoryBody = () => {
    return (
        <Flex direction="column" justify="center" align="center" p={10} pt={0}>
            <Image h={66} w={66} src={leaft} mb={10} />
            <Text size="xl" mb={10}>
                Your inventory is empty...
            </Text>
            <Text size="sm" c="dimmed" mb={16} ta="center">
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
            <Modal.Root opened={opened} onClose={close} size="auto" centered>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header>
                        <Modal.CloseButton />
                    </Modal.Header>
                    <Modal.Body>{inventoryStore.inventory.items.length ? <InventoryBody /> : <EmptyInventoryBody />}</Modal.Body>
                </Modal.Content>
            </Modal.Root>
            <Tooltip label="Inventory" color="gray">
                <ActionIcon variant="transparent" size="xl" color="whiet" aria-label="inventory" mr={12} onClick={open}>
                    <IconBackpack />
                </ActionIcon>
            </Tooltip>
        </>
    );
}
