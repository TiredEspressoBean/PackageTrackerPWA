import {upperFirst, useToggle} from "@mantine/hooks";
import {useForm} from '@mantine/form'
import {
    Anchor,
    Button,
    Checkbox,
    Divider,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Notification, rem
} from "@mantine/core";
import axios, {AxiosError, AxiosResponse} from "axios"
import { useState } from "react";
import { GoogleButton } from './GoogleButton';
import { TwitterButton } from './TwitterButton';
import {useNavigate} from "react-router-dom";

interface AuthFormValues {
    name: string,
    email: string;
    password: string;
}

interface ErrorResponse {
    message: string;
}

export function AuthForm(props: PaperProps) {

    const API_URL = import.meta.env.VITE_API_URL;
    const [type, toggle] = useToggle(['login', 'register'])
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            terms: true
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleSubmit = async (values:AuthFormValues) => {
        const endpoint = `${API_URL}/${type === 'login' ? 'login' : 'signup'}`;
        try {
            const response:AxiosResponse = await axios.post(
                `${endpoint}`,
                {name: values.name, email: values.email, password: values.password},
                {withCredentials:true}
            );
            if (response.data.token) {
                localStorage.setItem('name', response.data.name)
            }
            navigate("/")
        } catch (error) {

            const axiosError = error as AxiosError<ErrorResponse>;

            setErrorMessage(
                axiosError.response?.data?.message || "An error occurred in signin/signup"
            );
            console.error("Error in auth:", axiosError);
        }
    };

    return (
        <Paper radius="md" p="xl" withBorder {...props} maw={rem(800)} mx="auto">
            <Text size="lg" fw={500}>
                Welcome to Package Tracker, {type} with
            </Text>

            <Group grow mb="md" mt="md">
                <GoogleButton radius="xl">Google</GoogleButton>
                <TwitterButton radius="xl">Twitter</TwitterButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg"/>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            required
                            label="Name"
                            placeholder="Your Name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            error={form.errors.name && 'Name did not work'}
                            radius="md"
                        />
                    )}
                    <TextInput
                        required
                        label="Email"
                        placeholder="Your Email"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your Password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />
                    {type === 'register' && (
                        <Checkbox
                            label="I accept the terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                    )}
                </Stack>
                {errorMessage && <Notification color="red">{errorMessage}</Notification>}
                <Group justify="space-between" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        c="dimmed"
                        onClick={() => {
                            setErrorMessage(null);
                            toggle()
                        }}
                        size="xs"
                    >
                        {type === 'register'
                        ? 'Already have an account? Login'
                            : "Don't have an account? Register"
                        }
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    )
}
