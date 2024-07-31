import { ActionIcon, Card, Flex, Modal, Tooltip, Image, Text, NumberFormatter, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBuildingStore } from "@tabler/icons-react";

import coin from "../Assets/Other/coin.png";
import gem from "../Assets/Other/diamond.png";
import { useSelector } from "react-redux";
import store from "../Store/Store";
import { useMemo } from "react";

export function Marketplace() {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const [opened, { open, close }] = useDisclosure(false);

    const formattedCoins = useMemo(() => <NumberFormatter value={user.totalCoin} thousandSeparator />, [user.totalCoin]);

    const formattedGems = useMemo(() => <NumberFormatter value={user.gem} thousandSeparator />, [user.gem]);

    return (
        <>
            <Modal opened={opened} onClose={close} size="auto" centered radius="md" title="Marketplace">
                <Flex gap="xs">
                    <Card shadow="md" padding="lg" radius="md" bg="var(--mantine-color-dark-5)">
                        <Flex direction="row" justify="center" align="center">
                            <Text c="white" size="xl" mr={12}>
                                {formattedCoins}
                            </Text>
                            <Image h={33} w={33} src={coin} />
                        </Flex>
                    </Card>
                    <Card shadow="md" padding="lg" radius="md" bg="var(--mantine-color-dark-5)">
                        <Flex direction="row" justify="center" align="center">
                            <Text c="white" size="xl" mr={12}>
                                {formattedGems}
                            </Text>
                            <Image h={33} w={33} src={gem} />
                        </Flex>
                    </Card>
                </Flex>
                <Divider my="md" />
            </Modal>
            <Tooltip label="Marketplace" color="gray" radius="md">
                <ActionIcon radius="md" variant="light" color="gray" size="lg" aria-label="store" onClick={open}>
                    <IconBuildingStore size={22} />
                </ActionIcon>
            </Tooltip>
        </>
    );
}
