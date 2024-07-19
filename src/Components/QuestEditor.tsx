import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Modal, NativeSelect, NumberInput, TextInput, Text, rem, Image, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

import { createQuest } from "../Services/ChallengeService";
import { REWARDS } from "../Shared/Rewards";
import {
    Categories,
    CategoryTextMapping,
    Difficulties,
    DifficultyTextMapping,
    QuestCategories,
    QuestDifficulties,
    TextCategoryMapping,
    TextDifficultyMapping,
} from "../Shared/Types/QuestType";
import { addQuest } from "../Store/Features/AllQuestsSlice";

type QuestEditorProps = {
    opened: boolean;
    close: () => void;
};

export function QuestEditor({ opened, close }: QuestEditorProps) {
    const isMobile = useMediaQuery("(max-width: 50em)");
    const dispatch = useDispatch();
    const [createLoading, setCreateLoading] = useState(false);
    const [selectedReward, setSelectedReward] = useState<string | null>(null);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            category: CategoryTextMapping.get(QuestCategories.FitnessAndHealth)!,
            description: "",
            difficulty: DifficultyTextMapping.get(QuestDifficulties.Easy)!,
            coin: 5,
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        setCreateLoading(true);

        const category = TextCategoryMapping.get(values.category)!;
        const description = values.description;
        const difficulty = TextDifficultyMapping.get(values.difficulty)!;
        const coin = values.coin;
        const reward = selectedReward!;

        createQuest(category, description, difficulty, coin, reward)
            .then((quest) => {
                dispatch(addQuest(quest));

                form.reset();
                setSelectedReward(null);
                setCreateLoading(false);

                close();
            })
            .catch((err) => {
                setCreateLoading(false);
                console.error(`Something went wrong... ${err.message}`);
            });
    };

    const toggleSelectedReward = (reward: string) => {
        setSelectedReward(reward === selectedReward ? null : reward);
    };

    return (
        <Modal
            size="lg"
            opened={opened}
            onClose={close}
            title="Quest Editor"
            fullScreen={isMobile}
            transitionProps={{ transition: "fade-up" }}
            radius="md"
        >
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <NativeSelect mb={10} label="Category" data={Categories} key={form.key("category")} {...form.getInputProps("category")} />
                <TextInput mb={10} label="Description" key={form.key("description")} {...form.getInputProps("description")} radius="md" />
                <NativeSelect
                    mb={10}
                    label="Difficulty"
                    radius="md"
                    data={Difficulties}
                    key={form.key("difficulty")}
                    {...form.getInputProps("difficulty")}
                />
                <NumberInput
                    label="Coins"
                    allowDecimal={false}
                    radius="md"
                    mb={10}
                    step={5}
                    min={5}
                    key={form.key("coin")}
                    {...form.getInputProps("coin")}
                />
                <Text style={{ fontSize: "var(--mantine-font-size-sm)" }} mb={4} opacity={0.7}>
                    Reward Plants
                </Text>
                <SimpleGrid cols={7} spacing="xs" verticalSpacing="xs">
                    {[...REWARDS.keys()].map((reward) => (
                        <Button
                            key={reward}
                            variant={reward === selectedReward ? "filled" : "light"}
                            color={reward === selectedReward ? "teal" : "gray"}
                            disabled={Boolean(selectedReward) && selectedReward !== reward}
                            radius="md"
                            onClick={() => toggleSelectedReward(reward)}
                            style={{ opacity: Boolean(selectedReward) && selectedReward !== reward ? 0.3 : 1 }}
                        >
                            <Image radius="md" h={26} w={26} src={REWARDS.get(reward)} />
                        </Button>
                    ))}
                </SimpleGrid>
                <Button
                    fullWidth
                    type="submit"
                    style={{ marginTop: rem(20) }}
                    radius="md"
                    variant="gradient"
                    gradient={{ from: "cyan", to: "teal", deg: 60 }}
                    disabled={createLoading || !selectedReward}
                    loading={createLoading}
                    loaderProps={{ type: "dots" }}
                >
                    Create Quest
                </Button>
            </form>
        </Modal>
    );
}
