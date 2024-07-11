import { Card, Center, Image } from "@mantine/core";

import house from "../../Assets/Other/house.png";
import "./HouseArea.css";

export function HouseArea() {
    return (
        <Card className="house-area" shadow="sm" padding="lg" radius="sm" h={190} mb={10}>
            <div style={{ overflow: "hidden", height: "100%", position: "relative", borderRadius: "var(--mantine-radius-sm)" }}>
                <div className="sky"></div>
                <div className="sun"></div>
                <div className="cloud"></div>
                <div className="land"></div>
                <Center h="100%">
                    <Image src={house} h={110} w={110} style={{ zIndex: 1 }}></Image>
                </Center>
                <div className="tree1"></div>
                <div className="tree2"></div>
                <div className="bush"></div>
                <div className="fence"></div>
            </div>
        </Card>
    );
}
