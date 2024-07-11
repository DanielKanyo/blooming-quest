import { useMemo } from "react";

import { Badge, Group, Progress, Tooltip } from "@mantine/core";

import calendar from "../Assets/Other/calendar.png";
import { daysInThisMonth, MONTHS } from "../Shared/Utils";
import { BadgeWithImage } from "./BadgeWithImage/BadgeWithImage";

export function MonthProgress() {
    const date = new Date().getDate();
    const numOfDaysInMonth = daysInThisMonth();

    const { monthProgressInPercent, progressColor, tooltipLabel, month } = useMemo(() => {
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
        const month = MONTHS.get(new Date().getMonth());

        return { monthProgressInPercent, progressColor, tooltipLabel, month };
    }, [numOfDaysInMonth, date]);

    return (
        <Tooltip label={tooltipLabel} color="gray" position="bottom" offset={-28}>
            <div>
                <Progress w="100%" size="sm" mt="sm" color={progressColor} value={monthProgressInPercent} />
                <Group justify="space-between" mt={10}>
                    <Badge radius="sm" variant="light" color="gray" h={28}>
                        <Badge mt={1} variant="transparent" color="gray" size="lg" p={0}>
                            {month} {date}
                        </Badge>
                    </Badge>
                    {/* <BadgeWithImage text={`${month} ${date}`} color="gray" imgSrc={calendar} /> */}
                    <BadgeWithImage text={`${month} ${numOfDaysInMonth}`} color="gray" imgSrc={calendar} />
                </Group>
            </div>
        </Tooltip>
    );
}
