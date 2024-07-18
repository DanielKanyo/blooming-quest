import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Accordion, Button, Card, Flex, ScrollArea } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

import { CategoryFilter } from "../../../Components/CategoryFilter";
import { QuestItem } from "../../../Components/QuestItem";
import { QuestSkeletons } from "../../../Components/QuestSkeletons";
import { fetchQuests, fetchQuestsAfter } from "../../../Services/GameService";
import { QuestCategories } from "../../../Shared/Types/QuestType";
import { updateAllQuests, extendAllQuests, AllQuestsStore } from "../../../Store/Features/AllQuestsSlice";
import { ChallengeStore } from "../../../Store/Features/ChallengeSlice";
import store from "../../../Store/Store";

export function AllQuests() {
    const challengeStore: ChallengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const allQuestsStore: AllQuestsStore = useSelector((state: ReturnType<typeof store.getState>) => state.allQuests);
    const dispatch = useDispatch();
    const [activeCategoryFilter, setActiveCategoryFilter] = useState<QuestCategories | null>(null);
    const [noMoreQuests, setNoMoreQuests] = useState(false);

    useEffect(() => {
        if (challengeStore.challenge && allQuestsStore.loading) {
            fetchQuests(activeCategoryFilter)
                .then((quests) => {
                    const myQuestIds = challengeStore.challenge!.quests.map((q) => q.id);
                    // Filter already selected quests
                    dispatch(updateAllQuests({ quests: quests.filter((q) => !myQuestIds.includes(q.id)), loading: false }));
                    setNoMoreQuests(false);
                })
                .catch((err) => {
                    dispatch(updateAllQuests({ quests: [], loading: false }));
                    console.error(`Something went wrong... ${err.message}`);
                });
        }
    }, [dispatch, challengeStore.challenge, allQuestsStore.loading, activeCategoryFilter]);

    const loadMoreQuests = useCallback(() => {
        const lastQuestVisible = allQuestsStore.quests[allQuestsStore.quests.length - 1];

        fetchQuestsAfter(lastQuestVisible, activeCategoryFilter).then((nextQuests) => {
            if (nextQuests.length) {
                dispatch(extendAllQuests(nextQuests));
            } else {
                setNoMoreQuests(true);
            }
        });
    }, [allQuestsStore.quests, activeCategoryFilter, dispatch]);

    if (challengeStore.loading) {
        return <QuestSkeletons />;
    }

    if (!challengeStore.challenge) {
        return (
            <Card shadow="sm" padding="xl" radius="sm" style={{ width: "100%" }}>
                Join the challenge to be able to accept quests...
            </Card>
        );
    }

    return (
        <>
            <CategoryFilter active={activeCategoryFilter} setActive={setActiveCategoryFilter} />
            <ScrollArea h="calc(100vh - 104px)" type="never">
                <Flex direction="column" mb="var(--mantine-spacing-lg)">
                    {allQuestsStore.loading ? (
                        <QuestSkeletons />
                    ) : (
                        <>
                            {allQuestsStore.quests.length ? (
                                <>
                                    <Accordion variant="separated">
                                        {allQuestsStore.quests.map((quest) => (
                                            <QuestItem
                                                key={quest.id}
                                                quest={quest}
                                                challenge={challengeStore.challenge!}
                                                acceptMode={true}
                                                open={() => {}}
                                            />
                                        ))}
                                    </Accordion>
                                    <Button
                                        mt={10}
                                        size="xs"
                                        variant="filled"
                                        color="teal"
                                        onClick={loadMoreQuests}
                                        disabled={noMoreQuests}
                                    >
                                        <IconDots />
                                    </Button>
                                </>
                            ) : (
                                <Card shadow="sm" padding="xl" radius="sm" style={{ width: "100%" }}>
                                    No more quests left for this month...
                                </Card>
                            )}
                        </>
                    )}
                </Flex>
            </ScrollArea>
        </>
    );
}
