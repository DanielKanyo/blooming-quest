import { useState, useCallback, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Accordion, Text, Group, Avatar, Blockquote, ActionIcon, Tooltip, Alert, Flex, HoverCard, Image, Center } from "@mantine/core";
import { IconCheck, IconPlus, IconQuestionMark, IconX } from "@tabler/icons-react";

import coin from "../Assets/Other/coin.png";
import flame from "../Assets/Other/flame.png";
import leaf from "../Assets/Other/leaf.png";
import seaWave from "../Assets/Other/sea-waves.png";
import { acceptQuest, completeCurrentChallenge, completeQuest, deleteQuest } from "../Services/ChallengeService";
import { addItem } from "../Services/InventoryService";
import { updateTotalCoin } from "../Services/UserService";
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
import { removeQuestFromAll } from "../Store/Features/AllQuestsSlice";
import { addQuestToChallenge, completeQuestInChallenge, completeChallenge } from "../Store/Features/ChallengeSlice";
import { addItemToInventory } from "../Store/Features/InventorySlice";
import { updateTotalCoinInUser } from "../Store/Features/UserSlice";
import store from "../Store/Store";
import { BadgeWithImage } from "./BadgeWithImage/BadgeWithImage";

const GOLD_COLOR = "#FFD700";

type QuestItemProps = {
    quest: Quest;
    challenge: Challenge;
    acceptMode: boolean;
    open: () => void;
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
            <Avatar color={CategoryColorMapping.get(category)} radius="md" size="45px" variant="filled">
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
            return leaf;
        default:
            throw new Error("Unsupported quest difficulty...");
    }
};

const RewardHoverCard = ({ targetElement, imgSrc }: { targetElement: ReactNode; imgSrc: string }) => {
    return (
        <HoverCard shadow="md" radius="md">
            <HoverCard.Target>
                <Center>{targetElement}</Center>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Image h={46} w={46} src={imgSrc} />
            </HoverCard.Dropdown>
        </HoverCard>
    );
};

const QuestActions = ({ quest, challenge, acceptMode, handleAccept, handleComplete, handleRemove, loading }: QuestActionsProps) => {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);

    return acceptMode ? (
        <Flex>
            {user.roles.includes(UserRoles.ADMINISTRATOR) && (
                <Tooltip label="Delete Quest" position="bottom" color="gray" radius="md">
                    <ActionIcon
                        mr={8}
                        w="100%"
                        variant="light"
                        radius="md"
                        color="red"
                        aria-label="delete-quest"
                        onClick={handleRemove}
                        disabled={loading}
                    >
                        <IconX size={18} />
                    </ActionIcon>
                </Tooltip>
            )}
            <Tooltip label="Accept Quest" position="bottom" color="gray" radius="md">
                <ActionIcon
                    variant="light"
                    radius="md"
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
            <Tooltip label="Complete Quest" position="bottom" color="gray" radius="md">
                <ActionIcon
                    variant="light"
                    radius="md"
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

export function QuestItem({ quest, challenge, acceptMode, open }: QuestItemProps) {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const [loading, setLoading] = useState(false);
    const [acceptError, setAcceptError] = useState("");
    const [completeError, setCompleteError] = useState("");
    const dispatch = useDispatch();

    const handleAccept = useCallback(async () => {
        setLoading(true);
        setAcceptError("");

        try {
            const newQuest = await acceptQuest(challenge.id, quest.id);

            dispatch(addQuestToChallenge(newQuest));
            dispatch(removeQuestFromAll(newQuest.id));
        } catch (error) {
            console.error("Error completing quest or challenge: ", error);
            setAcceptError("Something went wrong...");
        } finally {
            setLoading(false);
        }
    }, [dispatch, challenge.id, quest.id]);

    const handleComplete = useCallback(async () => {
        const coinCurrentNew = challenge.coinCurrent + quest.coin;
        setCompleteError("");
        setLoading(true);

        const timestamp = new Date().getTime();
        const quantity = 1;

        try {
            // Complete quest in db and in store
            await completeQuest(challenge.id, quest.id, coinCurrentNew);
            dispatch(completeQuestInChallenge({ questId: quest.id, coinCurrent: coinCurrentNew }));

            // Add reward/item to db and to store
            await addItem(user.id, quest.reward, timestamp, quantity);
            dispatch(addItemToInventory({ itemId: quest.reward, timestamp, quantity }));

            // Add extra reward/item to db and store if there is one
            if (quest.extraReward) {
                await addItem(user.id, quest.extraReward, timestamp, quantity);
                dispatch(addItemToInventory({ itemId: quest.extraReward, timestamp, quantity }));
            }

            if (coinCurrentNew >= challenge.coinToComplete && !challenge.completed) {
                // Complete challenge in db and in store and open claim coins modal
                await completeCurrentChallenge(challenge.id);
                dispatch(completeChallenge());
                open();
            } else if (challenge.completed) {
                // If challenge already completed update the amount of total coins in db and in store
                await updateTotalCoin(user.id, coinCurrentNew);
                dispatch(updateTotalCoinInUser(coinCurrentNew));
            }
        } catch (error) {
            console.error("Error completing quest or challenge: ", error);
            setCompleteError("Something went wrong...");
        } finally {
            setLoading(false);
        }
    }, [
        challenge.coinCurrent,
        challenge.id,
        challenge.coinToComplete,
        challenge.completed,
        quest.coin,
        quest.id,
        quest.reward,
        quest.extraReward,
        dispatch,
        user.id,
        open,
    ]);

    const handleRemove = useCallback(() => {
        setLoading(true);

        deleteQuest(quest.id).then(() => {
            dispatch(removeQuestFromAll(quest.id));
            setLoading(false);
        });
    }, [dispatch, quest.id]);

    return (
        <Accordion.Item value={quest.id}>
            <Accordion.Control>
                <AccordionLabel description={quest.description} category={quest.category} />
            </Accordion.Control>
            <Accordion.Panel>
                <Blockquote color={CategoryColorMapping.get(quest.category)} mb={18} p={22} radius="md">
                    {quest.description}
                </Blockquote>
                {acceptError && (
                    <Alert mb={15} variant="light" color="red" title="Something went wrong!" radius="md">
                        Please try again later...
                    </Alert>
                )}
                {completeError && (
                    <Alert mb={15} variant="light" color="red" title="Something went wrong!" radius="md">
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
                        <RewardHoverCard
                            targetElement={<BadgeWithImage imgSrc={REWARDS.get(quest.reward)!} text="1x" color="gray" marginRight={8} />}
                            imgSrc={REWARDS.get(quest.reward)!}
                        />
                        {!acceptMode && quest.extraReward && (
                            <RewardHoverCard
                                targetElement={
                                    <BadgeWithImage
                                        imgSrc={EXTRA_REWARDS.get(quest.extraReward)!}
                                        text="1x"
                                        color={GOLD_COLOR}
                                        shine={true}
                                    />
                                }
                                imgSrc={EXTRA_REWARDS.get(quest.extraReward)!}
                            />
                        )}
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
