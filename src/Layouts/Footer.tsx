import { ActionIcon, Badge, Flex, Tooltip } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";

const version = process.env.VERSION;

export function Footer() {
    const { toggle, fullscreen } = useFullscreen();

    return (
        <Flex gap={10} h={60} justify="flex-end" align="center" direction="row" wrap="wrap" px="lg">
            <Tooltip label={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"} color="gray" radius="md">
                <ActionIcon variant="light" color="gray" size="lg" aria-label="full-screen" onClick={toggle} radius="md">
                    {fullscreen ? <IconArrowsMinimize size={16} /> : <IconArrowsMaximize size={16} />}
                </ActionIcon>
            </Tooltip>
            <Badge h={34} variant="light" size="lg" color="gray" radius="md">
                {version}
            </Badge>
        </Flex>
    );
}
