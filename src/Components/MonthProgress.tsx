import { useMemo } from "react";

import { Progress, Tooltip } from "@mantine/core";

import { daysInThisMonth } from "../Shared/Utils";

export function MonthProgress() {
    const date = new Date().getDate();
    const numOfDaysInMonth = daysInThisMonth();

    const { monthProgressInPercent, progressColor, tooltipLabel } = useMemo(() => {
        const getMonthProgressInPercent = (numOfDaysInMonth: number, date: number): number => {
            return (date * 100) / numOfDaysInMonth;
        };

        const getProgressColor = (numOfDaysInMonth: number, date: number): string => {
            if (numOfDaysInMonth - date < 5) {
                return "red";
            } else if (numOfDaysInMonth - date < 10) {
                return "yellow";
            }
            return "teal";
        };

        const getProgressTooltipLabel = (numOfDaysInMonth: number, date: number) => {
            const daysLeft = numOfDaysInMonth - date;

            if (daysLeft === 1) {
                return "Only 1 day left of this month...";
            }
            return `There are ${daysLeft} days left in this month...`;
        };

        const monthProgressInPercent = getMonthProgressInPercent(numOfDaysInMonth, date);
        const progressColor = getProgressColor(numOfDaysInMonth, date);
        const tooltipLabel = getProgressTooltipLabel(numOfDaysInMonth, date);

        return { monthProgressInPercent, progressColor, tooltipLabel };
    }, [numOfDaysInMonth, date]);

    return (
        <Tooltip label={tooltipLabel} color="gray">
            <Progress size="sm" mt="sm" color={progressColor} value={monthProgressInPercent} />
        </Tooltip>
    );
}
