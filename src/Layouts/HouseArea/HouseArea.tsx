import { Card, Image } from "@mantine/core";

import farm from "../../Assets/Other/farm.png";
import "./HouseArea.css";

export function HouseArea() {
    return (
        <Card className="house-area" shadow="sm" padding="0" radius="sm" h={190} mb={10}>
            <div style={{ overflow: "hidden", height: "100%", position: "relative" }}>
                <div className="land"></div>
                <div className="cloud"></div>
                <div className="cloud2"></div>
                <div className="tree"></div>
                <Image className="barn" src={farm} h={140} w={140}></Image>
                <div className="tractor"></div>
                <div className="hay"></div>
            </div>
        </Card>
    );
}
