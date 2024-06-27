import { Center, Card, Button, TextInput, Text, Divider, rem } from '@mantine/core';
import { useForm } from '@mantine/form';

export function LandingPage() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (
        <Center style={{ height: '100vh' }}>
            <Card shadow="xl" padding="xl" radius="md" withBorder>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Text size="xl">Login</Text>
                    <Text size="sm" style={{ opacity: '0.5' }}>Please enter your e-mail address...</Text>

                    <Divider my="xl" />

                    <TextInput
                        size="xl"
                        radius="md"
                        style={{ width: rem(400) }}
                        placeholder="your@email.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />

                    <Divider my="xl" />

                    <Button fullWidth type="submit">Send Login Link</Button>
                </form>
            </Card>
        </Center>
    )
}
