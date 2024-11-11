import {createTheme, MantineColorsTuple} from '@mantine/core';

const myColor: MantineColorsTuple = [
    '#e2fef9',
    '#d3f6f0',
    '#aeeae0',
    '#85ddce',
    '#63d2bf',
    '#4ccbb6',
    '#3cc8b1',
    '#2ab19b',
    '#189d8a',
    '#008976'
];

export const theme = createTheme({
    colors: {
        myColor,
    },
    primaryColor: 'myColor'
});
