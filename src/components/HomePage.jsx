import AboutUs from "./About-us/AboutUs";
import Banner from "./Banner/Banner";
import FeatureTournament from "./Feature-tournament/FeatureTournament";
import JoinOurCommunity from "./Join-our-community/JoinOurCommunity";

const HomePage = () => {
  return (
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
    </>
  );
};

export default HomePage;
