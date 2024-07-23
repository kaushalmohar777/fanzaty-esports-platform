import AboutUs from "./About-us/AboutUs";
import Banner from "./Banner/Banner";
import FeatureTournament from "./Feature-tournament/FeatureTournament";
import HappyPlayers from "./HappyPlayer/HappyPlayers";
import JoinOurCommunity from "./Join-our-community/JoinOurCommunity";
import JoinUs from "./Join-us/JoinUs";
import OurClient from "./Our-client/OurClient";

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#141414" }}>
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
    </div>
  );
};

export default HomePage;
