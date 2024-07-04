import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Modal, NativeSelect, NumberInput, TextInput, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

import { createQuest } from "../../Services/GameService";
import {
    Categories,
    CategoryTextMapping,
    Difficulties,
    DifficultyTextMapping,
    QuestCategories,
    QuestDifficulties,
    TextCategoryMapping,
    TextDifficultyMapping,
} from "../../Shared/Types/QuestType";
import { addQuest } from "../../Store/Features/AllQuestsSlice";

type QuestEditorProps = {
    opened: boolean;
    close: () => void;
};

export function QuestEditor({ opened, close }: QuestEditorProps) {
    const isMobile = useMediaQuery("(max-width: 50em)");
    const dispatch = useDispatch();
    const [createLoading, setCreateLoading] = useState(false);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            category: CategoryTextMapping.get(QuestCategories.FitnessAndHealth)!,
            description: "",
            difficulty: DifficultyTextMapping.get(QuestDifficulties.Easy)!,
            xp: 5,
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        setCreateLoading(true);

        const category = TextCategoryMapping.get(values.category)!;
        const description = values.description;
        const difficulty = TextDifficultyMapping.get(values.difficulty)!;
        const xp = values.xp;

        createQuest(category, description, difficulty, xp)
            .then((quest) => {
                dispatch(addQuest(quest));

                form.reset();
                setCreateLoading(false);

                close();
            })
            .catch((err) => {
                setCreateLoading(false);
                console.error(`Something went wrong... ${err.message}`);
            });
    };

    return (
        <Modal opened={opened} onClose={close} title="Quest Editor" fullScreen={isMobile} transitionProps={{ transition: "fade-up" }}>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <NativeSelect mb={10} label="Category" data={Categories} key={form.key("category")} {...form.getInputProps("category")} />
                <TextInput mb={10} label="Description" key={form.key("description")} {...form.getInputProps("description")} />
                <NativeSelect
                    mb={10}
                    label="Difficulty"
                    data={Difficulties}
                    key={form.key("difficulty")}
                    {...form.getInputProps("difficulty")}
                />
                <NumberInput
                    label="Experience points"
                    allowDecimal={false}
                    step={5}
                    min={5}
                    key={form.key("xp")}
                    {...form.getInputProps("xp")}
                />
                <Button
                    fullWidth
                    type="submit"
                    style={{ marginTop: rem(20) }}
                    variant="gradient"
                    gradient={{ from: "cyan", to: "teal", deg: 60 }}
                    disabled={createLoading}
                >
                    Create Quest
                </Button>
            </form>
        </Modal>
    );
}
