import { useSelector } from "react-redux";

import { Flex, ScrollArea } from "@mantine/core";

import store from "../../../Store/Store";

export function MyQuests() {
    const challenge = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);

    return (
        <ScrollArea h="100%" type="never">
            {Object.entries(challenge).length ? (
                <Flex direction="column">Quests will be listed here...</Flex>
            ) : (
                <div>Join a challenge to be able to accept quests...</div>
            )}
        </ScrollArea>
    );
}
