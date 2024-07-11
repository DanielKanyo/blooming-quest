import { useSelector } from "react-redux";

import { Accordion, Card, Group, ScrollArea, Tabs, Tooltip } from "@mantine/core";
import { IconProgress, IconProgressCheck } from "@tabler/icons-react";

import coin from "../../../Assets/Other/coin.png";
import hashtag from "../../../Assets/Other/hashtag.png";
import { BadgeWithImage } from "../../../Components/BadgeWithImage/BadgeWithImage";
import { QuestItem } from "../../../Components/QuestItem";
import { Challenge } from "../../../Shared/Types/ChallengeType";
import { Quest } from "../../../Shared/Types/QuestType";
import store from "../../../Store/Store";

export function MyQuests() {
    const challengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const challenge = challengeStore.challenge;

    const sumUpCoin = (quests: Quest[]): number => quests.reduce((total, quest) => total + quest.coin, 0);

    const filterQuests = (challenge: Challenge, completed: boolean): Quest[] =>
        challenge.quests.filter((quest) => completed === challenge.completedQuests.includes(quest.id));

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
                        <QuestItem key={quest.id} quest={quest} challenge={challenge!} acceptMode={false} />
                    ))}
                </Accordion>
            </>
        ) : (
            <Card shadow="sm" padding="xl" radius="sm" style={{ width: "100%" }}>
                {emptyMessage}
            </Card>
        );

    if (!challenge) {
        return (
            <Card shadow="sm" padding="xl" radius="sm" style={{ width: "100%" }}>
                Join the challenge to be able to accept quests...
            </Card>
        );
    }

    if (!challenge.quests.length) {
        return (
            <Card shadow="sm" padding="xl" radius="sm" style={{ width: "100%" }}>
                You haven't accepted a quest yet...
            </Card>
        );
    }

    const inProgressQuests = filterQuests(challenge, false);
    const completedQuests = filterQuests(challenge, true);

    return (
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
    );
}
