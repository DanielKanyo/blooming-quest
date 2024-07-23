import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, Button, Card, Flex, Image, Menu, NumberFormatter, rem, Text } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { IconLogout, IconPencil, IconSettings } from "@tabler/icons-react";

import coin from "../Assets/Other/coin.png";
import diamond from "../Assets/Other/diamond.png";
import { signOut } from "../Services/UserService";
import { UserRoles } from "../Shared/Types/UserType";
import { updateAllQuests, initAllQuests } from "../Store/Features/AllQuestsSlice";
import { updateChallenge, initChallenge } from "../Store/Features/ChallengeSlice";
import { initUser, updateUser } from "../Store/Features/UserSlice";
import store from "../Store/Store";
import { QuestEditor } from "./QuestEditor";

export function UserMenu() {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [questEditorOpened, { open, close }] = useDisclosure(false);
    const { hovered, ref } = useHover();

    const handleSignOut = () => {
        signOut().then(() => {
            navigate("/");
            dispatch(updateUser(initUser));
            dispatch(updateChallenge(initChallenge));
            dispatch(updateAllQuests(initAllQuests));
        });
    };

    const getInitials = (firstName: string, lastName: string): string => {
        const initials = `${firstName[0]}${lastName[0]}`;

        return initials.toUpperCase();
    };

    const initials = useMemo(() => getInitials(user.firstName, user.lastName), [user.firstName, user.lastName]);

    const isAdmin = useMemo(() => user.roles.includes(UserRoles.ADMINISTRATOR), [user.roles]);

    const formattedCoins = useMemo(() => <NumberFormatter value={user.totalCoin} thousandSeparator />, [user.totalCoin]);

    const formattedGems = useMemo(() => <NumberFormatter value={user.gem} thousandSeparator />, [user.gem]);

    return (
        <>
            <Menu
                trigger="click-hover"
                openDelay={100}
                closeDelay={150}
                position="bottom-end"
                shadow="md"
                width={350}
                radius="md"
                transitionProps={{ transition: "fade-up", duration: 150 }}
                withArrow
                arrowPosition="center"
            >
                <Menu.Target>
                    <div ref={ref}>
                        <Button p={0} w={90} variant="light" size="lg" color="teal" radius="xl">
                            <Avatar variant="filled" color="teal" radius="xl" name={initials} />
                            <Avatar
                                variant="transparent"
                                radius="xl"
                                style={{ transform: hovered ? "rotate(45deg)" : "rotate(0deg)", transition: "0.5s" }}
                            >
                                <IconSettings size="1.5rem" />
                            </Avatar>
                        </Button>
                    </div>
                </Menu.Target>
                <Menu.Dropdown p="sm">
                    <Menu.Label>
                        <Text size="sm" c="var(--mantine-color-dark-0)">
                            {user.firstName} {user.lastName}
                        </Text>
                        <div>{user.email}</div>
                    </Menu.Label>
                    <Flex gap="xs" my={15}>
                        <Card w="100%" shadow="md" padding="sm" radius="md" bg="var(--mantine-color-dark-5)">
                            <Flex direction="column" justify="center" align="center">
                                <Image h={33} w={33} src={coin} mb={6} mt={4} />
                                <div style={{ fontSize: 28, color: "white", height: 35, display: "flex", alignItems: "center" }}>
                                    {formattedCoins}
                                </div>
                                <Text size="sm" c="dimmed">
                                    Coins
                                </Text>
                            </Flex>
                        </Card>
                        <Card w="100%" shadow="md" padding="sm" radius="md" bg="var(--mantine-color-dark-5)">
                            <Flex direction="column" justify="center" align="center">
                                <Image h={33} w={33} src={diamond} mb={6} mt={4} />
                                <div style={{ fontSize: 28, color: "white", height: 35, display: "flex", alignItems: "center" }}>
                                    {formattedGems}
                                </div>
                                <Text size="sm" c="dimmed">
                                    Gems
                                </Text>
                            </Flex>
                        </Card>
                    </Flex>
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
                    {isAdmin && (
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
                        onClick={handleSignOut}
                    >
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <QuestEditor opened={questEditorOpened} close={close} />
        </>
    );
}
