import { useSelector } from "react-redux";

import { Accordion, Badge, Card, Group, ScrollArea, Tabs, Tooltip } from "@mantine/core";
import { IconProgress, IconProgressCheck } from "@tabler/icons-react";

import { QuestItem } from "../../../Components/Quest/QuestItem";
import { Challenge } from "../../../Shared/Types/ChallengeType";
import { Quest } from "../../../Shared/Types/QuestType";
import store from "../../../Store/Store";

export function MyQuests() {
    const challengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);

    const sumUpCoin = (arr: Quest[]): number => {
        let result = 0;

        arr.forEach((quest) => {
            result += quest.coin;
        });

        return result;
    };

    const determineInProgressQuests = (challenge: Challenge): Quest[] => {
        return challenge.quests.filter((q) => !challengeStore.challenge!.completedQuests.includes(q.id));
    };

    const sumUpInProgressQuestCoin = (challenge: Challenge): number => {
        const inProgressQuests = determineInProgressQuests(challenge);

        return sumUpCoin(inProgressQuests);
    };

    const calcNumOfInProgressQuests = (challenge: Challenge): number => {
        return determineInProgressQuests(challenge).length;
    };

    const determineCompletedQuests = (challenge: Challenge): Quest[] => {
        return challenge.quests.filter((q) => challengeStore.challenge!.completedQuests.includes(q.id));
    };

    const sumUpCompletedQuestCoin = (challenge: Challenge): number => {
        const completedQuests = determineCompletedQuests(challenge);

        return sumUpCoin(completedQuests);
    };

    const calcNumOfCompletedQuests = (challenge: Challenge): number => {
        return determineCompletedQuests(challenge).length;
    };

    return (
        <>
            {challengeStore.challenge ? (
                <>
                    {challengeStore.challenge.quests.length ? (
                        <Tabs variant="pills" defaultValue="uncompleted" color="teal">
                            <Tabs.List grow>
                                <Tooltip label="In Progress" position="top" color="gray">
                                    <Tabs.Tab value="uncompleted" leftSection={<IconProgress />}></Tabs.Tab>
                                </Tooltip>
                                <Tooltip label="Completed" position="top" color="gray">
                                    <Tabs.Tab value="completed" leftSection={<IconProgressCheck />}></Tabs.Tab>
                                </Tooltip>
                            </Tabs.List>

                            <ScrollArea h="calc(100vh - 220px)" type="never" pt="var(--mantine-spacing-xs)">
                                <Tabs.Panel value="uncompleted">
                                    {determineInProgressQuests(challengeStore.challenge).length ? (
                                        <>
                                            <Group justify="flex-end" mb={10} gap={10}>
                                                <Badge radius="sm" variant="light" color="gray" size="lg">
                                                    {calcNumOfInProgressQuests(challengeStore.challenge)}
                                                </Badge>
                                                <Badge radius="sm" variant="light" color="gray" size="lg">
                                                    {sumUpInProgressQuestCoin(challengeStore.challenge)} Coin
                                                </Badge>
                                            </Group>
                                            <Accordion variant="separated">
                                                {determineInProgressQuests(challengeStore.challenge).map((quest) => {
                                                    return (
                                                        <QuestItem
                                                            key={quest.id}
                                                            quest={quest}
                                                            challenge={challengeStore.challenge!}
                                                            acceptMode={false}
                                                        />
                                                    );
                                                })}
                                            </Accordion>
                                        </>
                                    ) : (
                                        <Card shadow="sm" padding="xl" radius="sm" style={{ width: "100%" }}>
                                            You completed all of your quests...
                                        </Card>
                                    )}
                                </Tabs.Panel>

                                <Tabs.Panel value="completed">
                                    {determineCompletedQuests(challengeStore.challenge).length ? (
                                        <>
                                            <Group justify="flex-end" mb={10} gap={10}>
                                                <Badge radius="sm" variant="light" color="gray" size="lg">
                                                    {calcNumOfCompletedQuests(challengeStore.challenge)}
                                                </Badge>
                                                <Badge radius="sm" variant="light" color="gray" size="lg">
                                                    {sumUpCompletedQuestCoin(challengeStore.challenge)} Coin
                                                </Badge>
                                            </Group>
                                            <Accordion variant="separated">
                                                {determineCompletedQuests(challengeStore.challenge).map((quest) => {
                                                    return (
                                                        <QuestItem
                                                            key={quest.id}
                                                            quest={quest}
                                                            challenge={challengeStore.challenge!}
                                                            acceptMode={false}
                                                        />
                                                    );
                                                })}
                                            </Accordion>
                                        </>
                                    ) : (
                                        <Card shadow="sm" padding="xl" radius="sm" style={{ width: "100%" }}>
                                            You haven't completed any of your quests...
                                        </Card>
                                    )}
                                </Tabs.Panel>
                            </ScrollArea>
                        </Tabs>
                    ) : (
                        <Card shadow="sm" padding="xl" radius="sm" style={{ width: "100%" }}>
                            You haven't accepted a quest yet...
                        </Card>
                    )}
                </>
            ) : (
                <Card shadow="sm" padding="xl" radius="sm" style={{ width: "100%" }}>
                    Join the challenge to be able to accept quests...
                </Card>
            )}
        </>
    );
}
