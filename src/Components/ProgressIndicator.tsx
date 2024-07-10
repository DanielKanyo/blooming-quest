import { useSelector } from "react-redux";

import { Group, Progress } from "@mantine/core";

import coin from "../Assets/Other/coin.png";
import percentage from "../Assets/Other/percentage.png";
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
                            <BadgeWithImage
                                imgSrc={percentage}
                                text={calcProgressValue(challengeStore.challenge)}
                                color={calcProgressColor(calcProgressValue(challengeStore.challenge))}
                            />
                        </Group>
                        <BadgeWithImage imgSrc={coin} text={challengeStore.challenge.coinToComplete} color="gray" />
                    </Group>
                </>
            )}
        </>
    );
}
