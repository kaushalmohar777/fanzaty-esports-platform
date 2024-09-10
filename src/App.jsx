import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./theme/Layout";
import "./App.css";
import Login from "./pages/Login/Login";

const Result = lazy(() => import("./components/Result/Result"));
const Tournaments = lazy(() => import("./components/Tournament/Tournaments"));
const EditUserProfile = lazy(() =>
  import("./components/edit-user-profile/EditUserProfile")
);
const JoinTournament = lazy(() =>
  import("./components/Tournament/join-tournament/JoinTournament")
);
const Message = lazy(() => import("./components/Chat/Messages/Message"));
const HomePage = lazy(() => import("./components/HomePage"));
const FeatureTournament = lazy(() =>
  import("./components/Feature-tournament/FeatureTournament")
);
const LeaderShipBoard = lazy(() =>
  import("./components/Leader-ship-board/LeaderShipBoard")
);
const Academy = lazy(() => import("./components/Academy/Academy"));
const Consumerprofile = lazy(() =>
  import("./components/Consumer-profile/Consumer-Profile")
);
const FeaturedRegiter = lazy(() =>
  import("./components/Register-featured/RegisterFeatured")
);

const ContactUs = lazy(() => import("./components/Contact-us/ContactUs"));
const AboutUs = lazy(() => import("./components/About-us/AboutUs"));
const JoinOurCommunty = lazy(() =>
  import("./components/Join-our-community/JoinOurCommunity")
);

const SignUp = lazy(() => import("./pages/Sign-up/SignUp"));
const ForgotPassword = lazy(() =>
  import("./pages/Forgot-password/ForgotPassword")
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
      {
        path: "/join-tournament",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <JoinTournament />
          </Suspense>
        ),
      },
      {
        path: "/consumer-Profile",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Consumerprofile />
          </Suspense>
        ),
      },
      {
        path: "/register-featured/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <FeaturedRegiter />
          </Suspense>
        ),
      },
      {
        path: "/all-tournaments",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Tournaments />
          </Suspense>
        ),
      },
      {
        path: "/result",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Result />
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
