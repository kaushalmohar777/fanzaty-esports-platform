import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./theme/Layout";
import "./App.css";
import Login from "./pages/Login/Login";
import EditUserProfile from "./components/edit-user-profile/EditUserProfile";

const Message = lazy(() => import("./components/Chat/Messages/Message"));

const HomePage = lazy(() => import("./components/HomePage"));
const FeatureTournament = lazy(() =>
  import("./components/Feature-tournament/FeatureTournament")
);
const LeaderShipBoard = lazy(() =>
  import("./components/Leader-ship-board/LeaderShipBoard")
);
const Academy = lazy(() => import("./components/Academy/Academy"));
const ContactUs = lazy(() => import("./components/Contact-us/ContactUs"));
const AboutUs = lazy(() => import("./components/About-us/AboutUs"));
const JoinOurCommunty = lazy(() =>
  import("./components/Join-our-community/JoinOurCommunity")
);

const SignUp = lazy(() => import("./pages/Sign-up/SignUp"));
const ForgotPassword = lazy(() =>
  import("./pages/Forgot-password/ForgotPassword")
);
const Notification = lazy(() =>
  import("./components/Notification/Notification")
);
const UserProfile = lazy(() => import("./components/user-profile/UserProfile"));

const LoadingFallback = () => <div className="lazy-loading">Loading...</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/tournaments",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <FeatureTournament />
          </Suspense>
        ),
      },
      {
        path: "/leadership-board",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LeaderShipBoard />
          </Suspense>
        ),
      },

      {
        path: "/edit-user-profile",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EditUserProfile />
          </Suspense>
        ),
      },

      {
        path: "/academy",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Academy />
          </Suspense>
        ),
      },
      {
        path: "/contact-us",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "/about-us",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "/join-our-community",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <JoinOurCommunty />
          </Suspense>
        ),
      },
      {
        path: "/notification",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Notification />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SignUp />
          </Suspense>
        ),
      },

      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <UserProfile />
          </Suspense>
        ),
      },
      {
        path: "/messages",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Message />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
