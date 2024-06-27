import { Center, Card, Button, TextInput, Text, Divider, rem, Loader, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';

export function LandingPage() {
    const [user] = useAuthState(auth);
    const [initialLoading, setInitialLoading] = useState(false);
    const [initialError, setInitialError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginLinkSuccess, setLoginLinkSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { search } = location;

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const handleSubmit = (email: string) => {
        setLoginLoading(true);

        sendSignInLinkToEmail(auth, email, {
            url: 'http://localhost:5173/',
            handleCodeInApp: true,
        }).then(() => {
            localStorage.setItem('email', email);

            setLoginLoading(false);
            setLoginError('');
            setLoginLinkSuccess(true);
        }).catch((err) => {
            setLoginLinkSuccess(false);
            setLoginLoading(false);
            setLoginError(err.message);
        });
    }

    useEffect(() => {
        if (user) {
            navigate('/home');
        } else {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = localStorage.getItem("email");

                if (!email) {
                    email = window.prompt("Please provide your email");
                }

                setInitialLoading(true);

                signInWithEmailLink(auth, email!, window.location.href).then((result) => {
                    setInitialLoading(false);
                    setInitialError('');
                    console.log(result);

                    localStorage.removeItem("email");
                    navigate("/home");
                }).catch((err) => {
                    setInitialLoading(false);
                    setInitialError(err);

                    navigate("/")
                });
            }
        }

    }, [user, search, navigate]);

    return (
        <Center style={{ height: '100vh' }}>
            {
                initialLoading ? (<Loader size={40} color="white" />) : (
                    <>
                        {
                            initialError !== '' ? (<div>{initialError}</div>) : (
                                <>
                                    {user ? (<div>Please wait</div>) : (
                                        <Card shadow="xl" padding="xl" radius="md" withBorder style={{ width: rem(500) }}>
                                            <form onSubmit={form.onSubmit(({ email }) => handleSubmit(email))}>
                                                <Text size="xl">Login</Text>
                                                <Text size="sm" style={{ opacity: '0.5' }}>Please enter your e-mail address...</Text>

                                                <Divider my="xl" />

                                                <TextInput
                                                    size="xl"
                                                    radius="md"
                                                    style={{ marginBottom: rem(20) }}
                                                    placeholder="your@email.com"
                                                    key={form.key('email')}
                                                    {...form.getInputProps('email')}
                                                />

                                                {
                                                    loginError && (
                                                        <Alert variant="light" color="red" title="Something went wrong!">
                                                            {loginError}
                                                        </Alert>
                                                    )
                                                }

                                                {
                                                    loginLinkSuccess && (
                                                        <Alert variant="light" color="teal" title="Success!">
                                                            The link is sent to your e-mail address...
                                                        </Alert>
                                                    )
                                                }

                                                <Button fullWidth type="submit" style={{ marginTop: rem(20) }} color='teal'>
                                                    {loginLoading ? (<Loader size={17} color="white" />) : "Send Verification Mail"}
                                                </Button>
                                            </form>
                                        </Card>
                                    )
                                    }
                                </>
                            )
                        }
                    </>
                )
            }
        </Center>
    )
}
