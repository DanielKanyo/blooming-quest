import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import { Center, Loader } from "@mantine/core";

import { auth } from "../Configs/Firebase/FirebaseConfig";
import { SignInPage } from "./SignInPage";

export function LandingPage() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/home");
            }
        });
    }, [user, navigate]);

    return <Center style={{ height: "100vh" }}>{loading ? <Loader size={40} color="white" /> : <SignInPage />}</Center>;
}
