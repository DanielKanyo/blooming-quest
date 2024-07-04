import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, Menu, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconPencil, IconSettings } from "@tabler/icons-react";

import { signOut } from "../../Services/UserService";
import { User, UserRoles } from "../../Shared/Types/UserType";
import { updateAllQuests, initAllQuests } from "../../Store/Features/AllQuestsSlice";
import { updateChallenge, initChallenge } from "../../Store/Features/ChallengeSlice";
import { initUser, updateUser } from "../../Store/Features/UserSlice";
import store from "../../Store/Store";
import { QuestEditor } from "../QuestEditor/QuestEditor";
import "./UserAvatar.css";

export function UserAvatar() {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [questEditorOpened, { open, close }] = useDisclosure(false);

    const handleSignOut = () => {
        signOut().then(() => {
            navigate("/");
            dispatch(updateUser(initUser));
            dispatch(updateChallenge(initChallenge));
            dispatch(updateAllQuests(initAllQuests));
        });
    };

    const getInitials = (user: User): string => {
        const initials = `${user.firstName[0]}${user.lastName[0]}`;

        return initials.toUpperCase();
    };

    return (
        <>
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
                    {user.roles.includes(UserRoles.ADMINISTRATOR) && (
                        <Menu.Item
                            leftSection={
                                <IconPencil
                                    style={{
                                        width: rem(14),
                                        height: rem(14),
                                    }}
                                />
                            }
                            onClick={open}
                        >
                            Quest Editor
                        </Menu.Item>
                    )}
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
            <QuestEditor opened={questEditorOpened} close={close} />
        </>
    );
}
