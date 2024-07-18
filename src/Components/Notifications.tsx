import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";

export function Notifications() {
    return (
        <Tooltip label="Notifications" color="gray">
            <ActionIcon variant="transparent" size="xl" color="whiet" aria-label="notifications" mr={32}>
                <IconBell style={{ width: "65%", height: "65%" }} />
            </ActionIcon>
        </Tooltip>
    );
}
