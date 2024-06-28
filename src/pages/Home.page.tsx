import { AppShell, Burger, Flex, Group, Loader, ScrollArea, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, store } from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { UserAvatar } from "../components/UserAvatar/UserAvatar.component";
import { User } from "../shared/user/user";

export function HomePage() {
    const [opened, { toggle }] = useDisclosure();
    const [authUser, loading] = useAuthState(auth);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser) {
            navigate("/");
        } else {
            const fetchUser = async () => {
                const docRef = doc(store, "users", authUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUser(docSnap.data() as User);
                } else {
                    throw new Error("An error occurred while retrieving user data...");
                }
            };

            fetchUser();
        }
    }, [authUser, navigate, setUser]);

    return (
        <>
            {loading ? (
                <Loader size={40} color="white" />
            ) : (
                <>
                    {user && (
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
                                <Group h="100%" px="md" justify="space-between">
                                    <div>
                                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                                    </div>
                                    <UserAvatar user={user} />
                                </Group>
                            </AppShell.Header>
                            <AppShell.Navbar>
                                <Group px="lg" style={{ minHeight: 80 }}>
                                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                                    <Text>BloomingQuest</Text>
                                </Group>
                                <AppShell.Section h="100%" grow>
                                    <ScrollArea h="100%" type="never">
                                        <Flex direction="column" px="lg">
                                            {Array(8)
                                                .fill(0)
                                                .map((_, index) => (
                                                    <Skeleton key={index} h={28} mb="sm" animate={true} />
                                                ))}
                                        </Flex>
                                    </ScrollArea>
                                </AppShell.Section>
                            </AppShell.Navbar>
                            <AppShell.Main>Game</AppShell.Main>
                            <AppShell.Footer p="md">Footer</AppShell.Footer>
                        </AppShell>
                    )}
                </>
            )}
        </>
    );
}
