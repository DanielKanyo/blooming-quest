import { Accordion, Text, Group, Avatar, Button } from "@mantine/core";
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
            <Avatar color="teal" radius="sm" size="45px" variant="filled">
                <IconHeart style={{ width: "60%", height: "60%" }} />
            </Avatar>
            <div>
                <Text>{label}</Text>
                <Text size="sm" c="dimmed" fw={400}>
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
                <div>{quest.description}</div>
                <div>
                    <Button variant="filled" onClick={() => accept(quest.id)}>
                        Accept
                    </Button>
                </div>
            </Accordion.Panel>
        </Accordion.Item>
    );
}
