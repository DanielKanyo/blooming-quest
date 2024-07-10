import { Badge, Flex, Image } from "@mantine/core";

import "./BadgeWithImage.css";

type BadgeWithImageProps = {
    text: string | number;
    imgSrc: string;
    color: string;
    shine?: boolean;
    marginRight?: number;
};

export function BadgeWithImage({ text, imgSrc, shine, color, marginRight }: BadgeWithImageProps) {
    return (
        <Badge pr={8} pl={0} radius="sm" variant="light" size="lg" mr={marginRight} h={28} color={color} style={{ position: "relative" }}>
            {shine && <span className="shine-element"></span>}
            <Flex align="center">
                <Badge mt={2} variant="transparent" color="gray" size="lg" pl={8}>
                    {text}
                </Badge>
                <Image mt={10} ml={-6} radius="md" h={30} w={30} src={imgSrc} />
            </Flex>
        </Badge>
    );
}
