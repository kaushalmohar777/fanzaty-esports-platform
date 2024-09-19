import { useSelector } from "react-redux";
import AboutUs from "./About-us/AboutUs";
import Banner from "./Banner/Banner";
import FeatureTournament from "./Feature-tournament/FeatureTournament";
import HappyPlayers from "./HappyPlayer/HappyPlayers";
import JoinOurCommunity from "./Join-our-community/JoinOurCommunity";
import JoinUs from "./Join-us/JoinUs";
import OurClient from "./Our-client/OurClient";
import HomePageContent from "./LoginAfterHomePage/HomePage"; // Renamed to avoid conflict

const HomePage = () => {
  const isLogin = useSelector((state) => state.login.isLogin);

  return (
    <div style={{ backgroundColor: "#141414" }}>
      {!isLogin ? (
        <>
          <div>
            <Banner />
          </div>
          <div>
            <FeatureTournament />
          </div>
          <div>
            <AboutUs />
          </div>
          <div>
            <JoinOurCommunity />
          </div>
          <div>
            <OurClient />
          </div>
          <div>
            <HappyPlayers />
          </div>
          <div>
            <JoinUs />
          </div>
        </>
      ) : (
        <HomePageContent />
      )}
    </div>
  );
};

export default HomePage;
