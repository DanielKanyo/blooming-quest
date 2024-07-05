import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Accordion, Card, Flex, ScrollArea, Skeleton } from "@mantine/core";

import { CategoryFilter } from "../../../Components/CategoryFilter";
import { QuestItem } from "../../../Components/Quest/QuestItem";
import { fetchQuests } from "../../../Services/GameService";
import { Quest, QuestCategories } from "../../../Shared/Types/QuestType";
import { AllQuestsStore, updateAllQuests } from "../../../Store/Features/AllQuestsSlice";
import { ChallengeStore } from "../../../Store/Features/ChallengeSlice";
import store from "../../../Store/Store";

export function AllQuests() {
    const challengeStore: ChallengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const allQuestsStore: AllQuestsStore = useSelector((state: ReturnType<typeof store.getState>) => state.allQuests);
    const dispatch = useDispatch();
    const [activeCategoryFilter, setActiveCategoryFilter] = useState<QuestCategories | null>(null);

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

    const filterAllQuests = (quests: Quest[], activeFilter: QuestCategories | null) => {
        return activeFilter !== null ? quests.filter((q) => q.category === activeFilter) : quests;
    };

    return (
        <>
            {!challengeStore.loading && challengeStore.challenge && (
                <CategoryFilter active={activeCategoryFilter} setActive={setActiveCategoryFilter} />
            )}
            <ScrollArea h="calc(100vh - 104px)" type="never">
                <Flex direction="column" px="lg" mb="var(--mantine-spacing-lg)">
                    {challengeStore.loading ? (
                        <Skeleton h={75} mb="sm" animate={true} />
                    ) : (
                        <>
                            {!challengeStore.challenge ? (
                                <Card shadow="sm" padding="xl" radius="md" style={{ width: "100%" }}>
                                    Join the challenge to be able to accept quests...
                                </Card>
                            ) : (
                                <>
                                    {allQuestsStore.loading ? (
                                        <Skeleton h={75} mb="sm" animate={true} />
                                    ) : (
                                        <>
                                            {allQuestsStore.quests.length ? (
                                                <Accordion variant="separated">
                                                    {filterAllQuests(allQuestsStore.quests, activeCategoryFilter).map((quest) => {
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
        </>
    );
}
