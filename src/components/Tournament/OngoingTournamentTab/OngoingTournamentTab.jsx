import "./OngoingTournamentTab.scss";
import onGoingTournament from "../../../assets/images/ongoing-tournament-img.svg";
import rightArrow from "../../../assets/images/right-arrow.svg";
import { useTranslation } from "react-i18next";

const OngoingTournamentTab = () => {
  const { t } = useTranslation("common");

  return (
    <section className="ongoing-tournament">
      <div className="container">
        <div className="ongoing-tournament-inner">
          <div className="ongoing-tournament-image">
            <img src={onGoingTournament} alt="loading-img" />
          </div>
        </div>

        <div className="tournament-name">
          <img src={rightArrow} alt="right-arrow-img" />
          <p className="name">{t("ongoing_tournament.tournament_name1")}</p>
        </div>

        <button className="registration-open">
          {t("ongoing_tournament.registration_open")}
        </button>
      </div>
    </section>
  );
};

export default OngoingTournamentTab;
