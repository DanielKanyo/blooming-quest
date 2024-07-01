import { Avatar, Card, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

import "./QuestItem.css";

type QuestItemProps = {
    description: string;
};

export function QuestItem({ description }: QuestItemProps) {
    return (
        <Card shadow="sm" padding="md" radius="md" className="quest-card">
            <div className="icon-and-title-container">
                <Avatar variant="filled" radius="sm" size="lg" color="grape">
                    <IconHeart size="1.5rem" />
                </Avatar>
                <div className="category-and-description-container">
                    <Text c="white" size="lg" fw={700}>
                        Health
                    </Text>
                    <Text size="sm">{description}</Text>
                </div>
            </div>
        </Card>
    );
}
