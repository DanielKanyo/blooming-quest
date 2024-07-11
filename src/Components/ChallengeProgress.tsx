import { useMemo } from "react";
import { useSelector } from "react-redux";

import { Group, Progress } from "@mantine/core";

import coin from "../Assets/Other/coin.png";
import percentage from "../Assets/Other/percentage.png";
import { Challenge } from "../Shared/Types/ChallengeType";
import { ChallengeStore } from "../Store/Features/ChallengeSlice";
import store from "../Store/Store";
import { BadgeWithImage } from "./BadgeWithImage/BadgeWithImage";

export function ChallengeProgress() {
    const challengeStore: ChallengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const { challenge } = challengeStore;

    const { progressValue, progressColor } = useMemo(() => {
        if (!challenge) return { progressValue: 0, progressColor: "gray" };

        const calcProgressValue = (challenge: Challenge): number => {
            const { coinCurrent, coinToComplete } = challenge;

            return coinCurrent ? (coinCurrent * 100) / coinToComplete : 0;
        };

        const calcProgressColor = (percent: number): string => {
            if (percent < 30) return "red";
            if (percent < 65) return "yellow";

            return "teal";
        };

        const progressValue = calcProgressValue(challenge);
        const progressColor = calcProgressColor(progressValue);

        return { progressValue, progressColor };
    }, [challenge]);

    return (
        <>
            {challenge && (
                <>
                    <Progress color={progressColor} size="sm" value={progressValue} />
                    <Group justify="space-between" mt={10}>
                        <Group gap={10}>
                            <BadgeWithImage imgSrc={coin} text={challenge.coinCurrent} color={progressColor} />
                            <BadgeWithImage imgSrc={percentage} text={progressValue.toFixed(2)} color={progressColor} />
                        </Group>
                        <BadgeWithImage imgSrc={coin} text={challenge.coinToComplete} color="gray" />
                    </Group>
                </>
            )}
        </>
    );
}
