import { useState } from "react";
import { Link } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { Center, Card, Button, TextInput, Text, Image, rem, PasswordInput, Group, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconKey, IconLetterCase } from "@tabler/icons-react";

import logo from "../Assets/Images/logo.png";
import { auth } from "../Configs/Firebase/FirebaseConfig";
import { createUser } from "../Services/UserService";
import { UserRoles } from "../Shared/Types/UserType";

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
                        roles: [UserRoles.USER],
                        totalCoin: 0,
                        gem: 10,
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
        <Center style={{ height: "90vh", flexDirection: "column" }}>
            <Image h={50} w={50} src={logo} />
            <Text ml={10} className="sign-title" mb={20}>
                BloomingQuest
            </Text>
            <Card shadow="sm" padding="xl" radius="sm" style={{ width: rem(500) }}>
                <form
                    onSubmit={form.onSubmit(({ firstName, lastName, email, password }) =>
                        handleSubmit(firstName, lastName, email, password)
                    )}
                >
                    <Text size="xl">Create Account</Text>
                    <Text size="sm" style={{ opacity: "0.4" }} mb={25}>
                        Please fill the inputs below
                    </Text>

                    <TextInput
                        size="md"
                        radius="sm"
                        style={{ marginBottom: rem(10) }}
                        placeholder="Enter your first name..."
                        key={form.key("firstName")}
                        {...form.getInputProps("firstName")}
                        leftSection={<IconLetterCase size={16} />}
                    />
                    <TextInput
                        size="md"
                        radius="sm"
                        style={{ marginBottom: rem(10) }}
                        placeholder="Enter your last name..."
                        key={form.key("lastName")}
                        {...form.getInputProps("lastName")}
                        leftSection={<IconLetterCase size={16} />}
                    />
                    <TextInput
                        size="md"
                        radius="sm"
                        style={{ marginBottom: rem(10) }}
                        placeholder="Enter your email address..."
                        key={form.key("email")}
                        {...form.getInputProps("email")}
                        leftSection={<IconAt size={16} />}
                    />
                    <PasswordInput
                        size="md"
                        radius="sm"
                        style={{ marginBottom: rem(10) }}
                        placeholder="Enter your password..."
                        key={form.key("password")}
                        {...form.getInputProps("password")}
                        leftSection={<IconKey size={16} />}
                    />
                    <PasswordInput
                        size="md"
                        radius="sm"
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
                        loading={signUpLoading}
                        loaderProps={{ type: "dots" }}
                        style={{ marginTop: rem(20) }}
                        variant="gradient"
                        gradient={{ from: "cyan", to: "teal", deg: 60 }}
                    >
                        Sign Up
                    </Button>

                    <Group justify="flex-end" gap="xs" style={{ marginTop: rem(25) }}>
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
