import { useEffect, useState } from "react";

import { Flex, ScrollArea, Skeleton } from "@mantine/core";

import { QuestItem } from "../../../Components/Quest/QuestItem";
import { fetchQuests } from "../../../Services/GameService";
import { Quest } from "../../../Shared/Types/QuestType";

export function AllQuests() {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [questsLoding, setQuestsLoding] = useState(false);

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
                    quests.map((quest) => {
                        return <QuestItem key={quest.id} quest={quest} />;
                    })
                )}
            </Flex>
        </ScrollArea>
    );
}
