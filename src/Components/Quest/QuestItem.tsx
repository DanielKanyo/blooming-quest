import { useState } from "react";
import { useDispatch } from "react-redux";

import { Accordion, Text, Group, Avatar, Badge, Blockquote, ActionIcon, Tooltip } from "@mantine/core";
import { IconCheck, IconPlus, IconQuestionMark } from "@tabler/icons-react";

import { acceptQuest } from "../../Services/GameService";
import { Challenge } from "../../Shared/Types/ChallengeType";
import {
    CategoryColorMapping,
    CategoryIconMapping,
    CategoryTextMapping,
    DifficultyTextMapping,
    Quest,
    QuestCategories,
} from "../../Shared/Types/QuestType";
import { updateQuests } from "../../Store/Features/ChallengeSlice";

type QuestItemProps = {
    quest: Quest;
    challenge: Challenge;
    acceptMode: boolean;
};

interface AccordionLabelProps {
    description: string;
    category: QuestCategories;
}

function AccordionLabel({ description, category }: AccordionLabelProps) {
    const Icon = CategoryIconMapping.get(category) || IconQuestionMark;

    return (
        <Group wrap="nowrap">
            <Avatar color={CategoryColorMapping.get(category)} radius="sm" size="49px" variant="filled">
                <Icon />
            </Avatar>
            <div>
                <Text size="lg" fw={700}>
                    {CategoryTextMapping.get(category)}
                </Text>
                <Text size="sm" fw={400} truncate="end" w={230}>
                    {description}
                </Text>
            </div>
        </Group>
    );
}

export function QuestItem({ quest, challenge, acceptMode }: QuestItemProps) {
    const [acceptLoading, setAcceptLoading] = useState(false);
    const dispatch = useDispatch();

    const accept = (challengeId: string, quest: Quest) => {
        setAcceptLoading(true);

        acceptQuest(challengeId, quest.id).then(() => {
            dispatch(updateQuests(quest));
            setAcceptLoading(false);
        });
    };

    const complete = (questId: string) => {
        // TODO
        console.log(questId);
    };

    return (
        <Accordion.Item value={quest.id}>
            <Accordion.Control>
                <AccordionLabel description={quest.description} category={quest.category} />
            </Accordion.Control>
            <Accordion.Panel>
                <Blockquote color={CategoryColorMapping.get(quest.category)} mb={15} p={22}>
                    {quest.description}
                </Blockquote>
                <Group justify="space-between" gap="xs">
                    <div>
                        <Badge radius="sm" variant="light" size="lg" mr={10} h={29} color={CategoryColorMapping.get(quest.category)}>
                            <span style={{ marginTop: 2 }}>{DifficultyTextMapping.get(quest.difficulty)}</span>
                        </Badge>
                        <Badge radius="sm" variant="light" size="lg" h={29} color={CategoryColorMapping.get(quest.category)}>
                            <span style={{ marginTop: 2 }}>{quest.xp} XP</span>
                        </Badge>
                    </div>
                    {acceptMode ? (
                        <Tooltip label="Accept Quest" position="left">
                            <ActionIcon
                                variant="light"
                                color={CategoryColorMapping.get(quest.category)}
                                disabled={acceptLoading}
                                aria-label="accept-challenge"
                                onClick={() => accept(challenge.id, quest)}
                            >
                                <IconPlus size={16} />
                            </ActionIcon>
                        </Tooltip>
                    ) : (
                        <Tooltip label="Complete Quest" position="left">
                            <ActionIcon
                                variant="light"
                                color={CategoryColorMapping.get(quest.category)}
                                disabled={acceptLoading}
                                aria-label="complete-challenge"
                                onClick={() => complete(quest.id)}
                            >
                                <IconCheck size={16} />
                            </ActionIcon>
                        </Tooltip>
                    )}
                </Group>
            </Accordion.Panel>
        </Accordion.Item>
    );
}
