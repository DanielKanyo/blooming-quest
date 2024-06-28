import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInPage } from './SignIn.page';
import { onAuthStateChanged } from "firebase/auth";
import { Center, Loader } from "@mantine/core";

export function LandingPage() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/home');
            }
        });
    }, [user, navigate]);

    return (
        <Center style={{ height: '100vh' }}>
            {
                loading ? (<Loader size={40} color="white" />) : (<SignInPage />)
            }
        </Center>
    )
}
