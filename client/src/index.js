import React from "react";
import App from "./components/App";
import ErrorPage from "./components/ErrorPage";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RunList from "./components/RunList";
import NewRunForm from "./components/NewRunForm";



const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <RunList/>
            },
            {
                path: "/add_run",
                element: <NewRunForm/>
            }
]}
])

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router = {router}  />);
