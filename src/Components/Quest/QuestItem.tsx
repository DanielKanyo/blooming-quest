import { useDispatch } from "react-redux";

import { Accordion, Text, Group, Avatar, Badge, Blockquote, ActionIcon } from "@mantine/core";
import { IconHeart, IconPlus } from "@tabler/icons-react";

import { acceptQuest } from "../../Services/GameService";
import { Challenge } from "../../Shared/Types/ChallengeType";
import { Quest } from "../../Shared/Types/QuestType";
import { updateQuests } from "../../Store/Features/ChallengeSlice";

type QuestItemProps = {
    quest: Quest;
    challenge: Challenge;
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

export function QuestItem({ quest, challenge }: QuestItemProps) {
    const dispatch = useDispatch();

    const accept = (challengeId: string, quest: Quest) => {
        acceptQuest(challengeId, quest.id).then(() => {
            dispatch(updateQuests(quest));
        });
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
                <ActionIcon
                    style={{ width: "100%" }}
                    variant="filled"
                    aria-label="accept-challenge"
                    onClick={() => accept(challenge.id, quest)}
                >
                    <IconPlus size={16} />
                </ActionIcon>
            </Accordion.Panel>
        </Accordion.Item>
    );
}
