import { Button } from "@mantine/core";
import { useContext } from "react";
import { UserContext } from "../../Shared/User/UserContext";
import { joinChallenge } from "./GameService";
import { ChallengeContext } from "../../Shared/Challenge/ChallengeContext";

export function Challenges() {
    const user = useContext(UserContext);
    const challenge = useContext(ChallengeContext);

    return (
        <>
            {
                challenge ? (
                    <div>{user.email} already joined the "current month" challenge</div>
                ) : (
                    <Button variant="filled" onClick={() => joinChallenge(user.id, new Date().getFullYear(), new Date().getMonth())}>
                        Join "current month" Challenges
                    </Button>
                )
            }

        </>
    );
}
