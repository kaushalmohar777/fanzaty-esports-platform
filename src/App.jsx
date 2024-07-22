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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
