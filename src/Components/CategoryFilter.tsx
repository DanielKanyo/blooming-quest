import { Button, Group, Tooltip } from "@mantine/core";

import { CategoryColorMapping, CategoryTextMapping, QuestCategories } from "../Shared/Types/QuestType";

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
    const getVariant = (category: QuestCategories | null, active: QuestCategories | null) => {
        return category === active ? "filled" : "light";
    };

    return (
        <Group gap={12} grow mb={12} px="lg">
            {CATEGORIES.map((c) => {
                return (
                    <Tooltip label={CategoryTextMapping.get(c)} color="gray">
                        <Button
                            key={c}
                            variant={getVariant(c, active)}
                            color={CategoryColorMapping.get(c)}
                            size="xs"
                            h={12}
                            onClick={() => setActive(active !== c ? c : null)}
                        />
                    </Tooltip>
                );
            })}
        </Group>
    );
}
