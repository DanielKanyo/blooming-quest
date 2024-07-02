import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, Menu, rem } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons-react";

import { signOut } from "../../Services/UserService";
import { User } from "../../Shared/Types/UserType";
import { updateUser } from "../../Store/Features/UserSlice";
import store from "../../Store/Store";
import "./UserAvatar.css";

export function UserAvatar() {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut().then(() => {
            navigate("/");
            dispatch(updateUser({} as User));
        });
    };

    const getInitials = (user: User): string => {
        const initials = `${user.firstName[0]}${user.lastName[0]}`;

        return initials.toUpperCase();
    };

    return (
        <Menu position="bottom-end" shadow="md" width={200} transitionProps={{ transition: "fade-up", duration: 150 }}>
            <Menu.Target>
                <Avatar variant="filled" color="teal" className="user-avatar" radius="xl" name={getInitials(user)} />
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
