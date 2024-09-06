import onGoingTournament from "../../../assets/images/ongoing-tournament-img.svg";
import rightArrow from "../../../assets/images/right-arrow.svg";
import freeRegister from "../../../assets/images/free-register-img.svg";
import { useTranslation } from "react-i18next";
import "./UpcomingTournamentTab.scss";
import { useEffect, useState } from "react";
import { getApiRequest } from "../../../services/getApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";

const UpcomingTournamentTab = () => {
  const { t } = useTranslation("common");

  const [upcominTournaments, setUpcominTournaments] = useState([]);

  useEffect(() => {
    getUpcomingTournaments();
  }, []);

  const getUpcomingTournaments = async () => {
    try {
      const response = await getApiRequest(END_POINTS.UPCOMING_TOURNAMENTS);
      if (response.success) {
        setUpcominTournaments(response.tournaments);
      }
    } catch (error) {
      console.log("error", error);
      showToast(error?.error?.message, "error");
    }
  };

  return (
    <section className="upcoming-tournament">
      <div className="container">
        {upcominTournaments &&
          upcominTournaments.map((item, index) => (
            <div key={index} className="upcoming-tournament-list">
              <div className="upcoming-tournament-inner">
                <div className="upcoming-tournament-image">
                  <img src={onGoingTournament} alt="loading-img" />
                </div>
                <div className="free-registeration-img">
                  <img src={freeRegister} alt="laoding-img" />
                </div>
              </div>

              <div className="tournament-name">
                <img src={rightArrow} alt="right-arrow-img" />
                <p className="name">
                  {/* {t("ongoing_tournament.tournament_name1")} */}
                  {item.name}
                </p>
              </div>

              <button className="registration-open">
                {t("ongoing_tournament.registration_open")}
              </button>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UpcomingTournamentTab;
