import "./HomePage.scss";
import croupier from "../../assets/images/croupier.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getApiRequest } from "../../services/getApiRequest";
import { END_POINTS } from "../../Helper/Constant";
import { showToast } from "../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import tournamentCup from "../../assets/images/tournament-cup.svg";

const HomePage = () => {
  const { t } = useTranslation("common");
  const [tournamentUserCount, setTournamentUserCount] = useState(null);

  useEffect(() => {
    getCountTournamentUser();
  }, []);

  const getCountTournamentUser = async () => {
    try {
      const response = await getApiRequest(END_POINTS.GET_HOME_PAGE_DATA);
      if (response.success) {
        setTournamentUserCount(response.count);
      }
      console.log("response: ", response);
    } catch (error) {
      console.log("error: ", error);
      showToast(error?.error?.message, "error");
    }
  };

  useEffect(() => {
    console.log("tournamentUserCount", tournamentUserCount);
  }, [tournamentUserCount]);

  return (
    <section className="login-after-home-page">
      <div className="active-tour-division">
        <div className="active-tourn-bg">
          <h1 className="active-tour-heading">
            <Link to="/all-tournaments" className="active-tour-heading">
              {t("homePage.activeTournaments")}
            </Link>
          </h1>
        </div>
      </div>

      <div className="active-tour-division">
        <div className="join-academy-bg">
          <h1 className="active-tour-heading">
            <Link to="/academy" className="active-tour-heading">
              {t("homePage.joinAcademy")}
            </Link>
          </h1>
        </div>
      </div>
      <div className="container">
        <div>
          <h2 className="our-esport-track">
            {t("homePage.esportsTrackRecord")}
          </h2>
        </div>

        <div className="track">
          <div className="track-record">
            <p className="record-name">{t("homePage.tournamentNumber")}</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={croupier} alt="loading-img" />
              <p>
                <span className="track-score">
                  {tournamentUserCount?.totalTournaments}
                </span>{" "}
                <br />
              </p>
            </div>
          </div>
          <div className="track-record">
            <p className="record-name">{t("homePage.academyTrainee")}</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBlock: "30px",
              }}
            >
              <img src={tournamentCup} alt="loading-img" />
              <p>
                <span className="track-score">
                  {tournamentUserCount?.totalUsers}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
