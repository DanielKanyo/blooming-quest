import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, useNavigate } from "react-router-dom";

import { AppShell, Burger, Group, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { AllQuests } from "../Components/Quests/AllQuests/AllQuests";
import { UserAvatar } from "../Components/UserAvatar/UserAvatar";
import { auth } from "../Firebase/FirebaseConfig";
import { UserContext } from "../Shared/User/UserContext";
import { fetchUser } from "../Shared/User/UserService";
import { User } from "../Shared/User/UserType";

export function HomePage() {
    const [opened, { toggle }] = useDisclosure();
    const [authUser, loading] = useAuthState(auth);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser) {
            navigate("/");
        } else {
            fetchUser(authUser.uid)
                .then((user) => {
                    if (user) {
                        setUser(user);
                    }
                })
                .catch((err) => {
                    throw new Error(`An error occurred while retrieving user data... ${err.message}`);
                });
        }
    }, [authUser, navigate, setUser]);

    return (
        <>
            {loading ? (
                <Loader size={40} color="white" />
            ) : (
                <>
                    {user && (
                        <UserContext.Provider value={user}>
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
                        </UserContext.Provider>
                    )}
                </>
            )}
        </>
    );
}
