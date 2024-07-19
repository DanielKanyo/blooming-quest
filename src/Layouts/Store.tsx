import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBuildingStore } from "@tabler/icons-react";

export function Store() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal.Root opened={opened} onClose={close} size="xl" centered>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Store</Modal.Title>
                        <Modal.CloseButton />
                    </Modal.Header>
                    <Modal.Body>Modal content</Modal.Body>
                </Modal.Content>
            </Modal.Root>
            <Tooltip label="Store" color="gray" radius="md">
                <ActionIcon radius="md" variant="light" color="gray" size="lg" aria-label="store" mr={12} onClick={open}>
                    <IconBuildingStore />
                </ActionIcon>
            </Tooltip>
        </>
    );
}
