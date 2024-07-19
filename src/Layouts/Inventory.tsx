import { ActionIcon, Tooltip, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBackpack } from "@tabler/icons-react";

export function Inventory() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal.Root opened={opened} onClose={close} size="xl" centered>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Inventory</Modal.Title>
                        <Modal.CloseButton />
                    </Modal.Header>
                    <Modal.Body>Modal content</Modal.Body>
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
