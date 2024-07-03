import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Accordion, Card, Flex, ScrollArea, Skeleton } from "@mantine/core";

import { QuestItem } from "../../../Components/Quest/QuestItem";
import { fetchQuests } from "../../../Services/GameService";
import { AllQuestsStore, updateAllQuests } from "../../../Store/Features/AllQuestsSlice";
import { ChallengeStore } from "../../../Store/Features/ChallengeSlice";
import store from "../../../Store/Store";

export function AllQuests() {
    const challengeStore: ChallengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const allQuestsStore: AllQuestsStore = useSelector((state: ReturnType<typeof store.getState>) => state.allQuests);
    const dispatch = useDispatch();

    useEffect(() => {
        if (challengeStore.challenge && allQuestsStore.loading) {
            fetchQuests()
                .then((quests) => {
                    const myQuestIds = challengeStore.challenge!.quests.map((q) => q.id);
                    // Filter already selected quests
                    dispatch(updateAllQuests({ quests: quests.filter((q) => !myQuestIds.includes(q.id)), loading: false }));
                })
                .catch((err) => {
                    dispatch(updateAllQuests({ quests: [], loading: false }));
                    console.error(`Something went wrong... ${err.message}`);
                });
        }
    }, [dispatch, allQuestsStore, challengeStore]);

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
                                {allQuestsStore.loading ? (
                                    <Skeleton h={75} mb="sm" animate={true} />
                                ) : (
                                    <>
                                        {allQuestsStore.quests.length ? (
                                            <Accordion variant="separated">
                                                {allQuestsStore.quests.map((quest) => {
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
