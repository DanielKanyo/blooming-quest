import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Accordion, Text, Group, Avatar, Blockquote, ActionIcon, Tooltip, Alert, Flex, HoverCard, Image, Center } from "@mantine/core";
import { IconCheck, IconPlus, IconQuestionMark, IconX } from "@tabler/icons-react";

import coin from "../Assets/Other/coin.png";
import flame from "../Assets/Other/flame.png";
import seaWave from "../Assets/Other/sea-waves.png";
import wind from "../Assets/Other/wind.png";
import { acceptQuest, completeQuest, deleteQuest } from "../Services/GameService";
import { EXTRA_REWARDS, REWARDS } from "../Shared/Rewards";
import { Challenge } from "../Shared/Types/ChallengeType";
import {
    CategoryColorMapping,
    CategoryIconMapping,
    CategoryTextMapping,
    DifficultyTextMapping,
    Quest,
    QuestCategories,
    QuestDifficulties,
} from "../Shared/Types/QuestType";
import { UserRoles } from "../Shared/Types/UserType";
import { removeQuest } from "../Store/Features/AllQuestsSlice";
import { addQuestToChallenge, completeQuestInChallenge } from "../Store/Features/ChallengeSlice";
import store from "../Store/Store";
import { BadgeWithImage } from "./BadgeWithImage/BadgeWithImage";

const GOLD_COLOR = "#FFD700";

type QuestItemProps = {
    quest: Quest;
    challenge: Challenge;
    acceptMode: boolean;
};

interface AccordionLabelProps {
    description: string;
    category: QuestCategories;
}

interface QuestActionsProps {
    quest: Quest;
    challenge: Challenge;
    acceptMode: boolean;
    handleAccept: () => void;
    handleComplete: () => void;
    handleRemove: () => void;
    loading: boolean;
}

const AccordionLabel = ({ description, category }: AccordionLabelProps) => {
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
};

const getDifficultyIcon = (difficulty: QuestDifficulties): string => {
    switch (difficulty) {
        case QuestDifficulties.Hard:
            return flame;
        case QuestDifficulties.Medium:
            return seaWave;
        case QuestDifficulties.Easy:
            return wind;
        default:
            throw new Error("Unsupported quest difficulty...");
    }
};

const ExtraRewardHoverCard = ({ extraReward }: { extraReward: string }) => {
    return (
        <HoverCard shadow="md">
            <HoverCard.Target>
                <Center>
                    <BadgeWithImage imgSrc={EXTRA_REWARDS.get(extraReward)!} text="1x" color={GOLD_COLOR} shine={true} />
                </Center>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Image h={46} w={46} src={EXTRA_REWARDS.get(extraReward)!} />
            </HoverCard.Dropdown>
        </HoverCard>
    );
};

const QuestActions = ({ quest, challenge, acceptMode, handleAccept, handleComplete, handleRemove, loading }: QuestActionsProps) => {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);

    return acceptMode ? (
        <Flex>
            {user.roles.includes(UserRoles.ADMINISTRATOR) && (
                <Tooltip label="Delete Quest" position="bottom" color="gray">
                    <ActionIcon
                        mr={8}
                        w="100%"
                        variant="light"
                        color="red"
                        aria-label="delete-quest"
                        onClick={handleRemove}
                        disabled={loading}
                    >
                        <IconX size={18} />
                    </ActionIcon>
                </Tooltip>
            )}
            <Tooltip label="Accept Quest" position="bottom" color="gray">
                <ActionIcon
                    variant="light"
                    w="100%"
                    color={CategoryColorMapping.get(quest.category)}
                    disabled={loading}
                    aria-label="accept-quest"
                    onClick={handleAccept}
                >
                    <IconPlus size={18} />
                </ActionIcon>
            </Tooltip>
        </Flex>
    ) : (
        !challenge.completedQuests.includes(quest.id) && (
            <Tooltip label="Complete Quest" position="bottom" color="gray">
                <ActionIcon
                    variant="light"
                    w="100%"
                    color={CategoryColorMapping.get(quest.category)}
                    aria-label="complete-quest"
                    disabled={loading}
                    onClick={handleComplete}
                >
                    <IconCheck size={18} />
                </ActionIcon>
            </Tooltip>
        )
    );
};

export function QuestItem({ quest, challenge, acceptMode }: QuestItemProps) {
    const [loading, setLoading] = useState(false);
    const [acceptError, setAcceptError] = useState("");
    const [completeError, setCompleteError] = useState("");
    const dispatch = useDispatch();

    const handleAccept = useCallback(() => {
        setLoading(true);
        setAcceptError("");

        acceptQuest(challenge.id, quest.id)
            .then((newQuest) => {
                dispatch(addQuestToChallenge(newQuest));
                dispatch(removeQuest(newQuest.id));
                setLoading(false);
                setAcceptError("");
            })
            .catch((err) => {
                setAcceptError(err.message);
                setLoading(false);
            });
    }, [dispatch, challenge.id, quest.id]);

    const handleComplete = useCallback(() => {
        const coinCurrentNew = challenge.coinCurrent + quest.coin;
        setCompleteError("");
        setLoading(true);

        completeQuest(challenge.id, quest.id, coinCurrentNew)
            .then(() => {
                dispatch(completeQuestInChallenge({ questId: quest.id, coinCurrent: coinCurrentNew }));
                setLoading(false);
                setCompleteError("");
            })
            .catch((err) => {
                setCompleteError(err.message);
                setLoading(false);
            });
    }, [challenge.coinCurrent, challenge.id, quest.coin, quest.id, dispatch]);

    const handleRemove = useCallback(() => {
        setLoading(true);

        deleteQuest(quest.id).then(() => {
            dispatch(removeQuest(quest.id));
            setLoading(false);
        });
    }, [dispatch, quest.id]);

    return (
        <Accordion.Item value={quest.id}>
            <Accordion.Control>
                <AccordionLabel description={quest.description} category={quest.category} />
            </Accordion.Control>
            <Accordion.Panel>
                <Blockquote color={CategoryColorMapping.get(quest.category)} mb={18} p={22}>
                    {quest.description}
                </Blockquote>
                {acceptError && (
                    <Alert mb={15} variant="light" color="red" title="Something went wrong!">
                        Please try again later...
                    </Alert>
                )}
                {completeError && (
                    <Alert mb={15} variant="light" color="red" title="Something went wrong!">
                        Please try again later...
                    </Alert>
                )}
                <Flex justify="space-between" gap={18} direction="column">
                    <Flex>
                        <BadgeWithImage
                            imgSrc={getDifficultyIcon(quest.difficulty)}
                            text={DifficultyTextMapping.get(quest.difficulty)!}
                            color="gray"
                            marginRight={8}
                        />
                        <BadgeWithImage imgSrc={coin} text={quest.coin} color="gray" marginRight={8} />
                        <BadgeWithImage imgSrc={REWARDS.get(quest.reward)!} text="1x" color="gray" marginRight={8} />
                        {!acceptMode && quest.extraReward && <ExtraRewardHoverCard extraReward={quest.extraReward} />}
                    </Flex>
                    <QuestActions
                        quest={quest}
                        challenge={challenge}
                        acceptMode={acceptMode}
                        handleAccept={handleAccept}
                        handleComplete={handleComplete}
                        handleRemove={handleRemove}
                        loading={loading}
                    />
                </Flex>
            </Accordion.Panel>
        </Accordion.Item>
    );
}
