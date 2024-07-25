import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Center, Loader, Skeleton } from "@mantine/core";

import { Challenge } from "../../Layouts/Challenge";
import { MyQuests } from "../../Layouts/Quests/MyQuests/MyQuests";
import { fetchCurrentChallenge, fetchGardens } from "../../Services/ChallengeService";
import { ChallengeStore, updateChallenge } from "../../Store/Features/ChallengeSlice";
import { updateGardens } from "../../Store/Features/GardenSlice";
import store from "../../Store/Store";
import "./Game.css";

export function GamePage() {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const challengeStore: ChallengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const challenge = await fetchCurrentChallenge(user.id, new Date().getFullYear(), new Date().getMonth());

                if (challenge) {
                    const gardens = await fetchGardens(challenge.id);

                    dispatch(updateGardens({ gardens }));
                }

                dispatch(updateChallenge({ challenge: challenge || null, loading: false }));
            } catch (err) {
                console.error("Something wen wrong during challenge fetch...", err);
            }
        };

        fetchData();
    }, [user, dispatch]);

    return (
        <div className="main">
            <div className="challenges-container">
                <Card h="100%" shadow="sm" padding="lg" radius="md">
                    {challengeStore.loading ? (
                        <Center h="100%">
                            <Loader size={40} color="var(--mantine-color-dark-0)" type="dots" />
                        </Center>
                    ) : (
                        <Challenge />
                    )}
                </Card>
            </div>
            <div className="my-quests-container">{challengeStore.loading ? <Skeleton h={75} mb="sm" animate={true} /> : <MyQuests />}</div>
        </div>
    );
}
