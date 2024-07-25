import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { Card, Image, Menu, ScrollArea, Flex, Loader, Center } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

import { EXTRA_REWARDS, REWARDS } from "../../Shared/Rewards";
import store from "../../Store/Store";
import { ItemPicker } from "../ItemPicker/ItemPicker";
import "./Slot.css";

type SlotProps = {
    slotId: string;
    size: number;
    itemId: string | null;
    extraRewardSlot: boolean;
    target: string;
    gardenId?: string;
};

type SlotImageProps = {
    src: string;
    size: number;
};

type SlotLoaderProps = {
    size: number;
};

type SlotContentProps = {
    itemId: string | null;
    size: number;
    extraRewardSlot: boolean;
    getRewardSrc: (reward: string, extraRewardSlot: boolean) => string;
};

const SlotImage = ({ src, size }: SlotImageProps) => <Image radius="md" h={size} w={size} src={src} />;

const SlotLoader = ({ size }: SlotLoaderProps) => (
    <Center style={{ height: size, width: size }}>
        <Loader size={20} color="var(--mantine-color-gray-3)" type="dots" />
    </Center>
);

const SlotContent = ({ itemId, size, extraRewardSlot, getRewardSrc }: SlotContentProps) =>
    itemId ? (
        <SlotImage src={getRewardSrc(itemId, extraRewardSlot)} size={size} />
    ) : (
        <Flex justify="center" align="center" style={{ height: size, width: size }}>
            <IconPencil color="var(--mantine-color-gray-3)" />
        </Flex>
    );

export function Slot({ slotId, itemId, size, extraRewardSlot, target, gardenId }: SlotProps) {
    const { inventory } = useSelector((state: ReturnType<typeof store.getState>) => state.inventory);
    const [loading, setLoading] = useState(false);

    const getRewardSrc = useCallback((reward: string, extraRewardSlot: boolean) => {
        return extraRewardSlot ? EXTRA_REWARDS.get(reward)! : REWARDS.get(reward)!;
    }, []);

    return (
        <Menu
            position="right-start"
            withArrow
            arrowPosition="center"
            shadow="md"
            transitionProps={{ transition: "fade-up", duration: 150 }}
            trigger="hover"
            radius="md"
            openDelay={250}
        >
            <Menu.Target>
                <Card className="slot" shadow="md" padding={8} radius="md">
                    {loading ? (
                        <SlotLoader size={size} />
                    ) : (
                        <SlotContent itemId={itemId} size={size} extraRewardSlot={extraRewardSlot} getRewardSrc={getRewardSrc} />
                    )}
                </Card>
            </Menu.Target>
            {inventory && (
                <Menu.Dropdown px="sm" py={0}>
                    <ScrollArea h={210} type="never">
                        <ItemPicker
                            items={inventory.items}
                            slotId={slotId}
                            activeItemId={itemId}
                            extraRewardSlot={extraRewardSlot}
                            target={target}
                            loading={loading}
                            getRewardSrc={getRewardSrc}
                            setLoading={setLoading}
                            gardenId={gardenId}
                        />
                    </ScrollArea>
                </Menu.Dropdown>
            )}
        </Menu>
    );
}
