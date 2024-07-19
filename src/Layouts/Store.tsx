import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBuildingStore } from "@tabler/icons-react";

export function Store() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} size="auto" centered radius="md">
                Modal content
            </Modal>
            <Tooltip label="Store" color="gray" radius="md">
                <ActionIcon radius="md" variant="light" color="gray" size="lg" aria-label="store" onClick={open}>
                    <IconBuildingStore size={22} />
                </ActionIcon>
            </Tooltip>
        </>
    );
}
