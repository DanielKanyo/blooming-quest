import { Flex, ScrollArea, Skeleton } from "@mantine/core";

export function AllQuests() {
    return (
        <ScrollArea h="100%" type="never">
            <Flex direction="column" px="lg">
                {Array(8)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={50} mb="sm" animate={true} />
                    ))}
            </Flex>
        </ScrollArea>
    );
}
