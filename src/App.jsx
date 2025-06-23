import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AdsPage from "./pages/AdsPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const router = createBrowserRouter([ 
    {
    path: "/",
   element: <LandingPage/>
   },

    // {
    //   path:"/about",
    //  element:<AboutUsPage/>
    // },

{
  path:"/ads",
  element: <AdsPage/>
},

{
  path:"/dashboard",
  element: <Dashboard/>
},

{
  path:"/login",
  element:<LoginPage/>
},

{
  path:"/signup",
  element:<SignupPage/>
},



]);
  return <RouterProvider router={router} />;
}

export default App;
