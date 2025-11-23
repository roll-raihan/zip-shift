import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/coverage',
                Component: Coverage,
                loader: () => fetch('/warehouses.json'),
                hydrateFallbackElement: <span className="loading loading-infinity loading-xl"></span>
            }
        ]
    },
]);