import { Card, Divider, Flex, ScrollArea, Skeleton } from "@mantine/core";

export function MyQuests() {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            MyQuests
            <Divider my="md" />
            <ScrollArea h="100%" type="never">
                <Flex direction="column">
                    {Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton key={index} h={50} mb="sm" animate={true} />
                        ))}
                </Flex>
            </ScrollArea>
        </Card>
    );
}
