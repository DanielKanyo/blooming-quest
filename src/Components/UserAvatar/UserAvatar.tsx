import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, Menu, rem } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons-react";

import { UserContext } from "../../Shared/User/UserContext";
import { signOut } from "../../Shared/User/UserService";
import { User } from "../../Shared/User/UserType";
import "./UserAvatar.css";

export function UserAvatar() {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut().then(() => {
            navigate("/");
        });
    };

    const getInitials = (user: User): string => {
        const initials = `${user.firstName[0]}${user.lastName[0]}`;

        return initials.toUpperCase();
    };

    return (
        <Menu position="bottom-end" shadow="md" width={200} transitionProps={{ transition: "fade-up", duration: 150 }}>
            <Menu.Target>
                <Avatar className="user-avatar" radius="xl" name={getInitials(user)} />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>{user.email}</Menu.Label>
                <Menu.Divider />
                <Menu.Item
                    component={Link}
                    to="/home/user"
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
