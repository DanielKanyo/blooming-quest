import { useDispatch, useSelector } from "react-redux";

import { Button, Center, Flex, ScrollArea } from "@mantine/core";
import { IconCalendarPlus } from "@tabler/icons-react";

import { ChallengeProgress } from "../Components/ChallengeProgress";
import { MonthProgress } from "../Components/MonthProgress";
import { fetchCurrentChallenge, joinChallenge } from "../Services/GameService";
import { User } from "../Shared/Types/UserType";
import { daysInThisMonth } from "../Shared/Utils";
import { ChallengeStore, updateChallenge, updateChallengeLoading } from "../Store/Features/ChallengeSlice";
import store from "../Store/Store";

export function Challenge() {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const challengeStore: ChallengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const dispatch = useDispatch();

    const joinMonthlyChallenge = () => {
        const userId = (user as User).id;
        const year = new Date().getFullYear();
        const month = new Date().getMonth();

        dispatch(updateChallengeLoading(true));

        joinChallenge(userId, year, month)
            .then(() => {
                fetchCurrentChallenge(userId, year, month)
                    .then((challenge) => {
                        dispatch(updateChallenge({ challenge: challenge || null, loading: false }));
                    })
                    .catch((err) => {
                        dispatch(updateChallenge({ challenge: null, loading: false }));
                        console.error(`Something wen wrong during challenge fetch... ${err.message}"`);
                    });
            })
            .catch((err) => {
                dispatch(updateChallenge({ challenge: null, loading: false }));
                console.error(`Something wen wrong during challenge creation... ${err.message}"`);
            });
    };

    return (
        <>
            {challengeStore.challenge ? (
                <>
                    <ChallengeProgress />
                    <ScrollArea
                        h="100%"
                        mt="sm"
                        style={{ background: "var(--mantine-color-dark-7)", borderRadius: "var(--mantine-radius-sm)" }}
                        type="never"
                        p="md"
                    >
                        <div style={{ height: "200vh" }}>Game Content (Scrollable)</div>
                    </ScrollArea>
                    <Flex mt="sm" style={{ background: "var(--mantine-color-dark-7)", borderRadius: "var(--mantine-radius-sm)" }} p="md">
                        Game Footer
                    </Flex>
                    <MonthProgress numOfDaysInMonth={daysInThisMonth()} date={new Date().getDate()} />
                </>
            ) : (
                <Center h="100%">
                    <Button
                        variant="gradient"
                        gradient={{ from: "cyan", to: "teal", deg: 60 }}
                        leftSection={<IconCalendarPlus size={16} />}
                        onClick={() => joinMonthlyChallenge()}
                    >
                        Join Challenge
                    </Button>
                </Center>
            )}
        </>
    );
}
