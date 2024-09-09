import "./OngoingTournamentTab.scss";
import onGoingTournament from "../../../assets/images/ongoing-tournament-img.svg";
import rightArrow from "../../../assets/images/right-arrow.svg";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getApiRequest } from "../../../services/getApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const OngoingTournamentTab = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [ongingTournaments, setOngingTournaments] = useState([]);

  useEffect(() => {
    getOngoingTournament();
  }, []);

  const getOngoingTournament = async () => {
    try {
      const response = await getApiRequest(END_POINTS.ONGOING_TOURNAMENTS);
      if (response.success) {
        setOngingTournaments(response.tournaments);
      }
    } catch (error) {
      console.log("error: ", error);
      showToast(error?.error?.message, "error");
    }
  };

  return (
    <section className="ongoing-tournament">
      <div className="container">
        {ongingTournaments &&
          ongingTournaments?.map((item, index) => (
            <div key={index} style={{ marginTop: "20px" }}>
              <div className="ongoing-tournament-inner">
                <div className="ongoing-tournament-image">
                  <img src={onGoingTournament} alt="loading-img" />
                </div>
              </div>

              <div className="tournament-name">
                <img src={rightArrow} alt="right-arrow-img" />
                <p className="name">
                  {/* {t("ongoing_tournament.tournament_name1")} */}
                  {item.name}
                </p>
              </div>

              {!item.isRegistered ? (
                <Button className="registration-open">
                  {t("ongoing_tournament.registration_open")}
                </Button>
              ) : (
                <Button
                  className="registration-open"
                  onClick={() => navigate(`/register-featured/${item._id}`)}
                >
                  {t("ongoing_tournament.details")}
                </Button>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default OngoingTournamentTab;
