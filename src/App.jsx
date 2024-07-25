import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./theme/Layout";
import HomePage from "./components/HomePage";
import "./App.css";
import FeatureTournament from "./components/Feature-tournament/FeatureTournament";
import LeaderShipBoard from "./components/Leader-ship-board/LeaderShipBoard";
import Academy from "./components/Academy/Academy";
import ContactUs from "./components/Contact-us/ContactUs";
import AboutUs from "./components/About-us/AboutUs";
import JoinOurCommunty from "./components/Join-our-community/JoinOurCommunity";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Sign-up/SignUp";
import ForgotPassword from "./pages/Forgot-password/ForgotPassword";
import Notification from "./components/Notification/Notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/tournaments", element: <FeatureTournament /> },
      { path: "/leadership-board", element: <LeaderShipBoard /> },
      { path: "/academy", element: <Academy /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/join-our-community", element: <JoinOurCommunty /> },
      { path: "/notification", element: <Notification /> },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
