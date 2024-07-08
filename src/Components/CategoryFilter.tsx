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

    const getVariant = (category: QuestCategories | null, active: QuestCategories | null) => {
        return category === active ? "filled" : "light";
    };

    const setActiveCategory = (category: QuestCategories | null) => {
        setActive(active !== category ? category : null);

        dispatch(updateAllQuestsLoading(true));
    };

    return (
        <Group gap={12} grow mb={12} px="lg">
            {CATEGORIES.map((c) => {
                return (
                    <Tooltip key={c} label={CategoryTextMapping.get(c)} color="gray">
                        <Button
                            variant={getVariant(c, active)}
                            color={CategoryColorMapping.get(c)}
                            size="xs"
                            h={12}
                            onClick={() => setActiveCategory(c)}
                        />
                    </Tooltip>
                );
            })}
        </Group>
    );
}
