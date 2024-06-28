import { Avatar, Menu, rem } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { auth } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { User } from "../../shared/user/user";

import "./UserAvatar.css";

interface Props {
    user: User;
}

export function UserAvatar({ user }: Props) {
    const navigate = useNavigate();

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigate("/");
        });
    };

    return (
        <Menu position="bottom-end" shadow="md" width={200}>
            <Menu.Target>
                <Avatar className="user-avatar" radius="xl" name={user.firstName + user.lastName} />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>{user.email}</Menu.Label>
                <Menu.Divider />
                <Menu.Item
                    leftSection={
                        <IconSettings
                            style={{
                                width: rem(14),
                                height: rem(14),
                            }}
                        />
                    }
                >
                    Settings
                </Menu.Item>
                <Menu.Item
                    color="red"
                    leftSection={
                        <IconLogout
                            style={{
                                width: rem(14),
                                height: rem(14),
                            }}
                        />
                    }
                    onClick={() => handleSignOut()}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
