import { useDispatch, useSelector } from "react-redux";

import { Button, Center } from "@mantine/core";
import { IconCalendarPlus } from "@tabler/icons-react";

import { fetchCurrentChallenge, joinChallenge } from "../Services/GameService";
import { User } from "../Shared/Types/UserType";
import { ChallengeStore, updateChallenge, updateChallengeLoading } from "../Store/Features/ChallengeSlice";
import store from "../Store/Store";

export function Challenges() {
    const month = new Date().toLocaleString("default", { month: "long" });
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
                <div>
                    {user.email} already joined the {month} challenge
                </div>
            ) : (
                <Center h="100%">
                    <Button
                        variant="gradient"
                        gradient={{ from: "cyan", to: "teal", deg: 60 }}
                        leftSection={<IconCalendarPlus size={16} />}
                        onClick={() => joinMonthlyChallenge()}
                    >
                        Join {month} Challenge
                    </Button>
                </Center>
            )}
        </>
    );
}
