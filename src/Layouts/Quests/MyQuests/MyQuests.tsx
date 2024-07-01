import { Flex, ScrollArea } from "@mantine/core";
import { ChallengeContext } from "../../../Contexts/ChallengeContext";
import { useContext } from "react";

export function MyQuests() {
    const challenge = useContext(ChallengeContext);

    return (
        <ScrollArea h="100%" type="never">
            {challenge ? (<Flex direction="column">Quests will be listed here...</Flex>) : (
                <div>Join a challenge to be able to accept quests...</div>
            )}
        </ScrollArea>
    );
}
