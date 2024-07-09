import { useSelector } from "react-redux";

import { Badge, Group, Progress } from "@mantine/core";

import { Challenge } from "../Shared/Types/ChallengeType";
import { ChallengeStore } from "../Store/Features/ChallengeSlice";
import store from "../Store/Store";

export function ProgressIndicator() {
    const challengeStore: ChallengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);

    const calcProgressValue = (challenge: Challenge): number => {
        const { coinCurrent, coinToComplete } = challenge;

        return !coinCurrent ? 0 : (coinCurrent * 100) / coinToComplete;
    };

    const calcProgressColor = (percent: number): string => {
        if (percent < 30) {
            return "red";
        } else if (percent < 65) {
            return "yellow";
        }

        return "teal";
    };

    return (
        <>
            {challengeStore.challenge && (
                <>
                    <Progress
                        color={calcProgressColor(calcProgressValue(challengeStore.challenge))}
                        size="sm"
                        value={calcProgressValue(challengeStore.challenge)}
                    />
                    <Group justify="space-between" mt={10}>
                        <Group gap={10}>
                            <Badge radius="sm" variant="light" color={calcProgressColor(calcProgressValue(challengeStore.challenge))}>
                                {challengeStore.challenge.coinCurrent} Coin
                            </Badge>
                            <Badge radius="sm" variant="light" color={calcProgressColor(calcProgressValue(challengeStore.challenge))}>
                                {calcProgressValue(challengeStore.challenge)} %
                            </Badge>
                        </Group>
                        <Badge radius="sm" variant="light" color="gray">
                            {challengeStore.challenge.coinToComplete} Coin
                        </Badge>
                    </Group>
                </>
            )}
        </>
    );
}
