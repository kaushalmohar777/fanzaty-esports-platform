import onGoingTournament from "../../../assets/images/ongoing-tournament-img.svg";
import rightArrow from "../../../assets/images/right-arrow.svg";
import footBallImage from "../../../assets/images/football-img.svg";
import freeRegister from "../../../assets/images/free-register-img.svg";
import { useTranslation } from "react-i18next";
import "./UpcomingTournamentTab.scss";

const UpcomingTournamentTab = () => {
  const { t } = useTranslation("common");
  return (
    <section className="upcoming-tournament">
      <div className="container">
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
          <p className="name">{t("ongoing_tournament.tournament_name1")}</p>
        </div>

        <button className="registration-open">
          {t("ongoing_tournament.registration_open")}
        </button>

        <div className="upcoming-tournament-inner-second">
          <div className="upcoming-tournament-image">
            <img src={footBallImage} alt="loading-img" />
          </div>
        </div>

        <div className="tournament-name">
          <img src={rightArrow} alt="right-arrow-img" />
          <p className="name">{t("ongoing_tournament.tournament_name2")}</p>
        </div>
      </div>
    </section>
  );
};

export default UpcomingTournamentTab;
