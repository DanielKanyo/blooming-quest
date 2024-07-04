import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Accordion, Text, Group, Avatar, Badge, Blockquote, ActionIcon, Tooltip, Alert } from "@mantine/core";
import { IconCheck, IconPlus, IconQuestionMark, IconX } from "@tabler/icons-react";

import { acceptQuest, deleteQuest } from "../../Services/GameService";
import { Challenge } from "../../Shared/Types/ChallengeType";
import {
    CategoryColorMapping,
    CategoryIconMapping,
    CategoryTextMapping,
    DifficultyTextMapping,
    Quest,
    QuestCategories,
} from "../../Shared/Types/QuestType";
import { UserRoles } from "../../Shared/Types/UserType";
import { removeQuest } from "../../Store/Features/AllQuestsSlice";
import { addQuestToChallenge } from "../../Store/Features/ChallengeSlice";
import store from "../../Store/Store";

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
            <Avatar color={CategoryColorMapping.get(category)} radius="sm" size="45px" variant="filled">
                <Icon />
            </Avatar>
            <div>
                <Text size="md" fw={500} truncate="end" w={230}>
                    {CategoryTextMapping.get(category)}
                </Text>
                <Text size="sm" truncate="end" c="dimmed" w={230}>
                    {description}
                </Text>
            </div>
        </Group>
    );
}

export function QuestItem({ quest, challenge, acceptMode }: QuestItemProps) {
    const [acceptLoading, setAcceptLoading] = useState(false);
    const [acceptError, setAcceptError] = useState("");
    const [removeLoading, setRemoveLoading] = useState(false);
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const dispatch = useDispatch();

    const accept = (challengeId: string, quest: Quest) => {
        setAcceptLoading(true);
        setAcceptError("");

        acceptQuest(challengeId, quest.id)
            .then(() => {
                // Add quest to challenge
                dispatch(addQuestToChallenge(quest));
                // Remove quest from all since it's selected
                dispatch(removeQuest(quest.id));
                setAcceptLoading(false);
                setAcceptError("");
            })
            .catch((err) => {
                setAcceptError(err.message);
                setAcceptLoading(false);
            });
    };

    const complete = (questId: string) => {
        // TODO
        console.log(questId);
    };

    const remove = (questId: string) => {
        setRemoveLoading(true);

        deleteQuest(questId).then(() => {
            dispatch(removeQuest(questId));
            setRemoveLoading(false);
        });
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
                {acceptError && (
                    <Alert mb={15} variant="light" color="red" title="Something went wrong!">
                        Please try again later...
                    </Alert>
                )}
                <Group justify="space-between" gap="xs">
                    <div>
                        <Badge radius="sm" variant="light" size="lg" mr={8} h={29} color={CategoryColorMapping.get(quest.category)}>
                            {DifficultyTextMapping.get(quest.difficulty)}
                        </Badge>
                        <Badge radius="sm" variant="light" size="lg" h={29} color={CategoryColorMapping.get(quest.category)}>
                            {quest.xp} XP
                        </Badge>
                    </div>
                    {acceptMode ? (
                        <div>
                            {user.roles.includes(UserRoles.ADMINISTRATOR) && (
                                <Tooltip label="Delete Quest" position="bottom" color="gray">
                                    <ActionIcon
                                        mr={8}
                                        variant="light"
                                        color="red"
                                        aria-label="accept-challenge"
                                        onClick={() => remove(quest.id)}
                                        disabled={removeLoading}
                                    >
                                        <IconX size={16} />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                            <Tooltip label="Accept Quest" position="bottom" color="gray">
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
                        </div>
                    ) : (
                        <Tooltip label="Complete Quest" position="bottom" color="gray">
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
