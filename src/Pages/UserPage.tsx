import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { Alert, Box, Button, Divider, Loader, PasswordInput, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertTriangle, IconKey } from "@tabler/icons-react";

import { auth } from "../Firebase/FirebaseConfig";
import { UserContext } from "../Shared/User/UserContext";
import { setNewPassword } from "../Shared/User/UserService";

export function UserPage() {
    const user = useContext(UserContext);
    const [authUser] = useAuthState(auth);
    const [passwordResetLoading, setPasswordResetLoading] = useState(false);
    const [passwordResetError, setPasswordResetError] = useState("");
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

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
            setNewPassword(authUser, newPassword)
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

    return (
        <div className="main">
            <div style={{ width: "100%" }}>
                <form onSubmit={form.onSubmit(({ newPassword }) => handleSubmit(newPassword))}>
                    Account: {user.email}
                    <Divider
                        my="md"
                        label={
                            <>
                                <IconKey size={14} />
                                <Box ml={10}>Password Reset</Box>
                            </>
                        }
                        labelPosition="left"
                    />
                    <div style={{ width: 600 }}>
                        <PasswordInput
                            size="md"
                            radius="md"
                            style={{ marginBottom: rem(10) }}
                            placeholder="Enter your new password..."
                            key={form.key("newPassword")}
                            {...form.getInputProps("newPassword")}
                        />
                        <PasswordInput
                            size="md"
                            radius="md"
                            style={{ marginBottom: rem(20) }}
                            placeholder="Enter your new password again..."
                            key={form.key("confirmPassword")}
                            {...form.getInputProps("confirmPassword")}
                        />

                        {passwordResetError && (
                            <Alert variant="light" color="red" title="Something went wrong!">
                                {passwordResetError}
                            </Alert>
                        )}

                        {passwordResetSuccess && <Alert variant="light" color="teal" title="Password reset was successful!"></Alert>}

                        <Button
                            fullWidth
                            type="submit"
                            style={{ marginTop: rem(20) }}
                            variant="gradient"
                            gradient={{ from: "cyan", to: "teal", deg: 60 }}
                            disabled={passwordResetLoading ? true : false}
                        >
                            {passwordResetLoading ? <Loader size={16} color="white" /> : "Reset Password"}
                        </Button>
                    </div>
                    <Divider
                        my="md"
                        label={
                            <>
                                <IconAlertTriangle size={14} />
                                <Box ml={10}>Delete Account</Box>
                            </>
                        }
                        labelPosition="left"
                    />
                    TODO: add button
                </form>
            </div>
        </div>
    );
}
