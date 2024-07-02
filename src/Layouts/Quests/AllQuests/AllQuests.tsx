import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Flex, ScrollArea, Skeleton } from "@mantine/core";

import { QuestItem } from "../../../Components/Quest/QuestItem";
import { fetchQuests } from "../../../Services/GameService";
import { Quest } from "../../../Shared/Types/QuestType";
import store from "../../../Store/Store";

export function AllQuests() {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [questsLoding, setQuestsLoding] = useState(false);
    const challenge = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);

    useEffect(() => {
        setQuestsLoding(true);

        fetchQuests()
            .then((quests) => {
                setQuestsLoding(false);
                setQuests(quests);
            })
            .catch((err) => {
                setQuestsLoding(false);
                console.error(`Something went wrong... ${err.message}`);
            });
    }, [setQuestsLoding, setQuests]);
    return (
        <ScrollArea h="100%" type="never">
            <Flex direction="column" px="lg">
                {questsLoding ? (
                    <Skeleton h={50} mb="sm" animate={true} />
                ) : (
                    <>
                        {Object.entries(challenge).length ? (
                            quests.map((quest) => {
                                return <QuestItem key={quest.id} quest={quest} />;
                            })
                        ) : (
                            <div>Join a challenge to be able to accept quests...</div>
                        )}
                    </>
                )}
            </Flex>
        </ScrollArea>
    );
}
