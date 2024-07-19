import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Affix, Alert, Blockquote, Box, Button, Container, Divider, Flex, Modal, PasswordInput, rem, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconAlertTriangle, IconArrowLeft, IconAt, IconInfoCircle, IconKey, IconLetterCase, IconUser } from "@tabler/icons-react";

import { auth } from "../Configs/Firebase/FirebaseConfig";
import { deleteAccount, deleteAccountData, setNewPassword } from "../Services/UserService";
import store from "../Store/Store";

export function UserPage() {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const [authUser] = useAuthState(auth);
    const [passwordResetLoading, setPasswordResetLoading] = useState(false);
    const [passwordResetError, setPasswordResetError] = useState("");
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
    const [deleteAccountModalOpened, { open, close }] = useDisclosure(false);
    const isMobile = useMediaQuery("(max-width: 50em)");
    const [accountRemovalLoading, setAccountRemovalLoading] = useState(false);
    const [accountRemovalError, setAccountRemovalError] = useState("");

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },

        validate: {
            newPassword: (value) => (/^.{6,}$/.test(value) ? null : "Invalid password... A minimum of 6 characters is required"),
            confirmPassword: (value, values) => (value !== values.newPassword ? "Passwords did not match" : null),
        },
    });

    const handleSubmit = (newPassword: string) => {
        setPasswordResetLoading(true);
        setPasswordResetError("");
        setPasswordResetSuccess(false);

        if (authUser) {
            setNewPassword(newPassword)
                .then(() => {
                    setPasswordResetLoading(false);
                    setPasswordResetError("");
                    setPasswordResetSuccess(true);
                })
                .catch((err) => {
                    setPasswordResetLoading(false);
                    setPasswordResetError(err.message);
                    setPasswordResetSuccess(false);
                });
        }
    };

    const handleDeleteAccount = () => {
        setAccountRemovalLoading(true);
        setAccountRemovalError("");

        deleteAccountData()
            .then(() => {
                deleteAccount()
                    .then(() => {
                        setAccountRemovalLoading(false);
                        setAccountRemovalError("");
                    })
                    .catch((err) => {
                        setAccountRemovalLoading(false);
                        setAccountRemovalError(err.message);
                    });
            })
            .catch((err) => {
                setAccountRemovalLoading(false);
                setAccountRemovalError(err.message);
            });
    };

    return (
        <div className="main">
            <div>
                <Divider
                    mb="xl"
                    label={
                        <>
                            <IconUser size={14} />
                            <Box ml={10}>Account</Box>
                        </>
                    }
                    labelPosition="left"
                />
                <div style={{ width: 600 }}>
                    <TextInput
                        size="md"
                        label="Email"
                        radius="md"
                        value={user.email}
                        disabled
                        style={{ marginBottom: rem(10) }}
                        leftSection={<IconAt size={16} />}
                    />
                    <TextInput
                        size="md"
                        label="Name"
                        radius="md"
                        value={`${user.firstName} ${user.lastName}`}
                        disabled
                        style={{ marginBottom: rem(10) }}
                        leftSection={<IconLetterCase size={16} />}
                    />
                </div>
                <Divider
                    my="xl"
                    label={
                        <>
                            <IconKey size={14} />
                            <Box ml={10}>Password Reset</Box>
                        </>
                    }
                    labelPosition="left"
                />
                <div style={{ width: 600 }}>
                    <form onSubmit={form.onSubmit(({ newPassword }) => handleSubmit(newPassword))}>
                        <PasswordInput
                            size="md"
                            radius="md"
                            style={{ marginBottom: rem(10) }}
                            placeholder="Enter your new password..."
                            key={form.key("newPassword")}
                            {...form.getInputProps("newPassword")}
                            leftSection={<IconKey size={16} />}
                        />
                        <PasswordInput
                            size="md"
                            radius="md"
                            style={{ marginBottom: rem(20) }}
                            placeholder="Enter your new password again..."
                            key={form.key("confirmPassword")}
                            {...form.getInputProps("confirmPassword")}
                            leftSection={<IconKey size={16} />}
                        />

                        {passwordResetError && (
                            <Alert variant="light" color="red" title="Something went wrong! Please try again later..." radius="md">
                                {passwordResetError}
                            </Alert>
                        )}

                        {passwordResetSuccess && (
                            <Alert variant="light" color="teal" title="Password reset was successful!" radius="md"></Alert>
                        )}

                        <Button
                            fullWidth
                            type="submit"
                            radius="md"
                            style={{ marginTop: rem(20) }}
                            variant="gradient"
                            gradient={{ from: "cyan", to: "teal", deg: 60 }}
                            loading={passwordResetLoading}
                            loaderProps={{ type: "dots" }}
                        >
                            Reset Password
                        </Button>
                    </form>
                </div>
                <Divider
                    my="xl"
                    label={
                        <>
                            <IconAlertTriangle size={14} />
                            <Box ml={10}>Delete Account</Box>
                        </>
                    }
                    labelPosition="left"
                />
                <div style={{ width: 600 }}>
                    <Modal
                        opened={deleteAccountModalOpened}
                        onClose={close}
                        title="Delete Account"
                        centered
                        fullScreen={isMobile}
                        transitionProps={{ transition: "fade-up" }}
                    >
                        <Container px={15}>
                            <Blockquote color="red" icon={<IconInfoCircle />} my="sm" radius="md">
                                Your account will be removed along with all your data... Are you sure you want to delete your account?
                            </Blockquote>
                            {accountRemovalError && (
                                <Alert variant="light" color="red" title="Something went wrong! Please try again later..." radius="md">
                                    {accountRemovalError}
                                </Alert>
                            )}
                        </Container>
                        <Flex mt={20} gap="xs" justify="flex-end">
                            <Button
                                miw={90}
                                variant="gradient"
                                radius="md"
                                loading={accountRemovalLoading}
                                loaderProps={{ type: "dots" }}
                                gradient={{ from: "red", to: "pink", deg: 60 }}
                                onClick={() => handleDeleteAccount()}
                            >
                                Confirm
                            </Button>
                        </Flex>
                    </Modal>

                    <Button fullWidth variant="gradient" gradient={{ from: "red", to: "pink", deg: 60 }} onClick={open} radius="md">
                        Delete Account
                    </Button>
                </div>
            </div>

            <Affix position={{ bottom: 75, right: 15 }}>
                <Button
                    component={Link}
                    radius="md"
                    to="/home"
                    variant="gradient"
                    gradient={{ from: "cyan", to: "teal", deg: 60 }}
                    leftSection={<IconArrowLeft style={{ width: rem(16), height: rem(16) }} />}
                >
                    Back To The Game
                </Button>
            </Affix>
        </div>
    );
}
