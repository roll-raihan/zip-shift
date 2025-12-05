import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import BeARider from "../pages/Rider/BeARider";
import AboutUs from "../pages/AboutUs/AboutUs";
import Story from "../components/AboutUsComponent/Story/Story";
import Mission from "../components/AboutUsComponent/Mission/Mission";
import Success from "../components/AboutUsComponent/Success/Success";
import TermsAndConditions from "../components/AboutUsComponent/Terms&Condition/TermsAndCondiotins";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/be-a-rider',
                element: <PrivateRoute>
                    <BeARider></BeARider>
                </PrivateRoute>,
                loader: () => fetch('/warehouses.json'),
                hydrateFallbackElement: <span className="loading loading-infinity loading-xl"></span>
            },
            {
                path: '/send-parcel',
                element: <PrivateRoute>
                    <SendParcel></SendParcel>
                </PrivateRoute>,
                loader: () => fetch('/warehouses.json'),
                hydrateFallbackElement: <span className="loading loading-infinity loading-xl"></span>
            },
            {
                path: '/coverage',
                Component: Coverage,
                loader: () => fetch('/warehouses.json'),
                hydrateFallbackElement: <span className="loading loading-infinity loading-xl"></span>
            },
            {
                path: '/*',
                Component: ErrorPage
            },
            {
                path: '/about-us',
                Component: AboutUs,
                children: [
                    {
                        path: '/about-us/story',
                        Component: Story
                    },
                    {
                        path: '/about-us/mission',
                        Component: Mission
                    },
                    {
                        path: '/about-us/success',
                        Component: Success
                    },
                    {
                        path: '/about-us/terms-and-conditions',
                        Component: TermsAndConditions
                    },
                ]
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: '/dashboard/my-parcels',
                Component: MyParcels,
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: '/dashboard/payment/:parcelID',
                Component: Payment
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            {
                path: 'approve-riders',
                element: <AdminRoute>
                    <ApproveRiders></ApproveRiders>
                </AdminRoute>
            },
            {
                path: 'users-management',
                // Component: UsersManagement
                element: <AdminRoute>
                    <UsersManagement></UsersManagement>
                </AdminRoute>
            }
        ]
    }
]);