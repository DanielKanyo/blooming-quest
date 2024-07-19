import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";

export function Notifications() {
    return (
        <Tooltip label="Notifications" color="gray" radius="md">
            <ActionIcon radius="md" variant="light" color="gray" size="lg" aria-label="notifications" mr={32}>
                <IconBell />
            </ActionIcon>
        </Tooltip>
    );
}
