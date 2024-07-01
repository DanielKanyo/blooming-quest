import { useContext, useEffect, useState } from "react";

import { Card, Center, Divider, Loader, Skeleton } from "@mantine/core";

import { ChallengeContext } from "../../Contexts/ChallengeContext";
import { UserContext } from "../../Contexts/UserContext";
import { Challenges } from "../../Layouts/Challenges";
import { MyQuests } from "../../Layouts/Quests/MyQuests/MyQuests";
import { fetchCurrentChallenge } from "../../Services/GameService";
import { Challenge } from "../../Shared/Types/ChallengeType";
import "./Game.css";

export function GamePage() {
    const user = useContext(UserContext);
    const [challengeLoading, setChallengeLoading] = useState(true);
    const [challenge, setChallenge] = useState<Challenge | null>(null);

    useEffect(() => {
        fetchCurrentChallenge(user.id, new Date().getFullYear(), new Date().getMonth())
            .then((challenge) => {
                setChallenge(challenge);

                setChallengeLoading(false);
            })
            .catch((err) => {
                console.error(`Something wen wrong during challenge fetch... ${err.message}"`);
            });
    }, [user, setChallenge, setChallengeLoading]);

    return (
        <ChallengeContext.Provider value={challenge}>
            <div className="main">
                <div className="challenges-container">
                    <Card h="100%" shadow="sm" padding="lg" radius="md">
                        {challengeLoading ? (
                            <Center h="100%">
                                <Loader size={40} color="white" />
                            </Center>
                        ) : (
                            <Challenges setChallenge={setChallenge} />
                        )}
                    </Card>
                </div>
                <div className="my-quests-container">
                    <Card shadow="sm" padding="lg" radius="md" h="100%">
                        MyQuests
                        <Divider my="md" />
                        {challengeLoading ? <Skeleton h={50} mb="sm" animate={true} /> : <MyQuests />}
                    </Card>
                </div>
            </div>
        </ChallengeContext.Provider>
    );
}