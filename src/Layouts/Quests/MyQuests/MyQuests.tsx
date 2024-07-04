import { useSelector } from "react-redux";

import { Accordion, Card, ScrollArea, Tabs, Tooltip } from "@mantine/core";
import { IconCircleCheckFilled, IconDots } from "@tabler/icons-react";

import { QuestItem } from "../../../Components/Quest/QuestItem";
import store from "../../../Store/Store";

export function MyQuests() {
    const challengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);

    return (
        <>
            {challengeStore.challenge ? (
                <>
                    {challengeStore.challenge.quests.length ? (
                        <Tabs variant="pills" defaultValue="uncompleted" color="teal">
                            <Tabs.List grow>
                                <Tooltip label="In Progress" position="top" color="gray">
                                    <Tabs.Tab value="uncompleted" leftSection={<IconDots />}></Tabs.Tab>
                                </Tooltip>
                                <Tooltip label="Completed" position="top" color="gray">
                                    <Tabs.Tab value="completed" leftSection={<IconCircleCheckFilled />}></Tabs.Tab>
                                </Tooltip>
                            </Tabs.List>

                            <ScrollArea h="calc(100vh - 220px)" type="never" pt="var(--mantine-spacing-xs)">
                                <Tabs.Panel value="uncompleted">
                                    {challengeStore.challenge.quests.filter(
                                        (q) => !challengeStore.challenge!.completedQuests.includes(q.id)
                                    ).length ? (
                                        <Accordion variant="separated">
                                            {challengeStore.challenge.quests
                                                .filter((q) => !challengeStore.challenge!.completedQuests.includes(q.id))
                                                .map((quest) => {
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
                                    ) : (
                                        <Card shadow="sm" padding="xl" radius="md" style={{ width: "100%" }}>
                                            You completed all of your quests...
                                        </Card>
                                    )}
                                </Tabs.Panel>

                                <Tabs.Panel value="completed">
                                    {challengeStore.challenge.quests.filter((q) => challengeStore.challenge!.completedQuests.includes(q.id))
                                        .length ? (
                                        <Accordion variant="separated">
                                            {challengeStore.challenge.quests
                                                .filter((q) => challengeStore.challenge!.completedQuests.includes(q.id))
                                                .map((quest) => {
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
                                    ) : (
                                        <Card shadow="sm" padding="xl" radius="md" style={{ width: "100%" }}>
                                            You haven't completed any of your quests...
                                        </Card>
                                    )}
                                </Tabs.Panel>
                            </ScrollArea>
                        </Tabs>
                    ) : (
                        <Card shadow="sm" padding="xl" radius="md" style={{ width: "100%" }}>
                            You haven't accepted a quest yet...
                        </Card>
                    )}
                </>
            ) : (
                <Card shadow="sm" padding="xl" radius="md" style={{ width: "100%" }}>
                    Join the challenge to be able to accept quests...
                </Card>
            )}
        </>
    );
}
