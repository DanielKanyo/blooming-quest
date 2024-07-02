import { Accordion, Text, Group, Avatar, Button, Badge, Blockquote } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

import { acceptQuest } from "../../Services/GameService";
import { Quest } from "../../Shared/Types/QuestType";

type QuestItemProps = {
    quest: Quest;
};

interface AccordionLabelProps {
    label: string;
    description: string;
}

function AccordionLabel({ label, description }: AccordionLabelProps) {
    return (
        <Group wrap="nowrap">
            <Avatar color="teal" radius="sm" size="49px" variant="filled">
                <IconHeart />
            </Avatar>
            <div>
                <Text size="lg" fw={700}>
                    {label}
                </Text>
                <Text size="sm" fw={400} truncate="end" w={230}>
                    {description}
                </Text>
            </div>
        </Group>
    );
}

export function QuestItem({ quest }: QuestItemProps) {
    const accept = (questId: string) => {
        // TODO: implement
        acceptQuest(questId);
    };

    return (
        <Accordion.Item value={quest.id}>
            <Accordion.Control>
                <AccordionLabel label="Health" description={quest.description} />
            </Accordion.Control>
            <Accordion.Panel>
                <Blockquote color="teal" mb={15} p={22}>
                    {quest.description}
                </Blockquote>
                <Group justify="flex-end" mb={15} gap="xs">
                    <Badge variant="light" size="lg" color="teal">
                        {quest.xp} XP
                    </Badge>
                    <Badge variant="light" size="lg" color="teal">
                        15 MIN
                    </Badge>
                </Group>
                <Button fullWidth variant="filled" color="teal" size="xs" onClick={() => accept(quest.id)}>
                    Accept
                </Button>
            </Accordion.Panel>
        </Accordion.Item>
    );
}
