import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, Link } from "react-router-dom";

import { User } from "firebase/auth";

import { AppShell, Burger, Center, Group, Loader, Text, Image, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import logo from "../Assets/Images/logo.png";
import { Notifications } from "../Components/Notifications";
import { UserMenu } from "../Components/UserMenu";
import { auth } from "../Configs/Firebase/FirebaseConfig";
import { Footer } from "../Layouts/Footer";
import { Inventory } from "../Layouts/Inventory";
import { AllQuests } from "../Layouts/Quests/AllQuests/AllQuests";
import { Store } from "../Layouts/Store";
import { fetchInventory } from "../Services/InventoryService";
import { fetchUser } from "../Services/UserService";
import { updateInventory } from "../Store/Features/InventorySlice";
import { updateUser } from "../Store/Features/UserSlice";
import store from "../Store/Store";

const useUserData = (authUser: User | null | undefined) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (authUser) {
                    const user = await fetchUser(authUser.uid);

                    if (user) {
                        dispatch(updateUser(user));
                        dispatch(updateInventory({ loading: false, inventory: await fetchInventory(authUser.uid) }));
                    }
                }
            } catch (err) {
                console.error("An error occurred while fetching user and iventory data...", err);
            }
        };

        fetchData();
    }, [authUser, dispatch]);
};

export function HomePage() {
    const [opened, { toggle }] = useDisclosure();
    const [authUser, loading] = useAuthState(auth);
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const navigate = useNavigate();

    useUserData(authUser);

    useEffect(() => {
        if (!authUser) {
            navigate("/");
        }
    }, [authUser, navigate]);

    if (loading) {
        return (
            <Center style={{ height: "100vh" }}>
                <Loader size={40} color="var(--mantine-color-dark-0)" type="dots" />
            </Center>
        );
    }

    return (
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
                            <Flex align="center">
                                <Group gap="sm">
                                    <Store />
                                    <Inventory />
                                    <Notifications />
                                    <UserMenu />
                                </Group>
                            </Flex>
                        </Group>
                    </AppShell.Header>
                    <AppShell.Navbar>
                        <Group px="lg" style={{ minHeight: 80 }}>
                            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                            <Link to="/home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                                <Image h={35} src={logo} />
                                <Text ml={10} className="game-title">
                                    BloomingQuest
                                </Text>
                            </Link>
                        </Group>
                        <AppShell.Section h="100%" grow px="lg">
                            <AllQuests />
                        </AppShell.Section>
                    </AppShell.Navbar>
                    <AppShell.Main>
                        <Outlet />
                    </AppShell.Main>
                    <AppShell.Footer>
                        <Footer />
                    </AppShell.Footer>
                </AppShell>
            )}
        </>
    );
}
