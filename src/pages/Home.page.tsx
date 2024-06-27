import { AppShell, Burger, Button, Group, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase.config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const [opened, { toggle }] = useDisclosure();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);

        if (!user) {
            navigate('/');
        }
    });

    const handleSignOut = () => {
        auth.signOut().then(() => {
            console.log("Successfully signed out...");

            navigate('/');
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            {
                loading ? (<div>Loading...</div>) : (
                    <>
                        {user && (
                            <AppShell
                                layout="alt"
                                header={{ height: 80 }}
                                footer={{ height: 60 }}
                                navbar={{ width: 400, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                                aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
                                padding="md"
                            >
                                <AppShell.Header>
                                    <Group h="100%" px="md">
                                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                                        <Text>Logged in as: {user.email}</Text>
                                        <Button variant="filled" onClick={() => handleSignOut()}>Logout</Button>
                                    </Group>
                                </AppShell.Header>
                                <AppShell.Navbar p="md">
                                    <Group>
                                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                                        <Text>BloomingQuest</Text>
                                    </Group>
                                    {Array(15)
                                        .fill(0)
                                        .map((_, index) => (
                                            <Skeleton key={index} h={28} mt="sm" animate={false} />
                                        ))}
                                </AppShell.Navbar>
                                <AppShell.Main>
                                    Alt layout – Navbar and Aside are rendered on top on Header and Footer
                                </AppShell.Main>
                                <AppShell.Aside p="md">Aside</AppShell.Aside>
                                <AppShell.Footer p="md">Footer</AppShell.Footer>
                            </AppShell>
                        )}
                    </>
                )
            }
        </>
    );
}
