import {
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Text,
    Drawer,
    ScrollArea,
    rem,
    useMantineTheme, Switch, useMantineColorScheme
} from "@mantine/core";
import classes from './Header.module.css';
import {useDisclosure} from "@mantine/hooks";
import {Link} from "react-router-dom";
import {useEffect, useState} from 'react';
import axios from "axios";

export function Header() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);
    const theme = useMantineTheme();
    const [userName, setUserName] = useState<string | null>(null);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const name = localStorage.getItem('name');

        try {
            setUserName(name);
        } catch (error) {
            console.error("Name error for header")
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${API_URL}/logout`, null, {withCredentials:true});
            localStorage.removeItem('name'); // Ensure you also remove the name on logout
            setUserName(null);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box pb={120}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Group h="100%" gap={0} visibleFrom="sm">
                        <Link to="/" className={classes.link}>
                            Home
                        </Link>
                        <Link to="/about" className={classes.link}>
                            About
                        </Link>
                    </Group>
                    <Group visibleFrom="sm">
                        <Switch
                            label="Set Light/Dark Mode"
                            labelPosition="left"
                            onChange={() => toggleColorScheme()}
                        />
                        {userName ? (
                            <>
                                <Text>Hi, {userName}</Text>
                                <Button onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <Button
                                variant="default"
                                component={Link}
                                to="/login"
                            >
                                Log in / Sign up
                            </Button>
                        )}
                    </Group>
                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm"/>
                </Group>
            </header>
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm"/>
                    <Link to="/" className={classes.link}>
                        Home
                    </Link>
                    <Link to="/About" className={classes.link}>
                        About
                    </Link>
                    <Divider my="sm"/>

                    <Group justify="center" grow pb="xl" px="md">
                        {userName ? (
                            <>
                                <Text> Hi, {userName} </Text>
                                <Button onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <Button
                                component={Link}
                                to='/login'
                            >
                                Log in / Sign Up
                            </Button>
                        )}
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
