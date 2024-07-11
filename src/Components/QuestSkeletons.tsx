import { Card, Group, Skeleton } from "@mantine/core";

const NUM_OF_QUEST_SKELETONS = 15;

export function QuestSkeletons() {
    return (
        <>
            {[...Array(NUM_OF_QUEST_SKELETONS).keys()].map((_item, key) => (
                <Card key={key} mb={10} px="md" py={0} radius="sm" style={{ width: "100%" }}>
                    <Group wrap="nowrap" py="sm">
                        <Skeleton h={45} miw={45} w={45} animate={true} />
                        <div
                            style={{
                                width: "100%",
                                height: "45px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <Skeleton h={22} w="100%" animate={true} />
                            <Skeleton h={15} w="100%" animate={true} />
                        </div>
                    </Group>
                </Card>
            ))}
        </>
    );
}
