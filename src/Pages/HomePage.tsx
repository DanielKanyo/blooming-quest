import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { AppShell, Burger, Center, Group, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { UserAvatar } from "../Components/UserAvatar/UserAvatar";
import { auth } from "../Configs/Firebase/FirebaseConfig";
import { AllQuests } from "../Layouts/Quests/AllQuests/AllQuests";
import { fetchUser } from "../Services/UserService";
import { updateUser } from "../Store/Features/UserSlice";
import store from "../Store/Store";

export function HomePage() {
    const [opened, { toggle }] = useDisclosure();
    const [authUser, loading] = useAuthState(auth);
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!authUser) {
            navigate("/");
        } else {
            fetchUser(authUser.uid)
                .then((user) => {
                    if (user) {
                        dispatch(updateUser(user));
                    }
                })
                .catch((err) => {
                    throw new Error(`An error occurred while retrieving user data... ${err.message}`);
                });
        }
    }, [authUser, navigate, dispatch]);

    return (
        <>
            {loading ? (
                <Center style={{ height: "100vh" }}>
                    <Loader size={40} color="white" />
                </Center>
            ) : (
                <>
                    {Boolean(Object.entries(user).length) && (
                        <AppShell
                            layout="alt"
                            header={{ height: 80 }}
                            footer={{ height: 60 }}
                            navbar={{
                                width: 400,
                                breakpoint: "sm",
                                collapsed: { mobile: !opened },
                            }}
                            padding="md"
                        >
                            <AppShell.Header>
                                <Group h="100%" px="lg" justify="space-between">
                                    <div>
                                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                                    </div>
                                    <UserAvatar />
                                </Group>
                            </AppShell.Header>
                            <AppShell.Navbar>
                                <Group px="lg" style={{ minHeight: 80 }}>
                                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                                    <Text>BloomingQuest</Text>
                                </Group>
                                <AppShell.Section h="100%" grow>
                                    <AllQuests />
                                </AppShell.Section>
                            </AppShell.Navbar>
                            <AppShell.Main>
                                <Outlet />
                            </AppShell.Main>
                            <AppShell.Footer p="md">Footer</AppShell.Footer>
                        </AppShell>
                    )}
                </>
            )}
        </>
    );
}
