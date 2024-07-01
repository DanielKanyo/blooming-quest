import { useState } from "react";
import { Link } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { Center, Card, Button, TextInput, Text, Divider, rem, Loader, PasswordInput, Group, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconKey, IconLetterCase } from "@tabler/icons-react";

import { auth } from "../Configs/Firebase/FirebaseConfig";
import classes from "../Configs/Theme/style.module.css";
import { createUser } from "../Services/UserService";

export function SignUpPage() {
    const [signUpLoading, seSignUpLoading] = useState(false);
    const [signUpSuccess, seSignUpSuccess] = useState(false);
    const [signUpError, setSignUpError] = useState("");

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },

        validate: {
            firstName: (value) => (/^[a-zA-Z]+$/.test(value) ? null : "Invalid first name..."),
            lastName: (value) => (/^[a-zA-Z]+$/.test(value) ? null : "Invalid last name..."),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email..."),
            password: (value) => (/^.{6,}$/.test(value) ? null : "Invalid password... A minimum of 6 characters is required"),
            confirmPassword: (value, values) => (value !== values.password ? "Passwords did not match" : null),
        },
    });

    const handleSubmit = (firstName: string, lastName: string, email: string, password: string) => {
        seSignUpLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                try {
                    await createUser(userCredential.user.uid, {
                        firstName,
                        lastName,
                        email: userCredential.user.email!,
                        id: userCredential.user.uid,
                    });

                    seSignUpLoading(false);
                    seSignUpSuccess(true);
                    setSignUpError("");
                } catch (error: unknown) {
                    seSignUpLoading(false);
                    seSignUpSuccess(false);
                    setSignUpError(error as string);
                }
            })
            .catch((error) => {
                seSignUpLoading(false);
                seSignUpSuccess(false);
                setSignUpError(error.message);
            });
    };

    return (
        <Center style={{ height: "100vh" }}>
            <Card shadow="sm" padding="xl" radius="md" style={{ width: rem(500) }}>
                <form
                    onSubmit={form.onSubmit(({ firstName, lastName, email, password }) =>
                        handleSubmit(firstName, lastName, email, password)
                    )}
                >
                    <Text size="xl">Create Account</Text>
                    <Text size="sm" style={{ opacity: "0.4" }}>
                        Please fill the inputs below
                    </Text>

                    <Divider my="xl" />

                    <TextInput
                        size="md"
                        radius="md"
                        style={{ marginBottom: rem(10) }}
                        placeholder="Enter your first name..."
                        key={form.key("firstName")}
                        {...form.getInputProps("firstName")}
                        leftSection={<IconLetterCase size={16} />}
                    />
                    <TextInput
                        size="md"
                        radius="md"
                        style={{ marginBottom: rem(10) }}
                        placeholder="Enter your last name..."
                        key={form.key("lastName")}
                        {...form.getInputProps("lastName")}
                        leftSection={<IconLetterCase size={16} />}
                    />
                    <TextInput
                        size="md"
                        radius="md"
                        style={{ marginBottom: rem(10) }}
                        placeholder="Enter your email address..."
                        key={form.key("email")}
                        {...form.getInputProps("email")}
                        leftSection={<IconAt size={16} />}
                    />
                    <PasswordInput
                        size="md"
                        radius="md"
                        style={{ marginBottom: rem(10) }}
                        placeholder="Enter your password..."
                        key={form.key("password")}
                        {...form.getInputProps("password")}
                        leftSection={<IconKey size={16} />}
                    />
                    <PasswordInput
                        size="md"
                        radius="md"
                        style={{ marginBottom: rem(20) }}
                        placeholder="Enter your password again..."
                        key={form.key("confirmPassword")}
                        {...form.getInputProps("confirmPassword")}
                        leftSection={<IconKey size={16} />}
                    />

                    {signUpError && (
                        <Alert variant="light" color="red" title="Something went wrong!">
                            {signUpError}
                        </Alert>
                    )}

                    {signUpSuccess && (
                        <Alert variant="light" color="teal" title="Sign up was successful!">
                            Please sign in...
                        </Alert>
                    )}

                    <Button
                        fullWidth
                        type="submit"
                        disabled={signUpLoading}
                        className={classes.button}
                        style={{ marginTop: rem(20) }}
                        variant="gradient"
                        gradient={{ from: "cyan", to: "teal", deg: 60 }}
                    >
                        {signUpLoading ? <Loader size={16} color="white" /> : "Sign Up"}
                    </Button>

                    <Group justify="flex-end" gap="xs" style={{ marginTop: rem(40) }}>
                        <Text size="sm" style={{ opacity: "0.4" }}>
                            Already hava an account?
                        </Text>
                        <Link to="/">
                            <Text size="sm" c="teal" style={{ textDecoration: "underline" }}>
                                Sign in
                            </Text>
                        </Link>
                    </Group>
                </form>
            </Card>
        </Center>
    );
}
