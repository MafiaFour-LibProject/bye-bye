import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdsPage from "./pages/AdsPage";
import AdDetails from "./pages/AdDetails";
import Dashboard from "./pages/Dashboard";
import VendorLayout from "./components/VendorLayout";
import UserLayout from "./components/UserLayout";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      element: <VendorLayout />,
      children: [
        {
          path: "/vendor-ads",
          element: <AdsPage />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      element: <UserLayout />,
      children: [
        {
          path: "/user-ads",
          element: <AdsPage />,
        },
      ],
    },
    {
      path: "/ads/:id",
      element: <AdDetails />,
    },

    {
      path: "/footer",
      element: <Footer />,
    },
  ]);

  // {
  //   path:"/about",
  //  element:<AboutUsPage/>
  // },

  return <RouterProvider router={router} />;
}

export default App;
