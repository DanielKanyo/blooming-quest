import { useSelector } from "react-redux";

import { Accordion, Card, ScrollArea } from "@mantine/core";

import { QuestItem } from "../../../Components/Quest/QuestItem";
import store from "../../../Store/Store";

export function MyQuests() {
    const challengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);

    return (
        <ScrollArea h="100%" type="never">
            {challengeStore.challenge ? (
                <>
                    {challengeStore.challenge.quests.length ? (
                        <Accordion variant="separated">
                            {challengeStore.challenge.quests.map((quest) => {
                                return <QuestItem key={quest.id} quest={quest} challenge={challengeStore.challenge!} acceptMode={false} />;
                            })}
                        </Accordion>
                    ) : (
                        <Card shadow="sm" padding="xl" radius="md" style={{ width: "100%" }}>
                            No quest accepted...
                        </Card>
                    )}
                </>
            ) : (
                <div>Join the challenge to be able to accept quests...</div>
            )}
        </ScrollArea>
    );
}
