import { createBrowserRouter,type RouteObject } from "react-router";
import Login from '../features/login/Login'
import Home from "../features/HomePage/Home";

import Dashboard from "../features/FormDashboard/Dashboard";
import FormBuilder from "../features/Form/FormBuilder";



const routes:RouteObject[]=[
    {
        path:'/',
        Component:Login
    },
    {
        path:'/home',
        Component:Home
    },{
        path:'dashboard',
        Component:Dashboard
    },
    {
        path:'/form/:id',
        Component:FormBuilder
    }
]
export const router=createBrowserRouter(routes);
