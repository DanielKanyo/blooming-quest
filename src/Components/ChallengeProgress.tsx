import { useMemo } from "react";
import { useSelector } from "react-redux";

import { Group, Progress, Tooltip } from "@mantine/core";

import calendar from "../Assets/Other/calendar.png";
import coin from "../Assets/Other/coin.png";
import percentage from "../Assets/Other/percentage.png";
import { Challenge } from "../Shared/Types/ChallengeType";
import { daysInThisMonth, MONTHS } from "../Shared/Utils";
import { ChallengeStore } from "../Store/Features/ChallengeSlice";
import store from "../Store/Store";
import { BadgeWithImage } from "./BadgeWithImage/BadgeWithImage";

export function ChallengeProgress() {
    const challengeStore: ChallengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const { challenge } = challengeStore;
    const date = new Date().getDate();
    const numOfDaysInMonth = daysInThisMonth();

    const { challengeProgressValue, challengeProgressColor } = useMemo(() => {
        if (!challenge) return { challengeProgressValue: 0, challengeProgressColor: "gray" };

        const calcProgressValue = (challenge: Challenge): number => {
            const { coinCurrent, coinToComplete } = challenge;

            return coinCurrent ? (coinCurrent * 100) / coinToComplete : 0;
        };

        const calcProgressColor = (percent: number): string => {
            if (percent < 30) return "red";
            if (percent < 65) return "yellow";

            return "teal";
        };

        const challengeProgressValue = calcProgressValue(challenge);
        const challengeProgressColor = calcProgressColor(challengeProgressValue);

        return { challengeProgressValue, challengeProgressColor };
    }, [challenge]);

    const { monthProgressInPercent, monthProgressColor, tooltipLabel, month } = useMemo(() => {
        const getMonthProgressInPercent = (numOfDaysInMonth: number, date: number): number => {
            return (date * 100) / numOfDaysInMonth;
        };

        const getProgressColor = (numOfDaysInMonth: number, date: number): string => {
            if (numOfDaysInMonth - date < 5) return "red";
            if (numOfDaysInMonth - date < 10) return "yellow";

            return "teal";
        };

        const getProgressTooltipLabel = (numOfDaysInMonth: number, date: number) => {
            const daysLeft = numOfDaysInMonth - date;

            if (daysLeft === 1) {
                return "Only 1 day left...";
            }

            return `${daysLeft} days left...`;
        };

        const monthProgressInPercent = getMonthProgressInPercent(numOfDaysInMonth, date);
        const monthProgressColor = getProgressColor(numOfDaysInMonth, date);
        const tooltipLabel = getProgressTooltipLabel(numOfDaysInMonth, date);
        const month = MONTHS.get(new Date().getMonth());

        return { monthProgressInPercent, monthProgressColor, tooltipLabel, month };
    }, [numOfDaysInMonth, date]);

    return (
        <>
            {challenge && (
                <>
                    <div>
                        <Tooltip label={tooltipLabel} color="gray" position="top">
                            <Progress color={monthProgressColor} size="sm" value={monthProgressInPercent} mb={10} />
                        </Tooltip>
                        <Progress color={challengeProgressColor} size="sm" value={challengeProgressValue} mb={10} />
                    </div>
                    <Group justify="space-between">
                        <Group gap={10}>
                            <BadgeWithImage imgSrc={calendar} text={`${month} ${date}`} color="gray" />
                            <BadgeWithImage imgSrc={coin} text={challenge.coinCurrent} color="gray" />
                            <BadgeWithImage imgSrc={percentage} text={challengeProgressValue.toFixed(2)} color="gray" />
                        </Group>
                        <Group gap={10}>
                            <BadgeWithImage imgSrc={coin} text={challenge.coinToComplete} color="gray" />
                            <BadgeWithImage text={`${month} ${numOfDaysInMonth}`} color="gray" imgSrc={calendar} />
                        </Group>
                    </Group>
                </>
            )}
        </>
    );
}
