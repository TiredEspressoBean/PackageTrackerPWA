import {Box} from "@mantine/core";
import {AuthForm} from '@/components/AuthForm/AuthForm'
import {Header} from "@/components/Header/Header";


export function LoginPage() {
    return (
        <Box>
            <Header/>
            <AuthForm/>
        </Box>
    )
}
