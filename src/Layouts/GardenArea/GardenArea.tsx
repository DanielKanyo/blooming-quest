import { useCallback } from "react";

import { Card, Flex, SimpleGrid } from "@mantine/core";

import { Slot } from "../../Components/Slot/Slot";
import { TARGET_AREAS } from "../../Shared/TargetAreas";
import { Garden } from "../../Shared/Types/GardenType";
import "./GardenArea.css";

type GardenAreaProps = {
    garden: Garden;
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
        <Card className="garden-area" shadow="sm" padding="lg" radius="md" h={370} bg="var(--mantine-color-teal-8)">
            <Flex gap="xs" w="100%" h="100%">
                <div style={{ background: "gray", width: "100%" }}>a</div>
                <div className="garden-field">
                    <SimpleGrid cols={6} spacing="xs" verticalSpacing="xs" p={10}>
                        {Object.keys(garden.slots)
                            .sort()
                            .map((slotId) => {
                                return (
                                    <Slot
                                        key={slotId}
                                        slotId={slotId}
                                        itemId={findItemInSlotBySlotId(slotId)}
                                        size={48}
                                        extraRewardSlot={false}
                                        target={TARGET_AREAS.GARDEN}
                                        gardenId={garden.gardenId}
                                    />
                                );
                            })}
                    </SimpleGrid>
                </div>
                <div style={{ background: "gray", width: "100%" }}>c</div>
            </Flex>
        </Card>
    );
}
