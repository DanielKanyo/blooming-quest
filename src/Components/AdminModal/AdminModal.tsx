import { useDispatch } from "react-redux";

import { Button, Fieldset, Modal, NativeSelect, NumberInput, TextInput, rem } from "@mantine/core";
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

type AdminModalProps = {
    opened: boolean;
    close: () => void;
};

export function AdminModal({ opened, close }: AdminModalProps) {
    const isMobile = useMediaQuery("(max-width: 50em)");
    const dispatch = useDispatch();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            category: CategoryTextMapping.get(QuestCategories.Cooking)!,
            description: "",
            difficulty: DifficultyTextMapping.get(QuestDifficulties.Easy)!,
            xp: 0,
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        const category = TextCategoryMapping.get(values.category)!;
        const description = values.description;
        const difficulty = TextDifficultyMapping.get(values.difficulty)!;
        const xp = values.xp;

        createQuest(category, description, difficulty, xp)
            .then((quest) => {
                dispatch(addQuest(quest));

                close();
            })
            .catch((err) => {
                console.error(`Something went wrong... ${err.message}`);
            });
    };

    return (
        <Modal opened={opened} onClose={close} title="Administrator" fullScreen={isMobile} transitionProps={{ transition: "fade-up" }}>
            <Fieldset legend="Create Quest">
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <NativeSelect
                        mb={10}
                        label="Category"
                        data={Categories}
                        key={form.key("category")}
                        {...form.getInputProps("category")}
                    />
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
                    >
                        Create Quest
                    </Button>
                </form>
            </Fieldset>
        </Modal>
    );
}
