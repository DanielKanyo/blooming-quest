import { useCallback } from "react";
import { useSelector } from "react-redux";

import { Card, Image } from "@mantine/core";

import farm from "../../Assets/Other/farm.png";
import { Slot } from "../../Components/Slot/Slot";
import { TARGET_AREAS } from "../../Shared/TargetAreas";
import store from "../../Store/Store";
import "./HouseArea.css";
import { HOUSE_AREA_SLOT_IDS } from "./HouseAreaUtils";

export function HouseArea() {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);

    const findItemInSlotBySlotId = useCallback(
        (slotId: string) => {
            const itemIdInSlot = Object.entries(user.houseAreaSlots).find(([key]) => key === slotId)?.[1];

            return itemIdInSlot || null;
        },
        [user.houseAreaSlots]
    );

    return (
        <Card className="house-area" shadow="sm" padding="0" radius="md" h={190} mb={10}>
            <div style={{ overflow: "hidden", height: "100%", position: "relative" }}>
                <div className="tractor"></div>
                <div className="hay"></div>
                <div className="land"></div>
                <div className="cloud"></div>
                <div className="cloud2"></div>
                <div className="tree"></div>
                <Image className="barn" src={farm} h={140} w={140}></Image>
                <div className="tree-front-1">
                    <Slot
                        slotId={HOUSE_AREA_SLOT_IDS.S1}
                        itemId={findItemInSlotBySlotId(HOUSE_AREA_SLOT_IDS.S1)}
                        size={52}
                        extraRewardSlot={true}
                        target={TARGET_AREAS.HOUSE}
                    />
                </div>
                <div className="bush"></div>
                <div className="tree-front-2">
                    <div>
                        <Slot
                            slotId={HOUSE_AREA_SLOT_IDS.S2}
                            itemId={findItemInSlotBySlotId(HOUSE_AREA_SLOT_IDS.S2)}
                            size={52}
                            extraRewardSlot={true}
                            target={TARGET_AREAS.HOUSE}
                        />
                    </div>
                </div>
                <div className="hay-slot">
                    <Slot
                        slotId={HOUSE_AREA_SLOT_IDS.S3}
                        itemId={findItemInSlotBySlotId(HOUSE_AREA_SLOT_IDS.S3)}
                        size={52}
                        extraRewardSlot={true}
                        target={TARGET_AREAS.HOUSE}
                    />
                </div>
                <div className="tractor-slot">
                    <Slot
                        slotId={HOUSE_AREA_SLOT_IDS.S4}
                        itemId={findItemInSlotBySlotId(HOUSE_AREA_SLOT_IDS.S4)}
                        size={52}
                        extraRewardSlot={true}
                        target={TARGET_AREAS.HOUSE}
                    />
                </div>
            </div>
        </Card>
    );
}
