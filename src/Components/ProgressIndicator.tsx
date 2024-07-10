import { useSelector } from "react-redux";

import { Badge, Group, Progress } from "@mantine/core";

import coin from "../Assets/Other/coin.png";
import { Challenge } from "../Shared/Types/ChallengeType";
import { ChallengeStore } from "../Store/Features/ChallengeSlice";
import store from "../Store/Store";
import { BadgeWithImage } from "./BadgeWithImage/BadgeWithImage";

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
                            <BadgeWithImage
                                imgSrc={coin}
                                text={challengeStore.challenge.coinCurrent}
                                color={calcProgressColor(calcProgressValue(challengeStore.challenge))}
                            />
                            <Badge
                                h={28}
                                radius="sm"
                                variant="light"
                                color={calcProgressColor(calcProgressValue(challengeStore.challenge))}
                            >
                                <Badge mt={1} variant="transparent" color="gray" px={2}>
                                    <Badge variant="transparent" color="gray" size="lg" p={0}>
                                        {calcProgressValue(challengeStore.challenge)} %
                                    </Badge>
                                </Badge>
                            </Badge>
                        </Group>
                        <BadgeWithImage imgSrc={coin} text={challengeStore.challenge.coinToComplete} color="gray" />
                    </Group>
                </>
            )}
        </>
    );
}
