import { Avatar, Menu, rem } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { auth } from "../../Firebase/Firebase.config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Shared/User/User.context";
import { User } from "../../Shared/User/User.type";

import "./UserAvatar.component.css";

export function UserAvatar() {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigate("/");
        });
    };

    const getInitials = (user: User): string => {
        const initials = `${user.firstName[0]}${user.lastName[0]}`;

        return initials.toUpperCase();
    };

    return (
        <Menu position="bottom-end" shadow="md" width={200}>
            <Menu.Target>
                <Avatar className="user-avatar" radius="xl" name={getInitials(user)} />
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
