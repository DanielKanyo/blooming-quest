import { useCallback } from "react";

import { Card, Flex, SimpleGrid, Image, Group } from "@mantine/core";

import bench from "../../Assets/Other/bench.png";
import marsh from "../../Assets/Other/marsh.png";
import scarecrow from "../../Assets/Other/scarecrow.png";
import shovel from "../../Assets/Other/shovel.png";
import { Slot } from "../../Components/Slot/Slot";
import { DEFAULT_GARDEN_SLOTS } from "../../Shared/GardenUtils";
import { TARGET_AREAS } from "../../Shared/TargetAreas";
import { Garden } from "../../Shared/Types/GardenType";
import "./GardenArea.css";

type GardenAreaProps = {
    garden: Garden;
};

type SectionProps = {
    garden: Garden;
    findItemInSlotBySlotId: (slotId: string) => string | null;
};

const LeftSection = ({ garden, findItemInSlotBySlotId }: SectionProps) => {
    return (
        <div className="left-section">
            <Group justify="center" gap="md">
                <div className="bush2"></div>
                <Image className="bench" radius="md" h={90} w={90} src={bench} />
                <Slot
                    slotId={DEFAULT_GARDEN_SLOTS.SL1}
                    itemId={findItemInSlotBySlotId(DEFAULT_GARDEN_SLOTS.SL1)}
                    size={48}
                    extraRewardSlot={true}
                    target={TARGET_AREAS.GARDEN}
                    gardenId={garden.gardenId}
                />
            </Group>
            <Group justify="center" gap="xl" mt={8} ml={-5}>
                <Slot
                    slotId={DEFAULT_GARDEN_SLOTS.SL2}
                    itemId={findItemInSlotBySlotId(DEFAULT_GARDEN_SLOTS.SL2)}
                    size={48}
                    extraRewardSlot={true}
                    target={TARGET_AREAS.GARDEN}
                    gardenId={garden.gardenId}
                />
                <Slot
                    slotId={DEFAULT_GARDEN_SLOTS.SL3}
                    itemId={findItemInSlotBySlotId(DEFAULT_GARDEN_SLOTS.SL3)}
                    size={48}
                    extraRewardSlot={true}
                    target={TARGET_AREAS.GARDEN}
                    gardenId={garden.gardenId}
                />
            </Group>
            <Image className="marsh" radius="md" h={300} w={300} src={marsh} />
            <div className="marsh-slot">
                <Slot
                    slotId={DEFAULT_GARDEN_SLOTS.SL4}
                    itemId={findItemInSlotBySlotId(DEFAULT_GARDEN_SLOTS.SL4)}
                    size={48}
                    extraRewardSlot={true}
                    target={TARGET_AREAS.GARDEN}
                    gardenId={garden.gardenId}
                />
            </div>
        </div>
    );
};

const MiddleSection = ({ garden, findItemInSlotBySlotId }: SectionProps) => {
    return (
        <div className="middle-section">
            <SimpleGrid cols={6} spacing="xs" verticalSpacing="xs">
                {Object.keys(garden.slots)
                    .sort()
                    .map((slotId) => {
                        return (
                            <div key={slotId} className="garden-slot">
                                <Slot
                                    slotId={slotId}
                                    itemId={findItemInSlotBySlotId(slotId)}
                                    size={48}
                                    extraRewardSlot={false}
                                    target={TARGET_AREAS.GARDEN}
                                    gardenId={garden.gardenId}
                                />
                            </div>
                        );
                    })}
            </SimpleGrid>
            <Image className="scarecrow" radius="md" h={110} w={110} src={scarecrow} />
            <Image className="shovel" radius="md" h={85} w={85} src={shovel} />
        </div>
    );
};

const RightSection = () => {
    return <div className="right-section"></div>;
};

export function GardenArea({ garden }: GardenAreaProps) {
    const findItemInSlotBySlotId = useCallback(
        (slotId: string): string | null => {
            const itemIdInSlot = Object.entries(garden.slots).find(([key]) => key === slotId)?.[1];

            return itemIdInSlot || null;
        },
        [garden]
    );

    return (
        <Card className="garden-area" shadow="sm" padding="lg" radius="md" h={350} bg="var(--mantine-color-teal-8)">
            <Flex gap="xs" w="100%" h="100%">
                <LeftSection garden={garden} findItemInSlotBySlotId={findItemInSlotBySlotId} />
                <MiddleSection garden={garden} findItemInSlotBySlotId={findItemInSlotBySlotId} />
                <RightSection />
            </Flex>
        </Card>
    );
}
