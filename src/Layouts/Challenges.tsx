import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Center, Loader } from "@mantine/core";
import { IconCalendarPlus } from "@tabler/icons-react";

import classes from "../Configs/Theme/style.module.css";
import { fetchCurrentChallenge, joinChallenge } from "../Services/GameService";
import { updateChallenge } from "../Store/Features/ChallengeSlice";
import store from "../Store/Store";

export function Challenges() {
    const month = new Date().toLocaleString("default", { month: "long" });
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const challenge = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const [joining, setJoining] = useState(false);
    const dispatch = useDispatch();

    const joinMonthlyChallenge = () => {
        const userId = user.id;
        const year = new Date().getFullYear();
        const month = new Date().getMonth();

        setJoining(true);

        joinChallenge(userId, year, month)
            .then(() => {
                fetchCurrentChallenge(userId, year, month)
                    .then((c) => {
                        if (c) {
                            dispatch(updateChallenge(c));
                            setJoining(false);
                        }
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
            {Object.entries(challenge).length ? (
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
