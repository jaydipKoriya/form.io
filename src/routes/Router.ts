import { createBrowserRouter,type RouteObject } from "react-router";
import Login from '../features/login/Login'
import Home from "../features/HomePage/Home";
import DragExample from "../Try/Home";


const routes:RouteObject[]=[
    {
        path:'/',
        Component:Login
    },
    {
        path:'/home',
        Component:Home
    }
]
export const router=createBrowserRouter(routes);
