import { useContext, useState } from "react";

import { Button, Center, Loader } from "@mantine/core";
import { IconCalendarPlus } from "@tabler/icons-react";

import classes from "../Configs/Theme/style.module.css";
import { ChallengeContext } from "../Contexts/ChallengeContext";
import { UserContext } from "../Contexts/UserContext";
import { fetchCurrentChallenge, joinChallenge } from "../Services/GameService";
import { Challenge } from "../Shared/Types/ChallengeType";

type ChallengesProps = {
    setChallenge: (challenge: Challenge | null) => void;
};

export function Challenges({ setChallenge }: ChallengesProps) {
    const month = new Date().toLocaleString("default", { month: "long" });
    const user = useContext(UserContext);
    const challenge = useContext(ChallengeContext);
    const [joining, setJoining] = useState(false);

    const joinMonthlyChallenge = () => {
        const userId = user.id;
        const year = new Date().getFullYear();
        const month = new Date().getMonth();

        setJoining(true);

        joinChallenge(userId, year, month)
            .then(() => {
                fetchCurrentChallenge(userId, year, month)
                    .then((c) => {
                        setJoining(false);
                        setChallenge(c);
                    })
                    .catch((err) => {
                        setJoining(false);
                        console.error(`Something wen wrong during challenge fetch... ${err.message}"`);
                    });
            })
            .catch((err) => {
                setJoining(false);
                console.error(`Something wen wrong during challenge creation... ${err.message}"`);
            });
    };

    return (
        <>
            {challenge ? (
                <div>
                    {user.email} already joined the {month} challenge
                </div>
            ) : (
                <Center h="100%">
                    <Button
                        className={classes.button}
                        variant="gradient"
                        gradient={{ from: "cyan", to: "teal", deg: 60 }}
                        leftSection={joining ? <Loader color="var(--mantine-color-dark-3)" size={16} /> : <IconCalendarPlus size={16} />}
                        disabled={joining}
                        onClick={() => joinMonthlyChallenge()}
                    >
                        Join {month} Challenge
                    </Button>
                </Center>
            )}
        </>
    );
}
