import {
    AppShell,
    Avatar,
    Burger,
    Group,
    Loader,
    Menu,
    Skeleton,
    Text,
    rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, store } from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { IconLogout, IconSettings } from "@tabler/icons-react";

type User = {
    firstName: string;
    lastName: string;
    email: string;
};

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

                setUser(docSnap.data() as User);
            };

            fetchUser();
        }
    }, [authUser, navigate, setUser]);

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigate("/");
        });
    };

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
                            aside={{
                                width: 300,
                                breakpoint: "md",
                                collapsed: { desktop: false, mobile: true },
                            }}
                            padding="md"
                        >
                            <AppShell.Header>
                                <Group h="100%" px="md" justify="space-between">
                                    <div>
                                        <Burger
                                            opened={opened}
                                            onClick={toggle}
                                            hiddenFrom="sm"
                                            size="sm"
                                        />
                                    </div>
                                    <Menu
                                        position="bottom-end"
                                        shadow="md"
                                        width={200}
                                    >
                                        <Menu.Target>
                                            <Avatar
                                                radius="xl"
                                                style={{ cursor: "pointer" }}
                                                name={
                                                    user.firstName +
                                                    user.lastName
                                                }
                                                color="teal"
                                            />
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Label>
                                                {user.email}
                                            </Menu.Label>
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
                                </Group>
                            </AppShell.Header>
                            <AppShell.Navbar p="md">
                                <Group>
                                    <Burger
                                        opened={opened}
                                        onClick={toggle}
                                        hiddenFrom="sm"
                                        size="sm"
                                    />
                                    <Text>BloomingQuest</Text>
                                </Group>
                                {Array(15)
                                    .fill(0)
                                    .map((_, index) => (
                                        <Skeleton
                                            key={index}
                                            h={28}
                                            mt="sm"
                                            animate={false}
                                        />
                                    ))}
                            </AppShell.Navbar>
                            <AppShell.Main>
                                Alt layout – Navbar and Aside are rendered on
                                top on Header and Footer
                            </AppShell.Main>
                            <AppShell.Aside p="md">Aside</AppShell.Aside>
                            <AppShell.Footer p="md">Footer</AppShell.Footer>
                        </AppShell>
                    )}
                </>
            )}
        </>
    );
}
