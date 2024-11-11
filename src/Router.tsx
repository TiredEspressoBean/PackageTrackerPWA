import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {HomePage} from './pages/Home.page';
import { About } from './pages/About'
import { LoginPage } from './pages/Login'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/login',
        element: <LoginPage/>
    }
]);

export function Router() {
    return <RouterProvider router={router}/>;
}
