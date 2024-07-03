import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Accordion, Card, Flex, ScrollArea, Skeleton } from "@mantine/core";

import { QuestItem } from "../../../Components/Quest/QuestItem";
import { fetchQuests } from "../../../Services/GameService";
import { Quest } from "../../../Shared/Types/QuestType";
import { ChallengeStore } from "../../../Store/Features/ChallengeSlice";
import store from "../../../Store/Store";

export function AllQuests() {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [questsLoding, setQuestsLoding] = useState(true);
    const challengeStore: ChallengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);

    useEffect(() => {
        if (challengeStore.challenge) {
            fetchQuests()
                .then((quests) => {
                    const myQuestIds = challengeStore.challenge!.quests.map((q) => q.id);

                    setQuestsLoding(false);
                    setQuests(quests.filter((q) => !myQuestIds.includes(q.id)));
                })
                .catch((err) => {
                    setQuestsLoding(false);
                    console.error(`Something went wrong... ${err.message}`);
                });
        }
    }, [setQuestsLoding, setQuests, challengeStore]);

    return (
        <ScrollArea h="100%" type="never">
            <Flex direction="column" px="lg">
                {challengeStore.loading ? (
                    <Skeleton h={75} mb="sm" animate={true} />
                ) : (
                    <>
                        {!challengeStore.challenge ? (
                            <div>Join the challenge to be able to accept quests...</div>
                        ) : (
                            <>
                                {questsLoding ? (
                                    <Skeleton h={75} mb="sm" animate={true} />
                                ) : (
                                    <>
                                        {quests.length ? (
                                            <Accordion variant="separated">
                                                {quests.map((quest) => {
                                                    return (
                                                        <QuestItem
                                                            key={quest.id}
                                                            quest={quest}
                                                            challenge={challengeStore.challenge!}
                                                            acceptMode={true}
                                                        />
                                                    );
                                                })}
                                            </Accordion>
                                        ) : (
                                            <Card shadow="sm" padding="xl" radius="md" style={{ width: "100%" }}>
                                                No more quests left for this month...
                                            </Card>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </Flex>
        </ScrollArea>
    );
}
