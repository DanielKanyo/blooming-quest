import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { Button, Group, Tooltip } from "@mantine/core";

import { CategoryColorMapping, CategoryTextMapping, QuestCategories } from "../Shared/Types/QuestType";
import { updateAllQuestsLoading } from "../Store/Features/AllQuestsSlice";

type CategoryFilterProps = {
    active: QuestCategories | null;
    setActive: (category: QuestCategories | null) => void;
};

const CATEGORIES = [
    QuestCategories.FitnessAndHealth,
    QuestCategories.CookingAndFood,
    QuestCategories.LearningAndEducation,
    QuestCategories.SpiritualAndMindfulness,
    QuestCategories.CreativeArts,
    QuestCategories.AdventureAndExploration,
    QuestCategories.PersonalGrowthAndLifestyle,
    QuestCategories.SocialAndCommunity,
];

export function CategoryFilter({ active, setActive }: CategoryFilterProps) {
    const dispatch = useDispatch();

    const getVariant = useCallback((category: QuestCategories | null, active: QuestCategories | null) => {
        return category === active ? "filled" : "light";
    }, []);

    const setActiveCategory = useCallback(
        (category: QuestCategories | null) => {
            setActive(active !== category ? category : null);

            dispatch(updateAllQuestsLoading(true));
        },
        [active, dispatch, setActive]
    );

    return (
        <Group gap={10} grow mb={12}>
            {CATEGORIES.map((c) => (
                <Tooltip key={c} label={CategoryTextMapping.get(c)} color="gray" radius="md">
                    <Button
                        variant={getVariant(c, active)}
                        color={CategoryColorMapping.get(c)}
                        size="xs"
                        h={12}
                        radius="md"
                        onClick={() => setActiveCategory(c)}
                    />
                </Tooltip>
            ))}
        </Group>
    );
}
