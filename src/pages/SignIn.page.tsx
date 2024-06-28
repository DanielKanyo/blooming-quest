import { Center, Card, Button, TextInput, Text, Divider, rem, Loader, PasswordInput, Group, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

export function SignInPage() {
    const [signInLoading, setSignInLoading] = useState(false);
    const [signInError, setSignInError] = useState("");

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email..."),
            password: (value) => (/^.{6,}$/.test(value) ? null : "Invalid password... A minimum of 6 characters is required"),
        },
    });

    const handleSubmit = (email: string, password: string) => {
        setSignInLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setSignInLoading(false);
                setSignInError("");
            })
            .catch((error) => {
                setSignInLoading(false);
                setSignInError(error.message);
            });
    };

    return (
        <Center style={{ height: "100vh" }}>
            <Card shadow="xl" padding="xl" radius="md" withBorder style={{ width: rem(500) }}>
                <form onSubmit={form.onSubmit(({ email, password }) => handleSubmit(email, password))}>
                    <Text size="xl">Login</Text>
                    <Text size="sm" style={{ opacity: "0.4" }}>
                        Please fill the input below
                    </Text>

                    <Divider my="xl" />

                    <TextInput
                        size="md"
                        radius="md"
                        style={{ marginBottom: rem(20) }}
                        placeholder="Enter your email address..."
                        key={form.key("email")}
                        {...form.getInputProps("email")}
                    />
                    <PasswordInput
                        size="md"
                        radius="md"
                        style={{ marginBottom: rem(20) }}
                        placeholder="Enter your password..."
                        key={form.key("password")}
                        {...form.getInputProps("password")}
                    />

                    {signInError && (
                        <Alert variant="light" color="red" title="Something went wrong!">
                            {signInError}
                        </Alert>
                    )}

                    <Button fullWidth type="submit" style={{ marginTop: rem(20) }} color="teal">
                        {signInLoading ? <Loader size={16} color="white" /> : "Login"}
                    </Button>

                    <Group justify="flex-end" gap="xs" style={{ marginTop: rem(40) }}>
                        <Text size="sm" style={{ opacity: "0.4" }}>
                            Don't hava an account?
                        </Text>
                        <Link to="/sign-up">
                            <Text size="sm" c="teal" style={{ textDecoration: "underline" }}>
                                Sign up
                            </Text>
                        </Link>
                    </Group>
                </form>
            </Card>
        </Center>
    );
}
