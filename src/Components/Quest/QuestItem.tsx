import { Card, Text, Group, Badge } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

import "./QuestItem.css";

type QuestItemProps = {
    description: string;
};

export function QuestItem({ description }: QuestItemProps) {
    return (
        <Card shadow="sm" padding="md" radius="md">
            <Group justify="space-between">
                <div style={{ display: "flex", width: "100%" }}>
                    <div className="quest-item-container">
                        <IconHeart color="white" size={30} />
                    </div>
                    <div className="details-container">
                        <Text size="lg" fw={700}>Health</Text>
                        <Text c="dimmed" size="sm">{description}</Text>

                        <div className="badge-container">
                            <Badge variant="default">15 min</Badge>
                            <Badge variant="default">Easy</Badge>
                            <Badge variant="gradient"
                                gradient={{ from: "cyan", to: "teal", deg: 60 }} >Accept</Badge>
                        </div>
                    </div>
                </div>
            </Group>
        </Card>
    );
}
