import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Accordion, Button, Card, Flex, Group, Modal, ScrollArea, Tabs, Tooltip, Text, Image, FocusTrap } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconProgress, IconProgressCheck } from "@tabler/icons-react";

import coin from "../../../Assets/Other/coin.png";
import hashtag from "../../../Assets/Other/hashtag.png";
import partyPopper from "../../../Assets/Other/party-popper.png";
import { BadgeWithImage } from "../../../Components/BadgeWithImage/BadgeWithImage";
import { QuestItem } from "../../../Components/QuestItem";
import { updateTotalCoin } from "../../../Services/UserService";
import { Challenge } from "../../../Shared/Types/ChallengeType";
import { Quest } from "../../../Shared/Types/QuestType";
import { JOIN_CHALLENGE_TEXT, MONTHS } from "../../../Shared/Utils";
import { updateTotalCoinInUser } from "../../../Store/Features/UserSlice";
import store from "../../../Store/Store";

export function MyQuests() {
    const challengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const challenge = challengeStore.challenge;
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();

    const sumUpCoin = (quests: Quest[]): number => quests.reduce((total, quest) => total + quest.coin, 0);

    const filterQuests = (challenge: Challenge, completed: boolean): Quest[] =>
        challenge.quests.filter((quest) => completed === challenge.completedQuests.includes(quest.id));

    const handleClaimCoins = useCallback(() => {
        if (challenge) {
            updateTotalCoin(user.id, challenge.coinCurrent).then(() => {
                dispatch(updateTotalCoinInUser(challenge.coinCurrent));

                close();
            });
        }
    }, [challenge, close, dispatch, user.id]);

    const QuestList = ({
        quests,
        coinSum,
        questCount,
        emptyMessage,
    }: {
        quests: Quest[];
        coinSum: number;
        questCount: number;
        emptyMessage: string;
    }) =>
        quests.length ? (
            <>
                <Group justify="flex-end" mb={10} gap={10}>
                    <BadgeWithImage imgSrc={hashtag} text={questCount} color="gray" />
                    <BadgeWithImage imgSrc={coin} text={coinSum} color="gray" />
                </Group>
                <Accordion variant="separated">
                    {quests.map((quest) => (
                        <QuestItem key={quest.id} quest={quest} challenge={challenge!} acceptMode={false} open={open} />
                    ))}
                </Accordion>
            </>
        ) : (
            <Card shadow="sm" padding="xl" radius="md" style={{ width: "100%" }}>
                {emptyMessage}
            </Card>
        );

    if (!challenge) {
        return (
            <Card shadow="sm" padding="xl" radius="md" style={{ width: "100%" }}>
                {JOIN_CHALLENGE_TEXT}
            </Card>
        );
    }

    if (!challenge.quests.length) {
        return (
            <Card shadow="sm" padding="xl" radius="md" style={{ width: "100%" }}>
                You haven't accepted a quest yet...
            </Card>
        );
    }

    const inProgressQuests = filterQuests(challenge, false);
    const completedQuests = filterQuests(challenge, true);

    return (
        <>
            <Tabs variant="pills" defaultValue="uncompleted" color="teal" radius="md">
                <Tabs.List grow>
                    <Tooltip label="In Progress" position="top" color="gray" radius="md">
                        <Tabs.Tab value="uncompleted" leftSection={<IconProgress />}></Tabs.Tab>
                    </Tooltip>
                    <Tooltip label="Completed" position="top" color="gray" radius="md">
                        <Tabs.Tab value="completed" leftSection={<IconProgressCheck />}></Tabs.Tab>
                    </Tooltip>
                </Tabs.List>
                <ScrollArea h="calc(100vh - 220px)" type="never" pt="var(--mantine-spacing-xs)">
                    <Tabs.Panel value="uncompleted">
                        <QuestList
                            quests={inProgressQuests}
                            coinSum={sumUpCoin(inProgressQuests)}
                            questCount={inProgressQuests.length}
                            emptyMessage="You completed all of your quests..."
                        />
                    </Tabs.Panel>
                    <Tabs.Panel value="completed">
                        <QuestList
                            quests={completedQuests}
                            coinSum={sumUpCoin(completedQuests)}
                            questCount={completedQuests.length}
                            emptyMessage="You haven't completed any of your quests..."
                        />
                    </Tabs.Panel>
                </ScrollArea>
            </Tabs>
            <Modal
                opened={opened}
                onClose={() => {}}
                centered
                transitionProps={{ transition: "fade-up" }}
                withCloseButton={false}
                size="auto"
                radius="md"
            >
                <FocusTrap.InitialFocus />
                <Flex direction="column" justify="center" align="center" p={10}>
                    <Image h={72} w={72} src={partyPopper} mb={16} />
                    <Text size="xl" mb={10}>
                        Congratulations!
                    </Text>
                    <Text size="sm" c="dimmed" mb={16} ta="center">
                        You have successfully completed the <br /> {MONTHS.get(challenge.month)} challenge!
                    </Text>
                    <BadgeWithImage imgSrc={coin} text={challenge.coinCurrent} color="gray" />
                    <Button
                        mt={20}
                        variant="gradient"
                        radius="md"
                        gradient={{ from: "cyan", to: "teal", deg: 60 }}
                        onClick={() => handleClaimCoins()}
                        fullWidth
                    >
                        Claim Reward
                    </Button>
                </Flex>
            </Modal>
        </>
    );
}
