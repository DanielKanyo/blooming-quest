import { useContext, useEffect, useState } from "react";

import { Card, Loader } from "@mantine/core";

import { ChallengeContext } from "../../Shared/Challenge/ChallengeContext";
import { Challenge } from "../../Shared/Challenge/ChallengeType";
import { UserContext } from "../../Shared/User/UserContext";
import { MyQuests } from "../Quests/MyQuests/MyQuests";
import { Challenges } from "./Challenges";
import "./Game.css";
import { fetchCurrentChallenge } from "./GameService";

export function Game() {
    const user = useContext(UserContext);
    const [challengeLoading, setChallengeLoading] = useState(true);
    const [challenge, setChallenge] = useState<Challenge | null>(null);

    useEffect(() => {
        fetchCurrentChallenge(user.id, new Date().getFullYear(), new Date().getMonth()).then((challenge) => {
            setChallenge(challenge);

            setChallengeLoading(false);
        });
    }, [user, setChallenge, setChallengeLoading]);

    return (
        <div className="game-layout">
            <div className="challenges-container">
                <Card h="100%" shadow="sm" padding="lg" radius="md" withBorder>
                    {challengeLoading ? (
                        <Loader size={40} color="white" />
                    ) : (
                        <ChallengeContext.Provider value={challenge}>
                            <Challenges />
                        </ChallengeContext.Provider>
                    )}
                </Card>
            </div>
            <div className="my-quests-container">
                <MyQuests />
            </div>
        </div>
    );
}
