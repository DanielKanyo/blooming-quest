import { useCallback } from "react";
import { useSelector } from "react-redux";

import { Card, Image } from "@mantine/core";

import farm from "../../Assets/Other/farm.png";
import { ItemBox } from "../../Components/ItemBox/ItemBox";
import store from "../../Store/Store";
import "./HouseArea.css";
import { HOUSE_AREA_PLACE_IDS } from "./HouseAreaUtils";

export function HouseArea() {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);

    const findItemInBox = useCallback(
        (placeId: string) => {
            const itemIdInPlace = Object.entries(user.houseArea).find(([key]) => key === placeId)?.[1];

            return itemIdInPlace || null;
        },
        [user.houseArea]
    );

    return (
        <Card className="house-area" shadow="sm" padding="0" radius="md" h={190} mb={10}>
            <div style={{ overflow: "hidden", height: "100%", position: "relative" }}>
                <div className="land"></div>
                <div className="cloud"></div>
                <div className="cloud2"></div>
                <div className="tree"></div>
                <Image className="barn" src={farm} h={140} w={140}></Image>
                <div className="tractor"></div>
                <div className="hay"></div>
                <div className="tree-front" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ItemBox placeId={HOUSE_AREA_PLACE_IDS.P1} size={54} itemId={findItemInBox(HOUSE_AREA_PLACE_IDS.P1)} />
                </div>
                <div className="bush"></div>
            </div>
        </Card>
    );
}
