import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Center, Loader, Skeleton } from "@mantine/core";

import { Challenge } from "../../Layouts/Challenge";
import { MyQuests } from "../../Layouts/Quests/MyQuests/MyQuests";
import { fetchCurrentChallenge } from "../../Services/ChallengeService";
import { ChallengeStore, updateChallenge } from "../../Store/Features/ChallengeSlice";
import store from "../../Store/Store";
import "./Game.css";

export function GamePage() {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const challengeStore: ChallengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCurrentChallenge(user.id, new Date().getFullYear(), new Date().getMonth())
            .then((challenge) => {
                dispatch(updateChallenge({ challenge: challenge || null, loading: false }));
            })
            .catch((err) => {
                console.error(`Something wen wrong during challenge fetch... ${err.message}"`);
            });
    }, [user, dispatch]);

    return (
        <div className="main">
            <div className="challenges-container">
                <Card h="100%" shadow="sm" padding="lg" radius="sm">
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
