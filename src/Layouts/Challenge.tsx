import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Center, Flex, FocusTrap, Modal, ScrollArea, Image, Text, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

import gem from "../Assets/Other/diamond.png";
import megaphone from "../Assets/Other/megaphone.png";
import success from "../Assets/Other/success.png";
import { BadgeWithImage } from "../Components/BadgeWithImage/BadgeWithImage";
import { ChallengeProgress } from "../Components/ChallengeProgress";
import { createGarden, fetchCurrentChallenge, fetchGardens, joinChallenge } from "../Services/ChallengeService";
import { updateTotalCoinAndGem } from "../Services/UserService";
import { User } from "../Shared/Types/UserType";
import { MONTHS } from "../Shared/Utils";
import { ChallengeStore, updateChallenge, updateChallengeLoading } from "../Store/Features/ChallengeSlice";
import { GardenStore, updateGardens } from "../Store/Features/GardenSlice";
import { updateTotalCoinAndGemInUser } from "../Store/Features/UserSlice";
import store from "../Store/Store";
import { GardenArea } from "./GardenArea/GardenArea";
import { HouseArea } from "./HouseArea/HouseArea";

export function Challenge() {
    const user = useSelector((state: ReturnType<typeof store.getState>) => state.user);
    const { challenge }: ChallengeStore = useSelector((state: ReturnType<typeof store.getState>) => state.challenge);
    const { gardens }: GardenStore = useSelector((state: ReturnType<typeof store.getState>) => state.garden);
    const [opened, { open, close }] = useDisclosure(false);
    const [addGardenLoading, setAddGardenLoading] = useState(false);
    const dispatch = useDispatch();

    const joinMonthlyChallenge = useCallback(async () => {
        dispatch(updateChallengeLoading(true));

        try {
            const userId = (user as User).id;
            const year = new Date().getFullYear();
            const month = new Date().getMonth();

            await joinChallenge(userId, year, month);

            const challenge = await fetchCurrentChallenge(userId, year, month);

            await createGarden(challenge!.id);
            const gardens = await fetchGardens(challenge!.id);

            dispatch(updateGardens({ gardens }));
            dispatch(updateChallenge({ challenge, loading: false }));
        } catch (err) {
            dispatch(updateChallenge({ challenge: null, loading: false }));
            console.error("Something wen wrong during challenge creation...", err);
        }
    }, [dispatch, user]);

    const handleAddGardenBtnClick = useCallback(async () => {
        setAddGardenLoading(true);

        if (user.gem === 0) {
            return;
        }

        try {
            await createGarden(challenge!.id);
            const gardens = await fetchGardens(challenge!.id);
            await updateTotalCoinAndGem(user.id, 0, -1);

            dispatch(updateTotalCoinAndGemInUser({ totalCoin: 0, gem: -1 }));
            dispatch(updateGardens({ gardens }));
        } catch (err) {
            console.error("Something went wrong during garden area creation...", err);
        } finally {
            close();
            setAddGardenLoading(false);
        }
    }, [challenge, close, dispatch, user.gem, user.id]);

    if (challenge) {
        return (
            <>
                <ChallengeProgress />
                <ScrollArea
                    h="100%"
                    mt="sm"
                    style={{ background: "var(--mantine-color-dark-7)", borderRadius: "var(--mantine-radius-md)" }}
                    type="never"
                    pt="md"
                    pl="md"
                    pr="md"
                    pb={0}
                >
                    <HouseArea />
                    {[...gardens]
                        .sort((a, b) => a.timestamp - b.timestamp)
                        .map((garden, index) => (
                            <GardenArea key={index} garden={garden} />
                        ))}
                    <Button variant="light" color="gray" size="md" radius="md" fullWidth mb="var(--mantine-spacing-md)" onClick={open}>
                        <IconPlus />
                    </Button>
                </ScrollArea>
                <Flex mt="sm" style={{ background: "var(--mantine-color-dark-7)", borderRadius: "var(--mantine-radius-md)" }} p="md">
                    Game Footer
                </Flex>
                <Modal
                    opened={opened}
                    onClose={close}
                    title="Extend Garden"
                    centered
                    transitionProps={{ transition: "fade-up" }}
                    radius="md"
                    size="auto"
                >
                    <FocusTrap.InitialFocus />
                    <Flex direction="column" justify="center" align="center" p={10}>
                        <Image h={72} w={72} src={megaphone} mb={16} />
                        <Text size="xl" mb={10}>
                            Attention!
                        </Text>
                        <Text size="sm" c="dimmed" mb={16} ta="center">
                            To create a new garden area <br /> you need to use one of your gems...
                        </Text>
                        <Group gap="xs">
                            <BadgeWithImage imgSrc={gem} text={user.gem} color="gray" />
                        </Group>
                        <Button
                            mt={20}
                            variant="gradient"
                            radius="md"
                            gradient={{ from: "cyan", to: "teal", deg: 60 }}
                            onClick={handleAddGardenBtnClick}
                            loading={addGardenLoading}
                            loaderProps={{ type: "dots" }}
                            fullWidth
                            disabled={user.gem === 0}
                        >
                            Extend
                        </Button>
                    </Flex>
                </Modal>
            </>
        );
    }

    return (
        <Center h="100%" style={{ flexDirection: "column" }}>
            <Image h={72} w={72} src={success} mb={16}></Image>
            <Button
                variant="gradient"
                size="lg"
                radius="md"
                gradient={{ from: "cyan", to: "teal", deg: 60 }}
                onClick={joinMonthlyChallenge}
            >
                Join the {MONTHS.get(new Date().getMonth())} Challenge
            </Button>
        </Center>
    );
}
