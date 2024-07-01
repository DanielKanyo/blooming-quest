import { ActionIcon, Avatar, Card, Text, Tooltip } from "@mantine/core";
import { IconHeart, IconPlus } from "@tabler/icons-react";

import "./QuestItem.css";
import { Quest } from "../../Shared/Types/QuestType";
import { acceptQuest } from "../../Services/GameService";

type QuestItemProps = {
    quest: Quest
};

export function QuestItem({ quest }: QuestItemProps) {

    const accept = (questId: string) => {
        // TODO
        console.log(questId);
        acceptQuest(questId)
    }

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
                    <Text size="sm">{quest.description}</Text>
                </div>
            </div>
            <Tooltip label="Accept quest" position="left">
                <ActionIcon variant="transparent" color="gray" aria-label="plus" className="add-quest-btn"
                    onClick={() => accept(quest.id)}>
                    <IconPlus style={{ width: '80%', height: '80%' }} stroke={2} />
                </ActionIcon>
            </Tooltip>
        </Card>
    );
}
