import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Accordion, Text, Group, Avatar, Badge, Blockquote, ActionIcon, Tooltip, Alert, Image, Flex } from "@mantine/core";
import { IconCheck, IconPlus, IconQuestionMark, IconX } from "@tabler/icons-react";

import { acceptQuest, completeQuest, deleteQuest } from "../../Services/GameService";
import { EXTRA_REWARDS, REWARDS } from "../../Shared/Rewards";
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
import { addQuestToChallenge, completeQuestInChallenge } from "../../Store/Features/ChallengeSlice";
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
            <div style={{ height: 45 }}>
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
    const [completeLoading, setCompleteLoading] = useState(false);
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const dispatch = useDispatch();

    const accept = (challengeId: string, quest: Quest) => {
        setAcceptLoading(true);
        setAcceptError("");

        acceptQuest(challengeId, quest.id)
            .then((newQuest) => {
                // Add quest to challenge
                dispatch(addQuestToChallenge(newQuest));
                // Remove quest from all since it's selected
                dispatch(removeQuest(newQuest.id));
                setAcceptLoading(false);
                setAcceptError("");
            })
            .catch((err) => {
                setAcceptError(err.message);
                setAcceptLoading(false);
            });
    };

    const complete = (challenge: Challenge, quest: Quest) => {
        const xpCurrentNew = challenge.xpCurrent + quest.xp;

        setCompleteLoading(true);

        completeQuest(challenge.id, quest.id, xpCurrentNew)
            .then(() => {
                dispatch(completeQuestInChallenge({ questId: quest.id, xpCurrent: xpCurrentNew }));
                setCompleteLoading(false);
            })
            .catch((err) => {
                // TODO: Display error
                console.log(err);
                setCompleteLoading(false);
            });
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
                    <Flex>
                        <Badge radius="sm" variant="light" size="lg" mr={8} h={29} color={CategoryColorMapping.get(quest.category)}>
                            {DifficultyTextMapping.get(quest.difficulty)}
                        </Badge>
                        <Badge radius="sm" variant="light" size="lg" mr={8} h={29} color={CategoryColorMapping.get(quest.category)}>
                            {quest.xp} XP
                        </Badge>
                        <Badge
                            radius="sm"
                            variant="light"
                            size="lg"
                            px={6}
                            h={29}
                            mr={8}
                            color={CategoryColorMapping.get(quest.category)}
                            style={{ overflow: "visible" }}
                        >
                            <Image radius="md" h={33} w={33} src={REWARDS.get(quest.reward)} />
                        </Badge>
                        {!acceptMode && quest.extraReward && (
                            <Badge
                                radius="sm"
                                variant="light"
                                size="lg"
                                px={6}
                                h={29}
                                color={CategoryColorMapping.get(quest.category)}
                                style={{ overflow: "visible" }}
                            >
                                <Image radius="md" h={33} w={33} src={EXTRA_REWARDS.get(quest.extraReward)} />
                            </Badge>
                        )}
                    </Flex>
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
                        <>
                            {!challenge.completedQuests.includes(quest.id) && (
                                <Tooltip label="Complete Quest" position="bottom" color="gray">
                                    <ActionIcon
                                        variant="light"
                                        color={CategoryColorMapping.get(quest.category)}
                                        aria-label="complete-challenge"
                                        disabled={completeLoading}
                                        onClick={() => complete(challenge, quest)}
                                    >
                                        <IconCheck size={16} />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </>
                    )}
                </Group>
            </Accordion.Panel>
        </Accordion.Item>
    );
}
