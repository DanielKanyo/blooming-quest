import { useDispatch, useSelector } from "react-redux";

import { Button, Center, Flex, ScrollArea } from "@mantine/core";
import { IconCalendarPlus } from "@tabler/icons-react";

import { ChallengeProgress } from "../Components/ChallengeProgress";
import { fetchCurrentChallenge, joinChallenge } from "../Services/ChallengeService";
import { User } from "../Shared/Types/UserType";
import { MONTHS } from "../Shared/Utils";
import { ChallengeStore, updateChallenge, updateChallengeLoading } from "../Store/Features/ChallengeSlice";
import store from "../Store/Store";
import { GardenArea } from "./GardenArea/GardenArea";
import { HouseArea } from "./HouseArea/HouseArea";

// This will come from the db
const NUM_OF_GARDENS = 3;

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

    if (challengeStore.challenge) {
        return (
            <>
                <ChallengeProgress />
                <ScrollArea
                    h="100%"
                    mt="sm"
                    style={{ background: "var(--mantine-color-dark-7)", borderRadius: "var(--mantine-radius-sm)" }}
                    type="never"
                    p="md"
                >
                    <HouseArea />
                    {[...Array(NUM_OF_GARDENS).keys()].map((_item, key) => {
                        return <GardenArea key={key} />;
                    })}
                </ScrollArea>
                <Flex mt="sm" style={{ background: "var(--mantine-color-dark-7)", borderRadius: "var(--mantine-radius-sm)" }} p="md">
                    Game Footer
                </Flex>
            </>
        );
    }

    return (
        <Center h="100%">
            <Button
                variant="gradient"
                gradient={{ from: "cyan", to: "teal", deg: 60 }}
                leftSection={<IconCalendarPlus size={16} />}
                onClick={() => joinMonthlyChallenge()}
            >
                Join the {MONTHS.get(new Date().getMonth())} Challenge
            </Button>
        </Center>
    );
}
