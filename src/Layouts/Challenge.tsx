import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Center, Flex, ScrollArea } from "@mantine/core";
import { IconCalendarPlus, IconPlus } from "@tabler/icons-react";

import { ChallengeProgress } from "../Components/ChallengeProgress";
import { createGarden, fetchCurrentChallenge, fetchGardens, joinChallenge } from "../Services/ChallengeService";
import { User } from "../Shared/Types/UserType";
import { MONTHS } from "../Shared/Utils";
import { ChallengeStore, updateChallenge, updateChallengeLoading } from "../Store/Features/ChallengeSlice";
import { GardenStore, updateGardens } from "../Store/Features/GardenSlice";
import store from "../Store/Store";
import { GardenArea } from "./GardenArea/GardenArea";
import { HouseArea } from "./HouseArea/HouseArea";

export function Challenge() {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const { challenge }: ChallengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const { gardens }: GardenStore = useSelector((state: ReturnType<typeof store.getState>) => state.garden);
    const dispatch = useDispatch();

    const joinMonthlyChallenge = useCallback(async () => {
        dispatch(updateChallengeLoading(true));

        try {
            const userId = (user as User).id;
            const year = new Date().getFullYear();
            const month = new Date().getMonth();

            await joinChallenge(userId, year, month);

            const challenge = await fetchCurrentChallenge(userId, year, month);

            await createGarden(challenge!.id);
            const gardens = await fetchGardens(challenge!.id);

            dispatch(updateGardens({ gardens }));
            dispatch(updateChallenge({ challenge, loading: false }));
        } catch (err) {
            dispatch(updateChallenge({ challenge: null, loading: false }));
            console.error("Something wen wrong during challenge creation...", err);
        }
    }, [dispatch, user]);

    if (challenge) {
        return (
            <>
                <ChallengeProgress />
                <ScrollArea
                    h="100%"
                    mt="sm"
                    style={{ background: "var(--mantine-color-dark-7)", borderRadius: "var(--mantine-radius-md)" }}
                    type="never"
                    pt="md"
                    pl="md"
                    pr="md"
                    pb={0}
                >
                    <HouseArea />
                    {gardens
                        .sort((a, b) => a.timestamp - b.timestamp)
                        .map((garden, index) => (
                            <GardenArea key={index} garden={garden} />
                        ))}
                    <Button variant="light" color="gray" size="md" radius="md" fullWidth mb="var(--mantine-spacing-md)">
                        <IconPlus color="gray" />
                    </Button>
                </ScrollArea>
                <Flex mt="sm" style={{ background: "var(--mantine-color-dark-7)", borderRadius: "var(--mantine-radius-md)" }} p="md">
                    Game Footer
                </Flex>
            </>
        );
    }

    return (
        <Center h="100%">
            <Button
                variant="gradient"
                radius="md"
                gradient={{ from: "cyan", to: "teal", deg: 60 }}
                leftSection={<IconCalendarPlus size={16} />}
                onClick={joinMonthlyChallenge}
            >
                Join the {MONTHS.get(new Date().getMonth())} Challenge
            </Button>
        </Center>
    );
}
